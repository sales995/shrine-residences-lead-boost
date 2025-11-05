import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dywmajqqvsmbatwadqop.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5d21hanFxdnNtYmF0d2FkcW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxOTkxNjYsImV4cCI6MjA3NDc3NTE2Nn0.cOXX2J9NUmNWNvDR_OnoTXuN_kywx-EXd6NP3nFu6Zc';

export const supabase = createClient(supabaseUrl, supabaseKey);