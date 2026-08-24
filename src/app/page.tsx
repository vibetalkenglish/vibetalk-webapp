'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Volume2, 
  BookOpen, 
  Bookmark, 
  Award, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  PlayCircle,
  HelpCircle,
  Zap,
  Star,
  Mic
} from 'lucide-react';
import { getUserProgress, subscribeToProgress } from '@/lib/storage';
import { UserProgress } from '@/types';
import { IPA_SOUNDS } from '@/data/ipaData';
import { LESSONS, LEVELS_CONFIG } from '@/data/lessonsData';
import { playAmericanSpeech } from '@/lib/speechHelper';
import DailyHabitSprint from '@/components/DailyHabitSprint';

export default function HomePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [dailyIpa] = useState(() => IPA_SOUNDS[0]); // /i:/
  const [isDailyPlaying, setIsDailyPlaying] = useState(false);

  useEffect(() => {
    setProgress(getUserProgress());
    const unsubscribe = subscribeToProgress((updated) => {
      setProgress(updated);
    });
    return () => unsubscribe();
  }, []);

  const handlePlayDaily = () => {
    setIsDailyPlaying(true);
    playAmericanSpeech(dailyIpa.audioSampleWord, 0.9, () => {
      setIsDailyPlaying(false);
    });
  };

  const currentLevelConfig = LEVELS_CONFIG.find(l => l.id === (progress?.currentLevel || 'lv0')) || LEVELS_CONFIG[0];
  const completedCount = progress?.completedLessons.length || 0;
  const savedCount = progress?.savedWords.length || 0;

  return (
    <div className="space-y-8">
      {/* DAILY 3-MINUTE HABIT SPRINT (CHỐNG NẢN MỖI NGÀY) */}
      <DailyHabitSprint />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-sm border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Luyện Nói Tiếng Anh Giọng Anh - Mỹ Cho Người Việt (AI Chấm Miễn Phí)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Nói Tiếng Anh Giọng Anh - Mỹ <br />
            <span className="bg-gradient-to-r from-amber-300 via-indigo-200 to-emerald-300 bg-clip-text text-transparent">
              Tự Tin Bắt Nhịp Không Sợ Sai
            </span>
          </h1>

          <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed">
            Làm chủ 44 âm giọng Anh - Mỹ, triệt tiêu thói quen nuốt âm đuôi (/s/, /t/, /d/, /k/), luyện nói có AI chấm điểm % độ chuẩn và nhận xét hóm hỉnh giúp bạn tiến bộ từng ngày.
          </p>

          {/* Quick Action CTA */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
            >
              <Mic className="w-5 h-5" />
              <span>Phòng Luyện Phát Âm AI</span>
            </Link>

            <Link
              href="/lessons"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold shadow-md transition-colors"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Tiếp Tục Bài Học ({currentLevelConfig.title.split(':')[0]})</span>
            </Link>

            <Link
              href="/ipa"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-sm transition-colors"
            >
              <Volume2 className="w-5 h-5 text-amber-300" />
              <span>Bảng 44 Âm Giọng Mỹ</span>
            </Link>
          </div>
        </div>

        {/* Decorative Background Circles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-10 w-60 h-60 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
      </section>

      {/* DASHBOARD STATS & QUICK HIGHLIGHTS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Flame className="w-6 h-6 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Chuỗi học tập</span>
            <p className="text-xl sm:text-2xl font-black text-slate-900">{progress?.streakDays || 1} Ngày</p>
          </div>
        </div>

        {/* Current Level Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Cấp độ hiện tại</span>
            <p className="text-xl sm:text-2xl font-black text-indigo-600 uppercase">
              {progress?.currentLevel || 'Level 0'}
            </p>
          </div>
        </div>

        {/* Completed Lessons */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Bài hoàn thành</span>
            <p className="text-xl sm:text-2xl font-black text-slate-900">{completedCount} / {LESSONS.length}</p>
          </div>
        </div>

        {/* Saved Vocab Card */}
        <Link 
          href="/notebook"
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors flex items-center justify-center flex-shrink-0">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Từ vựng đã lưu</span>
            <p className="text-xl sm:text-2xl font-black text-slate-900">{savedCount} Từ</p>
          </div>
        </Link>
      </section>

      {/* FEATURED SECTIONS (GRID 2 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Level Roadmap Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Lộ Trình Cấp Độ Của Bạn</h2>
                <p className="text-xs text-slate-500">Hoàn thành các bài học và vượt qua bài test để mở khóa Level tiếp theo</p>
              </div>
              <Link href="/lessons" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                <span>Xem tất cả</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {LEVELS_CONFIG.map((lvl, index) => {
                const isUnlocked = progress?.unlockedLevels.includes(lvl.id);
                const isCurrent = progress?.currentLevel === lvl.id;
                const levelLessons = LESSONS.filter(l => l.levelId === lvl.id);
                const completedInLevel = levelLessons.filter(l => progress?.completedLessons.includes(l.id)).length;

                return (
                  <div
                    key={lvl.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'border-indigo-500 bg-indigo-50/40 shadow-sm'
                        : isUnlocked
                        ? 'border-slate-200 bg-white hover:border-slate-300'
                        : 'border-slate-200 bg-slate-50/60 opacity-75'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{lvl.badge.split(' ').pop()}</span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                              {lvl.title}
                            </h3>
                            <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded-full">
                              {lvl.cefrLevel}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full">
                                Đang học
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500">{lvl.subTitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isUnlocked ? (
                          <Link
                            href={`/lessons`}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                          >
                            Vào học
                          </Link>
                        ) : (
                          <span className="text-xs font-medium px-2.5 py-1 rounded bg-slate-200 text-slate-600">
                            🔒 Khóa
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 mt-3 pt-2 border-t border-slate-100">
                      <span>Tiến độ: {completedInLevel}/{levelLessons.length} bài học</span>
                      <Link
                        href={`/test/${lvl.id}`}
                        className="font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Bài Test Thăng Cấp</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Pronunciation Studio Banner */}
          <div className="bg-gradient-to-r from-amber-500 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Tính Năng Mới</span>
              </div>
              <h3 className="text-xl font-bold">Thử Ngay Phòng Luyện Phát Âm AI</h3>
              <p className="text-xs text-indigo-100 max-w-md">
                Tự do đọc các câu tiếng Anh để nhận phản hồi phân tích từng âm vị và kiểm tra thói quen nuốt âm đuôi.
              </p>
            </div>

            <Link
              href="/practice"
              className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-2xl text-xs shadow-md whitespace-nowrap transition-transform active:scale-95"
            >
              Trải Nghiệm Ngay 🚀
            </Link>
          </div>
        </div>

        {/* Right Column (1 Col): Daily IPA & Quick Flashcard */}
        <div className="space-y-6">
          {/* Daily IPA Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Âm IPA Của Ngày
              </span>
              <button
                onClick={handlePlayDaily}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                title="Nghe phát âm"
              >
                <Volume2 className={`w-4 h-4 ${isDailyPlaying ? 'animate-pulse' : ''}`} />
              </button>
            </div>

            <div className="text-center my-4">
              <span className="text-5xl font-black font-serif text-slate-900 tracking-tight">
                /{dailyIpa.symbol}/
              </span>
              <p className="text-xs font-semibold text-slate-500 mt-1">{dailyIpa.name}</p>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
              💡 {dailyIpa.vietnameseGuide}
            </p>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Từ mẫu chuẩn Mỹ:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {dailyIpa.examples.slice(0, 4).map((ex) => (
                  <button
                    key={ex.word}
                    onClick={() => playAmericanSpeech(ex.word, 0.85)}
                    className="p-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-colors"
                  >
                    <div className="text-xs font-bold text-slate-800">{ex.word}</div>
                    <div className="text-[10px] text-indigo-600 font-serif">{ex.ipa}</div>
                    <div className="text-[10px] text-slate-400 truncate">{ex.meaningVi}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <Link
                href="/ipa"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1"
              >
                <span>Xem toàn bộ 44 âm IPA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Notebook Preview */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
              <h3 className="text-base font-bold">Sổ Tay Từ Vựng Thông Minh</h3>
            </div>
            <p className="text-xs text-indigo-200 leading-relaxed mb-4">
              Lưu lại từ vựng khi học bài và ôn tập hàng ngày theo dạng Flashcard hai mặt có âm thanh.
            </p>
            <Link
              href="/notebook"
              className="block w-full py-2.5 text-center bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs transition-colors"
            >
              Mở Sổ Tay ({savedCount} từ)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
