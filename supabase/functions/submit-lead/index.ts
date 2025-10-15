import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { db } from "@/utils/cloud";

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ success: false, error: "Method not allowed" }), { status: 405 });
    }

    const raw = await req.json();
    // Basic anti-bot honeypot
    if (raw.hp && raw.hp.trim() !== "") {
      return new Response(JSON.stringify({ success: false, error: "Spam detected" }), { status: 400 });
    }

    const name = (raw.name || "").trim();
    const phone = (raw.phone || "").replace(/\D/g, "");
    const email = raw.email?.trim() || null;
    const message = raw.message?.trim() || null;
    const source = raw.source?.trim() || "website";

    // Validation
    if (!name || !/^[6-9]\d{9}$/.test(phone)) {
      return new Response(JSON.stringify({ success: false, error: "Invalid input" }), { status: 400 });
    }

    // Rate limit: only allow 3 submissions/hour per phone
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const recent = await db.from("leads").select("*").gt("created_at", oneHourAgo).eq("phone", phone);

    if (Array.isArray(recent?.data) && recent.data.length >= 3) {
      return new Response(JSON.stringify({ success: false, rate_limited: true, error: "Too many submissions" }), { status: 429 });
    }

    // Duplicate check (30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const dup = await db.from("leads").select("*").gt("created_at", thirtyDaysAgo).eq("phone", phone);
    if (dup?.data?.length > 0) {
      return new Response(JSON.stringify({ success: false, duplicate: true }), { status: 200 });
    }

    const created_at = new Date().toISOString();

    // Insert lead safely
    await db.from("leads").insert([
      { name, phone, email, message, source, created_at }
    ]);

    // Safe logging (no PII)
    console.log("✅ Lead inserted", {
      source,
      timestamp: created_at,
      phonePrefix: phone.substring(0, 2),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("❌ Error in submit-lead:", (err as any)?.message || err);
    return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500 });
  }
});
