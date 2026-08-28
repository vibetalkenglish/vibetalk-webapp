'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Check, 
  Sparkles, 
  Crown, 
  Zap, 
  ShieldCheck, 
  Flame, 
  X, 
  Copy, 
  CheckCircle2, 
  CreditCard,
  QrCode,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { getActiveUser, awardExp, getBankConfig, createPaymentOrder, checkOrderPaymentStatus, approveOrder } from '@/lib/authStorage';
import { UserAccount, BankConfig, PaymentOrder } from '@/types';
import confetti from 'canvas-confetti';

interface PricingTier {
  id: '1_month' | '6_months' | '1_year' | 'lifetime';
  name: string;
  priceFormatted: string;
  priceNumber: number;
  durationLabel: string;
  badge?: string;
  popular?: boolean;
  savings?: string;
  features: string[];
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: '1_month',
    name: 'Gói 1 Tháng',
    priceFormatted: '99.000 đ',
    priceNumber: 99000,
    durationLabel: '/ tháng',
    features: [
      'Mở khóa trọn bộ 72 Bài học thực chiến (Level 0 -> 3)',
      'Luyện nói & Chấm điểm AI không giới hạn',
      'Đóng vai đối thoại 1-1 với AI tất cả bài học',
      'Sổ tay từ vựng & Flashcard 3D không giới hạn',
    ],
  },
  {
    id: '6_months',
    name: 'Gói 6 Tháng',
    priceFormatted: '299.000 đ',
    priceNumber: 299000,
    durationLabel: '6 tháng (~50k/tháng)',
    popular: true,
    badge: '🔥 BÁN CHẠY NHẤT',
    savings: 'Tiết kiệm 50%',
    features: [
      'Mở khóa trọn bộ 72 Bài học thực chiến',
      'Luyện nói & Chấm điểm AI không giới hạn 24/7',
      'Gia Sư AI Voice-to-Voice gọi điện 1-1 không giới hạn',
      'Thử thách 3 phút Daily Sprint mỗi ngày',
      'Huy hiệu Học Viên VIP trên Bảng Xếp Hạng 👑',
      'Ưu tiên kết nối giọng đọc Studio Cảm Xúc',
    ],
  },
  {
    id: '1_year',
    name: 'Gói 1 Năm',
    priceFormatted: '499.000 đ',
    priceNumber: 499000,
    durationLabel: '12 tháng (~41k/tháng)',
    badge: '🌟 BEST VALUE',
    savings: 'Tiết kiệm 60%',
    features: [
      'Tất cả quyền lợi của Gói 6 Tháng',
      'Tặng Ebook "Bí Quyết 44 Âm & Bẻ Khóa Âm Đuôi Giọng Mỹ"',
      'Mở khóa toàn bộ tính năng mới trong tương lai',
      'Tặng ngay +500 EXP thăng hạng Top Leaderboard',
      'Chứng chỉ tốt nghiệp mạ vàng không watermark',
    ],
  },
  {
    id: 'lifetime',
    name: 'Gói Trọn Đời',
    priceFormatted: '899.000 đ',
    priceNumber: 899000,
    durationLabel: 'thanh toán 1 lần duy nhất',
    badge: '👑 EARLY BIRD',
    features: [
      'Sở hữu vĩnh viễn trọn đời tài khoản VibeTalk Pro',
      'Không bao giờ phải đóng thêm bất kỳ chi phí nào',
      'Toàn bộ giáo trình nâng cấp sau này',
      'Huy hiệu Thành Viên Danh Dự Vàng Phát Sáng 🌟',
    ],
  },
];

