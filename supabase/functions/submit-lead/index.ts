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

    // Prevent duplicate submissions (1 per hour)
    const existing = await DB.selectFrom('leads')
      .where('phone', '=', phone)
      .and('created_at', '>', new Date(Date.now() - 3600 * 1000).toISOString())
      .execute();

    if (existing.length > 0) {
      return new Response(JSON.stringify({ success: false, duplicate: true }), { status: 429 });
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

    console.log("✅ Lead stored securely:", {
      phonePrefix: phone.substring(0, 2),
      source,
      timestamp: new Date().toISOString()
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error("❌ Lead submission error:", (err as any)?.message || err);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), { status: 500 });
  }
});