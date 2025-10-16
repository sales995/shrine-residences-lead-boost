import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid method' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const { name, phone, email, message, source } = await req.json();

    // Validate required fields
    if (!name || !phone) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), { status: 400 });
    }

    // Validate Indian phone number format
    // Using the same regex as client-side: /^[6-9][0-9]{9}$/
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid phone number' }), { status: 400 });
    }

    // Extract IP address for rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               req.headers.get('cf-connecting-ip') || 
               'unknown';

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_ANON_KEY');
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase env: SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY/ANON_KEY');
      return new Response(
        JSON.stringify({ success: false, error: 'Server not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check for duplicate phone number in leads table
    const { data: duplicatePhone, error: dupErr } = await supabase
      .from('leads')
      .select('id')
      .eq('phone', phone.trim())
      .limit(1);
    if (dupErr) {
      console.error('Duplicate phone check failed:', dupErr.message);
      return new Response(
        JSON.stringify({ success: false, error: 'Server error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (duplicatePhone && duplicatePhone.length > 0) {
      console.log('Duplicate phone submission blocked', { 
        timestamp: new Date().toISOString(),
        source: 'submit-lead'
      });
      return new Response(
        JSON.stringify({ 
          success: false, 
          duplicate: true,
          error: 'This phone number has already been registered.' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Phone-based rate limiting: max 3 submissions per hour
    const oneHourAgoIso = new Date(Date.now() - 3600 * 1000).toISOString();
    const { data: phoneRateLimit, error: phoneRateErr } = await supabase
      .from('submission_rate_limit')
      .select('id, submission_count, last_submission_at')
      .eq('identifier', `phone:${phone.trim()}`)
      .gt('last_submission_at', oneHourAgoIso)
      .order('last_submission_at', { ascending: false })
      .limit(1);
    if (phoneRateErr) {
      console.error('Phone rate limit check failed:', phoneRateErr.message);
      return new Response(
        JSON.stringify({ success: false, error: 'Server error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (phoneRateLimit && phoneRateLimit.length > 0 && (phoneRateLimit[0].submission_count ?? 0) >= 3) {
      console.warn('Rate limit exceeded', {
        type: 'phone',
        timestamp: new Date().toISOString(),
        source: 'submit-lead'
      });
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Too many submissions. Please try again later.' 
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // IP-based rate limiting: max 10 submissions per hour
    const { data: ipRateLimit, error: ipRateErr } = await supabase
      .from('submission_rate_limit')
      .select('id, submission_count, last_submission_at')
      .eq('identifier', `ip:${ip}`)
      .gt('last_submission_at', oneHourAgoIso)
      .order('last_submission_at', { ascending: false })
      .limit(1);
    if (ipRateErr) {
      console.error('IP rate limit check failed:', ipRateErr.message);
      return new Response(
        JSON.stringify({ success: false, error: 'Server error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (ipRateLimit && ipRateLimit.length > 0 && (ipRateLimit[0].submission_count ?? 0) >= 10) {
      console.warn('Rate limit exceeded', {
        type: 'ip',
        timestamp: new Date().toISOString(),
        source: 'submit-lead'
      });
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Too many submissions. Please try again later.' 
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Update rate limit counters
    if (phoneRateLimit && phoneRateLimit.length > 0) {
      const current = phoneRateLimit[0];
      const { error: updPhoneErr } = await supabase
        .from('submission_rate_limit')
        .update({
          submission_count: (current.submission_count ?? 0) + 1,
          last_submission_at: new Date().toISOString(),
        })
        .eq('id', current.id);
      if (updPhoneErr) {
        console.error('Failed to update phone rate limit:', updPhoneErr.message);
      }
    } else {
      const { error: insPhoneErr } = await supabase
        .from('submission_rate_limit')
        .insert({
          identifier: `phone:${phone.trim()}`,
          submission_count: 1,
          first_submission_at: new Date().toISOString(),
          last_submission_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        });
      if (insPhoneErr) {
        console.error('Failed to insert phone rate limit:', insPhoneErr.message);
      }
    }

    if (ipRateLimit && ipRateLimit.length > 0) {
      const current = ipRateLimit[0];
      const { error: updIpErr } = await supabase
        .from('submission_rate_limit')
        .update({
          submission_count: (current.submission_count ?? 0) + 1,
          last_submission_at: new Date().toISOString(),
        })
        .eq('id', current.id);
      if (updIpErr) {
        console.error('Failed to update IP rate limit:', updIpErr.message);
      }
    } else {
      const { error: insIpErr } = await supabase
        .from('submission_rate_limit')
        .insert({
          identifier: `ip:${ip}`,
          submission_count: 1,
          first_submission_at: new Date().toISOString(),
          last_submission_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        });
      if (insIpErr) {
        console.error('Failed to insert IP rate limit:', insIpErr.message);
      }
    }

    // Insert new lead securely
    const { error: insertLeadErr } = await supabase
      .from('leads')
      .insert({
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        message: message?.trim() || null,
        source: (source?.trim() || 'website'),
        created_at: new Date().toISOString(),
      });
    if (insertLeadErr) {
      console.error('Insert lead failed:', insertLeadErr.message);
      return new Response(
        JSON.stringify({ success: false, error: 'Server error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Log only non-sensitive metadata (no PII)
    console.log("Lead stored successfully", {
      hasEmail: !!email,
      hasMessage: !!message,
      source: source || 'website',
      timestamp: new Date().toISOString()
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );

  } catch (err) {
    console.error("Lead submission error:", (err as any)?.message || err);
    return new Response(
      JSON.stringify({ success: false, error: 'Server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});