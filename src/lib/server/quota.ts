import { createServerSupabase } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';

import { DAILY_LIMITS } from '@/lib/limits';

export { DAILY_LIMITS };

export type QuotaKind = keyof typeof DAILY_LIMITS;

export type QuotaResult =
  | { ok: true }
  | { ok: false; reason: 'login' | 'quota' | 'error'; message: string };

const MESSAGES = {
  ai_chat: {
    login: 'Đăng nhập (miễn phí) để trò chuyện với Gia Sư AI thật. Hiện bạn đang dùng chế độ trả lời mẫu.',
    quota: (n: number) =>
      `Bạn đã dùng hết ${n} lượt chat AI hôm nay. Lượt mới sẽ có lại sau 0h. Nâng cấp Pro để có nhiều lượt hơn mỗi ngày.`,
  },
  tts: {
    login: 'Đăng nhập (miễn phí) để nghe giọng đọc AI chất lượng cao. Hiện đang dùng giọng đọc của trình duyệt.',
    quota: (n: number) =>
      `Bạn đã dùng hết ${n} lượt giọng đọc AI hôm nay, đang chuyển sang giọng của trình duyệt. Nâng cấp Pro để có nhiều lượt hơn.`,
  },
};

/**
 * Counts one use of a paid AI feature for the signed-in user.
 * Guests are refused (they get the free fallback instead). Fails closed if the
 * quota function is missing, so a misconfiguration never runs up API costs.
 */
export async function consumeQuota(kind: QuotaKind): Promise<QuotaResult> {
  if (!isSupabaseConfigured) return { ok: true }; // local dev without accounts

  const supabase = await createServerSupabase();
  const { data: auth } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  if (!supabase || !auth.user) return { ok: false, reason: 'login', message: MESSAGES[kind].login };

  const limits = DAILY_LIMITS[kind];
  const { data, error } = await supabase.rpc('consume_quota', {
    p_kind: kind,
    p_free_limit: limits.free,
    p_pro_limit: limits.pro,
  });
  if (error) {
    console.error(`consume_quota failed (did you run 0002_usage_limits.sql?): ${error.message}`);
    return { ok: false, reason: 'error', message: 'Tính năng AI tạm thời không khả dụng. Vui lòng thử lại sau.' };
  }
  const row = Array.isArray(data) ? data[0] : data;
  if (row?.allowed) return { ok: true };
  return { ok: false, reason: 'quota', message: MESSAGES[kind].quota(row?.quota ?? limits.free) };
}
