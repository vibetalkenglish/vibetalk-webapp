'use client';

import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  LogIn, 
  UserPlus,
  Flame,
  Award,
  Lock
} from 'lucide-react';
import { PRESET_AVATARS, getActiveUser } from '@/lib/authStorage';
import { signInWithPassword, signUpWithPassword, sendPasswordReset } from '@/lib/cloudSync';
import { getCloudUser, subscribeToCloudUser } from '@/lib/cloudUser';
import { isSupabaseConfigured, SUPABASE_NOT_CONFIGURED_MESSAGE } from '@/lib/supabase/config';
import { UserAccount } from '@/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: UserAccount) => void;
  initialMode?: 'login' | 'register';
}

/** Resolves once the signed-in profile has been loaded from Supabase (or after a timeout). */
function waitForCloudUser(timeoutMs = 6000): Promise<void> {
  return new Promise((resolve) => {
    if (getCloudUser()) return resolve();
    const timer = setTimeout(() => { unsub(); resolve(); }, timeoutMs);
    const unsub = subscribeToCloudUser((u) => {
      if (u) { clearTimeout(timer); unsub(); resolve(); }
    });
  });
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'login',
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const switchMode = (next: 'login' | 'register' | 'forgot') => {
    setMode(next);
    setError(null);
    setSuccessMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!isSupabaseConfigured) {
      setError(SUPABASE_NOT_CONFIGURED_MESSAGE);
      return;
    }
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }
    if (mode !== 'forgot' && password.length < 6) {
      setError('Mật khẩu cần ít nhất 6 ký tự.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'forgot') {
        await sendPasswordReset(cleanEmail);
        setSuccessMsg('📧 Đã gửi link đặt lại mật khẩu. Vui lòng kiểm tra hộp thư (cả mục Spam).');
      } else if (mode === 'register') {
        if (!name.trim()) {
          setError('Vui lòng nhập tên hiển thị của bạn.');
          return;
        }
        const { needsConfirmation } = await signUpWithPassword(cleanEmail, password, name.trim(), selectedAvatar);
        if (needsConfirmation) {
          setSuccessMsg('📧 Gần xong! Mở email vừa gửi và bấm link xác nhận, sau đó đăng nhập. Tiến độ học hiện tại sẽ được chép vào tài khoản.');
          return;
        }
        await waitForCloudUser();
        const user = getActiveUser();
        setSuccessMsg(`🎉 Chào mừng ${user.name}! Tiến độ học của bạn đã được lưu vào tài khoản.`);
        setTimeout(() => { onSuccess?.(user); onClose(); }, 1200);
      } else {
        await signInWithPassword(cleanEmail, password);
        await waitForCloudUser();
        const user = getActiveUser();
        setSuccessMsg(`👋 Chào mừng ${user.name} đã quay trở lại!`);
        setTimeout(() => { onSuccess?.(user); onClose(); }, 1000);
      }
    } catch (err: any) {
      setError(err?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in" 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-slate-100 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-500/25">
            {mode === 'login' ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {mode === 'login' ? 'Đăng Nhập VibeTalk' : mode === 'register' ? 'Đăng Ký Tài Khoản Mới' : 'Quên Mật Khẩu'}
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {mode === 'login'
              ? 'Đăng nhập để đồng bộ tiến độ học, từ vựng đã lưu và xếp hạng thành viên.'
              : mode === 'register'
                ? 'Tạo tài khoản miễn phí để lưu lịch sử học tập trên mọi thiết bị và nhận +100 EXP thưởng!'
                : 'Nhập email đã đăng ký, chúng tôi sẽ gửi link để đặt mật khẩu mới.'}
          </p>
        </div>

        {!isSupabaseConfigured && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
            {SUPABASE_NOT_CONFIGURED_MESSAGE}
          </div>
        )}

        {/* Feedback Alerts */}
        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Họ và Tên / Biệt Danh</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ví dụ: Minh Anh, Tuấn Hùng..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Avatar Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Chọn Avatar Của Bạn</label>
                <div className="grid grid-cols-6 gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-200">
                  {PRESET_AVATARS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setSelectedAvatar(av)}
                      className={`h-10 text-xl flex items-center justify-center rounded-xl transition-all ${
                        selectedAvatar === av
                          ? 'bg-white shadow-md ring-2 ring-indigo-500 scale-110'
                          : 'hover:bg-slate-200/60'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Địa Chỉ Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tenban@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          {mode !== 'forgot' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Mật Khẩu</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-[11px] font-bold text-indigo-600 hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'register' ? 'Ít nhất 6 ký tự' : 'Mật khẩu của bạn'}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-2xl disabled:opacity-60 disabled:cursor-wait bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-transform active:scale-98 cursor-pointer mt-2"
          >
            {isSubmitting
              ? 'Đang xử lý...'
              : mode === 'login' ? 'Đăng Nhập Ngay 🚀' : mode === 'register' ? 'Đăng Ký & Nhận +100 EXP 🎁' : 'Gửi Link Đặt Lại Mật Khẩu'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          {mode !== 'register' ? (
            <span>
              Chưa có tài khoản?{' '}
              <button
                onClick={() => switchMode('register')}
                className="font-bold text-indigo-600 hover:underline"
              >
                Đăng ký miễn phí
              </button>
            </span>
          ) : (
            <span>
              Đã có tài khoản?{' '}
              <button
                onClick={() => switchMode('login')}
                className="font-bold text-indigo-600 hover:underline"
              >
                Đăng nhập tại đây
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
