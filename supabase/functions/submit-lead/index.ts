import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { DB } from "@/utils/cloud";

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ success: false, error: "Method not allowed" }), { status: 405 });
    }

    const raw = await req.json();

    // Honeypot spam protection
    if (raw.hp && raw.hp.trim() !== "") {
      console.warn("🚫 Spam blocked via honeypot");
      return new Response(JSON.stringify({ success: false, error: "Spam blocked" }), { status: 400 });
    }

    const name = (raw.name || "").trim();
    const phone = (raw.phone || "").replace(/\D/g, "");
    const email = raw.email?.trim() || null;
    const message = raw.message?.trim() || null;
    const source = raw.source?.trim() || "website";

    // ✅ Basic validation
    if (!name || !/^[6-9]\d{9}$/.test(phone)) {
      return new Response(JSON.stringify({ success: false, error: "Invalid input" }), { status: 400 });
    }

    // ✅ Rate limit check - 3/hour per phone
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const recent = await DB.select("leads", {
      phone,
      created_at: { $gt: oneHourAgo },
    });
    if (Array.isArray(recent) && recent.length >= 3) {
      return new Response(JSON.stringify({ success: false, rate_limited: true }), { status: 429 });
    }

    // ✅ Duplicate check - 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const existing = await DB.select("leads", {
      phone,
      created_at: { $gt: thirtyDaysAgo },
    });
    if (existing?.length > 0) {
      return new Response(JSON.stringify({ success: false, duplicate: true }), { status: 200 });
    }

    // ✅ Insert new lead
    const created_at = new Date().toISOString();
    await DB.insert("leads", {
      name,
      phone,
      email,
      message,
      source,
      created_at,
    });

    // ✅ Safe, non-PII logging
    console.log("✅ Lead stored securely", {
      prefix: phone.substring(0, 2),
      timestamp: created_at,
      source,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Lead submission failed:", (err as any)?.message || err);
    return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500 });
  }
});