export default function PricingPage() {
  const [activeUser, setActiveUser] = useState<UserAccount | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PricingTier | null>(null);
  const [currentOrder, setCurrentOrder] = useState<PaymentOrder | null>(null);
  const [bankConfig, setBankConfig] = useState<BankConfig | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  useEffect(() => {
    setActiveUser(getActiveUser());
    setBankConfig(getBankConfig());
  }, []);

  // Polling for payment status
  useEffect(() => {
    if (!currentOrder || isPaidSuccess) return;
    const interval = setInterval(() => {
      const isApproved = checkOrderPaymentStatus(currentOrder.id);
      if (isApproved) {
        setIsPaidSuccess(true);
        awardExp(500, 'Nâng cấp gói VibeTalk Pro VIP');
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [currentOrder, isPaidSuccess]);

  const handleOpenPayment = (tier: PricingTier) => {
    setSelectedPlan(tier);
    setIsPaidSuccess(false);
    const order = createPaymentOrder(tier.id, tier.name, tier.priceNumber);
    setCurrentOrder(order);
  };

  const handleConfirmPaid = () => {
    if (currentOrder) {
      approveOrder(currentOrder.id);
    }
    setIsPaidSuccess(true);
    awardExp(500, 'Nâng cấp gói VibeTalk Pro VIP');
    try {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // VietQR parameters dynamically loaded from Admin Bank Config
  const bankId = bankConfig?.bankId || 'techcombank';
  const bankName = bankConfig?.bankName || 'Techcombank (Ngân hàng Kỹ Thương)';
  const accountNumber = bankConfig?.accountNumber || '19036888999018';
  const accountHolder = bankConfig?.accountName || 'NGUYEN THI KIM ANH';
  const transferContent = currentOrder?.transferCode || `VIBETALK ${selectedPlan?.id.toUpperCase()} PRO`;
  
  // Quick VietQR URL format
  const vietQrUrl = selectedPlan 
    ? `https://img.vietqr.io/image/${bankId}-${accountNumber}-compact2.png?amount=${selectedPlan.priceNumber}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(accountHolder)}`
    : '';

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 shadow-xs">
          <Crown className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>Đầu Tư Cho Tương Lai – Nói Tiếng Anh Chuẩn Mỹ Không Rào Cản</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Nâng Cấp <span className="bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 bg-clip-text text-transparent">VibeTalk Pro 👑</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Mở khóa toàn bộ 24 bài học thực chiến, luyện phản xạ 1-1 với AI không giới hạn và nhận huy hiệu VIP vinh danh trên Bảng Xếp Hạng.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`bg-white rounded-3xl p-6 border flex flex-col justify-between relative transition-all duration-300 ${
              tier.popular
                ? 'border-2 border-indigo-600 shadow-xl shadow-indigo-500/10 scale-102 lg:-translate-y-2'
                : 'border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
            }`}
          >
            {/* Badges */}
            {tier.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
                {tier.badge}
              </div>
            )}

            <div>
              {/* Header */}
              <div className="space-y-1 mb-4">
                <h3 className="text-lg font-black text-slate-900">{tier.name}</h3>
                {tier.savings && (
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                    {tier.savings}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-black text-slate-900">{tier.priceFormatted}</span>
                <span className="text-xs text-slate-400 font-medium block mt-0.5">{tier.durationLabel}</span>
              </div>

              {/* Features List */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                {tier.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={() => handleOpenPayment(tier)}
                className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-500/25'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>Nâng Cấp Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-xl font-black text-slate-900 text-center">
          So Sánh Quyền Lợi Gói Miễn Phí & VibeTalk Pro
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px]">
                <th className="py-3 px-4">Tính Năng & Quyền Lợi</th>
                <th className="py-3 px-4 text-center">Gói Miễn Phí</th>
                <th className="py-3 px-4 text-center text-indigo-600 font-black">VibeTalk Pro 👑</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800">Lộ trình bài học thực chiến</td>
                <td className="py-3.5 px-4 text-center text-slate-500">Level 0 + 2 bài Level 1</td>
                <td className="py-3.5 px-4 text-center font-bold text-indigo-600">Trọn bộ 24 bài (Level 0 ➔ 3)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800">Luyện nói & AI chấm điểm %</td>
                <td className="py-3.5 px-4 text-center text-slate-500">10 lượt / ngày</td>
                <td className="py-3.5 px-4 text-center font-bold text-emerald-600">Không giới hạn 24/7</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800">Đóng vai đối thoại 1-1 với AI</td>
                <td className="py-3.5 px-4 text-center text-slate-400">Xem trước demo</td>
                <td className="py-3.5 px-4 text-center font-bold text-emerald-600">Mở khóa toàn bộ</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800">Thử thách 3 phút Daily Sprint</td>
                <td className="py-3.5 px-4 text-center text-emerald-600">Có</td>
                <td className="py-3.5 px-4 text-center font-bold text-emerald-600">Có (Tặng +40 EXP)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800">Sổ tay từ vựng & Flashcard</td>
                <td className="py-3.5 px-4 text-center text-slate-500">Tối đa 20 từ</td>
                <td className="py-3.5 px-4 text-center font-bold text-emerald-600">Không giới hạn</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800">Huy hiệu VIP trên Bảng Xếp Hạng</td>
                <td className="py-3.5 px-4 text-center text-slate-400">Không</td>
                <td className="py-3.5 px-4 text-center font-bold text-amber-600">Vương Miện Vàng VIP 🌟</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PAYMENT MODAL (VIETQR AUTOMATIC) */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setSelectedPlan(null)} 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in" 
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-slate-100 animate-fade-in max-h-[95vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isPaidSuccess ? (
              <div className="space-y-5 text-center">
                <div className="space-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Quét Mã VietQR Để Nâng Cấp
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedPlan.name} • <strong>{selectedPlan.priceFormatted}</strong>
                  </p>
                </div>

                {/* QR Code Image */}
                <div className="p-3 bg-slate-50 rounded-2xl border-2 border-dashed border-indigo-200 inline-block mx-auto shadow-inner">
                  <img
                    src={vietQrUrl}
                    alt="VietQR Payment"
                    className="w-52 h-52 sm:w-60 sm:h-60 mx-auto object-contain rounded-xl"
                  />
                </div>

                {/* Transfer Details Card */}
                <div className="bg-slate-50 rounded-2xl p-4 text-left text-xs space-y-2.5 border border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Ngân hàng:</span>
                    <span className="font-bold text-slate-900">{bankName}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Số tài khoản:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-indigo-700 text-sm">{accountNumber}</span>
                      <button
                        onClick={() => copyToClipboard(accountNumber)}
                        className="p-1 hover:bg-slate-200 rounded text-slate-500"
                        title="Sao chép số tài khoản"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Chủ tài khoản:</span>
                    <span className="font-bold text-slate-900">{accountHolder}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Số tiền:</span>
                    <span className="font-extrabold text-rose-600 text-sm">{selectedPlan.priceFormatted}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    <span className="text-slate-500 font-medium">Nội dung CK:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-slate-900 bg-amber-100 px-2 py-0.5 rounded">{transferContent}</span>
                      <button
                        onClick={() => copyToClipboard(transferContent)}
                        className="p-1 hover:bg-slate-200 rounded text-slate-500"
                        title="Sao chép nội dung"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {isCopied && (
                  <p className="text-xs text-emerald-600 font-bold animate-fade-in">
                    ✅ Đã sao chép vào bộ nhớ tạm!
                  </p>
                )}

                {/* Confirm Paid Button */}
                <button
                  onClick={handleConfirmPaid}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-600/25 transition-transform active:scale-98 cursor-pointer"
                >
                  Tôi Đã Chuyển Khoản Thành Công ✅
                </button>
              </div>
            ) : (
              /* Success Celebration Screen */
              <div className="text-center py-6 space-y-4 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-emerald-100 border-3 border-emerald-400 text-emerald-600 flex items-center justify-center mx-auto text-4xl shadow-md">
                  👑
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">
                    Chúc Mừng Bạn Đã Là Thành Viên Pro!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                    Tài khoản của bạn đã được nâng cấp thành công. Bạn nhận được ngay <strong>+500 EXP</strong>!
                  </p>
                </div>

                <div className="pt-3">
                  <Link
                    href="/lessons"
                    onClick={() => setSelectedPlan(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <span>Bắt Đầu Học Toàn Bộ Bài Học Ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
