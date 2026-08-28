'use client';

import React, { useState, useEffect, useRef } from 'react';
import { playAmericanSpeech, speechEngine } from '@/lib/speechHelper';
import { awardExp } from '@/lib/authStorage';
import confetti from 'canvas-confetti';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  MessageSquare, 
  RotateCcw, 
  ShieldCheck, 
  Award,
  Globe,
  HelpCircle,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface ChatTurn {
  id: string;
  sender: 'ai' | 'user';
  textEn: string;
  textVi?: string;
  correctionTipEn?: string;
  correctionTipVi?: string;
  timestamp: number;
}

export default function VoiceAiTutorCall() {
  const [selectedPersona, setSelectedPersona] = useState<'jessica' | 'david' | 'sam'>('jessica');
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [transcriptInput, setTranscriptInput] = useState('');
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [turnsCount, setTurnsCount] = useState(0);

  // Recognition ref
  const recognitionRef = useRef<any>(null);
  const isCallActiveRef = useRef(isCallActive);
  isCallActiveRef.current = isCallActive;

  const personas = {
    jessica: {
      name: 'Jessica (New York)',
      avatar: '👩‍💼',
      role: 'Gia Sư Đời Sống & Cafe',
      accent: 'Giọng Nữ New York',
      greetingEn: "Hey there! I'm Jessica from New York! How is your day going so far? Want to chat about your hobbies or coffee?",
      greetingVi: "Chào bạn! Tôi là Jessica đến từ New York! Ngày hôm nay của bạn thế nào rồi? Muốn nói về sở thích hay cà phê không?",
      gender: 'female' as const,
      color: 'from-pink-500 to-rose-600'
    },
    david: {
      name: 'David (California)',
      avatar: '👨‍💼',
      role: 'Chuyên Gia Phỏng Vấn & Công Sở',
      accent: 'Giọng Nam Silicon Valley',
      greetingEn: "Hello! I'm David from Silicon Valley. Are you ready to practice for your upcoming job interview or business presentation?",
      greetingVi: "Xin chào! Tôi là David từ Thung lũng Silicon. Bạn sẵn sàng luyện phỏng vấn xin việc hoặc họp công sở chưa?",
      gender: 'male' as const,
      color: 'from-blue-600 to-indigo-700'
    },
    sam: {
      name: 'Sam (Texas)',
      avatar: '🤠',
      role: 'Bạn Đồng Hành Du Lịch Toàn Cầu',
      accent: 'Giọng Nam Phóng Khoáng',
      greetingEn: "Howdy! I'm Sam from Texas! Where are you planning to travel next? Need help with airport customs or hotel booking?",
      greetingVi: "Chào bạn! Tôi là Sam từ Texas! Điểm du lịch tiếp theo của bạn là đâu? Cần tôi giúp thủ tục sân bay hay đặt phòng không?",
      gender: 'male' as const,
      color: 'from-amber-500 to-orange-600'
    }
  };

  const currentPersona = personas[selectedPersona];

  // Initialize Web Speech API Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const spokenText = event.results[0][0].transcript;
          if (spokenText && spokenText.trim()) {
            handleUserSpoke(spokenText.trim());
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          if (isCallActiveRef.current) {
            setCallStatus('idle');
          }
        };

        recognition.onend = () => {
          if (isCallActiveRef.current && callStatus === 'listening') {
            setCallStatus('idle');
          }
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      speechEngine.stop();
    };
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) {
      alert('Trình duyệt của bạn chưa hỗ trợ Web Speech Recognition. Hãy dùng Google Chrome hoặc Safari trên iOS/Android để nhận diện giọng nói tốt nhất.');
      return;
    }
    speechEngine.stop();
    setCallStatus('listening');
    try {
      recognitionRef.current.start();
    } catch (e) {
      // already started
    }
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    setTurnsCount(0);
    const initialGreeting: ChatTurn = {
      id: 'msg-0',
      sender: 'ai',
      textEn: currentPersona.greetingEn,
      textVi: currentPersona.greetingVi,
      timestamp: Date.now()
    };
    setMessages([initialGreeting]);
    setCallStatus('speaking');

    playAmericanSpeech(currentPersona.greetingEn, 0.88, () => {
      if (isCallActiveRef.current) {
        setCallStatus('idle');
        // Auto start listening for hands-free call experience
        setTimeout(() => {
          if (isCallActiveRef.current) startListening();
        }, 500);
      }
    }, { gender: currentPersona.gender });
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallStatus('idle');
    speechEngine.stop();
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }

    if (turnsCount >= 2) {
      awardExp(30, 'Hoàn thành cuộc gọi với Gia Sư AI');
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleUserSpoke = async (userText: string) => {
    const userMsg: ChatTurn = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      textEn: userText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setTurnsCount(prev => prev + 1);
    setCallStatus('thinking');

    try {
      // Format messages history for API
      const history = [...messages, userMsg].map(m => ({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: m.textEn
      }));

      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          persona: selectedPersona
        })
      });

      const data = await res.json();
      const aiReply: ChatTurn = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        textEn: data.replyEn || "That is very interesting! Tell me more about that.",
        textVi: data.replyVi || "Thú vị thật đấy! Kể cho tôi nghe thêm nhé.",
        correctionTipEn: data.correctionTipEn,
        correctionTipVi: data.correctionTipVi,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiReply]);
      setCallStatus('speaking');

      playAmericanSpeech(aiReply.textEn, 0.88, () => {
        if (isCallActiveRef.current) {
          setCallStatus('idle');
          // Auto prompt next turn
          setTimeout(() => {
            if (isCallActiveRef.current) startListening();
          }, 600);
        }
      }, { gender: currentPersona.gender });
    } catch (err) {
      console.error('AI chat failed:', err);
      setCallStatus('idle');
    }
  };

  const handleManualTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcriptInput.trim()) return;
    const text = transcriptInput.trim();
    setTranscriptInput('');
    handleUserSpoke(text);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden space-y-6">
      {/* 1. Header Persona Bar */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-bold border border-indigo-400/30">
              🎙️ Voice-to-Voice AI Tutor
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-[11px] font-black border border-emerald-400/40">
              100% Free Quota
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Luyện Đàm Thoại 1-1 Với Gia Sư AI Bản Xứ
          </h2>
          <p className="text-xs text-slate-300">
            Nói chuyện tự do bằng giọng nói thời gian thực • Nhận phản hồi ngữ pháp & từ vựng tức thì
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {(Object.keys(personas) as Array<keyof typeof personas>).map(pKey => {
            const p = personas[pKey];
            const isSelected = selectedPersona === pKey;
            return (
              <button
                key={pKey}
                disabled={isCallActive}
                onClick={() => setSelectedPersona(pKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-md ring-2 ring-indigo-400'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <span className="text-base">{p.avatar}</span>
                <span>{p.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Call Screen Container */}
      <div className="px-5 sm:px-8 pb-8 space-y-6">
        {!isCallActive ? (
          /* IDLE / PRE-CALL SCREEN */
          <div className="py-12 text-center space-y-6 max-w-lg mx-auto">
            <div className="relative inline-block">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center text-5xl shadow-xl mx-auto ring-4 ring-indigo-100 animate-pulse">
                {currentPersona.avatar}
              </div>
              <div className="absolute bottom-0 right-0 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black border-2 border-white shadow-xs">
                ONLINE
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentPersona.name}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-indigo-600">
                {currentPersona.role} • {currentPersona.accent}
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto pt-1">
                "{currentPersona.greetingVi}"
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={handleStartCall}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 cursor-pointer"
              >
                <Phone className="w-5 h-5 animate-bounce" />
                <span>Bắt Đầu Cuộc Gọi Thoại 1-1</span>
              </button>
            </div>
          </div>
        ) : (
          /* LIVE CALL IN-PROGRESS SCREEN */
          <div className="space-y-6 animate-fade-in">
            {/* Call State Avatar & Wave Indicator */}
            <div className="p-6 bg-gradient-to-b from-slate-900 to-indigo-950 rounded-3xl text-white text-center space-y-4 shadow-inner relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Cuộc gọi đang diễn ra ({turnsCount} lượt đối thoại)
                </span>

                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className="text-[11px] font-bold text-indigo-300 hover:text-white bg-white/10 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  {showSubtitles ? 'Ẩn phụ đề' : 'Hiện phụ đề'}
                </button>
              </div>

              {/* Central Pulsating Avatar */}
              <div className="relative inline-block py-2">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-4xl sm:text-5xl shadow-2xl mx-auto transition-all ${
                  callStatus === 'speaking'
                    ? 'ring-8 ring-indigo-400/40 bg-gradient-to-tr from-purple-500 to-pink-500 scale-105 animate-pulse'
                    : callStatus === 'listening'
                    ? 'ring-8 ring-emerald-400/40 bg-gradient-to-tr from-emerald-500 to-teal-500 scale-105 animate-pulse'
                    : 'bg-indigo-700/60 ring-4 ring-white/10'
                }`}>
                  {currentPersona.avatar}
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black shadow-md ${
                  callStatus === 'speaking'
                    ? 'bg-purple-500 text-white animate-pulse'
                    : callStatus === 'listening'
                    ? 'bg-emerald-500 text-white animate-pulse'
                    : callStatus === 'thinking'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-white/15 text-slate-300'
                }`}>
                  {callStatus === 'speaking' && '🗣️ Gia Sư AI đang trả lời...'}
                  {callStatus === 'listening' && '🎙️ Đang lắng nghe giọng bạn... (Hãy nói)'}
                  {callStatus === 'thinking' && '🧠 AI đang suy nghĩ câu trả lời...'}
                  {callStatus === 'idle' && 'Bấm Mic bên dưới để nói'}
                </span>
              </div>

              {/* Sound Wave Animation Visualizer */}
              <div className="flex items-center justify-center gap-1.5 h-6">
                {[40, 70, 90, 60, 100, 50, 80, 30, 90, 60].map((height, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      callStatus === 'speaking'
                        ? 'bg-purple-400'
                        : callStatus === 'listening'
                        ? 'bg-emerald-400'
                        : 'bg-white/20'
                    }`}
                    style={{
                      height: (callStatus === 'speaking' || callStatus === 'listening')
                        ? `${Math.max(15, (height * Math.random()) + 15)}px`
                        : '6px'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Conversation Transcript Stream */}
            {showSubtitles && (
              <div className="space-y-3 max-h-[300px] overflow-y-auto p-4 bg-slate-50 rounded-2xl border border-slate-200">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm space-y-1 shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none'
                      }`}
                    >
                      <p className="font-bold leading-relaxed">{msg.textEn}</p>
                      {msg.textVi && (
                        <p className={`text-[11px] ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-500'}`}>
                          👉 {msg.textVi}
                        </p>
                      )}
                    </div>

                    {/* Smart Feedback Correction Card */}
                    {msg.correctionTipEn && (
                      <div className="max-w-[85%] p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-0.5 animate-fade-in">
                        <span className="font-black text-[10px] uppercase text-amber-700 block">
                          💡 Gợi ý diễn đạt bản xứ:
                        </span>
                        <p className="font-bold">"{msg.correctionTipEn}"</p>
                        {msg.correctionTipVi && (
                          <p className="text-[11px] text-amber-800">👉 {msg.correctionTipVi}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Live Controls Bar */}
            <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Voice Action Button */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                <button
                  onClick={startListening}
                  disabled={callStatus === 'speaking' || callStatus === 'thinking'}
                  className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black shadow-md transition-all active:scale-95 cursor-pointer ${
                    callStatus === 'listening'
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-300 animate-pulse'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                  <span>{callStatus === 'listening' ? 'Đang nghe bạn...' : 'Bấm Để Nói'}</span>
                </button>

                <button
                  onClick={handleEndCall}
                  className="px-5 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>Kết Thúc Cuộc Gọi</span>
                </button>
              </div>

              {/* Fallback Text Input (If noisy environment) */}
              <form onSubmit={handleManualTextSubmit} className="w-full sm:w-auto flex-1 max-w-sm flex items-center gap-2">
                <input
                  type="text"
                  value={transcriptInput}
                  onChange={(e) => setTranscriptInput(e.target.value)}
                  placeholder="Hoặc gõ câu tiếng Anh vào đây..."
                  className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!transcriptInput.trim()}
                  className="px-3 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold disabled:opacity-40 cursor-pointer"
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
