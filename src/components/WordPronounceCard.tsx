'use client';

import React, { useState, useEffect } from 'react';
import { VocabItem } from '@/types';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { toggleSaveWord, isWordSaved } from '@/lib/storage';
import { Volume2, Bookmark, AlertCircle, Snail, Check, Sparkles, Mic, ChevronDown, ChevronUp } from 'lucide-react';
import PronunciationScorer from './PronunciationScorer';

interface WordPronounceCardProps {
  item: VocabItem;
}

export default function WordPronounceCard({ item }: WordPronounceCardProps) {
  const [saved, setSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [showScorer, setShowScorer] = useState(false);

  useEffect(() => {
    setSaved(isWordSaved(item.id));
  }, [item.id]);

  const handlePlay = (rate: number) => {
    setIsPlaying(true);
    playAmericanSpeech(item.word, rate, () => setIsPlaying(false));
  };

  const handlePlaySentence = () => {
    setIsPlaying(true);
    playAmericanSpeech(item.exampleSentence, 0.85, () => setIsPlaying(false));
  };

  const handleToggleBookmark = () => {
    const isNowSaved = toggleSaveWord(item);
    setSaved(isNowSaved);
    if (isNowSaved) {
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow space-y-4">
      {/* Header with Word, IPA, Part of Speech, Bookmark */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              {item.word}
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
              {item.partOfSpeech}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg sm:text-xl font-black font-ipa text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-xl border border-indigo-200/90 tracking-wider shadow-xs">
              {item.ipa}
            </span>
          </div>
        </div>

        {/* Action Buttons: Play Normal, Play Slow, Bookmark */}
        <div className="flex items-center gap-1.5">
          {/* Normal Speed 1.0x */}
          <button
            onClick={() => handlePlay(0.9)}
            className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-sm shadow-indigo-600/30 transition-transform active:scale-95"
            title="Nghe chuẩn giọng Mỹ (1.0x)"
          >
            <Volume2 className="w-5 h-5" />
          </button>

          {/* Slow Speed 0.5x */}
          <button
            onClick={() => handlePlay(0.5)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            title="Nghe chậm bóc tách âm (0.5x)"
          >
            <Snail className="w-4 h-4 text-slate-600" />
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleToggleBookmark}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              saved 
                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
            }`}
            title={saved ? 'Đã lưu vào Sổ tay' : 'Lưu vào Sổ tay từ vựng'}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-amber-600 text-amber-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Vietnamese Meaning */}
      <div>
        <p className="text-base font-semibold text-slate-900">
          👉 {item.meaningVi}
        </p>
      </div>

      {/* Ending Sound Note & American Pronunciation Tip */}
      {(item.endingSoundNote || item.americanTip) && (
        <div className="space-y-1.5">
          {item.endingSoundNote && (
            <div className="flex items-start gap-2 text-xs bg-rose-50 text-rose-800 p-2.5 rounded-xl border border-rose-100">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Lưu ý âm đuôi: </strong>
                <span>{item.endingSoundNote}</span>
              </div>
            </div>
          )}

          {item.americanTip && (
            <div className="flex items-start gap-2 text-xs bg-indigo-50 text-indigo-800 p-2.5 rounded-xl border border-indigo-100">
              <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Mẹo giọng Mỹ: </strong>
                <span>{item.americanTip}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Example Sentence with Audio */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-800">
              &ldquo;{item.exampleSentence}&rdquo;
            </p>
            <p className="text-xs text-slate-500 italic">
              {item.exampleSentenceVi}
            </p>
          </div>
          <button
            onClick={handlePlaySentence}
            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            title="Nghe câu ví dụ"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pronunciation Assessment Toggle Button */}
      <div className="pt-1">
        <button
          onClick={() => setShowScorer(!showScorer)}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
            showScorer
              ? 'bg-slate-100 text-slate-700'
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
          }`}
        >
          <Mic className="w-4 h-4 text-indigo-600" />
          <span>{showScorer ? 'Đóng bộ chấm điểm' : '🎤 Luyện Nói & Chấm Điểm Từ Này'}</span>
          {showScorer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showScorer && (
          <div className="mt-3 animate-fade-in">
            <PronunciationScorer
              targetText={item.word}
              targetIpa={item.ipa}
              label={`Chấm điểm từ "${item.word}"`}
            />
          </div>
        )}
      </div>

      {justSaved && (
        <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 animate-fade-in">
          <Check className="w-3.5 h-3.5" /> Đã lưu vào sổ tay từ vựng của bạn!
        </div>
      )}
    </div>
  );
}
