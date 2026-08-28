'use client';

import React, { useState } from 'react';
import PronunciationScorer from '@/components/PronunciationScorer';
import VoiceAiTutorCall from '@/components/VoiceAiTutorCall';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { 
  Sparkles, 
  Mic, 
  Volume2, 
  Layers, 
  Type, 
  Flame, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Zap,
  BookOpen,
  PhoneCall,
  Target
} from 'lucide-react';

interface PracticeItem {
  id: string;
  category: 'ending-sounds' | 'vowels' | 'connected-speech';
  title: string;
  targetText: string;
  ipa: string;
  meaningVi: string;
  vietnameseNote: string;
}

const PRACTICE_PRESETS: PracticeItem[] = [
  // --- Ending Sounds ---
  {
    id: 'p-1',
    category: 'ending-sounds',
    title: 'Phân biệt Like / Light / Lie / Line',
    targetText: 'I like the bright light in line.',
    ipa: '/aɪ laɪk ðə braɪt laɪt ɪn laɪn/',
    meaningVi: 'Tôi thích ánh sáng rực rỡ ở trên hàng.',
    vietnameseNote: 'Chú ý bật rõ âm /k/ ở "like", âm /t/ ở "light" và "bright", âm /n/ ở "line".'
  },
  {
    id: 'p-2',
    category: 'ending-sounds',
    title: 'Âm đuôi Xì Gió /s/ & /z/',
    targetText: 'This is a very nice place for practice.',
    ipa: '/ðɪs ɪz ə ˈver.i naɪs pleɪs fɔːr ˈpræk.tɪs/',
    meaningVi: 'Đây là một nơi rất đẹp để luyện tập.',
    vietnameseNote: 'Nhớ xì /s/ ở "this", rung /z/ ở "is", và xì /s/ ở "nice", "place", "practice".'
  },
  {
    id: 'p-3',
    category: 'ending-sounds',
    title: 'Âm đuôi /ks/ trong "Six" vs "Sick"',
    targetText: 'He has six sick cats.',
    ipa: '/hiː hæz sɪks sɪk kæts/',
    meaningVi: 'Anh ấy có 6 con mèo bị ốm.',
    vietnameseNote: 'Từ "six" có cả /k/ + /s/ (/sɪks/). "Cats" kết thúc bằng /ts/.'
  },

  // --- Vowels ---
  {
    id: 'p-4',
    category: 'vowels',
    title: 'Cặp /iː/ dài vs /ɪ/ ngắn (Sheet vs Sit)',
    targetText: 'Please sit on this clean sheet.',
    ipa: '/pliːz sɪt ɑːn ðɪs kliːn ʃiːt/',
    meaningVi: 'Xin hãy ngồi lên tấm ga trải giường sạch sẽ này.',
    vietnameseNote: 'Kéo căng môi cười ở "please", "clean", "sheet" (/iː/). Thả lỏng ở "sit", "this" (/ɪ/).'
  },
  {
    id: 'p-5',
    category: 'vowels',
    title: 'Âm A Bẹt /æ/ giọng Mỹ (Cat vs Cut)',
    targetText: 'The black cat is back in the bag.',
    ipa: '/ðə blæk kæt ɪz bæk ɪn ðə bæɡ/',
    meaningVi: 'Con mèo đen đã quay trở lại trong túi.',
    vietnameseNote: 'Hạ cằm thật sâu khi phát âm các từ có âm /æ/: black, cat, back, bag.'
  },

  // --- Connected Speech ---
  {
    id: 'p-6',
    category: 'connected-speech',
    title: 'Biến âm Flap T giọng Anh - Mỹ (Water, Better)',
    targetText: 'A bottle of water is much better in the city.',
    ipa: '/ə ˈbɑː.t̬əl ʌv ˈwɑː.t̬ɚ ɪz mʌtʃ ˈbet̬.ɚ ɪn ðə ˈsɪt̬.i/',
    meaningVi: 'Một chai nước sẽ tốt hơn nhiều trong thành phố.',
    vietnameseNote: 'Đọc lướt Flap T: "bah-del", "wah-der", "beh-der", "sih-dee".'
  },
  {
    id: 'p-7',
    category: 'connected-speech',
    title: 'Nối âm câu chào tự nhiên',
    targetText: 'How is it going today? Nice to meet you.',
    ipa: '/ˈhaʊ.zɪt ˈɡoʊ.ɪŋ təˈdeɪ? naɪs tuː miːtʃ juː/',
    meaningVi: 'Dạo này thế nào rồi? Rất vui được gặp bạn.',
    vietnameseNote: 'Nối âm: "How-zit-going", "meet-you" -> "mee-choo".'
  }
];

