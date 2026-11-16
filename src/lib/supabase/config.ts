export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/** True when the public Supabase env vars are set. Without them the app runs in offline guest mode. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const SUPABASE_NOT_CONFIGURED_MESSAGE =
  'Tính năng tài khoản chưa được cấu hình (thiếu NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY). Bạn vẫn có thể học ở chế độ khách, tiến độ lưu trên trình duyệt này.';
