import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let client = null;
if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project-id')) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('Supabase client initialization failed:', err);
  }
}

export const supabase = client;
