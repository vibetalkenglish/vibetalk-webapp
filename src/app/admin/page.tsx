import type { Metadata } from 'next';
import { getSessionInfo } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminLoginPrompt from '@/components/admin/AdminLoginPrompt';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Quản trị | VibeTalk', robots: { index: false, follow: false } };

// The role check happens here, on the server: non-admins never receive the dashboard.
export default async function AdminPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="max-w-md mx-auto py-16 text-center text-sm text-slate-600">
        Trang quản trị cần Supabase. Hãy đặt NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY và SUPABASE_SERVICE_ROLE_KEY.
      </div>
    );
  }

  const session = await getSessionInfo();
  if (!session) return <AdminLoginPrompt />;
  if (session.role !== 'admin') return <AdminLoginPrompt signedInAs={session.user.email || 'này'} />;
  return <AdminDashboard />;
}
