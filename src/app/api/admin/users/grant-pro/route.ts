import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import { isPlanId } from '@/lib/plans';

// Gift Pro to a user without an order.
export async function POST(req: NextRequest) {
  const ctx = await requireAdmin();
  if (ctx instanceof NextResponse) return ctx;

  const { userId, planId } = await req.json().catch(() => ({}));
  if (typeof userId !== 'string' || !isPlanId(planId)) {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
  }
  const { error } = await ctx.admin.rpc('grant_pro', { p_user_id: userId, p_plan: planId });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
