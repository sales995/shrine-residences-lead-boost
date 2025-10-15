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
        // Route to Lovable Cloud function by name, posting JSON
        const response = await fetch(`/api/${_name}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return { data, error: null };
      } catch (error) {
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