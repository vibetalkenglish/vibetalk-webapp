'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LESSONS, LEVELS_CONFIG } from '@/data/lessonsData';
import WordPronounceCard from '@/components/WordPronounceCard';
import DialoguePlayer from '@/components/DialoguePlayer';
import SentencePatternCard from '@/components/SentencePatternCard';
import EarTrainingCard from '@/components/EarTrainingCard';
import GrammarSpotlightCard from '@/components/GrammarSpotlightCard';
import FontSizeController from '@/components/FontSizeController';
import VocabularyFlashcardsModal from '@/components/VocabularyFlashcardsModal';
import LessonRadioPlayer from '@/components/LessonRadioPlayer';
import LessonQuickQuiz from '@/components/LessonQuickQuiz';
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
  Zap,
  Layers,
  Headphones
} from 'lucide-react';

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;

  const lesson = LESSONS.find((l) => l.id === lessonId);
  const [isSaved, setIsSaved] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState(0); // 0: Normal, 1: +15%, 2: +30%
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);

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

  // Dynamic font sizing wrapper class
  const fontScaleClass = fontSizeLevel === 1 
    ? 'text-[1.12rem] [&_p]:text-[1.05rem] [&_h3]:text-[1.25rem] [&_h2]:text-[1.45rem]' 
    : fontSizeLevel === 2 
    ? 'text-[1.25rem] [&_p]:text-[1.18rem] [&_h3]:text-[1.4rem] [&_h2]:text-[1.65rem]' 
    : '';

  return (
    <div className={`space-y-8 max-w-5xl mx-auto transition-all ${fontScaleClass}`}>
      {/* Top Accessibility & Speed Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          href="/lessons"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Danh sách bài học ({levelConfig.title.split(':')[0]})</span>
        </Link>

        <FontSizeController
          fontSizeLevel={fontSizeLevel}
          onFontSizeChange={(lvl) => setFontSizeLevel(lvl)}
        />
      </div>

      {/* 1. LESSON HERO BANNER */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10">
                {levelConfig.title.split(':')[0]} • Bài {currentIndex + 1}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold">
                ⏱️ {lesson.durationMinutes} phút
              </span>
              {isCompleted && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đã hoàn thành
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
              {lesson.titleVi}
            </h1>

            <p className="text-xs sm:text-sm text-indigo-200 font-medium leading-relaxed">
              {lesson.descriptionVi}
            </p>

            {/* Quick Interactive Tool Buttons */}
            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
              <button
                onClick={() => setIsFlashcardsOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>🃏 Lật Flashcard 3D ({lesson.vocabulary.length} từ)</span>
              </button>

              <LessonRadioPlayer lesson={lesson} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 flex-shrink-0">
            <button
              onClick={handleToggleSave}
              className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSaved
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-slate-950' : ''}`} />
              <span>{isSaved ? 'Đã lưu vào Sổ tay' : 'Lưu bài học'}</span>
            </button>

            <button
              onClick={handleMarkComplete}
              className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/40'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'Hoàn thành (+50 EXP)' : 'Đánh dấu đã học'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: PHONETICS & PRONUNCIATION TIPS */}
      {lesson.vietnamesePronunciationTips && lesson.vietnamesePronunciationTips.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Mẹo Khẩu Hình & Bí Thuật Giọng Mỹ
              </h2>
              <p className="text-xs text-slate-500">Khắc phục triệt để lỗi phát âm của người Việt</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.vietnamesePronunciationTips.map((tip, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💡</span>
                  <h3 className="font-bold text-slate-900 text-sm">{tip.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{tip.description}</p>
                {tip.rule && (
                  <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-900 font-medium">
                    ⚠️ <strong className="font-bold">Quy tắc vàng:</strong> {tip.rule}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: KEY VOCABULARY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Từ Vựng Then Chốt ({lesson.vocabulary.length} từ)
              </h2>
              <p className="text-xs text-slate-500">Phiên âm IPA chuẩn, mẹo âm đuôi và câu ví dụ thực tế</p>
            </div>
          </div>

          <button
            onClick={() => setIsFlashcardsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Lật Flashcard</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.vocabulary.map((vocab) => (
            <WordPronounceCard key={vocab.id} item={vocab} />
          ))}
        </div>
      </section>

      {/* SECTION 3: SENTENCE PATTERN FRAMEWORK */}
      {lesson.sentencePattern && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Khuôn Mẫu Câu Thần Thánh (Sentence Pattern)
              </h2>
              <p className="text-xs text-slate-500">Lắp từ vào khuôn là nói được hàng trăm câu chuẩn ngữ điệu</p>
            </div>
          </div>

          <SentencePatternCard pattern={lesson.sentencePattern} />
        </section>
      )}

      {/* SECTION 4: INTERACTIVE DIALOGUE & ROLEPLAY */}
      {lesson.dialogue && lesson.dialogue.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              {lesson.sentencePattern ? 4 : 3}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Thực Hành Hội Thoại & Đóng Vai 1-1 Với AI
              </h2>
              <p className="text-xs text-slate-500">Nghe toàn bộ, Shadowing và hóa thân đối thoại cùng AI</p>
            </div>
          </div>

          <DialoguePlayer lines={lesson.dialogue} />
        </section>
      )}

      {/* SECTION 5: GRAMMAR SPOTLIGHT IN DIALOGUE */}
      {lesson.grammarNotes && lesson.grammarNotes.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
              5
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Ngữ Pháp Thực Chiến Có Trong Đoạn Hội Thoại
              </h2>
              <p className="text-xs text-slate-500">Hiểu bản chất cấu trúc câu để giao tiếp tự nhiên</p>
            </div>
          </div>

          <GrammarSpotlightCard notes={lesson.grammarNotes} />
        </section>
      )}

      {/* SECTION 6: EAR-TRAINING ACOUSTIC DRILLS */}
      {lesson.earTrainingDrills && lesson.earTrainingDrills.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
              6
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Luyện Đôi Tai Nhạy Bén (Ear-Training Drill)
              </h2>
              <p className="text-xs text-slate-500">Nghe và phân biệt các cặp âm gây lú để phản xạ chính xác</p>
            </div>
          </div>

          <EarTrainingCard drills={lesson.earTrainingDrills} />
        </section>
      )}

      {/* SECTION 7: MINI QUIZ CHECKPOINT */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
            7
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Kiểm Tra Phản Xạ 30 Giây (Mini Checkpoint)
            </h2>
            <p className="text-xs text-slate-500">Vượt qua 3 câu trắc nghiệm nhanh để nhận +30 EXP</p>
          </div>
        </div>

        <LessonQuickQuiz lesson={lesson} />
      </section>

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

      {/* 3D Flashcards Modal */}
      <VocabularyFlashcardsModal
        vocabulary={lesson.vocabulary}
        lessonTitle={lesson.titleVi}
        isOpen={isFlashcardsOpen}
        onClose={() => setIsFlashcardsOpen(false)}
      />
    </div>
  );
}
