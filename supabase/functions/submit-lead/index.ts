import { DB } from 'cloud';
import { serve } from 'cloud-functions';

serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ success: false, error: 'Invalid method' }), { status: 405 });
    }

    const { name, phone, email, message, source } = await req.json();

    // --- Basic Validation ---
    if (!name || !phone) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), { status: 400 });
    }

    // Validate phone (Indian format: 10-digit starting 6–9)
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid phone number' }), { status: 400 });
    }

    // --- Rate Limiting: One submission per phone/hour ---
    const recent = await DB.selectFrom('leads')
      .where('phone', '=', phone)
      .and('created_at', '>', new Date(Date.now() - 3600 * 1000).toISOString())
      .execute();

    if (recent.length > 0) {
      return new Response(JSON.stringify({ success: false, duplicate: true }), { status: 429 });
    }

    // --- Insert Securely ---
    await DB.insert('leads', {
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      message: message?.trim() || null,
      source: source?.trim() || 'website',
      created_at: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error('❌ Lead submission failed:', err);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), { status: 500 });
  }
});