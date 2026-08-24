'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Lesson } from '@/types';
import { playAmericanSpeech, speechEngine } from '@/lib/speechHelper';
import { 
  Radio, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Sparkles, 
  Headphones, 
  X,
  Repeat
} from 'lucide-react';

interface LessonRadioPlayerProps {
  lesson: Lesson;
}

type TrackItem = {
  type: 'vocab' | 'example' | 'dialogue';
  titleEn: string;
  subVi: string;
  speaker?: string;
};

export default function LessonRadioPlayer({ lesson }: LessonRadioPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  // Build playlist items
  const playlist: TrackItem[] = [];
  lesson.vocabulary.forEach(v => {
    playlist.push({
      type: 'vocab',
      titleEn: `${v.word}`,
      subVi: `${v.meaningVi} (${v.partOfSpeech})`
    });
    if (v.exampleSentence) {
      playlist.push({
        type: 'example',
        titleEn: v.exampleSentence,
        subVi: v.exampleSentenceVi
      });
    }
  });

  if (lesson.dialogue) {
    lesson.dialogue.forEach(d => {
      playlist.push({
        type: 'dialogue',
        titleEn: d.textEn,
        subVi: d.textVi,
        speaker: d.speakerName
      });
    });
  }

  const currentTrack = playlist[currentTrackIndex] || playlist[0];
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const playCurrentTrack = (index: number) => {
    if (index >= playlist.length) {
      if (isLooping) {
        setCurrentTrackIndex(0);
        playCurrentTrack(0);
      } else {
        setIsPlaying(false);
      }
      return;
    }

    const item = playlist[index];
    playAmericanSpeech(item.titleEn, 0.88, () => {
      if (isPlayingRef.current) {
        // Small pause between tracks
        setTimeout(() => {
          if (isPlayingRef.current) {
            setCurrentTrackIndex(index + 1);
            playCurrentTrack(index + 1);
          }
        }, 1200);
      }
    });
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      speechEngine.stop();
    } else {
      setIsPlaying(true);
      playCurrentTrack(currentTrackIndex);
    }
  };

  const handleNext = () => {
    speechEngine.stop();
    const nextIdx = currentTrackIndex < playlist.length - 1 ? currentTrackIndex + 1 : 0;
    setCurrentTrackIndex(nextIdx);
    if (isPlaying) {
      playCurrentTrack(nextIdx);
    }
  };

  const handlePrev = () => {
    speechEngine.stop();
    const prevIdx = currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1;
    setCurrentTrackIndex(prevIdx);
    if (isPlaying) {
      playCurrentTrack(prevIdx);
    }
  };

  const handleClose = () => {
    speechEngine.stop();
    setIsPlaying(false);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => { setIsOpen(true); setIsPlaying(true); playCurrentTrack(0); }}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs font-black shadow-md shadow-indigo-500/25 transition-transform active:scale-95 cursor-pointer"
      >
        <Headphones className="w-4 h-4 animate-pulse text-amber-300" />
        <span>Bật Radio Bài Học (Nghe Thụ Động)</span>
      </button>
    );
  }

  return (
    <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white rounded-3xl p-5 sm:p-6 border border-indigo-500/30 shadow-xl space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center justify-center text-xl flex-shrink-0">
            📻
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-purple-500 text-white px-2 py-0.5 rounded-full">
                Sleep / Commute Radio
              </span>
              <span className="text-xs text-indigo-300 font-bold">
                {currentTrackIndex + 1}/{playlist.length} track
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-black text-white line-clamp-1">
              {lesson.titleVi}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLooping(!isLooping)}
            className={`p-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              isLooping ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60 hover:text-white'
            }`}
            title="Lặp lại toàn bộ"
          >
            <Repeat className="w-4 h-4" />
          </button>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-red-500 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Track Display */}
      <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 space-y-2 text-center sm:text-left">
        <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
          <span>{currentTrack.type === 'vocab' ? '📖 Từ vựng then chốt' : currentTrack.type === 'example' ? '💬 Câu ví dụ' : `🎭 Hội thoại (${currentTrack.speaker})`}</span>
          <span className="animate-pulse">{isPlaying ? 'Đang phát âm thanh...' : 'Tạm dừng'}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-white tracking-wide">
          "{currentTrack.titleEn}"
        </h3>

        <p className="text-xs sm:text-sm text-indigo-200 font-medium">
          👉 {currentTrack.subVi}
        </p>
      </div>

      {/* Player Controls */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <SkipBack className="w-5 h-5" />
        </button>

        <button
          onClick={handleTogglePlay}
          className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Tạm Dừng Podcast</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Tiếp Tục Phát Radio</span>
            </>
          )}
        </button>

        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
