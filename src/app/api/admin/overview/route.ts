import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import { DEFAULT_BANK_CONFIG } from '@/lib/bankConfig';
import type { PaymentOrder, UserAccount, BankConfig, LevelId } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const ctx = await requireAdmin();
  if (ctx instanceof NextResponse) return ctx;
  const { admin } = ctx;

  const [profilesRes, progressRes, ordersRes, bankRes] = await Promise.all([
    admin.from('profiles').select('*').order('created_at', { ascending: false }).limit(1000),
    admin.from('progress').select('user_id, current_level, completed_lessons').limit(1000),
    admin.from('orders').select('*').order('created_at', { ascending: false }).limit(500),
    admin.from('app_config').select('value').eq('key', 'bank').maybeSingle(),
  ]);
  const err = profilesRes.error || progressRes.error || ordersRes.error;
  if (err) return NextResponse.json({ error: err.message }, { status: 500 });

  const progressById = new Map((progressRes.data || []).map((p) => [p.user_id, p]));
  const profileById = new Map((profilesRes.data || []).map((p) => [p.id, p]));

  const users: UserAccount[] = (profilesRes.data || []).map((p) => {
    const g = progressById.get(p.id);
    const proUntil = p.pro_until ? Date.parse(p.pro_until) : undefined;
    return {
      id: p.id,
      name: p.display_name,
      email: p.email || '',
      avatar: p.avatar,
      createdAt: Date.parse(p.created_at),
      exp: p.xp,
      streakDays: p.streak_days,
      lastActiveDate: p.last_active_date || '',
      currentLevel: (g?.current_level || 'lv0') as LevelId,
      unlockedLevels: [],
      completedLessons: g?.completed_lessons || [],
      savedWords: [],
      savedLessons: [],
      testResults: {},
      isPro: Boolean(p.is_pro && proUntil && proUntil > Date.now()),
      proPlan: p.pro_plan || undefined,
      proExpiresAt: proUntil,
    };
  });

  const orders: PaymentOrder[] = (ordersRes.data || []).map((o) => {
    const owner = profileById.get(o.user_id);
    return {
      id: o.code,
      userId: o.user_id,
      userName: owner?.display_name || '(đã xoá)',
      userEmail: owner?.email || '',
      planId: o.plan_id,
      planName: o.plan_name,
      amount: o.amount,
      bankCode: '',
      accountNumber: '',
      accountName: '',
      transferCode: o.code,
      status: o.status === 'paid' ? 'completed' : o.status,
      createdAt: Date.parse(o.created_at),
      completedAt: o.paid_at ? Date.parse(o.paid_at) : undefined,
    };
  });

  const bank: BankConfig = { ...DEFAULT_BANK_CONFIG, ...((bankRes.data?.value as Partial<BankConfig>) || {}) };
  return NextResponse.json({ users, orders, bank });
}
