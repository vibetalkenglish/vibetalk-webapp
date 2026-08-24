'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LevelInfo } from '@/types';
import { getActiveUser } from '@/lib/authStorage';
import confetti from 'canvas-confetti';
import { Award, Download, Share2, X, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface LevelCertificateModalProps {
  level: LevelInfo;
  score: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function LevelCertificateModal({
  level,
  score,
  isOpen,
  onClose,
}: LevelCertificateModalProps) {
  const [studentName, setStudentName] = useState('Học Viên VibeTalk');
  const [isEditingName, setIsEditingName] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = getActiveUser();
    if (user?.name) {
      setStudentName(user.name);
    }
  }, []);

  if (!isOpen) return null;

  const issueDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const handlePrintOrDownload = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Card Content */}
        <div 
          ref={certRef}
          className="relative bg-gradient-to-br from-amber-50/70 via-white to-orange-50/70 border-8 border-double border-amber-400/80 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-inner"
        >
          {/* Certificate Header */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black uppercase tracking-widest border border-amber-300 shadow-xs">
              <Award className="w-3.5 h-3.5" />
              <span>VibeTalk English Academy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight pt-1">
              CHỨNG CHỈ HOÀN THÀNH CẤP ĐỘ
            </h2>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Certificate of Completion & Mastery
            </p>
          </div>

          {/* Recipient */}
          <div className="space-y-1 pt-2">
            <p className="text-xs text-slate-500">Chứng nhận này trân trọng trao tặng cho:</p>
            {isEditingName ? (
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                autoFocus
                className="text-xl sm:text-3xl font-black text-indigo-700 text-center border-b-2 border-indigo-500 focus:outline-none bg-transparent"
              />
            ) : (
              <h3 
                onClick={() => setIsEditingName(true)}
                className="text-2xl sm:text-4xl font-serif font-black text-indigo-900 cursor-pointer hover:opacity-80 transition-opacity"
                title="Bấm để chỉnh sửa tên"
              >
                {studentName} ✏️
              </h3>
            )}
          </div>

          {/* Level Details */}
          <div className="py-3 px-4 bg-white/80 rounded-2xl border border-amber-200/80 max-w-lg mx-auto shadow-xs space-y-1">
            <p className="text-xs text-slate-600">Đã xuất sắc vượt qua kỳ thi đánh giá năng lực:</p>
            <h4 className="text-base sm:text-lg font-black text-slate-900">
              {level.title}
            </h4>
            <div className="flex items-center justify-center gap-3 text-xs font-bold pt-1">
              <span className="text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {level.cefrLevel}
              </span>
              <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Điểm số: {score}/100 ⭐
              </span>
            </div>
          </div>

          {/* Seal & Verification */}
          <div className="pt-4 flex items-center justify-between border-t border-amber-200/60 text-left text-xs text-slate-500">
            <div>
              <span className="block font-bold text-slate-800">Ngày cấp:</span>
              <span>{issueDate}</span>
            </div>

            {/* Gold Stamp */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black flex flex-col items-center justify-center text-[9px] shadow-md border-2 border-amber-500 rotate-12">
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span>VERIFIED</span>
            </div>

            <div className="text-right">
              <span className="block font-bold text-slate-800">Hệ Thống Đào Tạo:</span>
              <span className="text-indigo-700 font-bold">VibeTalk AI 🇺🇸</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 flex-shrink-0">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            💡 Bấm vào tên bạn trên bằng khen để chỉnh sửa trước khi tải về.
          </p>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handlePrintOrDownload}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Tải / In Bằng Khen</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
