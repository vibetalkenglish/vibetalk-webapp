'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { LEVEL_TESTS } from '@/data/testsData';
import { LEVELS_CONFIG } from '@/data/lessonsData';
import { playAmericanSpeech } from '@/lib/speechHelper';
import { recordTestResult, getUserProgress } from '@/lib/storage';
import { awardExp } from '@/lib/authStorage';
import { LevelId } from '@/types';
import { 
  Award, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  HelpCircle,
  Zap,
  Lock
} from 'lucide-react';

export default function LevelTestPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = (params.levelId as LevelId) || 'lv0';

  const test = LEVEL_TESTS[levelId];
  const levelConfig = LEVELS_CONFIG.find((l) => l.id === levelId) || LEVELS_CONFIG[0];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const progress = getUserProgress();
    const existing = progress.testResults[levelId];
    if (existing) {
      setScore(existing.score);
      setPassed(existing.passed);
    }
  }, [levelId]);

  if (!test) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy bài kiểm tra</h2>
        <Link
          href="/lessons"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại lộ trình bài học</span>
        </Link>
      </div>
    );
  }

  const currentQ = test.questions[currentQuestionIdx];

  const handlePlayPromptAudio = (text?: string) => {
    if (!text) return;
    setIsPlayingAudio(true);
    playAmericanSpeech(text, 0.88, () => setIsPlayingAudio(false));
  };

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIdx]: optIdx,
    });
  };

  const handleSubmitTest = () => {
    let correctCount = 0;
    test.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / test.questions.length) * 100);
    const isPass = calculatedScore >= test.passingScore;

    setScore(calculatedScore);
    setPassed(isPass);
    setIsSubmitted(true);

    recordTestResult(levelId, calculatedScore, isPass);

    if (isPass) {
      awardExp(150, 'Đậu bài test ' + levelConfig.title);
      // Trigger festive confetti animation
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIdx(0);
    setScore(0);
    setPassed(false);
  };

  const isAllAnswered = Object.keys(selectedAnswers).length === test.questions.length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
            {levelConfig.badge}
          </span>
          <span className="text-xs text-indigo-200">
            Yêu cầu đỗ: {test.passingScore}%
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black">{test.titleVi}</h1>
        <p className="text-xs sm:text-sm text-indigo-100/90">{test.descriptionVi}</p>
      </div>

      {!isSubmitted ? (
        // TEST IN PROGRESS
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Câu hỏi {currentQuestionIdx + 1} / {test.questions.length}</span>
              <span>Đã trả lời: {Object.keys(selectedAnswers).length}/{test.questions.length}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIdx + 1) / test.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Prompt */}
          <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
                  {currentQ.promptVi}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {currentQ.prompt}
                </h3>
              </div>

              {currentQ.audioText && (
                <button
                  onClick={() => handlePlayPromptAudio(currentQ.audioText)}
                  className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex-shrink-0 shadow-md shadow-indigo-600/30 transition-transform active:scale-95"
                  title="Nghe phát âm chuẩn giọng Mỹ"
                >
                  <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                </button>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl text-left font-semibold text-sm transition-all border flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-900 shadow-sm ring-2 ring-indigo-500/20'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIdx === 0}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                currentQuestionIdx === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Câu trước
            </button>

            {currentQuestionIdx < test.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIdx((prev) => Math.min(test.questions.length - 1, prev + 1))}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
              >
                Câu tiếp theo
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                disabled={!isAllAnswered}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all ${
                  isAllAnswered
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Nộp Bài Kiểm Tra
              </button>
            )}
          </div>
        </div>
      ) : (
        // TEST RESULT SUMMARY & EXPLANATION
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
          <div className={`p-6 rounded-3xl text-center space-y-3 ${
            passed ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
          }`}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-2">
              {passed ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              ) : (
                <XCircle className="w-10 h-10 text-rose-600" />
              )}
            </div>

            <h2 className="text-2xl font-black">
              {passed ? '🎉 Chúc Mừng Bạn Đã Vượt Qua!' : 'Cố Gắng Lên Bạn Ơi!'}
            </h2>
            <p className="text-sm font-semibold">
              Điểm số: <span className="text-2xl font-black">{score}%</span> ({test.questions.filter((q, i) => selectedAnswers[i] === q.correctAnswerIndex).length}/{test.questions.length} câu đúng)
            </p>
            <p className="text-xs max-w-md mx-auto">
              {passed
                ? 'Bạn đã làm chủ kiến thức bài học và chính thức mở khóa cấp độ tiếp theo!'
                : 'Bạn cần đạt tối thiểu 80% để mở khóa level mới. Hãy xem lại giải thích chi tiết bên dưới và làm lại nhé!'}
            </p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={handleRetry}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-slate-800 rounded-xl text-xs font-bold shadow-sm hover:bg-slate-100"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm lại bài test</span>
              </button>

              {passed && (
                <Link
                  href="/lessons"
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <span>Xem Level Mới Mở Khóa</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Detailed Question Review & Explanations */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Chi Tiết Lời Giải & Mẹo Phát Âm Từng Câu:
            </h3>

            {test.questions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.correctAnswerIndex;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    isCorrect ? 'bg-slate-50 border-slate-200' : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900">
                      Câu {idx + 1}: {q.prompt}
                    </span>
                    {isCorrect ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1 flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> Đúng
                      </span>
                    ) : (
                      <span className="text-rose-600 font-bold flex items-center gap-1 flex-shrink-0">
                        <XCircle className="w-4 h-4" /> Chưa đúng
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 text-slate-600">
                    <p>
                      <strong>Đáp án của bạn:</strong>{' '}
                      <span className={isCorrect ? 'text-emerald-700 font-semibold' : 'text-rose-600 font-semibold'}>
                        {userAns !== undefined ? q.options[userAns] : 'Chưa chọn'}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p>
                        <strong>Đáp án đúng:</strong>{' '}
                        <span className="text-emerald-700 font-bold">{q.options[q.correctAnswerIndex]}</span>
                      </p>
                    )}
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-indigo-900">
                    💡 <strong className="font-bold">Giải thích:</strong> {q.explanationVi}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
