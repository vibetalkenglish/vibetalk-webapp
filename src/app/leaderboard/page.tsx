'use client';

import React, { useEffect, useState } from 'react';
import { 
  Trophy, 
  Crown, 
  Flame, 
  Award, 
  Sparkles, 
  BookOpen, 
  Zap, 
  TrendingUp, 
  Star,
  CheckCircle2
} from 'lucide-react';
import { getFullLeaderboard, getActiveUser, awardExp } from '@/lib/authStorage';
import { LeaderboardUser, UserAccount } from '@/types';
import confetti from 'canvas-confetti';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [activeUser, setActiveUser] = useState<UserAccount | null>(null);
  const [hasClaimedDaily, setHasClaimedDaily] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'weekly'>('all');

  useEffect(() => {
    setActiveUser(getActiveUser());
    setLeaderboard(getFullLeaderboard());
  }, []);

  const handleClaimDailyExp = () => {
    if (hasClaimedDaily) return;
    awardExp(30, 'Điểm danh hàng ngày');
    setHasClaimedDaily(true);
    setActiveUser(getActiveUser());
    setLeaderboard(getFullLeaderboard());

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];
  const remaining = leaderboard.slice(3);

  const currentUserRank = leaderboard.find(u => u.isCurrentUser)?.rank || '-';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10">
              <Trophy className="w-3.5 h-3.5 fill-amber-300" />
              <span>Bảng Vinh Danh Học Viên VibeTalk Xuất Sắc</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Bảng Xếp Hạng & Điểm Kinh Nghiệm (EXP)
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Tích lũy điểm EXP qua mỗi bài học hoàn thành, luyện nói đạt điểm cao với AI và duy trì chuỗi Streak học liên tục để thăng hạng!
            </p>
          </div>

          {/* Daily EXP Check-in Card */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center flex-shrink-0 space-y-2">
            <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Quà Tặng Hàng Ngày</span>
            </div>
            <p className="text-[11px] text-indigo-200">Điểm danh nhận ngay +30 EXP</p>
            <button
              onClick={handleClaimDailyExp}
              disabled={hasClaimedDaily}
              className={`w-full py-2 px-4 rounded-xl text-xs font-bold transition-all shadow-md ${
                hasClaimedDaily
                  ? 'bg-emerald-500 text-white cursor-default'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 active:scale-95'
              }`}
            >
              {hasClaimedDaily ? '✅ Đã Nhận Hôm Nay' : 'Nhận +30 EXP Ngay 🎁'}
            </button>
          </div>
        </div>
      </div>

      {/* User Status Bar */}
      {activeUser && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-2xl flex items-center justify-center">
              {activeUser.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{activeUser.name}</span>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
                  Hạng #{currentUserRank}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {activeUser.email} • {activeUser.completedLessons.length} bài đã học
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{activeUser.exp || 320} EXP</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl">
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>{activeUser.streakDays} Ngày Streak</span>
            </div>
          </div>
        </div>
      )}

      {/* TOP 3 PODIUM */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        {/* TOP 2 (Silver) */}
        {top2 && (
          <div className="order-2 sm:order-1 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center flex flex-col items-center justify-between relative hover:shadow-md transition-all sm:translate-y-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-700 text-xs font-black px-3 py-0.5 rounded-full border border-slate-300 shadow-xs">
              🥈 Hạng 2
            </div>
            <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-300 text-3xl flex items-center justify-center my-3 shadow-inner">
              {top2.avatar}
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">{top2.name}</h3>
            <span className="text-[11px] text-slate-500 mb-3">{top2.levelBadge}</span>
            <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-around text-xs font-bold text-slate-700">
              <span>⚡ {top2.exp} EXP</span>
              <span>🔥 {top2.streakDays}d</span>
            </div>
          </div>
        )}

        {/* TOP 1 (Gold - King) */}
        {top1 && (
          <div className="order-1 sm:order-2 bg-gradient-to-b from-amber-50 via-white to-white rounded-3xl p-6 border-2 border-amber-400 shadow-lg text-center flex flex-col items-center justify-between relative hover:shadow-xl transition-all sm:-translate-y-2">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-xs font-black px-4 py-1 rounded-full shadow-md flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 fill-slate-950" />
              <span>QUÁN QUÂN 🥇</span>
            </div>
            <div className="w-20 h-20 rounded-full bg-amber-100 border-3 border-amber-400 text-4xl flex items-center justify-center my-3 shadow-md">
              {top1.avatar}
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">{top1.name}</h3>
            <span className="text-xs font-bold text-indigo-600 mb-3">{top1.levelBadge}</span>
            <div className="w-full pt-3 border-t border-amber-100 flex items-center justify-around text-xs font-bold text-amber-900 bg-amber-50/80 py-2 rounded-2xl">
              <span>⚡ {top1.exp} EXP</span>
              <span>🔥 {top1.streakDays} Ngày Streak</span>
            </div>
          </div>
        )}

        {/* TOP 3 (Bronze) */}
        {top3 && (
          <div className="order-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center flex flex-col items-center justify-between relative hover:shadow-md transition-all sm:translate-y-6">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-100 text-orange-800 text-xs font-black px-3 py-0.5 rounded-full border border-orange-300 shadow-xs">
              🥉 Hạng 3
            </div>
            <div className="w-16 h-16 rounded-full bg-orange-50 border-2 border-orange-200 text-3xl flex items-center justify-center my-3 shadow-inner">
              {top3.avatar}
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">{top3.name}</h3>
            <span className="text-[11px] text-slate-500 mb-3">{top3.levelBadge}</span>
            <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-around text-xs font-bold text-slate-700">
              <span>⚡ {top3.exp} EXP</span>
              <span>🔥 {top3.streakDays}d</span>
            </div>
          </div>
        )}
      </div>

      {/* FULL RANKING TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mt-8">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <span>Danh Sách Xếp Hạng Đầy Đủ</span>
          </h3>
          <span className="text-xs text-slate-400">Cập nhật thời gian thực</span>
        </div>

        <div className="divide-y divide-slate-100">
          {leaderboard.map((user) => (
            <div
              key={user.id}
              className={`p-4 sm:p-5 flex items-center justify-between gap-3 transition-colors ${
                user.isCurrentUser
                  ? 'bg-indigo-50/70 font-semibold'
                  : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Rank Badge */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                  user.rank === 1
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : user.rank === 2
                    ? 'bg-slate-200 text-slate-800'
                    : user.rank === 3
                    ? 'bg-orange-200 text-orange-900'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  #{user.rank}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 text-xl flex items-center justify-center shadow-xs">
                  {user.avatar}
                </div>

                {/* User Info */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {user.name}
                    </span>
                    {user.isCurrentUser && (
                      <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.2 rounded-full font-bold">
                        Bạn
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 block">{user.levelBadge}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 sm:gap-6 text-xs font-bold text-slate-700">
                <div className="hidden sm:flex items-center gap-1 text-slate-500">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{user.completedLessonsCount} bài</span>
                </div>
                <div className="flex items-center gap-1 text-amber-600">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{user.streakDays}d</span>
                </div>
                <div className="text-indigo-600 font-extrabold text-sm min-w-[70px] text-right">
                  {user.exp} EXP
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
