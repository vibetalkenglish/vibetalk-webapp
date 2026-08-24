'use client';

import React from 'react';
import { GrammarNote } from '@/types';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { BookMarked, Volume2, Sparkles } from 'lucide-react';

interface GrammarSpotlightCardProps {
  notes: GrammarNote[];
}

export default function GrammarSpotlightCard({ notes }: GrammarSpotlightCardProps) {
  const handlePlay = (text: string) => {
    playAmericanSpeech(text, 0.88);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl shadow-xs flex-shrink-0">
          💡
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Điểm Ngữ Pháp Thực Chiến Có Trong Đoạn Hội Thoại
            </h3>
            <span className="text-[10px] bg-blue-600 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              Grammar
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Hiểu bản chất cấu trúc câu để tự tin ứng biến linh hoạt trong mọi tình huống
          </p>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-black text-blue-900">
                {note.titleVi}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Điểm {idx + 1}
              </span>
            </div>

            {/* Formula Pill */}
            <div className="px-3.5 py-1.5 bg-blue-50/80 border border-blue-200 rounded-xl inline-block">
              <span className="font-mono text-xs sm:text-sm font-bold text-blue-800">
                {note.structure}
              </span>
            </div>

            {/* Explanation */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              👉 {note.explanationVi}
            </p>

            {/* Example Card */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-3 shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Ví dụ trong bài:
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  {note.exampleEn}
                </p>
                {note.exampleIpa && (
                  <span className="inline-block text-xs font-ipa font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded border border-indigo-100">
                    {note.exampleIpa}
                  </span>
                )}
                <p className="text-xs text-slate-500">
                  👉 {note.exampleVi}
                </p>
              </div>

              <button
                onClick={() => handlePlay(note.exampleEn)}
                className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer shadow-xs mt-1"
                title="Nghe câu ví dụ"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
