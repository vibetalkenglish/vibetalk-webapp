'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase/client';
import { updatePassword } from '@/lib/cloudSync';

// Landing page for the "reset password" email link. supabase-js exchanges the
// code in the URL for a session automatically; then the user sets a new password.
export default function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        setReady(true);
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) return setError('Mật khẩu cần ít nhất 6 ký tự.');
    if (password !== confirm) return setError('Hai mật khẩu không khớp.');
    setBusy(true);
    try {
      await updatePassword(password);
      setDone(true);
    } catch (err: any) {
      setError(err?.message || 'Không đặt lại được mật khẩu. Vui lòng thử lại.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-5">
        <h1 className="text-2xl font-black text-slate-900 text-center">Đặt Lại Mật Khẩu</h1>
        {done ? (
          <div className="space-y-4 text-center">
            <p className="text-sm text-emerald-700 font-bold">✅ Đã đổi mật khẩu thành công.</p>
            <Link href="/profile" className="inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold">
              Về trang cá nhân
            </Link>
          </div>
        ) : !ready ? (
          <p className="text-xs text-slate-500 text-center">
            Đang xác thực link... Nếu trang không tiếp tục, link có thể đã hết hạn — hãy yêu cầu gửi lại trong mục Đăng nhập → Quên mật khẩu.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">{error}</p>}
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu mới (ít nhất 6 ký tự)"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <input
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Nhập lại mật khẩu mới"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="submit"
              disabled={busy}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs disabled:opacity-60"
            >
              {busy ? 'Đang lưu...' : 'Lưu Mật Khẩu Mới'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
