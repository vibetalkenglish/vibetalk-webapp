import React from 'react';
import Link from 'next/link';

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6 text-sm leading-relaxed text-slate-700 [&_h2]:text-lg [&_h2]:font-black [&_h2]:text-slate-900 [&_h2]:pt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-indigo-600 [&_a]:underline">
      <header className="space-y-1 border-b border-slate-100 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{title}</h1>
        <p className="text-xs text-slate-500">Cập nhật lần cuối: {updated}</p>
      </header>
      {children}
      <footer className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex gap-4">
        <Link href="/terms">Điều khoản sử dụng</Link>
        <Link href="/privacy">Chính sách quyền riêng tư</Link>
      </footer>
    </article>
  );
}
