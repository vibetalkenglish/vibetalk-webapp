'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Lock, 
  Unlock,
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Award, 
  Zap, 
  BookOpen,
  Volume2,
  ShieldCheck,
  Eye,
  RotateCcw
} from 'lucide-react';
import { LEVELS_CONFIG, LESSONS } from '@/data/lessonsData';
import { 
  getUserProgress, 
  subscribeToProgress, 
  toggleAdminMode, 
  unlockAllLessonsAndLevels, 
  resetToStudentProgress 
} from '@/lib/storage';
import { UserProgress } from '@/types';

export default function LessonsPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getUserProgress());
    const unsubscribe = subscribeToProgress((updated) => {
      setProgress(updated);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = Boolean(progress?.isAdminMode);

  const handleToggleAdmin = () => {
    toggleAdminMode();
  };

  const handleUnlockAll = () => {
    unlockAllLessonsAndLevels();
  };

  const handleResetProgress = () => {
    if (confirm('Bạn có chắc chắn muốn đặt lại lộ trình về Chế độ Học viên ban đầu?')) {
      resetToStudentProgress();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10">
              <Award className="w-3.5 h-3.5" />
              <span>Lộ Trình Từng Bước Từ Mất Gốc Đến Giao Tiếp Mỹ</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Chương Trình Học Theo Level Chuẩn Hóa
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              Học tuần tự theo từng Level, thực hành từ vựng phiên âm chi tiết, luyện đoạn hội thoại ngữ cảnh và vượt qua bài test thăng cấp khi đạt từ 80% điểm.
            </p>
          </div>

          {/* Admin Fast Toggle Button */}
          <div className="flex-shrink-0">
            <button
              onClick={handleToggleAdmin}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md ${
                isAdmin
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/30 ring-2 ring-emerald-300'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${isAdmin ? 'text-white' : 'text-amber-400'}`} />
              <span>{isAdmin ? '👑 Quyền Admin: Mở Tất Cả Bài' : 'Mở Khóa Quyền Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Mode Status Banner */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-emerald-900/90 via-teal-900/90 to-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-emerald-500/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-emerald-200">Đang bật Chế độ Admin (Xem tất cả bài học)</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/30 text-emerald-200 uppercase tracking-wider">
                  Full Access
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Toàn bộ các cấp độ (Level 0, 1, 2) và bài học đã được mở khóa tự do để kiểm tra và xem nội dung.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={handleResetProgress}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Về Chế độ Học viên</span>
            </button>
          </div>
        </div>
      )}

      {/* Levels List */}
      <div className="space-y-8">
        {LEVELS_CONFIG.map((level, levelIdx) => {
          const isUnlocked = isAdmin || progress?.unlockedLevels.includes(level.id);
          const isCurrent = progress?.currentLevel === level.id;
          const levelLessons = LESSONS.filter(l => l.levelId === level.id);
          const completedLessons = levelLessons.filter(l => progress?.completedLessons.includes(l.id));
          const progressPercent = Math.round((completedLessons.length / levelLessons.length) * 100);

          return (
            <div
              key={level.id}
              className={`rounded-3xl border transition-all overflow-hidden ${
                isCurrent
                  ? 'border-indigo-400 bg-white shadow-md ring-2 ring-indigo-500/20'
                  : isUnlocked
                  ? 'border-slate-200 bg-white shadow-sm'
                  : 'border-slate-200 bg-slate-50/70 opacity-80'
              }`}
            >
              {/* Level Header Banner */}
              <div className={`p-6 bg-gradient-to-r ${level.color} text-white flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider">
                      {level.title.split(':')[0]}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400/90 text-slate-950 text-xs font-black shadow-xs">
                      {level.cefrLevel}
                    </span>
                    <span className="text-sm font-bold text-amber-200">
                      {level.badge}
                    </span>
                    {isAdmin && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-100 text-[11px] font-bold border border-emerald-400/40">
                        <ShieldCheck className="w-3 h-3" /> Admin Unlocked
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black">{level.title.split(':')[1] || level.title}</h2>
                  <p className="text-xs text-white/90">{level.subTitle}</p>
                </div>

                {/* Level Action: Test or Status */}
                <div className="flex items-center gap-3">
                  {isUnlocked ? (
                    <Link
                      href={`/test/${level.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md hover:bg-slate-100 transition-colors"
                    >
                      <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>Làm Bài Test Thăng Cấp</span>
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/30 backdrop-blur-sm text-white text-xs font-semibold">
                      <Lock className="w-4 h-4" />
                      <span>Cần vượt qua Level trước</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar & Details */}
              <div className="p-6 space-y-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <strong className="text-slate-900 block font-bold mb-0.5">Mục tiêu cấp độ:</strong>
                    <span className="text-slate-600">{level.targetVi}</span>
                  </div>
                  <div className="sm:text-right flex-shrink-0">
                    <span className="font-bold text-indigo-600">{completedLessons.length}/{levelLessons.length} bài hoàn thành</span>
                    <div className="w-36 h-2 bg-slate-200 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Lessons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {levelLessons.map((lesson, idx) => {
                    const isCompleted = progress?.completedLessons.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                          isCompleted
                            ? 'bg-emerald-50/40 border-emerald-200'
                            : isUnlocked
                            ? 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                            : 'bg-slate-100/60 border-slate-200'
                        }`}
                      >
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-400">
                              Bài {idx + 1} • {lesson.durationMinutes} phút
                            </span>
                            {isCompleted ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3" /> Đã xong
                              </span>
                            ) : isAdmin ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                                <Unlock className="w-2.5 h-2.5" /> Admin
                              </span>
                            ) : null}
                          </div>

                          <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                            {lesson.titleVi}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2">
                            {lesson.descriptionVi}
                          </p>

                          <div className="flex flex-wrap gap-1 pt-1">
                            {lesson.tags.map((tag) => (
                              <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Button Action */}
                        <div className="pt-2 border-t border-slate-100">
                          {isUnlocked ? (
                            <Link
                              href={`/lessons/${lesson.id}`}
                              className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 transition-colors"
                            >
                              <span>{isCompleted ? 'Ôn tập lại' : 'Bắt đầu học'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          ) : (
                            <button
                              disabled
                              className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-400 cursor-not-allowed"
                            >
                              <Lock className="w-3 h-3" />
                              <span>Chưa mở khóa</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

