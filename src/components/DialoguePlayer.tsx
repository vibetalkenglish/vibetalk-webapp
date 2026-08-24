'use client';

import React, { useState } from 'react';
import { DialogueLine } from '@/types';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { Volume2, Play, Pause, Eye, EyeOff, Sparkles, MessageSquare, Mic, ChevronDown, ChevronUp } from 'lucide-react';
import PronunciationScorer from './PronunciationScorer';

interface DialoguePlayerProps {
  lines: DialogueLine[];
  title?: string;
}

export default function DialoguePlayer({ lines, title = 'Đoạn Hội Thoại Thực Tế' }: DialoguePlayerProps) {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [showVietnamese, setShowVietnamese] = useState(true);
  const [showIpa, setShowIpa] = useState(true);
  const [openScorerLineId, setOpenScorerLineId] = useState<string | null>(null);

  const playSingleLine = (line: DialogueLine) => {
    setActiveLineId(line.id);
    playAmericanSpeech(line.textEn, 0.9, () => {
      setActiveLineId(null);
    });
  };

  const playAllLines = async () => {
    if (isPlayingAll) {
      setIsPlayingAll(false);
      setActiveLineId(null);
      return;
    }

    setIsPlayingAll(true);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      setActiveLineId(line.id);
      await new Promise<void>((resolve) => {
        playAmericanSpeech(line.textEn, 0.88, () => {
          setTimeout(resolve, 800); // Small pause between speakers
        });
      });
    }
    setActiveLineId(null);
    setIsPlayingAll(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Dialogue Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold">{title}</h3>
            <span className="text-xs text-indigo-200">Nghe & Shadowing chấm điểm AI từng câu thoại</span>
          </div>
        </div>

        {/* Controls: Play All, Toggle Translation, Toggle IPA */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={playAllLines}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isPlayingAll
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
            }`}
          >
            {isPlayingAll ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            <span>{isPlayingAll ? 'Tạm dừng' : 'Phát toàn bộ'}</span>
          </button>

          <button
            onClick={() => setShowVietnamese(!showVietnamese)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Ẩn/Hiện bản dịch tiếng Việt"
          >
            {showVietnamese ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
            <span>Dịch</span>
          </button>

          <button
            onClick={() => setShowIpa(!showIpa)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Ẩn/Hiện phiên âm IPA"
          >
            <Sparkles className={`w-3.5 h-3.5 ${showIpa ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>IPA</span>
          </button>
        </div>
      </div>

      {/* Dialogue Lines Conversation Thread */}
      <div className="p-4 sm:p-6 space-y-4 bg-slate-50/50">
        {lines.map((line) => {
          const isActive = activeLineId === line.id;
          const isSpeakerA = line.speaker === 'A';
          const isScorerOpen = openScorerLineId === line.id;

          return (
            <div
              key={line.id}
              className={`flex flex-col gap-3 p-3.5 sm:p-4 rounded-2xl transition-all ${
                isActive
                  ? 'bg-indigo-50/90 border-2 border-indigo-500 shadow-md'
                  : 'bg-white border border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex gap-3 sm:gap-4">
                {/* Speaker Avatar */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm ${
                    isSpeakerA ? 'bg-indigo-100' : 'bg-emerald-100'
                  }`}>
                    {line.avatar}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 mt-1 truncate max-w-[60px] text-center">
                    {line.speakerName}
                  </span>
                </div>

                {/* Speech Bubble Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {line.textEn}
                    </p>

                    <button
                      onClick={() => playSingleLine(line)}
                      className="w-8 h-8 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center flex-shrink-0 transition-colors"
                      title="Nghe câu này"
                    >
                      <Volume2 className={`w-4 h-4 ${isActive ? 'animate-bounce' : ''}`} />
                    </button>
                  </div>

                  {/* IPA Subtitle */}
                  {showIpa && (
                    <div className="py-0.5">
                      <span className="inline-block text-xs sm:text-sm font-ipa font-bold text-indigo-700 bg-indigo-50/90 px-3 py-1 rounded-xl border border-indigo-200/80 tracking-wider shadow-xs">
                        {line.ipa}
                      </span>
                    </div>
                  )}

                  {/* Vietnamese Meaning */}
                  {showVietnamese && (
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      👉 {line.textVi}
                    </p>
                  )}
                </div>
              </div>

              {/* Pronunciation Assessment Accordion / Shadowing */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => setOpenScorerLineId(isScorerOpen ? null : line.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    isScorerOpen 
                      ? 'bg-slate-100 text-slate-700' 
                      : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{isScorerOpen ? 'Đóng bộ chấm điểm' : '🎤 Đọc & Chấm Điểm Câu Này'}</span>
                  {isScorerOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {isScorerOpen && (
                  <div className="mt-3 animate-fade-in">
                    <PronunciationScorer
                      targetText={line.textEn}
                      targetIpa={line.ipa}
                      label={`Chấm điểm: "${line.textEn.slice(0, 25)}..."`}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
