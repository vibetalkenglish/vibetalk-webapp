'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUserProgress, subscribeToProgress, toggleSaveWord, toggleSaveLesson } from '@/lib/storage';
import { UserProgress, VocabItem } from '@/types';
import { LESSONS } from '@/data/lessonsData';
import VocabCard from '@/components/VocabCard';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { 
  Bookmark, 
  BookOpen, 
  Volume2, 
  Layers, 
  Search, 
  Trash2, 
  ArrowRight, 
  Sparkles,
  HelpCircle,
  RotateCw,
  X
} from 'lucide-react';

export default function NotebookPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [activeTab, setActiveTab] = useState<'vocab' | 'lessons'>('vocab');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setProgress(getUserProgress());
    const unsubscribe = subscribeToProgress((updated) => {
      setProgress(updated);
    });
    return () => unsubscribe();
  }, []);

  const savedWords = progress?.savedWords || [];
  const savedLessons = LESSONS.filter(l => progress?.savedLessons.includes(l.id));

  const filteredWords = savedWords.filter(w => 
    w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.meaningVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.ipa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Keyboard navigation for flashcards
  useEffect(() => {
    if (!isFlashcardMode || filteredWords.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setIsFlipped(false);
        setCurrentCardIndex((prev) => (prev + 1) % filteredWords.length);
      } else if (e.key === 'ArrowLeft') {
        setIsFlipped(false);
        setCurrentCardIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsFlashcardMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlashcardMode, filteredWords.length]);

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % filteredWords.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10">
            <Bookmark className="w-3.5 h-3.5 fill-amber-300" />
            <span>Kho Lưu Trữ Học Tập Cá Nhân Hóa</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Sổ Tay Từ Vựng & Bài Học Của Bạn
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            Xem lại các từ vựng đã lưu trong lúc học, thực hành lật thẻ Flashcard hai mặt và ôn lại các bài học yêu thích.
          </p>
        </div>
      </div>

      {/* Tabs & Flashcard Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActiveTab('vocab'); setIsFlashcardMode(false); }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'vocab'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Từ Vựng ({savedWords.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('lessons'); setIsFlashcardMode(false); }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'lessons'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bài Học ({savedLessons.length})</span>
          </button>
        </div>

        {/* Flashcard Toggle Button (for Vocab Tab) */}
        {activeTab === 'vocab' && savedWords.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFlashcardMode(!isFlashcardMode)}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                isFlashcardMode
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-600" />
              <span>{isFlashcardMode ? 'Thoát Chế Độ Flashcard' : 'Luyện Thẻ Flashcard 🃏'}</span>
            </button>
          </div>
        )}
      </div>

      {/* VOCABULARY TAB CONTENT */}
      {activeTab === 'vocab' && (
        <div className="space-y-6">
          {savedWords.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Bookmark className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Sổ tay từ vựng đang trống</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Khi học các bài học, hãy nhấn biểu tượng ⭐ trên từng thẻ từ vựng để lưu vào sổ tay này và ôn tập lại nhé!
              </p>
              <Link
                href="/lessons"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-indigo-700"
              >
                <span>Đi đến Bài Học</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : isFlashcardMode ? (
            // FLASHCARD FULLSCREEN MODE
            <div className="max-w-xl mx-auto space-y-5 animate-fade-in">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Thẻ {currentCardIndex + 1} / {filteredWords.length}</span>
                <span className="hidden sm:inline text-slate-400">Phím tắt: Phím Cách (Lật) • Mũi tên (Chuyển thẻ)</span>
              </div>

              {filteredWords[currentCardIndex] && (
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="min-h-[320px] bg-white rounded-3xl border-2 border-indigo-200 shadow-xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all hover:border-indigo-400 select-none active:scale-[0.99]"
                >
                  {!isFlipped ? (
                    <div className="text-center my-auto space-y-3.5">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                        {filteredWords[currentCardIndex].partOfSpeech}
                      </span>
                      <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                        {filteredWords[currentCardIndex].word}
                      </h2>
                      <p className="text-xl font-serif font-bold text-indigo-600">
                        {filteredWords[currentCardIndex].ipa}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playAmericanSpeech(filteredWords[currentCardIndex].word, 0.9);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/25 active:scale-95 transition-transform"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Nghe phát âm chuẩn Mỹ</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 my-auto animate-fade-in text-center">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{filteredWords[currentCardIndex].word}</h3>
                        <p className="text-base sm:text-lg font-bold text-emerald-700 mt-1">
                          👉 {filteredWords[currentCardIndex].meaningVi}
                        </p>
                      </div>

                      {filteredWords[currentCardIndex].exampleSentence && (
                        <div className="bg-slate-50 p-3.5 rounded-2xl text-xs sm:text-sm text-slate-700 italic border border-slate-100 text-left">
                          &ldquo;{filteredWords[currentCardIndex].exampleSentence}&rdquo;
                          <div className="text-[11px] text-slate-400 not-italic mt-1">
                            {filteredWords[currentCardIndex].exampleSentenceVi}
                          </div>
                        </div>
                      )}

                      {filteredWords[currentCardIndex].endingSoundNote && (
                        <div className="bg-rose-50 p-2.5 rounded-xl text-xs text-rose-800 border border-rose-100 text-left">
                          ⚠️ <strong>Âm đuôi:</strong> {filteredWords[currentCardIndex].endingSoundNote}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-4 border-t border-slate-100">
                    <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                    <span>{isFlipped ? 'Chạm để lật lại mặt trước' : 'Chạm để xem nghĩa tiếng Việt & ví dụ'}</span>
                  </div>
                </div>
              )}

              {/* Flashcard Navigation Buttons */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handlePrevCard}
                  className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold text-xs transition-colors"
                >
                  ← Thẻ trước
                </button>
                <button
                  onClick={handleNextCard}
                  className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Thẻ tiếp theo →
                </button>
              </div>
            </div>
          ) : (
            // VOCAB GRID LIST MODE
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm từ trong sổ tay..."
                  className="w-full pl-9 pr-8 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Grid of Saved Vocab Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWords.map((word) => (
                  <VocabCard key={word.id} item={word} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SAVED LESSONS TAB CONTENT */}
      {activeTab === 'lessons' && (
        <div className="space-y-4">
          {savedLessons.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Chưa có bài học nào được lưu</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Hãy nhấn nút &quot;Lưu bài học&quot; ở góc phải bài học để xem lại nhanh tại đây nhé!
              </p>
              <Link
                href="/lessons"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-indigo-700"
              >
                <span>Xem danh sách bài học</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md flex flex-col justify-between transition-all"
                >
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-indigo-600 uppercase">
                        {lesson.levelId.toUpperCase()}
                      </span>
                      <button
                        onClick={() => toggleSaveLesson(lesson.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        title="Bỏ lưu bài học"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{lesson.titleVi}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{lesson.descriptionVi}</p>
                  </div>

                  <Link
                    href={`/lessons/${lesson.id}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 transition-colors"
                  >
                    <span>Vào học ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
