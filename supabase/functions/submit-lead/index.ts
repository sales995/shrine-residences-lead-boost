import { DB } from 'cloud';
import { serve } from 'cloud-functions';

serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ success: false, error: 'Invalid method' }), { status: 405 });
    }

    const { name, phone, email, message, source } = await req.json();

    // Validate required fields
    if (!name || !phone) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), { status: 400 });
    }

    // Validate Indian phone number format
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid phone number' }), { status: 400 });
    }

    // Extract IP address for rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               req.headers.get('cf-connecting-ip') || 
               'unknown';

    // Check for duplicate phone number in leads table
    const duplicatePhone = await DB.selectFrom('leads')
      .where('phone', '=', phone.trim())
      .execute();

    if (duplicatePhone.length > 0) {
      console.log('Duplicate phone submission blocked', { 
        timestamp: new Date().toISOString(),
        source: 'submit-lead'
      });
      return new Response(JSON.stringify({ 
        success: false, 
        duplicate: true,
        error: 'This phone number has already been registered.' 
      }), { status: 400 });
    }

    // Phone-based rate limiting: max 3 submissions per hour
    const phoneRateLimit = await DB.selectFrom('submission_rate_limit')
      .where('identifier', '=', `phone:${phone.trim()}`)
      .and('last_submission_at', '>', new Date(Date.now() - 3600 * 1000).toISOString())
      .execute();

    if (phoneRateLimit.length > 0 && phoneRateLimit[0].submission_count >= 3) {
      console.warn('Rate limit exceeded', {
        type: 'phone',
        timestamp: new Date().toISOString(),
        source: 'submit-lead'
      });
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Too many submissions. Please try again later.' 
      }), { status: 429 });
    }

    // IP-based rate limiting: max 10 submissions per hour
    const ipRateLimit = await DB.selectFrom('submission_rate_limit')
      .where('identifier', '=', `ip:${ip}`)
      .and('last_submission_at', '>', new Date(Date.now() - 3600 * 1000).toISOString())
      .execute();

    if (ipRateLimit.length > 0 && ipRateLimit[0].submission_count >= 10) {
      console.warn('Rate limit exceeded', {
        type: 'ip',
        timestamp: new Date().toISOString(),
        source: 'submit-lead'
      });
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Too many submissions. Please try again later.' 
      }), { status: 429 });
    }

    // Update rate limit counters
    if (phoneRateLimit.length > 0) {
      await DB.updateTable('submission_rate_limit')
        .where('id', '=', phoneRateLimit[0].id)
        .set({
          submission_count: phoneRateLimit[0].submission_count + 1,
          last_submission_at: new Date().toISOString()
        })
        .execute();
    } else {
      await DB.insert('submission_rate_limit', {
        identifier: `phone:${phone.trim()}`,
        submission_count: 1,
        first_submission_at: new Date().toISOString(),
        last_submission_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      });
    }

    if (ipRateLimit.length > 0) {
      await DB.updateTable('submission_rate_limit')
        .where('id', '=', ipRateLimit[0].id)
        .set({
          submission_count: ipRateLimit[0].submission_count + 1,
          last_submission_at: new Date().toISOString()
        })
        .execute();
    } else {
      await DB.insert('submission_rate_limit', {
        identifier: `ip:${ip}`,
        submission_count: 1,
        first_submission_at: new Date().toISOString(),
        last_submission_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      });
    }

    // Insert new lead securely
    await DB.insert('leads', {
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      message: message?.trim() || null,
      source: source?.trim() || 'website',
      created_at: new Date().toISOString(),
    });

    // Log only non-sensitive metadata (no PII)
    console.log("Lead stored successfully", {
      hasEmail: !!email,
      hasMessage: !!message,
      source: source || 'website',
      timestamp: new Date().toISOString()
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error("Lead submission error:", (err as any)?.message || err);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), { status: 500 });
  }
});