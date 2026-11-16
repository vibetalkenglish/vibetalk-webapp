import { NextRequest, NextResponse } from 'next/server';
import { getSessionInfo } from '@/lib/supabase/server';

// Status of one of the signed-in user's orders (RLS limits it to their own).
export async function GET(_req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const session = await getSessionInfo();
  if (!session) return NextResponse.json({ error: 'Chưa đăng nhập.' }, { status: 401 });

  const { data } = await session.supabase
    .from('orders')
    .select('code, status, paid_at')
    .eq('code', code)
    .maybeSingle();
  if (!data) return NextResponse.json({ error: 'Không tìm thấy đơn hàng.' }, { status: 404 });
  return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } });
}
