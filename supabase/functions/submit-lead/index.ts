import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Lovable Cloud: use built-in DB helper
// deno-lint-ignore no-explicit-any
declare const DB: { insert: (table: string, values: Record<string, any>) => Promise<void> };

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

function isValidPhone(phone: string): boolean {
  return /^[6-9][0-9]{9}$/.test(phone.trim());
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, source } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length < 1 || name.trim().length > 100) {
      return new Response(JSON.stringify({ error: "Invalid name" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!phone || typeof phone !== "string" || !isValidPhone(phone)) {
      return new Response(JSON.stringify({ error: "Invalid phone" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: (email?.trim?.() || null) as string | null,
      source: typeof source === 'string' ? source : 'contact-form',
      created_at: new Date().toISOString(),
    } as const;

    await DB.insert('leads', payload as unknown as Record<string, unknown>);

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
