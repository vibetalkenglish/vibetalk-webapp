'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/AuthModal';
import { signOut } from '@/lib/cloudSync';

export default function AdminLoginPrompt({ signedInAs }: { signedInAs?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl mx-auto">🛡️</div>
        <h2 className="text-2xl font-black text-slate-900">VibeTalk Admin Portal</h2>
        {signedInAs ? (
          <>
            <p className="text-xs text-slate-500">
              Tài khoản <strong>{signedInAs}</strong> không có quyền quản trị.
            </p>
            <button
              onClick={async () => { await signOut(); router.refresh(); }}
              className="w-full py-3 bg-slate-900 text-white font-bold text-sm rounded-2xl"
            >
              Đăng xuất để đổi tài khoản
            </button>
          </>
        ) : (
          <>
            <p className="text-xs text-slate-500">Đăng nhập bằng tài khoản quản trị để tiếp tục.</p>
            <button
              onClick={() => setOpen(true)}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl"
            >
              Đăng Nhập Quản Trị
            </button>
          </>
        )}
      </div>
      <AuthModal isOpen={open} onClose={() => setOpen(false)} onSuccess={() => router.refresh()} />
    </div>
  );
}
