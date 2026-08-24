'use client';

import React, { useState } from 'react';
import { VocabItem } from '@/types';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { awardExp } from '@/lib/authStorage';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Shuffle, 
  HelpCircle,
  Award
} from 'lucide-react';

interface VocabularyFlashcardsModalProps {
  vocabulary: VocabItem[];
  lessonTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VocabularyFlashcardsModal({
  vocabulary,
  lessonTitle,
  isOpen,
  onClose,
}: VocabularyFlashcardsModalProps) {
  const [cards, setCards] = useState<VocabItem[]>(vocabulary);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen || vocabulary.length === 0) return null;

  const currentCard = cards[currentIndex] || cards[0];
  const isMastered = masteredIds.includes(currentCard.id);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePlay = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    playAmericanSpeech(text, 0.88);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed round
      setIsCompleted(true);
      awardExp(25, 'Hoàn thành Flashcard 3D');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleToggleMastered = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMastered) {
      setMasteredIds(masteredIds.filter(id => id !== currentCard.id));
    } else {
      setMasteredIds([...masteredIds, currentCard.id]);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl shadow-xs">
              🃏
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 line-clamp-1">
                Flashcard 3D: {lessonTitle}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Lật thẻ để ghi nhớ phản xạ từ vựng và âm đuôi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              title="Xáo trộn thẻ"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="py-3 flex items-center justify-between text-xs text-slate-500 font-bold flex-shrink-0">
          <span>Thẻ {currentIndex + 1} / {cards.length}</span>
          <div className="flex-1 mx-4 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
          <span className="text-emerald-600">Đã thuộc: {masteredIds.length}/{cards.length}</span>
        </div>

        {/* Content Area: Completed Screen vs Flashcard */}
        {isCompleted ? (
          <div className="py-10 text-center space-y-5 my-auto">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center text-4xl mx-auto shadow-md animate-bounce">
              🏆
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-slate-900">
                Xuất Sắc! Bạn Đã Luyện Xong Toàn Bộ Thẻ!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Bạn đã ghi nhớ <strong className="text-emerald-600">{masteredIds.length}/{cards.length}</strong> từ vựng then chốt và nhận được <strong className="text-amber-500">+25 EXP</strong>!
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Luyện Lại Từ Đầu
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Hoàn Tất & Tiếp Tục
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center py-2 min-h-[300px]">
            {/* 3D Flipping Card Container */}
            <div
              onClick={handleFlip}
              className="relative w-full h-[280px] sm:h-[300px] cursor-pointer select-none perspective-1000 group"
            >
              <div
                className={`relative w-full h-full rounded-3xl p-6 transition-all duration-500 shadow-lg border flex flex-col justify-between ${
                  isFlipped
                    ? 'bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white border-indigo-500/30'
                    : 'bg-gradient-to-br from-white to-slate-50 text-slate-900 border-slate-200 hover:border-indigo-300'
                }`}
              >
                {/* Card Header inside */}
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    isFlipped ? 'bg-white/20 text-indigo-200' : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    {currentCard.partOfSpeech}
                  </span>

                  <button
                    onClick={handleToggleMastered}
                    className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-xl transition-all cursor-pointer ${
                      isMastered
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : isFlipped
                        ? 'bg-white/10 hover:bg-white/20 text-white/80'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isMastered ? 'Đã thuộc' : 'Đánh dấu thuộc'}</span>
                  </button>
                </div>

                {/* Card Body */}
                {!isFlipped ? (
                  /* FRONT FACE */
                  <div className="text-center space-y-3 my-auto">
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {currentCard.word}
                    </h2>

                    <div className="inline-flex items-center gap-2">
                      <span className="text-base sm:text-lg font-ipa font-black text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-xl border border-indigo-100 shadow-xs">
                        {currentCard.ipa}
                      </span>
                      <button
                        onClick={(e) => handlePlay(e, currentCard.word)}
                        className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {currentCard.americanTip && (
                      <p className="text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-100 inline-block font-medium">
                        💡 {currentCard.americanTip}
                      </p>
                    )}
                  </div>
                ) : (
                  /* BACK FACE */
                  <div className="text-center space-y-3.5 my-auto animate-fade-in">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      Nghĩa Tiếng Việt & Âm Đuôi
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      {currentCard.meaningVi}
                    </h3>

                    {currentCard.endingSoundNote && (
                      <div className="p-2.5 bg-white/10 rounded-xl border border-white/10 text-xs text-indigo-200">
                        🔔 <strong className="text-white">Mẹo âm đuôi:</strong> {currentCard.endingSoundNote}
                      </div>
                    )}

                    {currentCard.exampleSentence && (
                      <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-left space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs sm:text-sm font-bold text-white">
                            "{currentCard.exampleSentence}"
                          </p>
                          <button
                            onClick={(e) => handlePlay(e, currentCard.exampleSentence)}
                            className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-indigo-300">
                          👉 {currentCard.exampleSentenceVi}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Card Footer inside */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-bold pt-2">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isFlipped ? 'Chạm để quay lại mặt trước' : 'Chạm vào thẻ để xem nghĩa tiếng Việt'}</span>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between gap-3 pt-5 flex-shrink-0">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Thẻ trước</span>
              </button>

              <button
                onClick={handleFlip}
                className="px-5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Lật mặt sau</span>
              </button>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <span>{currentIndex === cards.length - 1 ? 'Xem kết quả' : 'Thẻ tiếp theo'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
