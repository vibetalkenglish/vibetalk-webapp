'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Award, 
  Flame, 
  Zap, 
  Bookmark, 
  BookOpen, 
  Trophy, 
  CheckCircle2, 
  Sparkles, 
  LogOut, 
  Edit3, 
  ShieldCheck, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { getActiveUser, updateUserProfile, PRESET_AVATARS, getAllAccounts, setActiveAccount } from '@/lib/authStorage';
import { UserAccount } from '@/types';
import AuthModal from '@/components/AuthModal';

export default function ProfilePage() {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('👨‍🎓');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [allAccounts, setAllAccounts] = useState<UserAccount[]>([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    const active = getActiveUser();
    setUser(active);
    setEditName(active.name);
    setEditAvatar(active.avatar);
    setAllAccounts(getAllAccounts());
  };

  const handleSaveProfile = () => {
    if (!editName.trim()) return;
    updateUserProfile({
      name: editName.trim(),
      avatar: editAvatar,
    });
    setIsEditing(false);
    loadUser();
  };

  const handleSwitchAccount = (accountId: string) => {
    setActiveAccount(accountId);
    loadUser();
  };

  if (!user) return null;

  // Achievement Badges
  const badges = [
    {
      id: 'b1',
      title: 'Khởi Đầu Rực Rỡ 🌟',
      desc: 'Tạo tài khoản và bắt đầu hành trình VibeTalk',
      unlocked: true,
      icon: '🚀',
    },
    {
      id: 'b2',
      title: 'Chiến Thần Âm Đuôi 💥',
      desc: 'Hoàn thành Level 0 và trị dứt điểm nuốt âm',
      unlocked: user.completedLessons.some(id => id.startsWith('lv0')),
      icon: '🥉',
    },
    {
      id: 'b3',
      title: 'Chuỗi Lửa Bất Diệt 🔥',
      desc: 'Duy trì học liên tục từ 3 ngày trở lên',
      unlocked: (user.streakDays || 1) >= 3,
      icon: '🔥',
    },
    {
      id: 'b4',
      title: 'Nhà Giao Tiếp Tự Tin ☕',
      desc: 'Hoàn thành Level 1 - Giao tiếp đời thường',
      unlocked: user.completedLessons.some(id => id.startsWith('lv1')),
      icon: '🥈',
    },
    {
      id: 'b5',
      title: 'Chiến Binh Công Sở 💼',
      desc: 'Vượt qua bài test Level 2 phỏng vấn & đi làm',
      unlocked: user.completedLessons.some(id => id.startsWith('lv2')),
      icon: '🥇',
    },
    {
      id: 'b6',
      title: 'Công Dân Toàn Cầu ✈️',
      desc: 'Đạt cấp độ B2 Du lịch thế giới tự túc',
      unlocked: user.completedLessons.some(id => id.startsWith('lv3')),
      icon: '👑',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-4xl sm:text-5xl flex items-center justify-center shadow-lg flex-shrink-0">
              {user.avatar}
            </div>

            {/* Name & Email */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-3xl font-black">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
                  {user.currentLevel.toUpperCase()}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-200">{user.email}</p>
              <p className="text-[11px] text-indigo-300">
                Thành viên từ: {new Date(user.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 backdrop-blur-sm transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? 'Đóng Chỉnh Sửa' : 'Đổi Tên & Avatar'}</span>
            </button>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <User className="w-4 h-4" />
              <span>Chuyển / Đổi Tài Khoản</span>
            </button>
          </div>
        </div>

        {/* Edit Form Dropdown */}
        {isEditing && (
          <div className="mt-6 pt-6 border-t border-white/10 space-y-4 animate-fade-in">
            <div className="max-w-md space-y-3">
              <label className="text-xs font-bold text-indigo-200 block">Tên hiển thị mới:</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-indigo-200 block">Chọn Avatar mới:</label>
              <div className="flex flex-wrap gap-2">
                {PRESET_AVATARS.map((av) => (
                  <button
                    key={av}
                    onClick={() => setEditAvatar(av)}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                      editAvatar === av
                        ? 'bg-amber-400 text-slate-950 scale-110 shadow-md ring-2 ring-white'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-bold text-xs shadow-md transition-all"
            >
              Lưu Thay Đổi 💾
            </button>
          </div>
        )}
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* EXP */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Tổng Kinh Nghiệm</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900">{user.exp || 320} EXP</span>
          </div>
        </div>

        {/* Streak */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
            <Flame className="w-6 h-6 fill-rose-500 text-rose-500" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Chuỗi Học Liên Tục</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900">{user.streakDays || 1} Ngày</span>
          </div>
        </div>

        {/* Completed Lessons */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Bài Học Đã Hoàn Thành</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900">{user.completedLessons.length} / 24 Bài</span>
          </div>
        </div>

        {/* Saved Vocabulary */}
        <Link
          href="/notebook"
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center gap-3 hover:border-indigo-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <Bookmark className="w-6 h-6 fill-emerald-500 text-emerald-500" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Từ Vựng Trong Sổ</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900">{user.savedWords.length} Từ</span>
          </div>
        </Link>
      </div>

      {/* ACHIEVEMENTS / BADGES COLLECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Huy Hiệu & Thành Tích Học Tập</span>
            </h3>
            <p className="text-xs text-slate-500">Mở khóa các cột mốc để ghi danh trên Bảng Xếp Hạng</p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            {badges.filter(b => b.unlocked).length}/{badges.length} Đã Đạt
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-all ${
                b.unlocked
                  ? 'bg-gradient-to-br from-amber-50/50 to-indigo-50/40 border-amber-200 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
                b.unlocked ? 'bg-white shadow-sm ring-2 ring-amber-300' : 'bg-slate-200'
              }`}>
                {b.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  {b.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-snug">{b.desc}</p>
                <span className={`text-[10px] font-bold inline-block pt-1 ${
                  b.unlocked ? 'text-emerald-600' : 'text-slate-400'
                }`}>
                  {b.unlocked ? '✅ Đã Mở Khóa' : '🔒 Chưa Đạt'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => loadUser()}
      />
    </div>
  );
}
