'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  Flame, 
  Sparkles, 
  Volume2, 
  Mic, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Clock, 
  Award,
  Play
} from 'lucide-react';
import { getTodaySprint, DailySprint } from '@/data/dailyHabitsData';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { awardExp } from '@/lib/authStorage';
import PronunciationScorer from './PronunciationScorer';
import confetti from 'canvas-confetti';

export default function DailyHabitSprint() {
  const [sprint, setSprint] = useState<DailySprint>(getTodaySprint());
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [selectedReflexOption, setSelectedReflexOption] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayAudio = (text: string, rate: number = 0.88) => {
    setIsPlayingAudio(true);
    playAmericanSpeech(text, rate, () => setIsPlayingAudio(false));
  };

  const handleFinishSprint = () => {
    if (!isCompleted) {
      awardExp(40, 'Hoàn thành Thử Thách 3 Phút');
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.warn(e);
      }
    }
    setStep(4);
  };

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-indigo-500/5 to-purple-500/10 border-2 border-amber-400/60 rounded-3xl p-5 sm:p-7 shadow-lg relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-xl shadow-md shadow-amber-500/25 flex-shrink-0">
            {sprint.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Thử Thách 3 Phút Mỗi Ngày
              </h2>
              <span className="text-[10px] bg-amber-500 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Daily Habit
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {sprint.title}
            </p>
          </div>
        </div>

        {/* Step Progress Pills */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                step === s
                  ? 'w-8 bg-amber-500'
                  : step > s
                  ? 'w-4 bg-emerald-500'
                  : 'w-4 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: PHÚT 1 - MẸO PHÁT ÂM VÀNG */}
      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Phút 1/3: Khởi Động Mẹo Phát Âm
              </span>
              <button
                onClick={() => handlePlayAudio(sprint.tip.exampleWord)}
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe Mẫu</span>
              </button>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                💡 {sprint.tip.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {sprint.tip.description}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Ví dụ trọng tâm:</span>
                <span className="text-base font-bold text-slate-900">{sprint.tip.exampleWord}</span>
              </div>
              <span className="text-sm font-ipa font-bold text-indigo-700 bg-white px-3 py-1 rounded-lg border border-indigo-200 shadow-xs">
                {sprint.tip.exampleIpa}
              </span>
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
          >
            <span>Sang Phút 2: Luyện Nói 3 Câu Thực Tế</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: PHÚT 2 - LUYỆN NÓI 3 CÂU VỚI AI */}
      {step === 2 && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-indigo-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 flex items-center gap-1">
                <Mic className="w-3.5 h-3.5" /> Phút 2/3: Luyện Nói Câu {currentSentenceIdx + 1}/3
              </span>
              <div className="flex gap-1">
                {sprint.practiceSentences.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSentenceIdx(idx)}
                    className={`w-6 h-6 rounded-lg text-xs font-bold transition-all ${
                      currentSentenceIdx === idx
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Sentence Card */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    {sprint.practiceSentences[currentSentenceIdx].en}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    👉 {sprint.practiceSentences[currentSentenceIdx].vi}
                  </p>
                </div>
                <button
                  onClick={() => handlePlayAudio(sprint.practiceSentences[currentSentenceIdx].en)}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-indigo-600 hover:text-white text-indigo-600 flex items-center justify-center shadow-xs transition-colors flex-shrink-0"
                  title="Nghe câu mẫu"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-1">
                <span className="inline-block text-xs sm:text-sm font-ipa font-bold text-indigo-700 bg-indigo-50/90 px-3 py-1 rounded-xl border border-indigo-200/80 shadow-xs">
                  {sprint.practiceSentences[currentSentenceIdx].ipa}
                </span>
              </div>
            </div>

            {/* Pronunciation Scorer */}
            <PronunciationScorer
              targetText={sprint.practiceSentences[currentSentenceIdx].en}
              targetIpa={sprint.practiceSentences[currentSentenceIdx].ipa}
              label={`Thu âm câu ${currentSentenceIdx + 1}`}
            />
          </div>

          <div className="flex items-center gap-3">
            {currentSentenceIdx < sprint.practiceSentences.length - 1 ? (
              <button
                onClick={() => setCurrentSentenceIdx(currentSentenceIdx + 1)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Câu Tiếp Theo ({currentSentenceIdx + 2}/3)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setStep(3)}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sang Phút 3: Câu Hỏi Phản Xạ 5s</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: PHÚT 3 - CÂU HỎI PHẢN XẠ NHANH 5S */}
      {step === 3 && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-purple-200 shadow-sm space-y-4">
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 flex items-center gap-1 w-fit">
              <Zap className="w-3.5 h-3.5" /> Phút 3/3: Phản Xạ Bắn Tỉa Tức Thì
            </span>

            <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-1">
              <p className="text-sm sm:text-base font-bold text-slate-900">
                💬 {sprint.quickReflexQuestion.promptEn}
              </p>
              <p className="text-xs text-slate-500 italic">
                👉 {sprint.quickReflexQuestion.promptVi}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Chọn câu phản xạ tự nhiên nhất:</span>
              {sprint.quickReflexQuestion.options.map((opt, idx) => {
                const isSelected = selectedReflexOption === idx;
                const isAnswered = selectedReflexOption !== null;

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => setSelectedReflexOption(idx)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all ${
                      isSelected && opt.isCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20'
                        : isSelected && !opt.isCorrect
                        ? 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-500/20'
                        : isAnswered && opt.isCorrect
                        ? 'bg-emerald-50/80 border-emerald-400 text-emerald-900'
                        : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-bold block">{opt.textEn}</span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">{opt.textVi}</span>
                    </div>

                    {isAnswered && (
                      <div>
                        {opt.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedReflexOption !== null && (
            <button
              onClick={handleFinishSprint}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer animate-fade-in"
            >
              <Award className="w-5 h-5" />
              <span>Hoàn Thành & Nhận +40 EXP 🎁</span>
            </button>
          )}
        </div>
      )}

      {/* STEP 4: MÀN HÌNH HOÀN THÀNH VINH DANH */}
      {step === 4 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-md">
            🎉
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Xuất Sắc! Hoàn Thành Thử Thách Hôm Nay!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Bạn đã hoàn thành 3 phút luyện phản xạ và nhận được <strong>+40 EXP</strong>!
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-bold text-amber-800">
            <div className="flex items-center gap-1 text-amber-600">
              <Zap className="w-4 h-4 fill-amber-500" />
              <span>+40 EXP Thưởng</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-rose-600">
              <Flame className="w-4 h-4 fill-rose-500" />
              <span>Streak Tiếp Tục Cháy!</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => { setStep(1); setSelectedReflexOption(null); }}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Luyện Lại Thử Thách Này</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
