'use client';

import React, { useState } from 'react';
import { IpaSound } from '@/types';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { Volume2, AlertCircle, Info, Sparkles, ChevronRight, Play } from 'lucide-react';

interface IpaCardProps {
  sound: IpaSound;
  onSelectModal?: (sound: IpaSound) => void;
}

export default function IpaCard({ sound, onSelectModal }: IpaCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySound = (e: React.MouseEvent, word: string, rate: number = 0.9) => {
    e.stopPropagation();
    setIsPlaying(true);
    playAmericanSpeech(word, rate, () => setIsPlaying(false));
  };

  const getBadgeColor = () => {
    switch (sound.type) {
      case 'monophthong':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'diphthong':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'consonant-voiceless':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'consonant-voiced':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  const getCategoryLabel = () => {
    switch (sound.type) {
      case 'monophthong': return 'Nguyên âm đơn';
      case 'diphthong': return 'Nguyên âm đôi';
      case 'consonant-voiceless': return 'Phụ âm vô thanh (xì gió)';
      case 'consonant-voiced': return 'Phụ âm hữu thanh (rung cổ)';
    }
  };

  return (
    <div 
      onClick={() => onSelectModal && onSelectModal(sound)}
      className="group bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getBadgeColor()}`}>
            {getCategoryLabel()}
          </span>
          <button
            onClick={(e) => handlePlaySound(e, sound.audioSampleWord, 0.9)}
            className="w-8 h-8 rounded-full bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center transition-colors group-hover:scale-105"
            title="Nghe mẫu phát âm"
          >
            <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
          </button>
        </div>

        {/* Symbol & Name */}
        <div className="flex items-baseline gap-2.5 mb-2">
          <span className="text-3xl font-black font-ipa text-indigo-700 tracking-wide group-hover:scale-105 transition-transform inline-block">
            /{sound.symbol}/
          </span>
          <span className="text-xs font-bold text-slate-500 truncate">
            {sound.name}
          </span>
        </div>

        {/* Vietnamese Guide Shortcut */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-3">
          {sound.vietnameseGuide}
        </p>
      </div>

      {/* Examples Mini List */}
      <div>
        <div className="bg-slate-50/80 rounded-xl p-2.5 space-y-1.5 border border-slate-100 mb-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Từ mẫu thông dụng:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sound.examples.slice(0, 3).map((ex) => (
              <button
                key={ex.word}
                onClick={(e) => handlePlaySound(e, ex.word, 0.85)}
                className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-lg text-slate-700 hover:text-indigo-700 transition-colors"
              >
                <Play className="w-2.5 h-2.5 text-indigo-500 fill-indigo-500" />
                <span className="font-bold">{ex.word}</span>
                <span className="text-xs text-indigo-600/80 font-ipa font-medium">{ex.ipa}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Vietnamese Learner Note Banner */}
        <div className="flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50/70 px-2 py-1 rounded-lg border border-amber-100">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-amber-600" />
          <span className="truncate">Lỗi VN: {sound.vietnameseCommonMistake}</span>
        </div>
      </div>
    </div>
  );
}
