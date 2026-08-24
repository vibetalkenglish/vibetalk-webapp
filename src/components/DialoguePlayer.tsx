'use client';

import React, { useState, useEffect } from 'react';
import { DialogueLine } from '@/types';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { awardExp } from '@/lib/authStorage';
import { 
  Volume2, 
  Play, 
  Pause, 
  Eye, 
  EyeOff, 
  Sparkles, 
  MessageSquare, 
  Mic, 
  ChevronDown, 
  ChevronUp,
  UserCheck,
  Award,
  RotateCcw,
  Zap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import PronunciationScorer from './PronunciationScorer';
import confetti from 'canvas-confetti';

interface DialoguePlayerProps {
  lines: DialogueLine[];
  title?: string;
}

export default function DialoguePlayer({ lines, title = 'Đoạn Hội Thoại Thực Tế' }: DialoguePlayerProps) {
  const [mode, setMode] = useState<'listen' | 'roleplay'>('listen');
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [showVietnamese, setShowVietnamese] = useState(true);
  const [showIpa, setShowIpa] = useState(true);
  const [openScorerLineId, setOpenScorerLineId] = useState<string | null>(null);

  // Roleplay State
  const [userRole, setUserRole] = useState<'A' | 'B'>('B');
  const [roleplayStep, setRoleplayStep] = useState<number>(0);
  const [roleplayCompleted, setRoleplayCompleted] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);

  const speakerAName = lines.find(l => l.speaker === 'A')?.speakerName || 'Nhân vật A';
  const speakerBName = lines.find(l => l.speaker === 'B')?.speakerName || 'Nhân vật B';

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
          setTimeout(resolve, 750);
        });
      });
    }
    setActiveLineId(null);
    setIsPlayingAll(false);
  };

  // Roleplay logic
  useEffect(() => {
    if (mode === 'roleplay' && !roleplayCompleted && roleplayStep < lines.length) {
      const currentLine = lines[roleplayStep];
      if (currentLine && currentLine.speaker !== userRole) {
        // AI Turn
        setIsAiSpeaking(true);
        const timer = setTimeout(() => {
          playAmericanSpeech(currentLine.textEn, 0.9, () => {
            setIsAiSpeaking(false);
            // Auto advance to next step (user's turn)
            if (roleplayStep + 1 < lines.length) {
              setRoleplayStep(roleplayStep + 1);
            } else {
              finishRoleplay();
            }
          });
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [mode, roleplayStep, userRole, roleplayCompleted]);

  const handleNextRoleplayStep = () => {
    if (roleplayStep + 1 < lines.length) {
      setRoleplayStep(roleplayStep + 1);
    } else {
      finishRoleplay();
    }
  };

  const finishRoleplay = () => {
    setRoleplayCompleted(true);
    awardExp(30, 'Hoàn thành đóng kịch đối thoại: ' + title);
    try {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const resetRoleplay = () => {
    setRoleplayStep(0);
    setRoleplayCompleted(false);
    setIsAiSpeaking(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
      {/* Header & Tabs */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black">{title}</h3>
              <span className="text-xs text-indigo-200 block">Luyện nghe, Shadowing và Đóng vai tương tác 1-1 với AI</span>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-white/10 p-1 rounded-2xl border border-white/15 backdrop-blur-sm self-start sm:self-auto">
            <button
              onClick={() => { setMode('listen'); resetRoleplay(); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                mode === 'listen'
                  ? 'bg-white text-indigo-950 shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              🎧 Nghe & Shadowing
            </button>
            <button
              onClick={() => { setMode('roleplay'); resetRoleplay(); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                mode === 'roleplay'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>🎭 Đóng Vai 1-1</span>
            </button>
          </div>
        </div>

        {/* Listen Controls Toolbar */}
        {mode === 'listen' && (
          <div className="flex items-center gap-2 flex-wrap pt-4 mt-4 border-t border-white/10">
            <button
              onClick={playAllLines}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {showVietnamese ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
              <span>Bản dịch</span>
            </button>

            <button
              onClick={() => setShowIpa(!showIpa)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Sparkles className={`w-3.5 h-3.5 ${showIpa ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>Phiên âm IPA</span>
            </button>
          </div>
        )}
      </div>

      {/* MODE 1: LISTEN & SHADOWING */}
      {mode === 'listen' && (
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
                  {/* Avatar */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm ${
                      isSpeakerA ? 'bg-indigo-100' : 'bg-emerald-100'
                    }`}>
                      {line.avatar}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 mt-1 truncate max-w-[65px] text-center">
                      {line.speakerName}
                    </span>
                  </div>

                  {/* Speech Bubble */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {line.textEn}
                      </p>

                      <button
                        onClick={() => playSingleLine(line)}
                        className="w-8 h-8 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
                        title="Nghe câu này"
                      >
                        <Volume2 className={`w-4 h-4 ${isActive ? 'animate-bounce' : ''}`} />
                      </button>
                    </div>

                    {showIpa && (
                      <div className="py-0.5">
                        <span className="inline-block text-xs sm:text-sm font-ipa font-bold text-indigo-700 bg-indigo-50/90 px-3 py-1 rounded-xl border border-indigo-200/80 tracking-wider shadow-xs">
                          {line.ipa}
                        </span>
                      </div>
                    )}

                    {showVietnamese && (
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        👉 {line.textVi}
                      </p>
                    )}
                  </div>
                </div>

                {/* Scorer Toggle */}
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
      )}

      {/* MODE 2: ROLEPLAY DUET 1-1 WITH AI */}
      {mode === 'roleplay' && (
        <div className="p-5 sm:p-8 bg-slate-50/70 space-y-6">
          {/* Role Selector Header */}
          {!roleplayCompleted && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Chọn nhân vật của bạn:
                </span>
                <span className="text-xs font-bold text-slate-800">
                  AI sẽ đóng vai còn lại và đối thoại luân phiên cùng bạn.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setUserRole('A'); resetRoleplay(); }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                    userRole === 'A'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Tôi là {speakerAName} (Vai A)
                </button>
                <button
                  onClick={() => { setUserRole('B'); resetRoleplay(); }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                    userRole === 'B'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Tôi là {speakerBName} (Vai B)
                </button>
              </div>
            </div>
          )}

          {/* Active Roleplay Scene */}
          {!roleplayCompleted ? (
            <div className="space-y-4">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Lượt thoại: {roleplayStep + 1} / {lines.length}</span>
                <span>{lines[roleplayStep]?.speaker === userRole ? '👉 ĐẾN LƯỢT BẠN NÓI' : '🤖 AI ĐANG NÓI...'}</span>
              </div>

              {/* Current Line Card */}
              {lines[roleplayStep] && (
                <div className={`p-5 sm:p-7 rounded-3xl border-2 shadow-lg transition-all animate-fade-in ${
                  lines[roleplayStep].speaker === userRole
                    ? 'bg-gradient-to-br from-indigo-50 via-white to-indigo-50/50 border-indigo-500'
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">
                      {lines[roleplayStep].avatar}
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          {lines[roleplayStep].speakerName}
                        </span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          lines[roleplayStep].speaker === userRole
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {lines[roleplayStep].speaker === userRole ? 'BẠN ĐÓNG VAI NÀY' : 'AI NÓI'}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                        {lines[roleplayStep].textEn}
                      </h3>

                      <div className="py-1">
                        <span className="inline-block text-sm font-ipa font-bold text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-xl border border-indigo-200 shadow-xs">
                          {lines[roleplayStep].ipa}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 italic">
                        👉 {lines[roleplayStep].textVi}
                      </p>
                    </div>
                  </div>

                  {/* If user's turn: Show Scorer directly */}
                  {lines[roleplayStep].speaker === userRole ? (
                    <div className="mt-5 pt-5 border-t border-indigo-100 space-y-3">
                      <PronunciationScorer
                        targetText={lines[roleplayStep].textEn}
                        targetIpa={lines[roleplayStep].ipa}
                        label="🎤 Đọc to câu thoại của bạn"
                      />

                      <button
                        onClick={handleNextRoleplayStep}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer mt-2"
                      >
                        <span>Tiếp Tục Lượt Thoại Tiếp Theo</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {isAiSpeaking ? 'AI đang đọc câu thoại...' : 'Đã phát xong'}
                      </span>

                      <button
                        onClick={() => playAmericanSpeech(lines[roleplayStep].textEn)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-bold flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe Lại</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Roleplay Completed Celebration Screen */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 text-center space-y-4 shadow-lg animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-emerald-100 border-3 border-emerald-400 text-emerald-600 flex items-center justify-center mx-auto text-4xl shadow-md">
                👑
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-3xl font-black text-slate-900">
                  Hoàn Thành Xuất Sắc Vở Kịch 1-1!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Bạn đã hoàn thành đối thoại trôi chảy với AI và nhận được <strong>+30 EXP</strong>!
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-bold text-amber-800">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>+30 EXP Thưởng Đóng Vai</span>
              </div>

              <div className="pt-3">
                <button
                  onClick={resetRoleplay}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Đổi Vai & Đóng Kịch Lại</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
