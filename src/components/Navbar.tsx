'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Flame, 
  Bookmark, 
  Volume2, 
  BookOpen, 
  Sparkles, 
  Award, 
  Menu, 
  X,
  Mic,
  ChevronRight,
  Trophy,
  User,
  Zap,
  LogIn,
  Crown
} from 'lucide-react';
import { getUserProgress, subscribeToProgress } from '@/lib/storage';
import { getActiveUser } from '@/lib/authStorage';
import { UserProgress, UserAccount } from '@/types';
import AuthModal from './AuthModal';
import VoiceSettingsModal from './VoiceSettingsModal';

export default function Navbar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [activeUser, setActiveUser] = useState<UserAccount | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const refreshData = () => {
    setProgress(getUserProgress());
    setActiveUser(getActiveUser());
  };

  useEffect(() => {
    refreshData();
    const unsubscribe = subscribeToProgress(() => {
      refreshData();
    });
    return () => unsubscribe();
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { href: '/', label: 'Tổng Quan', icon: Sparkles },
    { href: '/ipa', label: 'Bảng 44 Âm Mỹ', icon: Volume2 },
    { href: '/lessons', label: 'Lộ Trình Cấp Độ', icon: BookOpen },
    { href: '/practice', label: 'Phòng Luyện AI', icon: Mic, highlight: true },
    { href: '/leaderboard', label: 'Bảng Xếp Hạng', icon: Trophy },
    { href: '/pricing', label: 'Nâng Cấp Pro 👑', icon: Crown, pro: true },
    { href: '/notebook', label: 'Sổ Tay', icon: Bookmark },
  ];

  const levelBadgeMap: Record<string, { label: string; short: string; color: string }> = {
    lv0: { label: 'Level 0: Phát Âm (A1)', short: 'LV 0', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    lv1: { label: 'Level 1: Đời Thường (A2)', short: 'LV 1', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    lv2: { label: 'Level 2: Đi Làm (B1)', short: 'LV 2', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    lv3: { label: 'Level 3: Du Lịch (B2)', short: 'LV 3', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  };

  const currentLevelBadge = progress ? levelBadgeMap[progress.currentLevel] || levelBadgeMap.lv0 : levelBadgeMap.lv0;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <div className="flex items-center gap-0.5">
                  <span className="w-1 h-3.5 bg-white rounded-full animate-pulse" />
                  <span className="w-1 h-5 bg-white rounded-full" />
                  <span className="w-1 h-2.5 bg-white rounded-full animate-pulse delay-100" />
                  <span className="w-1 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div>
                <span className="text-xl font-black bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent tracking-tight block">
                  VibeTalk
                </span>
                <span className="block text-[9.5px] font-bold text-slate-400 -mt-1 tracking-wider uppercase">
                  Giọng Anh - Mỹ
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold'
                        : link.highlight
                        ? 'text-indigo-600 hover:bg-indigo-50/70'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : link.highlight ? 'text-indigo-500' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                    {link.highlight && !isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* User Stats & Profile Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Level Badge */}
              <div className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${currentLevelBadge.color}`}>
                <Award className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{currentLevelBadge.label}</span>
              </div>

              {/* Streak Counter */}
              <div 
                title="Chuỗi ngày học liên tục"
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-200"
              >
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse flex-shrink-0" />
                <span>{progress?.streakDays || 1}d</span>
              </div>

              {/* Voice Settings Button */}
              <button
                onClick={() => setIsVoiceModalOpen(true)}
                title="Cài đặt giọng đọc AI (Giọng Nữ / Giọng Nam)"
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-full text-xs font-bold border border-slate-200 hover:border-indigo-200 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Giọng Mỹ</span>
              </button>

              {/* User EXP Badge & Profile Link */}
              <Link
                href="/profile"
                title="Xem trang cá nhân & điểm EXP"
                className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold border border-indigo-200 transition-colors"
              >
                <span className="text-sm leading-none">{activeUser?.avatar || '👨‍🎓'}</span>
                <span className="hidden md:inline">{activeUser?.exp || 320} EXP</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 active:scale-95 transition-transform"
                aria-label="Menu điều hướng"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop & Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl p-5 flex flex-col justify-between overflow-y-auto animate-fade-in">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                    VT
                  </div>
                  <span className="font-bold text-slate-900">VibeTalk Navigation</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Quick Info */}
              <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeUser?.avatar || '👨‍🎓'}</span>
                  <div>
                    <strong className="text-xs font-bold text-slate-900 block">{activeUser?.name || 'Học viên'}</strong>
                    <span className="text-[11px] text-indigo-600 font-bold">{activeUser?.exp || 320} EXP</span>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="px-3 py-1 bg-white text-indigo-700 rounded-lg text-xs font-bold border border-indigo-200"
                >
                  Hồ sơ
                </Link>
              </div>

              {/* Nav Links */}
              <div className="space-y-1.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <span>🛡️ Cổng Quản Trị Admin</span>
              </Link>

              <button
                onClick={() => { setIsMobileMenuOpen(false); setIsAuthModalOpen(true); }}
                className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Đăng Nhập / Đổi Tài Khoản</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => refreshData()}
      />

      {/* Voice Settings Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </>
  );
}
