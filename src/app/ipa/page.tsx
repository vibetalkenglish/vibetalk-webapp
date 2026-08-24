'use client';

import React, { useState } from 'react';
import { IPA_SOUNDS } from '@/data/ipaData';
import { IpaSound, IpaCategory } from '@/types';
import IpaCard from '@/components/IpaCard';
import { playAmericanSpeech } from '@/lib/speechHelper';
import PronunciationScorer from '@/components/PronunciationScorer';
import { 
  Volume2, 
  Search, 
  Filter, 
  X, 
  AlertCircle, 
  Sparkles, 
  Info, 
  Snail,
  Play,
  Mic
} from 'lucide-react';

export default function IpaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalSound, setActiveModalSound] = useState<IpaSound | null>(null);
  const [testWord, setTestWord] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Tất Cả (44 Âm)' },
    { id: 'monophthong', label: 'Nguyên Âm Đơn' },
    { id: 'diphthong', label: 'Nguyên Âm Đôi' },
    { id: 'consonant-voiceless', label: 'Phụ Âm Vô Thanh (Gió)' },
    { id: 'consonant-voiced', label: 'Phụ Âm Hữu Thanh (Rung)' },
  ];

  const filteredSounds = IPA_SOUNDS.filter((sound) => {
    const matchesCategory = selectedCategory === 'all' || sound.type === selectedCategory;
    const matchesSearch = 
      sound.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sound.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sound.examples.some(ex => ex.word.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenModal = (sound: IpaSound) => {
    setActiveModalSound(sound);
    setTestWord(sound.audioSampleWord);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kho 44 Âm Tiếng Anh Giọng Anh - Mỹ (GenAm)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Bảng 44 Âm Tiếng Anh Giọng Anh - Mỹ & Chấm Điểm AI
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            Khám phá khẩu hình miệng, đặt lưỡi và mẹo dân gian dễ nhớ. Luyện nói trực tiếp vào Micro để nhận điểm số phân tích độ chuẩn xác từng âm vị.
          </p>
        </div>
      </div>

      {/* Controls: Search and Filter Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo ký hiệu / từ ví dụ..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* IPA Grid */}
      {filteredSounds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSounds.map((sound) => (
            <IpaCard
              key={sound.id}
              sound={sound}
              onSelectModal={(s) => handleOpenModal(s)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-500 text-sm font-semibold">
            Không tìm thấy âm IPA nào khớp với &quot;{searchQuery}&quot;
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-3 text-xs font-bold text-indigo-600 hover:underline"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}

      {/* DETAIL MODAL POPUP */}
      {activeModalSound && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-6 animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <span className="text-3xl font-black font-ipa text-indigo-700 tracking-wide">
                    /{activeModalSound.symbol}/
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{activeModalSound.name}</h3>
                  <span className="text-xs font-semibold text-slate-400 capitalize">
                    {activeModalSound.type.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveModalSound(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Audio Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => playAmericanSpeech(activeModalSound.audioSampleWord, 0.9)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe Mẫu Giọng Mỹ (1.0x)</span>
              </button>

              <button
                onClick={() => playAmericanSpeech(activeModalSound.audioSampleWord, 0.5)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                <Snail className="w-4 h-4" />
                <span>Nghe Chậm (0.5x)</span>
              </button>
            </div>

            {/* Vietnamese Mouth Guide & Tips */}
            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-indigo-600" />
                  <span>Hướng Dẫn Khẩu Hình & Đặt Lưỡi:</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeModalSound.mouthGuide}
                </p>
                <p className="text-xs text-indigo-700 mt-2 font-medium">
                  💡 {activeModalSound.vietnameseGuide}
                </p>
              </div>

              {/* Common Mistake Alert */}
              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 text-xs text-rose-900">
                <h4 className="font-bold flex items-center gap-1.5 mb-1 text-rose-700">
                  <AlertCircle className="w-4 h-4" />
                  <span>Cảnh Báo Lỗi Người Việt Thường Mắc:</span>
                </h4>
                <p className="leading-relaxed">
                  {activeModalSound.vietnameseCommonMistake}
                </p>
              </div>
            </div>

            {/* Examples List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Chọn Từ Mẫu Để Luyện & Chấm Điểm:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalSound.examples.map((ex) => (
                  <div
                    key={ex.word}
                    onClick={() => setTestWord(ex.word)}
                    className={`flex items-center justify-between p-2.5 border rounded-xl cursor-pointer transition-all ${
                      testWord === ex.word
                        ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20'
                        : 'bg-slate-50 hover:bg-indigo-50/40 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <span>{ex.word}</span>
                        <span className="text-xs font-ipa text-indigo-700 font-bold">{ex.ipa}</span>
                      </div>
                      <span className="text-xs text-slate-500">{ex.meaningVi}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAmericanSpeech(ex.word, 0.85);
                      }}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-indigo-600 hover:text-white text-indigo-600 flex items-center justify-center shadow-sm transition-colors"
                      title="Nghe từ này"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Live AI Pronunciation Assessment Box */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Chấm Điểm Phát Âm Từ &ldquo;{testWord || activeModalSound.audioSampleWord}&rdquo;:</span>
              </h4>
              <PronunciationScorer
                targetText={testWord || activeModalSound.audioSampleWord}
                label={`Chấm điểm từ "${testWord || activeModalSound.audioSampleWord}"`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
