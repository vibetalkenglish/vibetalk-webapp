import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';

// Manually mark a pending order as paid (e.g. customer typed the wrong transfer content).
export async function POST(req: NextRequest) {
  const ctx = await requireAdmin();
  if (ctx instanceof NextResponse) return ctx;

  const { code } = await req.json().catch(() => ({}));
  if (typeof code !== 'string' || !code) {
    return NextResponse.json({ error: 'Thiếu mã đơn.' }, { status: 400 });
  }
  const { data, error } = await ctx.admin.rpc('mark_order_paid', {
    p_code: code,
    p_via: 'admin',
    p_ref: `admin:${ctx.user.email || ctx.user.id}`,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return NextResponse.json({ error: 'Đơn không tồn tại hoặc đã được xử lý.' }, { status: 409 });
  }
  return NextResponse.json({ ok: true });
}
