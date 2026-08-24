'use client';

import React, { useState, useEffect } from 'react';
import { getGlobalAudioSpeed, setGlobalAudioSpeed } from '@/lib/speechHelper';
import { Volume2, Type, Sparkles } from 'lucide-react';

interface FontSizeControllerProps {
  fontSizeLevel: number; // 0: Normal, 1: Large (+15%), 2: Extra Large (+30%)
  onFontSizeChange: (level: number) => void;
}

export default function FontSizeController({ fontSizeLevel, onFontSizeChange }: FontSizeControllerProps) {
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);

  useEffect(() => {
    setAudioSpeed(getGlobalAudioSpeed());
  }, []);

  const handleSpeedChange = (speed: number) => {
    setAudioSpeed(speed);
    setGlobalAudioSpeed(speed);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 border border-slate-200 shadow-xs flex items-center justify-between gap-3 flex-wrap">
      {/* Font Size Adjuster */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 pl-1 hidden xs:inline-flex">
          <Type className="w-3.5 h-3.5" />
          <span>Cỡ chữ:</span>
        </span>
        <div className="inline-flex bg-slate-100 p-0.5 rounded-xl">
          <button
            onClick={() => onFontSizeChange(0)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              fontSizeLevel === 0
                ? 'bg-white text-indigo-600 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Cỡ chữ tiêu chuẩn"
          >
            A
          </button>
          <button
            onClick={() => onFontSizeChange(1)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              fontSizeLevel === 1
                ? 'bg-white text-indigo-600 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Cỡ chữ to vừa (+15%)"
          >
            A+
          </button>
          <button
            onClick={() => onFontSizeChange(2)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              fontSizeLevel === 2
                ? 'bg-white text-indigo-600 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Cỡ chữ siêu to (+30%)"
          >
            A++
          </button>
        </div>
      </div>

      {/* Audio Speed Controller */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 pl-1 hidden xs:inline-flex">
          <Volume2 className="w-3.5 h-3.5" />
          <span>Tốc độ đọc:</span>
        </span>
        <div className="inline-flex bg-slate-100 p-0.5 rounded-xl">
          <button
            onClick={() => handleSpeedChange(0.75)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              audioSpeed === 0.75
                ? 'bg-white text-amber-600 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Nghe chậm rõ từng khẩu hình"
          >
            🐢 0.75x
          </button>
          <button
            onClick={() => handleSpeedChange(1.0)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              audioSpeed === 1.0
                ? 'bg-white text-indigo-600 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Tốc độ nói chuẩn tự nhiên"
          >
            🚶 1.0x
          </button>
          <button
            onClick={() => handleSpeedChange(1.25)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              audioSpeed === 1.25
                ? 'bg-white text-emerald-600 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Luyện phản xạ nhanh"
          >
            🏃 1.25x
          </button>
        </div>
      </div>
    </div>
  );
}
