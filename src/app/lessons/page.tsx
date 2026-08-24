'use client';

import React, { useEffect, useState, useMemo } from 'react';
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
  Search,
  RotateCcw,
  PlayCircle,
  Filter,
  Check
} from 'lucide-react';
import { LEVELS_CONFIG, LESSONS } from '@/data/lessonsData';
import { 
  getUserProgress, 
  subscribeToProgress, 
  toggleAdminMode, 
  unlockAllLessonsAndLevels, 
  resetToStudentProgress 
} from '@/lib/storage';
import { UserProgress, LevelId } from '@/types';

export default function LessonsPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [selectedLevelTab, setSelectedLevelTab] = useState<'all' | LevelId>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleResetProgress = () => {
    if (confirm('Bạn có chắc chắn muốn đặt lại lộ trình về Chế độ Học viên ban đầu?')) {
      resetToStudentProgress();
    }
  };

  // Find the smart "Next Up" lesson for the student
  const nextUpLesson = useMemo(() => {
    if (!progress) return LESSONS[0];
    const uncompleted = LESSONS.find(l => {
      const isLevelUnlocked = isAdmin || progress.unlockedLevels.includes(l.levelId);
      const isDone = progress.completedLessons.includes(l.id);
      return isLevelUnlocked && !isDone;
    });
    return uncompleted || LESSONS[0];
  }, [progress, isAdmin]);

  // Filter lessons based on selected level tab & search query
  const filteredLevels = useMemo(() => {
    let levels = LEVELS_CONFIG;
    if (selectedLevelTab !== 'all') {
      levels = levels.filter(l => l.id === selectedLevelTab);
    }

    return levels.map(lvl => {
      let lvlLessons = LESSONS.filter(l => l.levelId === lvl.id);
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        lvlLessons = lvlLessons.filter(l => 
          l.titleVi.toLowerCase().includes(q) ||
          l.titleEn.toLowerCase().includes(q) ||
          l.descriptionVi.toLowerCase().includes(q) ||
          l.tags.some(t => t.toLowerCase().includes(q))
        );
      }
      return {
        ...lvl,
        filteredLessons: lvlLessons,
      };
    }).filter(lvl => lvl.filteredLessons.length > 0 || !searchQuery.trim());
  }, [selectedLevelTab, searchQuery]);

  const totalLessonsCount = LESSONS.length;
  const totalCompletedCount = progress?.completedLessons.length || 0;
  const overallPercent = Math.round((totalCompletedCount / totalLessonsCount) * 100);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. HERO HEADER BANNER */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10 shadow-xs">
              <Award className="w-3.5 h-3.5" />
              <span>Lộ Trình Master Curriculum 72 Bài Học Thực Chiến</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Chương Trình Học Tiếng Anh <br />
              <span className="bg-gradient-to-r from-amber-300 via-indigo-200 to-emerald-300 bg-clip-text text-transparent">
                Chuẩn Hóa 4 Cấp Độ Giọng Mỹ
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              Đi từng bước từ Xóa mù phát âm (Level 0) ➔ Phản xạ đời thường (Level 1) ➔ Tiếng Anh đi làm (Level 2) ➔ Du lịch bản xứ (Level 3).
            </p>
          </div>

          {/* Quick Overall Progress Widget */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 min-w-[240px] space-y-3 flex-shrink-0">
            <div className="flex justify-between items-center text-xs">
              <span className="text-indigo-200 font-medium">Tiến độ toàn khóa:</span>
              <span className="font-black text-amber-300">{totalCompletedCount}/{totalLessonsCount} bài ({overallPercent}%)</span>
            </div>

            <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${overallPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleToggleAdmin}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                  isAdmin
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 text-indigo-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isAdmin ? 'Admin: Đang mở tất cả bài' : 'Mở quyền Admin'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SMART NEXT-UP ACTION CARD */}
      {nextUpLesson && (
        <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border-2 border-amber-400/70 rounded-3xl p-5 sm:p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-2xl shadow-md flex-shrink-0">
              🚀
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-full">
                  Bài học tiếp theo của bạn
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {nextUpLesson.levelId.toUpperCase()} • {nextUpLesson.durationMinutes} phút
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {nextUpLesson.titleVi}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-1">
                {nextUpLesson.descriptionVi}
              </p>
            </div>
          </div>

          <Link
            href={`/lessons/${nextUpLesson.id}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md shadow-orange-500/25 transition-transform active:scale-98 flex-shrink-0 cursor-pointer"
          >
            <span>Học Tiếp Bài Này Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* 3. LEVEL FILTER TABS & SEARCH BAR */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Horizontal Level Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar flex-nowrap">
            <button
              onClick={() => setSelectedLevelTab('all')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                selectedLevelTab === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              🌟 Tất Cả ({totalLessonsCount})
            </button>

            {LEVELS_CONFIG.map((lvl) => {
              const count = LESSONS.filter(l => l.levelId === lvl.id).length;
              const isSelected = selectedLevelTab === lvl.id;

              return (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevelTab(lvl.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{lvl.badge.split(' ')[0]}</span>
                  <span>{lvl.title.split(':')[0]}</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm bài học (Starbucks, Phỏng vấn...)"
              className="w-full pl-9.5 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. LEVELS & LESSONS LIST */}
      <div className="space-y-8">
        {filteredLevels.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <div className="text-4xl">🔍</div>
            <h3 className="text-base font-bold text-slate-900">Không tìm thấy bài học nào phù hợp</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Thử tìm kiếm với từ khóa khác như "âm đuôi", "cafe", "email" hoặc chọn lại tab "Tất Cả".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedLevelTab('all'); }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
            >
              Xóa Bộ Lọc
            </button>
          </div>
        ) : (
          filteredLevels.map((level) => {
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
                    : 'border-slate-200 bg-slate-50/70 opacity-85'
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
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-md transition-all active:scale-95"
                      >
                        <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span>Làm Bài Test Thăng Cấp</span>
                      </Link>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/30 backdrop-blur-sm text-white text-xs font-semibold">
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
                      <span className="font-bold text-indigo-600">{completedLessons.length}/{levelLessons.length} bài hoàn thành ({progressPercent}%)</span>
                      <div className="w-40 h-2 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lessons Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {level.filteredLessons.map((lesson, idx) => {
                      const isCompleted = progress?.completedLessons.includes(lesson.id);
                      const isNextUp = nextUpLesson?.id === lesson.id;

                      return (
                        <div
                          key={lesson.id}
                          className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between transition-all relative ${
                            isNextUp
                              ? 'bg-indigo-50/50 border-2 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                              : isCompleted
                              ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300'
                              : isUnlocked
                              ? 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                              : 'bg-slate-100/60 border-slate-200'
                          }`}
                        >
                          {/* Next Up Badge */}
                          {isNextUp && !isCompleted && (
                            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-600 text-white shadow-xs">
                              HỌC TIẾP 🚀
                            </div>
                          )}

                          <div className="space-y-2.5 mb-4">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>Bài {idx + 1} • {lesson.durationMinutes} phút</span>
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

                            <h3 className="text-sm sm:text-base font-black text-slate-900 line-clamp-2 leading-snug">
                              {lesson.titleVi}
                            </h3>

                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
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
                          <div className="pt-3 border-t border-slate-100">
                            {isUnlocked ? (
                              <Link
                                href={`/lessons/${lesson.id}`}
                                className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                  isNextUp
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25'
                                    : isCompleted
                                    ? 'bg-emerald-100 hover:bg-emerald-600 hover:text-white text-emerald-800'
                                    : 'bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700'
                                }`}
                              >
                                <span>{isCompleted ? 'Ôn tập lại' : isNextUp ? 'Bắt đầu học ngay' : 'Vào bài học'}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            ) : (
                              <button
                                disabled
                                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-400 cursor-not-allowed"
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
          })
        )}
      </div>
    </div>
  );
}
