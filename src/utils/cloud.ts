export async function cloudInvoke(functionName: string, body: any): Promise<any> {
  // Prefer environment variables, but provide safe fallbacks so production works instantly
  const PROJECT_ID = 'dywmajqqvsmbatwadqop';
  const FALLBACK_URL = `https://${PROJECT_ID}.supabase.co`;
  const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5d21hanFxdnNtYmF0d2FkcW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxOTkxNjYsImV4cCI6MjA3NDc3NTE2Nn0.cOXX2J9NUmNWNvDR_OnoTXuN_kywx-EXd6NP3nFu6Zc';

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_KEY;

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      console.error(`Edge function ${functionName} HTTP ${response.status}:`, payload);
      throw new Error(typeof payload === 'string' ? payload : (payload?.error || 'Submission failed'));
    }

    return payload;
  } catch (error) {
    console.error(`Failed to invoke ${functionName}:`, error);
    throw error;
  }
}