export default function PracticePage() {
  const [mainMode, setMainMode] = useState<'voice-call' | 'pronunciation'>('voice-call');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ending-sounds' | 'vowels' | 'connected-speech' | 'custom'>('all');
  const [customText, setCustomText] = useState('I want to speak American English fluently.');
  const [activeCustomEvaluation, setActiveCustomEvaluation] = useState(false);

  const filteredPresets = PRACTICE_PRESETS.filter(
    item => selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phòng Luyện Nói AI Tự Do 1-1 (100% Miễn Phí)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Luyện Phản Xạ Giao Tiếp & Phát Âm AI
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            Gọi điện thoại đàm thoại tự do với Gia Sư AI Mỹ (Jessica, David, Sam), hoặc luyện phát âm từng câu đơn lẻ với AI chấm điểm % độ chuẩn xác theo thời gian thực.
          </p>
        </div>
      </div>

      {/* 2. Top-Level Mode Selector */}
      <div className="flex items-center justify-center p-1.5 bg-slate-200/80 rounded-2xl max-w-md mx-auto shadow-inner">
        <button
          onClick={() => setMainMode('voice-call')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
            mainMode === 'voice-call'
              ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <PhoneCall className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span>Gia Sư AI Gọi Thoại 1-1</span>
        </button>

        <button
          onClick={() => setMainMode('pronunciation')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
            mainMode === 'pronunciation'
              ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Target className="w-4 h-4 text-indigo-500" />
          <span>Luyện Phát Âm Câu Tự Do</span>
        </button>
      </div>

      {/* 3. MAIN CONTENT: MODE 1 (VOICE CALL) VS MODE 2 (PRONUNCIATION DRILL) */}
      {mainMode === 'voice-call' ? (
        /* MODE 1: VOICE-TO-VOICE AI TUTOR CALL */
        <VoiceAiTutorCall />
      ) : (
        /* MODE 2: PRONUNCIATION SENTENCE DRILL ROOM */
        <div className="space-y-6 animate-fade-in">
          {/* Sub Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Tất Cả Thử Thách
            </button>

            <button
              onClick={() => setSelectedCategory('ending-sounds')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'ending-sounds' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              🎯 Luyện Âm Đuôi (/s/, /t/, /d/, /k/)
            </button>

            <button
              onClick={() => setSelectedCategory('vowels')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'vowels' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              👄 Cặp Nguyên Âm (/iː/ vs /ɪ/, /æ/)
            </button>

            <button
              onClick={() => setSelectedCategory('connected-speech')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'connected-speech' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              ⚡ Nối Âm & Flap T Chuẩn Mỹ
            </button>

            <button
              onClick={() => setSelectedCategory('custom')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'custom' ? 'bg-amber-500 text-white shadow-sm' : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              ✏️ Tự Nhập Câu Bất Kỳ
            </button>
          </div>

          {/* CUSTOM SENTENCE MODE */}
          {selectedCategory === 'custom' && (
            <div className="bg-white rounded-3xl border border-indigo-200 p-6 sm:p-8 shadow-sm space-y-4 animate-fade-in">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  ✏️
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  Tự Nhập Câu Tiếng Anh Của Bạn Để Luyện Nói
                </h2>
              </div>

              <div className="space-y-3">
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  rows={2}
                  className="w-full p-4 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Gõ bất kỳ câu tiếng Anh nào bạn muốn luyện..."
                />

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => playAmericanSpeech(customText)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe giọng Mỹ mẫu</span>
                  </button>

                  <button
                    onClick={() => setActiveCustomEvaluation(true)}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Bắt Đầu Chấm Điểm
                  </button>
                </div>
              </div>

              {activeCustomEvaluation && customText && (
                <div className="pt-4 border-t border-slate-100">
                  <PronunciationScorer
                    targetText={customText}
                    onScoreCalculated={(score) => console.log('Score:', score)}
                  />
                </div>
              )}
            </div>
          )}

          {/* PRESET SENTENCE DRILL CARDS */}
          {selectedCategory !== 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPresets.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                        {item.category === 'ending-sounds' ? '🎯 Âm Đuôi' : item.category === 'vowels' ? '👄 Nguyên Âm' : '⚡ Nối Âm'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                      <p className="text-base font-black text-slate-900">
                        "{item.targetText}"
                      </p>
                      <p className="text-xs font-ipa font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded inline-block">
                        {item.ipa}
                      </p>
                      <p className="text-xs text-slate-500 pt-1">
                        👉 {item.meaningVi}
                      </p>
                    </div>

                    <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-100 font-medium">
                      💡 {item.vietnameseNote}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => playAmericanSpeech(item.targetText)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Nghe mẫu chuẩn</span>
                      </button>
                    </div>

                    <PronunciationScorer
                      targetText={item.targetText}
                      onScoreCalculated={(score) => console.log('Score:', score)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
