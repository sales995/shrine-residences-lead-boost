import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RECAPTCHA_SECRET_KEY = Deno.env.get("RECAPTCHA_SECRET_KEY");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX_SUBMISSIONS = 5;

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;
  return "unknown";
}

function isValidEmail(email?: string | null): boolean {
  if (!email) return true;
  const trimmed = email.trim();
  if (!trimmed) return true;
  if (trimmed.length > 255) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(trimmed);
}

function isValidPhone(phone: string): boolean {
  return /^[6-9][0-9]{9}$/.test(phone.trim());
}

async function verifyRecaptcha(token?: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET_KEY) {
    // If no secret configured, skip verification (user must add secret for full protection)
    console.warn("RECAPTCHA_SECRET_KEY not set. Skipping CAPTCHA verification.");
    return true;
  }
  if (!token) return false;
  const params = new URLSearchParams();
  params.append("secret", RECAPTCHA_SECRET_KEY);
  params.append("response", token);

  try {
    const resp = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    const result = await resp.json();
    return !!result.success;
  } catch (e) {
    console.error("reCAPTCHA verification error", e);
    return false;
  }
}

async function checkAndTouchRateLimit(identifier: string) {
  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000);

  // Try to fetch existing record
  const { data: existing, error: selErr } = await supabase
    .from("submission_rate_limit")
    .select("id, first_submission_at, last_submission_at, submission_count")
    .eq("identifier", identifier)
    .maybeSingle();

  if (selErr && selErr.code !== "PGRST116") {
    // PGRST116 -> No rows
    console.error("RateLimit select error", selErr);
  }

  if (!existing) {
    const { error: insErr } = await supabase.from("submission_rate_limit").insert({
      identifier,
      submission_count: 1,
      first_submission_at: now.toISOString(),
      last_submission_at: now.toISOString(),
    });
    if (insErr && insErr.code !== "23505") {
      // ignore conflict from concurrent insert thanks to unique index
      console.error("RateLimit insert error", insErr);
    }
    return { allowed: true, remaining: RATE_LIMIT_MAX_SUBMISSIONS - 1 };
  }

  const firstAt = existing.first_submission_at ? new Date(existing.first_submission_at) : now;
  const lastAt = existing.last_submission_at ? new Date(existing.last_submission_at) : now;
  let count = existing.submission_count ?? 0;

  // Reset window if the first submission is outside the window
  if (firstAt < windowStart) {
    const { error: updErr } = await supabase
      .from("submission_rate_limit")
      .update({
        first_submission_at: now.toISOString(),
        last_submission_at: now.toISOString(),
        submission_count: 1,
      })
      .eq("identifier", identifier);
    if (updErr) console.error("RateLimit reset error", updErr);
    return { allowed: true, remaining: RATE_LIMIT_MAX_SUBMISSIONS - 1 };
  }

  // Same window: increment and check
  count += 1;
  if (count > RATE_LIMIT_MAX_SUBMISSIONS) {
    const { error: touchErr } = await supabase
      .from("submission_rate_limit")
      .update({ last_submission_at: now.toISOString() })
      .eq("identifier", identifier);
    if (touchErr) console.error("RateLimit touch error", touchErr);
    return { allowed: false, remaining: 0 };
  }

  const { error: updErr } = await supabase
    .from("submission_rate_limit")
    .update({
      last_submission_at: now.toISOString(),
      submission_count: count,
    })
    .eq("identifier", identifier);
  if (updErr) console.error("RateLimit update error", updErr);
  return { allowed: true, remaining: Math.max(0, RATE_LIMIT_MAX_SUBMISSIONS - count) };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, message, source, captchaToken } = await req.json();

    // Basic validation
    if (!name || typeof name !== "string" || name.trim().length < 1 || name.trim().length > 100) {
      return new Response(JSON.stringify({ error: "Invalid name" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!phone || typeof phone !== "string" || !isValidPhone(phone)) {
      return new Response(JSON.stringify({ error: "Invalid phone" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (message && typeof message === "string" && message.trim().length > 1000) {
      return new Response(JSON.stringify({ error: "Message too long" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const allowedSources = new Set(["hero", "contact-form", "popup", "brochure_download"]);
    const src = typeof source === "string" ? source : "contact-form";
    if (!allowedSources.has(src)) {
      return new Response(JSON.stringify({ error: "Invalid source" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // CAPTCHA (if configured)
    const captchaOk = await verifyRecaptcha(captchaToken);
    if (!captchaOk) {
      return new Response(JSON.stringify({ error: "Failed CAPTCHA verification" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Rate limiting by IP
    const identifier = getClientIp(req);
    const rl = await checkAndTouchRateLimit(identifier);
    if (!rl.allowed) {
      return new Response(JSON.stringify({ error: "Too many submissions. Please try again later." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Insert lead (service role bypasses RLS)
    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      message: message?.trim() || null,
      source: src,
    } as const;

    const { error: insErr } = await supabase.from("leads").insert(payload);
    if (insErr) {
      // Handle duplicate unique constraint gracefully
      if (insErr.code === "23505") {
        return new Response(JSON.stringify({ success: true, duplicate: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      console.error("Lead insert error", insErr);
      return new Response(JSON.stringify({ error: "Failed to save lead" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-lead handler error", err);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
