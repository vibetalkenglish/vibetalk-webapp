import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#4f46e5',
};

export const metadata: Metadata = {
  title: 'VibeTalk - Luyện Nói Tiếng Anh Giọng Anh - Mỹ Cho Người Việt',
  description: 'Nền tảng luyện nói tiếng Anh giọng Anh - Mỹ, làm chủ 44 âm IPA, triệt tiêu lỗi nuốt âm đuôi, luyện hội thoại thực tế và thăng hạng cấp độ cùng AI chấm điểm thời gian thực.',
  keywords: ['học tiếng anh', 'tiếng anh giọng anh mỹ', 'IPA giọng mỹ', 'chấm điểm phát âm AI', 'luyện nói tiếng anh', 'VibeTalk'],
  authors: [{ name: 'VibeTalk Team' }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/apple-touch-icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 pb-16 sm:pb-12">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 pb-safe">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">VibeTalk</span>
              <span>© 2026 - Nền Tảng Học Tiếng Anh Chuẩn Giọng Mỹ Dành Cho Người Việt.</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              <span>Phát âm chuẩn IPA</span>
              <span>•</span>
              <span>AI Chấm điểm 100% Miễn phí</span>
              <span>•</span>
              <span>Học theo Level</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
