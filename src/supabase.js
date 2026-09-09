import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xcadpkytilyqanpatfls.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_SJyusttsQn2ToI5qdXp6kg_VHAcwm8G'

const exploreSupabaseUrl = import.meta.env.VITE_EXPLORE_SUPABASE_URL || 'https://tbetejugovgbwsztngmw.supabase.co'
const exploreSupabaseAnonKey = import.meta.env.VITE_EXPLORE_SUPABASE_ANON_KEY || 'sb_publishable_B8KXi5-uvff4lzZXB84aSw_ZD8q9dne'

let client = null;
if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project-id')) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: window.sessionStorage,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  } catch (err) {
    console.error('Supabase client initialization failed:', err);
  }
}

let exploreClient = null;
if (exploreSupabaseUrl && exploreSupabaseAnonKey) {
  try {
    exploreClient = createClient(exploreSupabaseUrl, exploreSupabaseAnonKey, {
      auth: {
        storage: window.sessionStorage,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  } catch (err) {
    console.error('Explore Supabase client initialization failed:', err);
  }
}

export const supabase = client;
export const exploreSupabase = exploreClient || client;

