'use client';

import React, { useState } from 'react';
import { EarTrainingDrill } from '@/types';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { awardExp } from '@/lib/authStorage';
import { Headphones, Volume2, CheckCircle2, XCircle, Sparkles, HelpCircle } from 'lucide-react';

interface EarTrainingCardProps {
  drills: EarTrainingDrill[];
}

export default function EarTrainingCard({ drills }: EarTrainingCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (word: string, drillId: string) => {
    setPlayingId(drillId);
    playAmericanSpeech(word, 0.88, () => setPlayingId(null));
  };

  const handleSelectOption = (drill: EarTrainingDrill, optIdx: number) => {
    if (selectedAnswers[drill.id] !== undefined) return; // already answered

    setSelectedAnswers((prev) => ({ ...prev, [drill.id]: optIdx }));
    if (optIdx === drill.correctIndex) {
      awardExp(10, 'Đúng thử thách luyện tai: ' + drill.audioWord);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl shadow-xs flex-shrink-0">
          🎧
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Luyện Đôi Tai Nhạy Bén (Ear-Training Drill)
            </h3>
            <span className="text-[10px] bg-purple-600 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              Acoustic
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Phân biệt các cặp âm gây lú để nghe chuẩn và phản xạ không sợ nhầm lẫn
          </p>
        </div>
      </div>

      {/* Drills List */}
      <div className="space-y-6">
        {drills.map((drill, drillIdx) => {
          const selectedIdx = selectedAnswers[drill.id];
          const isAnswered = selectedIdx !== undefined;
          const isPlaying = playingId === drill.id;

          return (
            <div
              key={drill.id}
              className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200 inline-block">
                    Thử thách {drillIdx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {drill.promptVi}
                  </p>
                </div>

                {/* Big Audio Play Button */}
                <button
                  onClick={() => handlePlay(drill.audioWord, drill.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer ${
                    isPlaying
                      ? 'bg-purple-600 text-white animate-pulse'
                      : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Bấm Để Nghe Âm 🔊</span>
                </button>
              </div>

              {/* Options Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {drill.options.map((opt, optIdx) => {
                  const isSelected = selectedIdx === optIdx;
                  const isCorrect = optIdx === drill.correctIndex;

                  return (
                    <button
                      key={opt.word}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(drill, optIdx)}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                        isSelected && isCorrect
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs'
                          : isSelected && !isCorrect
                          ? 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-500/20 shadow-xs'
                          : isAnswered && isCorrect
                          ? 'bg-emerald-50/80 border-emerald-400 text-emerald-900'
                          : 'bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black">{opt.word}</span>
                          <span className="text-xs font-ipa font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded border border-indigo-100">
                            {opt.ipa}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 block mt-1">
                          👉 {opt.meaningVi}
                        </span>
                      </div>

                      {isAnswered && (
                        <div>
                          {isCorrect ? (
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

              {/* Feedback & Explanation */}
              {isAnswered && (
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed animate-fade-in flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Giải thích sư phạm:</span>
                    <p>{drill.explanationVi}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
