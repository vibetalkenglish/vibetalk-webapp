'use client';

import React, { useState } from 'react';
import { Lesson } from '@/types';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { awardExp } from '@/lib/authStorage';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  Award,
  RotateCcw
} from 'lucide-react';

interface LessonQuickQuizProps {
  lesson: Lesson;
}

export default function LessonQuickQuiz({ lesson }: LessonQuickQuizProps) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Generate 3 dynamic questions from lesson data
  const v1 = lesson.vocabulary[0] || { word: 'practice', meaningVi: 'luyện tập', ipa: '/ˈpræk.tɪs/' };
  const v2 = lesson.vocabulary[1] || lesson.vocabulary[0];
  const patternExample = lesson.sentencePattern?.examples[0] || { en: 'I am practicing English.', vi: 'Tôi đang luyện tiếng Anh.' };

  const questions = [
    {
      type: 'vocab',
      promptVi: `Từ "${v1.word}" (${v1.ipa}) có nghĩa tiếng Việt là gì?`,
      options: [
        v1.meaningVi,
        'sự trì hoãn không đáng có',
        'kế hoạch bị hủy bỏ',
        'không có đáp án đúng'
      ].sort(() => 0.5 - Math.random()),
      correctWord: v1.meaningVi,
      audioText: v1.word
    },
    {
      type: 'pattern',
      promptVi: `Chọn câu tiếng Anh chuẩn xác cho nghĩa: "${patternExample.vi}"`,
      options: [
        patternExample.en,
        patternExample.en.replace('practice', 'cancel').replace('experience', 'trouble'),
        'I am not sure about this.',
        'Let me check tomorrow.'
      ].sort(() => 0.5 - Math.random()),
      correctWord: patternExample.en,
      audioText: patternExample.en
    },
    {
      type: 'listening',
      promptVi: `Nghe âm thanh và chọn từ đúng nhất:`,
      options: [
        v2.word,
        v2.word + 'ing',
        'un' + v2.word,
        'dis' + v2.word
      ].sort(() => 0.5 - Math.random()),
      correctWord: v2.word,
      audioText: v2.word
    }
  ];

  const currentQ = questions[currentQIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = currentQ.options[idx] === currentQ.correctWord;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      awardExp(30, 'Vượt qua Mini Quiz cuối bài');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
            🎯
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Mini Quiz 30s: Thử Thách Phản Xạ Cuối Bài
              </h3>
              <span className="text-[10px] bg-amber-500 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Checkpoint
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Vượt qua 3 câu trắc nghiệm nhanh để nhận +30 EXP và khắc sâu bài học
            </p>
          </div>
        </div>

        {!isFinished && (
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-xl">
            Câu {currentQIndex + 1}/3
          </span>
        )}
      </div>

      {isFinished ? (
        <div className="py-8 text-center space-y-4 my-auto">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center text-3xl mx-auto shadow-md animate-bounce">
            🏆
          </div>

          <div className="space-y-1">
            <h4 className="text-xl sm:text-2xl font-black text-slate-900">
              Hoàn Thành Xuất Sắc Checkpoint!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Bạn đã trả lời đúng <strong className="text-emerald-600">{score}/3 câu</strong> và nhận được <strong className="text-amber-500">+30 EXP</strong>!
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              onClick={handleRestart}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm Lại Quiz</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Question Prompt */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                Câu hỏi {currentQIndex + 1}:
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900">
                {currentQ.promptVi}
              </p>
            </div>

            <button
              onClick={() => playAmericanSpeech(currentQ.audioText, 0.88)}
              className="w-10 h-10 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center flex-shrink-0 transition-colors shadow-xs cursor-pointer"
              title="Bấm để nghe âm thanh"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOpt = opt === currentQ.correctWord;

              let btnStyle = 'bg-white border-slate-200 hover:border-indigo-400 text-slate-800';
              if (isAnswered) {
                if (isCorrectOpt) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs';
                } else if (isSelected) {
                  btnStyle = 'bg-red-50 border-red-500 text-red-900 font-bold';
                } else {
                  btnStyle = 'bg-white border-slate-100 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrectOpt && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrectOpt && (
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action button */}
          {isAnswered && (
            <div className="flex justify-end pt-2 animate-fade-in">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
              >
                <span>{currentQIndex === questions.length - 1 ? 'Xem Tổng Kết Điểm' : 'Câu Tiếp Theo'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
