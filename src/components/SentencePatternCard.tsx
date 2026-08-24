'use client';

import React, { useState } from 'react';
import { SentencePattern } from '@/types';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { Sparkles, Volume2, Mic, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import PronunciationScorer from './PronunciationScorer';

interface SentencePatternCardProps {
  pattern: SentencePattern;
}

export default function SentencePatternCard({ pattern }: SentencePatternCardProps) {
  const [openScorerIdx, setOpenScorerIdx] = useState<number | null>(null);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  const handlePlay = (text: string, idx: number) => {
    setPlayingIdx(idx);
    playAmericanSpeech(text, 0.88, () => setPlayingIdx(null));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-lg relative overflow-hidden space-y-5">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-xl shadow-md flex-shrink-0">
          🧩
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-black text-white">
              {pattern.titleVi}
            </h3>
            <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              Khuôn Mẫu Câu
            </span>
          </div>
          <p className="text-xs text-indigo-200">
            {pattern.usageVi}
          </p>
        </div>
      </div>

      {/* Main Pattern Box */}
      <div className="p-4 sm:p-5 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-sm space-y-2">
        <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
          Công thức nói tức thì (Không cần dịch nhẩm):
        </span>
        <p className="text-lg sm:text-xl font-black text-white tracking-wide leading-snug">
          {pattern.pattern}
        </p>
        <p className="text-xs text-indigo-200 italic font-medium">
          👉 Nghĩa: {pattern.formulaVi}
        </p>
      </div>

      {/* Examples List */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-indigo-200 block">
          Ví dụ áp dụng thực tế (Chạm để nghe & nhại theo):
        </span>

        <div className="space-y-3">
          {pattern.examples.map((ex, idx) => {
            const isScorerOpen = openScorerIdx === idx;
            const isPlaying = playingIdx === idx;

            return (
              <div
                key={idx}
                className="bg-white/5 hover:bg-white/10 rounded-2xl p-4 border border-white/10 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <p className="text-base sm:text-lg font-bold text-white leading-snug">
                      {ex.en}
                    </p>

                    <div>
                      <span className="inline-block text-xs sm:text-sm font-ipa font-bold text-amber-300 bg-white/10 px-3 py-0.5 rounded-lg border border-white/10 tracking-wider">
                        {ex.ipa}
                      </span>
                    </div>

                    <p className="text-xs text-indigo-200">
                      👉 {ex.vi}
                    </p>
                  </div>

                  <button
                    onClick={() => handlePlay(ex.en, idx)}
                    className="w-9 h-9 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-md transition-colors cursor-pointer"
                    title="Nghe câu mẫu"
                  >
                    <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                  </button>
                </div>

                {/* Pronunciation Scorer Accordion */}
                <div className="pt-2 border-t border-white/10">
                  <button
                    onClick={() => setOpenScorerIdx(isScorerOpen ? null : idx)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{isScorerOpen ? 'Đóng bộ chấm điểm' : 'Luyện nói câu này'}</span>
                    {isScorerOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  {isScorerOpen && (
                    <div className="mt-3 bg-white text-slate-900 rounded-2xl p-4 shadow-lg animate-fade-in">
                      <PronunciationScorer
                        targetText={ex.en}
                        targetIpa={ex.ipa}
                        label="Luyện nói khuôn mẫu câu"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
