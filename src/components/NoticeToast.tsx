'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { NOTICE_EVENT } from '@/lib/notice';

export default function NoticeToast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onNotice = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 9000);
    };
    window.addEventListener(NOTICE_EVENT, onNotice);
    return () => {
      window.removeEventListener(NOTICE_EVENT, onNotice);
      clearTimeout(timer);
    };
  }, []);

  if (!message) return null;
  return (
    <div role="status" className="fixed left-1/2 -translate-x-1/2 bottom-20 sm:bottom-6 z-[60] w-[calc(100%-32px)] max-w-md">
      <div className="bg-slate-900 text-white text-xs rounded-2xl shadow-2xl p-4 flex items-start gap-3">
        <span className="text-base leading-none">💡</span>
        <div className="flex-1 space-y-2">
          <p className="leading-relaxed">{message}</p>
          <Link href="/pricing" onClick={() => setMessage(null)} className="inline-block font-bold text-amber-300 hover:underline">
            Xem gói Pro →
          </Link>
        </div>
        <button onClick={() => setMessage(null)} aria-label="Đóng" className="text-slate-400 hover:text-white text-base leading-none">×</button>
      </div>
    </div>
  );
}
