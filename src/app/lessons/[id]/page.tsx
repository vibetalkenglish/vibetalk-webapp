'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LESSONS, LEVELS_CONFIG } from '@/data/lessonsData';
import WordPronounceCard from '@/components/WordPronounceCard';
import DialoguePlayer from '@/components/DialoguePlayer';
import { 
  markLessonCompleted, 
  toggleSaveLesson, 
  isLessonSaved, 
  getUserProgress 
} from '@/lib/storage';
import { awardExp } from '@/lib/authStorage';
import confetti from 'canvas-confetti';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  CheckCircle2, 
  Sparkles, 
  Volume2, 
  BookOpen, 
  Award,
  Zap
} from 'lucide-react';

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;

  const lesson = LESSONS.find((l) => l.id === lessonId);
  const [isSaved, setIsSaved] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (lesson) {
      setIsSaved(isLessonSaved(lesson.id));
      const progress = getUserProgress();
      setIsCompleted(progress.completedLessons.includes(lesson.id));
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Không tìm thấy bài học</h2>
        <p className="text-sm text-slate-500">Bài học này có thể chưa được cập nhật hoặc đường dẫn không đúng.</p>
        <Link
          href="/lessons"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách bài học</span>
        </Link>
      </div>
    );
  }

  const levelConfig = LEVELS_CONFIG.find((l) => l.id === lesson.levelId) || LEVELS_CONFIG[0];
  const allLessonsInLevel = LESSONS.filter((l) => l.levelId === lesson.levelId);
  const currentIndex = allLessonsInLevel.findIndex((l) => l.id === lesson.id);
  const nextLesson = allLessonsInLevel[currentIndex + 1] || null;
  const prevLesson = allLessonsInLevel[currentIndex - 1] || null;

  const handleToggleSave = () => {
    const saved = toggleSaveLesson(lesson.id);
    setIsSaved(saved);
  };

  const handleMarkComplete = () => {
    if (!isCompleted) {
      markLessonCompleted(lesson.id);
      awardExp(50, 'Hoàn thành bài học ' + lesson.titleVi);
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Navigation Breadcrumb & Back */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/lessons"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Danh sách bài học ({levelConfig.title.split(':')[0]})</span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSave}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isSaved
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
            <span>{isSaved ? 'Đã lưu bài' : 'Lưu bài học'}</span>
          </button>

          <button
            onClick={handleMarkComplete}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isCompleted
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-indigo-200">
            {levelConfig.title.split(':')[0]} • Bài {currentIndex + 1}
          </span>
          <span className="text-xs font-medium text-indigo-300">
            ⏱️ {lesson.durationMinutes} phút
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          {lesson.titleVi}
        </h1>
        <p className="text-sm font-semibold text-indigo-200">
          {lesson.titleEn}
        </p>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          {lesson.descriptionVi}
        </p>

        {/* Key Takeaways */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2 mt-4">
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trọng tâm bài học:</span>
          </h4>
          <ul className="space-y-1 text-xs text-indigo-100 list-disc list-inside">
            {lesson.keyTakeaways.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* SECTION 1: VIETNAMESE PRONUNCIATION TIPS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Bí Quyết Phát Âm Chuẩn Mỹ Dành Cho Người Việt
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.vietnamesePronunciationTips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3"
            >
              <h3 className="text-base font-bold text-indigo-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                {tip.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tip.description}
              </p>
              <div className="bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100 text-xs text-indigo-900 font-semibold">
                📌 Quy tắc: {tip.rule}
              </div>

              {/* Mini Examples with Audio */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                {tip.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{ex.en}</span>
                        <span className="text-[11px] font-serif text-indigo-600">{ex.ipa}</span>
                        <span className="text-[11px] text-slate-500">({ex.vi})</span>
                      </div>
                      {ex.soundTip && (
                        <span className="text-[10px] text-rose-600 block mt-0.5">
                          👉 {ex.soundTip}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => playAmericanSpeech(ex.en, 0.85)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-indigo-600 hover:text-white text-indigo-600 transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: CORE VOCABULARY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Từ Vựng Then Chốt & Phiên Âm Chi Tiết
              </h2>
              <p className="text-xs text-slate-500">Chạm nút ⭐ để lưu vào sổ tay từ vựng của bạn</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.vocabulary.map((vocab) => (
            <WordPronounceCard key={vocab.id} item={vocab} />
          ))}
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE DIALOGUE */}
      {lesson.dialogue && lesson.dialogue.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Thực Hành Hội Thoại & Shadowing Theo Giọng Mẫu
              </h2>
              <p className="text-xs text-slate-500">Nghe đoạn hội thoại hoàn chỉnh và thử ghi âm nhại lại</p>
            </div>
          </div>

          <DialoguePlayer lines={lesson.dialogue} />
        </section>
      )}

      {/* BOTTOM FOOTER NAVIGATION */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevLesson ? (
          <Link
            href={`/lessons/${prevLesson.id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Bài trước: {prevLesson.titleVi}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/lessons/${nextLesson.id}`}
            onClick={handleMarkComplete}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-colors"
          >
            <span>Bài tiếp theo: {nextLesson.titleVi}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href={`/test/${lesson.levelId}`}
            onClick={handleMarkComplete}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold shadow-lg transition-all hover:scale-105"
          >
            <Zap className="w-4 h-4" />
            <span>Làm Bài Test Thăng Cấp Ngay</span>
          </Link>
        )}
      </div>
    </div>
  );
}
