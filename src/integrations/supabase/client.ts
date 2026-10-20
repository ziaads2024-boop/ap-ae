import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = process.env.NEXT_SUPABASE_URL;
const supabaseKey = process.env.NEXT_SUPABASE_ANON_KEY 
                 || process.env.NEXT_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing NEXT_SUPABASE_URL or NEXT_SUPABASE_ANON_KEY environment variable');
}

if (!supabaseUrl.startsWith('http')) {
  throw new Error('NEXT_SUPABASE_URL must be a valid URL starting with http:// or https://');
}

export const supabase: SupabaseClient<Database> = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    fetch: ((url, options) => {
      if (typeof url === 'string' && url.includes('track-visitor')) {
        return fetch(url, {
          ...options,
          credentials: 'omit',
        });
      }
      return fetch(url, options);
    }) as typeof fetch,
  },
});



/**
 * Anonymous client for the appointment manage link. RLS only exposes the
 * appointment whose manage_token matches the x-manage-token request header.
 */
export function createAppointmentTokenClient(manageToken: string): SupabaseClient<Database> {
  return createClient<Database>(supabaseUrl!, supabaseKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storageKey: 'sb-appointment-manage',
    },
    global: {
      headers: { 'x-manage-token': manageToken },
    },
  });
}
