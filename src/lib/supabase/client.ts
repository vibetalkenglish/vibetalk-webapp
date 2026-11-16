'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './config';

let client: SupabaseClient | null = null;

/** Browser Supabase client, or null when Supabase env vars are missing. */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured || typeof window === 'undefined') return null;
  if (!client) client = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return client;
}
