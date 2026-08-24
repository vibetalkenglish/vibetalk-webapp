'use client';

import React, { useState } from 'react';
import { VocabItem } from '@/types';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { toggleSaveWord } from '@/lib/storage';
import { Volume2, Trash2, RotateCw, AlertCircle, Sparkles } from 'lucide-react';

interface VocabCardProps {
  item: VocabItem;
  onRemove?: () => void;
}

export default function VocabCard({ item, onRemove }: VocabCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePlay = (e: React.MouseEvent, rate: number = 0.9) => {
    e.stopPropagation();
    playAmericanSpeech(item.word, rate);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveWord(item);
    if (onRemove) onRemove();
  };

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="relative min-h-[220px] rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer group"
    >
      {!isFlipped ? (
        // FRONT SIDE
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
              {item.partOfSpeech}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => handlePlay(e, 0.9)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors"
                title="Nghe phát âm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleRemove}
                className="w-8 h-8 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors"
                title="Xóa khỏi sổ tay"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="my-3 text-center">
            <h3 className="text-3xl font-black text-slate-900 mb-1">
              {item.word}
            </h3>
            <span className="text-lg font-ipa font-bold text-indigo-600 tracking-wider">
              {item.ipa}
            </span>
          </div>

          <div className="flex items-center justify-center gap-1 text-xs text-slate-400 pt-2 border-t border-slate-100">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Chạm để lật xem nghĩa & ví dụ</span>
          </div>
        </div>
      ) : (
        // BACK SIDE (EXPLANATION & EXAMPLE)
        <div className="animate-fade-in space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-slate-900">{item.word}</h4>
            <span className="text-xs text-indigo-600 font-semibold">Bản dịch & Mẹo</span>
          </div>

          <div className="text-sm font-semibold text-slate-800 bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-100">
            👉 {item.meaningVi}
          </div>

          {item.exampleSentence && (
            <div className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg">
              &ldquo;{item.exampleSentence}&rdquo;
            </div>
          )}

          {item.endingSoundNote && (
            <div className="text-[11px] text-rose-700 bg-rose-50 p-1.5 rounded flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{item.endingSoundNote}</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 pt-1">
            <RotateCw className="w-3 h-3" />
            <span>Chạm để lật lại</span>
          </div>
        </div>
      )}
    </div>
  );
}
