import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase, getSessionInfo } from '@/lib/supabase/server';
import { isPlanId, PLANS } from '@/lib/plans';
import { generateOrderCode } from '@/lib/server/orderCode';

// Creates a Pro order for the signed-in user. The amount comes from the
// server-side price list, never from the client.
export async function POST(req: NextRequest) {
  const session = await getSessionInfo();
  if (!session) {
    return NextResponse.json({ error: 'Vui lòng đăng nhập để mua gói Pro.' }, { status: 401 });
  }
  const admin = createAdminSupabase();
  if (!admin) {
    return NextResponse.json({ error: 'Thanh toán chưa được cấu hình trên máy chủ.' }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  const planId = body?.planId;
  if (!isPlanId(planId)) {
    return NextResponse.json({ error: 'Gói không hợp lệ.' }, { status: 400 });
  }
  const plan = PLANS[planId];

  // Reuse a recent pending order for the same plan instead of piling up new ones.
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { data: existing } = await admin
    .from('orders')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('plan_id', planId)
    .eq('amount', plan.amount)
    .eq('status', 'pending')
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (existing) return NextResponse.json({ order: existing });

  for (let attempt = 0; attempt < 5; attempt++) {
    const { data, error } = await admin
      .from('orders')
      .insert({
        code: generateOrderCode(),
        user_id: session.user.id,
        plan_id: planId,
        plan_name: plan.name,
        amount: plan.amount,
      })
      .select('*')
      .single();
    if (!error) return NextResponse.json({ order: data });
    if (error.code !== '23505') {
      console.error('Create order failed:', error.message);
      return NextResponse.json({ error: 'Không tạo được đơn hàng. Vui lòng thử lại.' }, { status: 500 });
    }
    // 23505 = duplicate code; retry with a new one
  }
  return NextResponse.json({ error: 'Không tạo được đơn hàng. Vui lòng thử lại.' }, { status: 500 });
}
