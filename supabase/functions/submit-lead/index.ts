import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Lovable Cloud DB helper (injected at runtime)
// deno-lint-ignore no-explicit-any
declare const DB: {
  select: (table: string, query: Record<string, any>) => Promise<any[]>;
  insert: (table: string, values: Record<string, any>) => Promise<void>;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function isValidEmail(email?: string | null): boolean {
  if (!email) return true;
  const trimmed = email.trim();
  if (!trimmed) return true;
  if (trimmed.length > 255) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(trimmed);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ success: false, error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const raw = await req.json();

    // Honeypot
    if (raw?.hp && String(raw.hp).trim() !== "") {
      console.warn("Honeypot triggered");
      return new Response(JSON.stringify({ success: false, error: "Spam blocked" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const name = (raw?.name || "").trim();
    const phoneRaw = (raw?.phone || "").trim();
    const phoneDigits = phoneRaw.replace(/\D/g, "");
    const email = raw?.email ? String(raw.email).trim() : null;
    const message = raw?.message ? String(raw.message).trim() : null;
    const source = (raw?.source || "website").trim();

    if (!name || name.length > 200) {
      return new Response(JSON.stringify({ success: false, error: "Invalid name" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      return new Response(JSON.stringify({ success: false, error: "Invalid phone" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ success: false, error: "Invalid email" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Rate limit: 3 per hour per phone
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    try {
      const recent = await DB.select("leads", { phone: phoneDigits, created_at: { $gt: oneHourAgo } });
      if (Array.isArray(recent) && recent.length >= 3) {
        return new Response(JSON.stringify({ success: false, rate_limited: true, error: "Rate limit exceeded" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    } catch (_e) {
      // If select unsupported, continue without rate limit
    }

    // Duplicate last 30 days by phone (+email if provided)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    try {
      const dupQuery: Record<string, unknown> = { phone: phoneDigits, created_at: { $gt: thirtyDaysAgo } };
      if (email) dupQuery.email = email;
      const dup = await DB.select("leads", dupQuery);
      if (Array.isArray(dup) && dup.length > 0) {
        return new Response(JSON.stringify({ success: false, duplicate: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    } catch (_e) {
      // If select unsupported, rely on DB unique index or proceed
    }

    const created_at = new Date().toISOString();
    await DB.insert("leads", { name, phone: phoneDigits, email, message, source, created_at });

    // Optional CRM webhook
    try {
      const CRM_URL = Deno.env.get("CRM_WEBHOOK_URL") || Deno.env.get("VITE_CRM_WEBHOOK_URL") || null;
      if (CRM_URL) {
        await fetch(CRM_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone: phoneDigits, email, source, created_at }),
        });
      }
    } catch (err) {
      const msg = (err as Error)?.message || "crm_error";
      console.warn("CRM webhook failed:", msg);
    }

    // Redacted log
    console.info("Lead inserted:", { source, phonePrefix: phoneDigits.substring(0, 2), hasEmail: !!email, timestamp: created_at });

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    const msg = (err as Error)?.message || "error";
    console.error("submit-lead error:", msg);
    return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
