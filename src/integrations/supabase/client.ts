// Minimal stub client to replace Supabase when using Lovable Cloud backend only
// Import like: import { supabase } from "@/integrations/supabase/client";

export const supabase = {
  auth: {
    async signInWithPassword(_args: { email: string; password: string }) {
      return { data: null, error: null };
    },
    async signUp(_args: any) {
      return { data: null, error: null };
    },
    async signOut() {
      return { error: null } as any;
    },
    async getSession() {
      return { data: { session: null } } as any;
    },
    onAuthStateChange(_callback: (event: string, session: any) => void) {
      const subscription = { unsubscribe: () => {} };
      return { data: { subscription } } as any;
    },
  },
  functions: {
    async invoke(_name: string, { body }: { body: any }) {
      try {
        // Prefer env, but fall back to known project constants to avoid runtime config issues
        const PROJECT_ID = 'dywmajqqvsmbatwadqop';
        const FALLBACK_URL = `https://${PROJECT_ID}.supabase.co`;
        const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5d21hanFxdnNtYmF0d2FkcW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxOTkxNjYsImV4cCI6MjA3NDc3NTE2Nn0.cOXX2J9NUmNWNvDR_OnoTXuN_kywx-EXd6NP3nFu6Zc';

        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_KEY;

        // Call the backend function directly at the Functions URL
        const response = await fetch(`${supabaseUrl}/functions/v1/${_name}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
            'apikey': supabaseKey,
          },
          body: JSON.stringify(body),
        });

        const contentType = response.headers.get('content-type') || '';
        const data = contentType.includes('application/json') ? await response.json() : await response.text();

        if (!response.ok) {
          console.error('Edge function error:', data);
          return { data: null, error: new Error(typeof data === 'string' ? data : (data?.error || 'Function call failed')) };
        }

        return { data, error: null };
      } catch (error) {
        console.error('Function invoke error:', error);
        return { data: null, error };
      }
    },
  },
  from(_table: string) {
    const chain: any = {
      eq: (_col: string, _val: any) => chain,
      async maybeSingle() {
        return { data: null, error: null };
      },
    };

    return {
      select: (_fields?: string) => ({
        eq: chain.eq,
        maybeSingle: chain.maybeSingle,
        async order(_col: string, _opts?: any) {
          return { data: [], error: null };
        },
      }),
    } as any;
  },
};