import { createContext, useContext, useEffect, useState } from 'react';
// Minimal user/session types to avoid Supabase SDK dependency
type User = { id: string; email?: string | null };
type Session = { user: User } | null;
// Supabase client is dynamically imported in the browser to avoid SSR issues

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAdmin: false,
  loading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let mounted = true;

    (async () => {
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (!mounted) return;
          setSession(session);
          setUser(session?.user ?? null);

          // Check admin status when session changes
          if (session?.user) {
            setTimeout(() => {
              checkAdminStatus(session.user!.id);
            }, 0);
          } else {
            setIsAdmin(false);
          }

          setLoading(false);
        });

        unsubscribe = () => subscription.unsubscribe();

        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          setTimeout(() => {
            checkAdminStatus(session.user!.id);
          }, 0);
        }

        setLoading(false);
      } catch (e) {
        console.error('Auth initialization failed:', e);
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const checkAdminStatus = async (_userId: string) => {
    setIsAdmin(false);
  };

  const signIn = async (_email: string, _password: string) => {
    return { error: null };
  };

  const signUp = async (_email: string, _password: string, _fullName: string) => {
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
