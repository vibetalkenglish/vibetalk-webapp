'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  BrowserSpeechRecognizer, 
  evaluatePronunciation, 
  PronunciationResult, 
  WordScore 
} from '@/lib/pronunciationEngine';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { awardExp } from '@/lib/authStorage';
import { 
  Mic, 
  Square, 
  Play, 
  RotateCcw, 
  Volume2, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Award,
  ChevronDown
} from 'lucide-react';

interface PronunciationScorerProps {
  targetText: string;
  targetIpa?: string;
  label?: string;
  compact?: boolean;
  onScoreCalculated?: (result: PronunciationResult) => void;
}

export default function PronunciationScorer({
  targetText,
  targetIpa,
  label = 'Chấm Điểm Phát Âm',
  compact = false,
  onScoreCalculated,
}: PronunciationScorerProps) {
  const [isListening, setIsListening] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [selectedWord, setSelectedWord] = useState<WordScore | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingRecorded, setIsPlayingRecorded] = useState(false);
  const [isPlayingNative, setIsPlayingNative] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  const recognizerRef = useRef<BrowserSpeechRecognizer | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    recognizerRef.current = new BrowserSpeechRecognizer();
    if (recognizerRef.current) {
      setIsSpeechSupported(recognizerRef.current.isSupported());
    }
  }, []);

  const getSupportedMimeType = () => {
    if (typeof MediaRecorder === 'undefined') return undefined;
    const types = ['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/wav'];
    for (const t of types) {
      if (MediaRecorder.isTypeSupported(t)) return t;
    }
    return undefined;
  };

  const startScoring = async () => {
    setErrorMessage(null);
    setSpokenTranscript('');
    setResult(null);
    setSelectedWord(null);
    setAudioUrl(null);

    // 1. Audio Recording for Playback
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mimeType = getSupportedMimeType();
      const mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
    } catch (err) {
      console.warn('Microphone stream access error:', err);
    }

    // 2. Speech Recognition
    if (!recognizerRef.current) {
      recognizerRef.current = new BrowserSpeechRecognizer();
    }

    if (!recognizerRef.current.isSupported()) {
      setIsSpeechSupported(false);
      setErrorMessage('Trình duyệt chưa bật nhận diện giọng nói Web Speech. Bạn vẫn có thể thu âm và nghe lại giọng của mình để so sánh với giọng chuẩn Mỹ!');
      setIsListening(true);
      return;
    }

    setIsListening(true);
    let lastRecognized = '';

    recognizerRef.current.start(
      (transcript, isFinal) => {
        lastRecognized = transcript;
        setSpokenTranscript(transcript);
        if (isFinal) {
          finishScoring(transcript);
        }
      },
      (error) => {
        console.warn('Recognition notice/error:', error);
        setIsListening(false);
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
        if (error === 'not-allowed') {
          setErrorMessage('Vui lòng cho phép quyền truy cập Micro trên trình duyệt để AI chấm điểm.');
        } else if (lastRecognized) {
          finishScoring(lastRecognized);
        } else {
          setErrorMessage('Chưa nghe rõ giọng nói. Bạn hãy nói to, dứt khoát và thử lại nhé!');
        }
      },
      () => {
        setIsListening(false);
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
        if (lastRecognized) {
          finishScoring(lastRecognized);
        }
      }
    );
  };

  const stopScoring = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stop();
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsListening(false);
    if (spokenTranscript) {
      finishScoring(spokenTranscript);
    }
  };

  const finishScoring = (transcript: string) => {
    setIsEvaluating(true);
    setTimeout(() => {
      const evalResult = evaluatePronunciation(targetText, transcript);
      setResult(evalResult);
      setIsEvaluating(false);
      if (evalResult.overallScore >= 80) {
        awardExp(20, 'Phát âm chuẩn xác ' + targetText);
      }
      if (onScoreCalculated) {
        onScoreCalculated(evalResult);
      }
    }, 250);
  };

  const playRecordedAudio = () => {
    if (audioUrl) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      const audio = new Audio(audioUrl);
      audioPlayerRef.current = audio;
      setIsPlayingRecorded(true);
      audio.play();
      audio.onended = () => setIsPlayingRecorded(false);
      audio.onerror = () => setIsPlayingRecorded(false);
    }
  };

  const playNativeAudio = () => {
    setIsPlayingNative(true);
    playAmericanSpeech(targetText, 0.88, () => setIsPlayingNative(false));
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-300';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-300';
    return 'text-rose-600 bg-rose-50 border-rose-300';
  };

  const getWordBgColor = (status: WordScore['status']) => {
    switch (status) {
      case 'excellent':
        return 'bg-emerald-100/90 text-emerald-900 border-emerald-300 hover:bg-emerald-200';
      case 'good':
        return 'bg-amber-100/90 text-amber-900 border-amber-300 hover:bg-amber-200';
      case 'poor':
        return 'bg-rose-100/90 text-rose-900 border-rose-300 hover:bg-rose-200';
      case 'missing':
        return 'bg-slate-100 text-slate-400 border-slate-200 line-through';
    }
  };

  return (
    <div className={`rounded-2xl border transition-all ${
      result 
        ? result.overallScore >= 80 
          ? 'border-emerald-200 bg-emerald-50/25' 
          : 'border-amber-200 bg-amber-50/25' 
        : 'border-slate-200 bg-slate-50/60'
    } p-3.5 sm:p-4 space-y-3`}>
      
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {!isListening ? (
            <button
              onClick={startScoring}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm shadow-indigo-600/30 transition-transform active:scale-95 touch-manipulation"
            >
              <Mic className="w-4 h-4" />
              <span>{result ? 'Nói Lại Để Chấm Điểm' : label}</span>
            </button>
          ) : (
            <button
              onClick={stopScoring}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs animate-pulse shadow-md active:scale-95 touch-manipulation"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>Đang Lắng Nghe... Nhấn để Dừng</span>
            </button>
          )}

          {/* Quick Native Audio Button */}
          <button
            onClick={playNativeAudio}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors shadow-xs"
            title="Nghe giọng chuẩn người Mỹ"
          >
            <Volume2 className={`w-4 h-4 ${isPlayingNative ? 'animate-bounce text-indigo-600' : ''}`} />
          </button>
        </div>

        {/* Free Badge */}
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          ✨ AI Chấm Miễn Phí
        </span>
      </div>

      {/* Live Speaking Indicator */}
      {isListening && (
        <div className="p-3 bg-white rounded-xl border border-indigo-200 text-xs flex items-center gap-2 text-indigo-900 animate-fade-in shadow-xs">
          <div className="flex gap-1 items-center flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping delay-100" />
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping delay-200" />
          </div>
          <span className="italic break-words">
            {spokenTranscript ? `"${spokenTranscript}"` : 'Hãy nói câu tiếng Anh của bạn vào Micro...'}
          </span>
        </div>
      )}

      {/* Evaluating Spinner */}
      {isEvaluating && (
        <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
          <div className="w-3.5 h-3.5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />
          <span>AI đang phân tích từng âm vị và độ chuẩn xác...</span>
        </div>
      )}

      {/* Error / Fallback Message */}
      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600 mt-0.5" />
          <div className="space-y-1">
            <span>{errorMessage}</span>
            {audioUrl && (
              <div className="pt-1">
                <button
                  onClick={playRecordedAudio}
                  className="inline-flex items-center gap-1 font-bold text-indigo-700 underline"
                >
                  <Play className="w-3 h-3 fill-indigo-700" /> Nghe lại giọng của bạn
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PRONUNCIATION ASSESSMENT RESULT */}
      {result && !isListening && (
        <div className="space-y-3 bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs animate-fade-in">
          {/* Score Header */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              {/* Circular Percentage Badge */}
              <div className={`w-12 h-12 rounded-2xl border-2 flex flex-col items-center justify-center font-black flex-shrink-0 ${getScoreColor(result.overallScore)}`}>
                <span className="text-base leading-none">{result.overallScore}%</span>
                <span className="text-[9px] uppercase font-bold tracking-tighter">Điểm</span>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {result.generalFeedbackVi}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 break-words">
                  Bạn đã nói: &ldquo;<span className="italic font-medium text-slate-700">{result.transcript || '(chưa nghe rõ)'}</span>&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Word-by-Word Colored Breakdown */}
          <div className="space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 gap-1">
              <span>Bấm vào từng từ để xem chi tiết:</span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Chuẩn
                </span>
                <span className="flex items-center gap-1 text-[10px] text-amber-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Cần chỉnh
                </span>
                <span className="flex items-center gap-1 text-[10px] text-rose-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Sai / Thiếu
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {result.words.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedWord(w === selectedWord ? null : w)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-all ${getWordBgColor(w.status)} ${
                    selectedWord === w ? 'ring-2 ring-indigo-500 scale-105 shadow-xs' : ''
                  }`}
                >
                  <span>{w.targetWord}</span>
                  <span className="text-[10px] opacity-75 block font-serif -mt-0.5">
                    {w.score}%
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Word Detail Tooltip Box */}
          {selectedWord && (
            <div className="p-3 bg-indigo-50/80 rounded-xl border border-indigo-200 text-xs text-indigo-950 space-y-1 animate-fade-in">
              <div className="flex items-center justify-between font-bold flex-wrap gap-1">
                <span>Từ: &ldquo;{selectedWord.targetWord}&rdquo; ({selectedWord.score}%)</span>
                <span className="text-[10px] text-indigo-700">
                  {selectedWord.spokenWord ? `AI nhận diện: "${selectedWord.spokenWord}"` : 'Không nhận diện được từ'}
                </span>
              </div>
              <p className="text-slate-600">
                👉 {selectedWord.vietnameseFeedback || 'Phát âm chuẩn xác! Hãy duy trì ngữ điệu này.'}
              </p>
            </div>
          )}

          {/* Ending Sound Diagnostic Alert (Special for Vietnamese Learners) */}
          {result.endingSoundFeedbackVi && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Mẹo Âm Đuôi Cho Người Việt: </strong>
                <span>{result.endingSoundFeedbackVi}</span>
              </div>
            </div>
          )}

          {/* Audio Comparison Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              {audioUrl && (
                <button
                  onClick={playRecordedAudio}
                  disabled={isPlayingRecorded}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-700" />
                  <span>{isPlayingRecorded ? 'Đang phát...' : 'Nghe giọng bạn'}</span>
                </button>
              )}

              <button
                onClick={playNativeAudio}
                disabled={isPlayingNative}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold transition-colors active:scale-95"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingNative ? 'Đang phát...' : 'Nghe giọng Mỹ'}</span>
              </button>
            </div>

            <button
              onClick={startScoring}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Nói lại</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
