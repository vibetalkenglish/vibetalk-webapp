'use client';

import React, { useState } from 'react';
import PronunciationScorer from '@/components/PronunciationScorer';
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
  BookOpen
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
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ending-sounds' | 'vowels' | 'connected-speech' | 'custom'>('all');
  const [customText, setCustomText] = useState('I want to speak American English fluently.');
  const [activeCustomEvaluation, setActiveCustomEvaluation] = useState(false);

  const filteredPresets = PRACTICE_PRESETS.filter(
    item => selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phòng Luyện Phát Âm AI Thông Minh (100% Miễn Phí)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Chấm Điểm & Luyện Nói Giọng Anh - Mỹ
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            Luyện tập các thử thách ngữ âm khắc phục lỗi nuốt âm đuôi cho người Việt, hoặc tự nhập bất kỳ câu tiếng Anh nào để AI phân tích từng từ theo thời gian thực.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          Tất Cả Thử Thách
        </button>

        <button
          onClick={() => setSelectedCategory('ending-sounds')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'ending-sounds' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          🎯 Luyện Âm Đuôi (/s/, /t/, /d/, /k/)
        </button>

        <button
          onClick={() => setSelectedCategory('vowels')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'vowels' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          👄 Cặp Nguyên Âm (/iː/ vs /ɪ/, /æ/)
        </button>

        <button
          onClick={() => setSelectedCategory('connected-speech')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'connected-speech' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          ⚡ Nối Âm & Flap T Chuẩn Mỹ
        </button>

        <button
          onClick={() => setSelectedCategory('custom')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
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
              <Type className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Tự Nhập Câu Tiếng Anh Của Bạn</h2>
              <p className="text-xs text-slate-500">Nhập hoặc dán câu bạn muốn luyện và nhấn nút để AI chấm điểm</p>
            </div>
          </div>

          <div className="space-y-3">
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              rows={3}
              placeholder="Nhập câu tiếng Anh bất kỳ (ví dụ: Practice makes perfect every single day...)"
              className="w-full p-4 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />

            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => playAmericanSpeech(customText, 0.88)}
                disabled={!customText.trim()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                <Volume2 className="w-4 h-4 text-indigo-600" />
                <span>Nghe Mẫu Giọng Mỹ</span>
              </button>

              <span className="text-[11px] text-slate-400">
                {customText.trim().split(/\s+/).filter(Boolean).length} từ
              </span>
            </div>

            {customText.trim() && (
              <div className="pt-3 border-t border-slate-100">
                <PronunciationScorer
                  targetText={customText.trim()}
                  label="🎤 Nói Câu Này Để Chấm Điểm"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* PRESET PRACTICE EXERCISES */}
      {selectedCategory !== 'custom' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {filteredPresets.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                {/* Header with Title & IPA */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {item.category.replace('-', ' ')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  </div>

                  <button
                    onClick={() => playAmericanSpeech(item.targetText, 0.88)}
                    className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 text-xs font-bold transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe Mẫu Giọng Mỹ</span>
                  </button>
                </div>

                {/* Target Sentence Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                  <p className="text-base sm:text-lg font-bold text-slate-900">
                    &ldquo;{item.targetText}&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm font-serif font-semibold text-indigo-600">
                    {item.ipa}
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    👉 {item.meaningVi}
                  </p>
                </div>

                {/* Vietnamese Note */}
                <div className="flex items-start gap-2 text-xs bg-amber-50 text-amber-900 p-3 rounded-xl border border-amber-100">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Lưu ý phát âm cho người Việt: </strong>
                    <span>{item.vietnameseNote}</span>
                  </div>
                </div>

                {/* Interactive Pronunciation Scorer */}
                <div className="pt-2">
                  <PronunciationScorer
                    targetText={item.targetText}
                    targetIpa={item.ipa}
                    label="🎤 Thử Phát Âm & Nhận Điểm Số"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
