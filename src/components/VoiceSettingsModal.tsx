'use client';

import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  X, 
  Sparkles, 
  Check, 
  Play, 
  Settings2, 
  UserCheck, 
  RotateCcw,
  Sliders
} from 'lucide-react';
import { speechEngine, playAmericanSpeech, VoiceOption } from '@/lib/speechHelper';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceSettingsModal({
  isOpen,
  onClose,
}: VoiceSettingsModalProps) {
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [currentVoiceName, setCurrentVoiceName] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'female' | 'male'>('all');
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadVoices();
    }
  }, [isOpen]);

  const loadVoices = () => {
    const list = speechEngine.getVoicesList();
    setVoices(list);
    setCurrentVoiceName(speechEngine.getCurrentVoiceName());
  };

  if (!isOpen) return null;

  const handleSelectVoice = (voiceName: string) => {
    speechEngine.setVoiceByName(voiceName);
    setCurrentVoiceName(voiceName);
    // Play sample
    playSample("Hi there! I'm your AI speaking coach. Let's practice American pronunciation together!");
  };

  const playSample = (text: string) => {
    setIsPlayingTest(true);
    playAmericanSpeech(text, 0.88, () => setIsPlayingTest(false));
  };

  const filteredVoices = voices.filter(v => {
    if (genderFilter === 'female') return v.gender === 'female';
    if (genderFilter === 'male') return v.gender === 'male';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-7 z-10 border border-slate-100 animate-fade-in max-h-[90vh] flex flex-col justify-between">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Cài Đặt Giọng Đọc AI (Giọng Anh - Mỹ)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Chọn Giọng Bản Xứ Yêu Thích 🎙️
          </h2>
          <p className="text-xs text-slate-500">
            Chọn chất giọng truyền cảm nhất có sẵn trên thiết bị của bạn để luyện nghe và nhại theo ngữ điệu.
          </p>
        </div>

        {/* Test Voice Banner */}
        <div className="p-3.5 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between gap-3 mb-4">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Giọng đang dùng:
            </span>
            <strong className="text-xs text-indigo-900 font-bold block truncate max-w-[240px]">
              {currentVoiceName.replace(' - English (United States)', '')}
            </strong>
          </div>
          <button
            onClick={() => playSample("Hello! How's it going? Practice makes perfect!")}
            disabled={isPlayingTest}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 flex-shrink-0 transition-all cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 fill-white ${isPlayingTest ? 'animate-pulse' : ''}`} />
            <span>{isPlayingTest ? 'Đang đọc...' : 'Nghe Thử 🎧'}</span>
          </button>
        </div>

        {/* Gender Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600 mb-3">
          <button
            onClick={() => setGenderFilter('all')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              genderFilter === 'all' ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Tất Cả ({voices.length})
          </button>
          <button
            onClick={() => setGenderFilter('female')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              genderFilter === 'female' ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            👩 Giọng Nữ
          </button>
          <button
            onClick={() => setGenderFilter('male')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              genderFilter === 'male' ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            👨 Giọng Nam
          </button>
        </div>

        {/* Voices List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-56 min-h-36">
          {filteredVoices.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              Đang tải danh sách giọng đọc từ hệ điều hành...
            </div>
          ) : (
            filteredVoices.map((v) => {
              const isSelected = currentVoiceName === v.name;
              return (
                <button
                  key={v.name}
                  onClick={() => handleSelectVoice(v.name)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20'
                      : 'bg-white border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${
                      v.gender === 'female' ? 'bg-pink-50 text-pink-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {v.gender === 'female' ? '👩' : '👨'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {v.name.replace(' - English (United States)', '')}
                        </span>
                        {v.isNatural && (
                          <span className="text-[9.5px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded-full">
                            ★ Giọng Tự Nhiên
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block">
                        Chuẩn phát âm Anh - Mỹ (en-US)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-indigo-600 hover:underline">
                        Chọn
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Note */}
        <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Lựa chọn sẽ được tự động lưu cho các lần học sau</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Đã Xong
          </button>
        </div>
      </div>
    </div>
  );
}
