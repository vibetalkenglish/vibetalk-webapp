import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';

// Update the bank account shown on the VietQR payment screen.
export async function PUT(req: NextRequest) {
  const ctx = await requireAdmin();
  if (ctx instanceof NextResponse) return ctx;

  const body = await req.json().catch(() => ({}));
  const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
  const value = {
    bankId: clean(body.bankId, 40),
    bankName: clean(body.bankName, 120),
    accountNumber: clean(body.accountNumber, 30).replace(/\s+/g, ''),
    accountName: clean(body.accountName, 80).toUpperCase(),
    qrTemplate: 'compact2',
  };
  if (!value.bankId || !/^\d{4,30}$/.test(value.accountNumber) || !value.accountName) {
    return NextResponse.json({ error: 'Thông tin ngân hàng chưa hợp lệ.' }, { status: 400 });
  }
  const { error } = await ctx.admin.from('app_config').upsert({ key: 'bank', value });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, bank: value });
}
