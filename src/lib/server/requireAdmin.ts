import { NextResponse } from 'next/server';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import { createAdminSupabase, getSessionInfo } from '@/lib/supabase/server';

type AdminContext = { admin: SupabaseClient; user: User };

/** Re-checks on every request that the caller is a signed-in admin. */
export async function requireAdmin(): Promise<AdminContext | NextResponse> {
  const session = await getSessionInfo();
  if (!session) return NextResponse.json({ error: 'Chưa đăng nhập.' }, { status: 401 });
  if (session.role !== 'admin') return NextResponse.json({ error: 'Không có quyền quản trị.' }, { status: 403 });
  const admin = createAdminSupabase();
  if (!admin) {
    return NextResponse.json({ error: 'Thiếu SUPABASE_SERVICE_ROLE_KEY trên máy chủ.' }, { status: 503 });
  }
  return { admin, user: session.user };
}
