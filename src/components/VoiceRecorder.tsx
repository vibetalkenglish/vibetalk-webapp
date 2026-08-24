'use client';

import React, { useState, useRef } from 'react';
import { Mic, Square, Play, RotateCcw } from 'lucide-react';

interface VoiceRecorderProps {
  label?: string;
}

export default function VoiceRecorder({ label = 'Luyện phát âm câu này' }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        // Stop audio tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access denied or error:', err);
      alert('Vui lòng cấp quyền sử dụng Microphone trên trình duyệt để ghi âm luyện nói!');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecordedAudio = () => {
    if (audioUrl) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      const audio = new Audio(audioUrl);
      audioPlayerRef.current = audio;
      setIsPlaying(true);
      audio.play();
      audio.onended = () => setIsPlaying(false);
    }
  };

  const resetRecording = () => {
    setAudioUrl(null);
    setIsPlaying(false);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap text-xs">
      {!audioUrl ? (
        !isRecording ? (
          <button
            onClick={startRecording}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold border border-rose-200 transition-colors"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-semibold animate-pulse shadow-sm"
          >
            <Square className="w-3.5 h-3.5 fill-white" />
            <span>Đang ghi âm... Nhấn để Dừng</span>
          </button>
        )
      ) : (
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
          <span className="font-semibold">Bản ghi của bạn:</span>
          <button
            onClick={playRecordedAudio}
            disabled={isPlaying}
            className="flex items-center gap-1 px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold transition-colors"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>{isPlaying ? 'Đang phát...' : 'Nghe lại giọng'}</span>
          </button>
          <button
            onClick={resetRecording}
            className="p-1 text-slate-500 hover:text-slate-700 rounded"
            title="Ghi âm lại"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
