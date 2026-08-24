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
  Award
} from 'lucide-react';
import { registerAccount, loginAccount, PRESET_AVATARS, getActiveUser } from '@/lib/authStorage';
import { UserAccount } from '@/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: UserAccount) => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'login',
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email || !email.includes('@')) {
      setError('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }

    try {
      if (mode === 'register') {
        if (!name.trim()) {
          setError('Vui lòng nhập tên hiển thị của bạn.');
          return;
        }
        const user = registerAccount(name, email, selectedAvatar);
        setSuccessMsg(`🎉 Chào mừng ${user.name}! Bạn nhận được +100 EXP khởi đầu.`);
        setTimeout(() => {
          if (onSuccess) onSuccess(user);
          onClose();
        }, 1200);
      } else {
        const user = loginAccount(email);
        setSuccessMsg(`👋 Chào mừng ${user.name} đã quay trở lại!`);
        setTimeout(() => {
          if (onSuccess) onSuccess(user);
          onClose();
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
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
            {mode === 'login' ? 'Đăng Nhập VibeTalk' : 'Đăng Ký Tài Khoản Mới'}
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {mode === 'login'
              ? 'Đăng nhập để đồng bộ tiến độ học, từ vựng đã lưu và xếp hạng thành viên.'
              : 'Tạo tài khoản miễn phí để lưu lịch sử học tập và nhận ngay +100 EXP thưởng!'}
          </p>
        </div>

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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-transform active:scale-98 cursor-pointer mt-2"
          >
            {mode === 'login' ? 'Đăng Nhập Ngay 🚀' : 'Đăng Ký & Nhận +100 EXP 🎁'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          {mode === 'login' ? (
            <span>
              Chưa có tài khoản?{' '}
              <button
                onClick={() => { setMode('register'); setError(null); }}
                className="font-bold text-indigo-600 hover:underline"
              >
                Đăng ký miễn phí
              </button>
            </span>
          ) : (
            <span>
              Đã có tài khoản?{' '}
              <button
                onClick={() => { setMode('login'); setError(null); }}
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
