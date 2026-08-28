'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  getAllOrders, 
  approveOrder, 
  getAllAccounts, 
  upgradeUserToPro, 
  getBankConfig, 
  saveBankConfig, 
  DEFAULT_BANK_CONFIG 
} from '@/lib/authStorage';
import { PaymentOrder, UserAccount, BankConfig } from '@/types';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Users, 
  CreditCard, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Search, 
  Settings, 
  Award, 
  Lock, 
  Unlock, 
  QrCode, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

const ADMIN_PIN_KEY = 'VIBETALK_ADMIN_PASSCODE_V1';
const DEFAULT_PIN = '8888';

const POPULAR_BANKS = [
  { id: 'techcombank', name: 'Techcombank (Kỹ Thương)' },
  { id: 'vietcombank', name: 'Vietcombank (Ngoại Thương)' },
  { id: 'mbbank', name: 'MBBank (Quân Đội)' },
  { id: 'icb', name: 'Vietinbank (Công Thương)' },
  { id: 'bidv', name: 'BIDV (Đầu Tư & Phát Triển)' },
  { id: 'acb', name: 'ACB (Á Châu)' },
  { id: 'vpb', name: 'VPBank (Việt Nam Thịnh Vượng)' },
  { id: 'tpb', name: 'TPBank (Tiên Phong)' },
  { id: 'sacombank', name: 'Sacombank (Sài Gòn Thương Tín)' },
  { id: 'vab', name: 'VietABank (Việt Á)' }
];

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'users' | 'bank'>('orders');

  const [orders, setOrders] = useState<PaymentOrder[]>([]);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [bankConfig, setBankConfig] = useState<BankConfig>(DEFAULT_BANK_CONFIG);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSavedBankSuccess, setIsSavedBankSuccess] = useState(false);

  useEffect(() => {
    // Check if already authenticated in session
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('VIBETALK_ADMIN_AUTH') === 'true';
      if (isAuth) {
        setIsAuthenticated(true);
        loadAdminData();
      }
    }
  }, []);

  const loadAdminData = () => {
    setOrders(getAllOrders());
    setUsers(getAllAccounts());
    setBankConfig(getBankConfig());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPin = typeof window !== 'undefined' ? localStorage.getItem(ADMIN_PIN_KEY) || DEFAULT_PIN : DEFAULT_PIN;
    if (pinInput === savedPin) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('VIBETALK_ADMIN_AUTH', 'true');
      }
      setPinError(false);
      loadAdminData();
    } else {
      setPinError(true);
    }
  };

  const handleApproveOrder = (orderId: string) => {
    const success = approveOrder(orderId);
    if (success) {
      loadAdminData();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
      alert('Đã kích hoạt quyền Pro VIP thành công cho học viên!');
    }
  };

  const handleManualUpgradeUser = (userId: string, plan: '1_month' | '6_months' | '1_year' | 'lifetime') => {
    upgradeUserToPro(userId, plan);
    loadAdminData();
    alert(`Đã nâng cấp học viên lên gói ${plan.replace('_', ' ')} thành công!`);
  };

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    saveBankConfig(bankConfig);
    setIsSavedBankSuccess(true);
    setTimeout(() => setIsSavedBankSuccess(false), 3000);
  };

  // Calculations
  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.amount, 0);

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const proUsersCount = users.filter(u => u.isPro).length;

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl mx-auto shadow-xs">
            🛡️
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900">
              VibeTalk Admin Portal
            </h2>
            <p className="text-xs text-slate-500">
              Nhập mã PIN quản trị viên để truy cập bảng điều khiển doanh thu và quản lý học viên.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Nhập mã PIN (Mặc định: 8888)"
                className="w-full text-center tracking-widest text-lg font-black py-3 px-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-bold">
                  Mã PIN không chính xác. Mặc định là 8888.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Đăng Nhập Quản Trị
            </button>
          </form>

          <p className="text-[11px] text-slate-400">
            💡 Quản trị doanh thu, duyệt đơn chuyển khoản VietQR và cấu hình tài khoản nhận tiền.
          </p>
        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter(o => 
    o.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.transferCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-black border border-emerald-400/40">
              Admin Verified 🛡️
            </span>
            <span className="text-xs text-slate-400 font-medium">
              VibeTalk Financial & Student Management
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black">
            Bảng Điều Khiển Quản Trị & Doanh Thu
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Theo dõi dòng tiền chuyển khoản VietQR, duyệt nâng cấp Pro 1-click và quản lý học viên.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => loadAdminData()}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Làm mới dữ liệu</span>
          </button>

          <button
            onClick={() => {
              sessionStorage.removeItem('VIBETALK_ADMIN_AUTH');
              setIsAuthenticated(false);
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Đăng Xuất
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tổng Doanh Thu</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            {totalRevenue.toLocaleString('vi-VN')} đ
          </h3>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>100% về tài khoản ngân hàng của bạn</span>
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Đơn Chờ Duyệt</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-amber-600">
            {pendingOrders.length} đơn
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            {pendingOrders.length > 0 ? 'Có đơn chuyển khoản mới cần check' : 'Đã duyệt toàn bộ đơn'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Học Viên Pro VIP</span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-purple-900">
            {proUsersCount} học viên
          </h3>
          <p className="text-[11px] text-purple-600 font-bold">
            Mở khóa trọn bộ 72 bài + AI Call
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tổng Học Viên</span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            {users.length} tài khoản
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            Học viên đăng ký trên hệ thống
          </p>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Đơn Hàng & Chuyển Khoản ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Danh Sách Học Viên ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bank')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'bank'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Tài Khoản Ngân Hàng Nhận Tiền</span>
          </button>
        </div>

        {activeTab !== 'bank' && (
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên, mã đơn..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
      </div>

      {/* 4. TAB CONTENTS */}

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">
              Danh Sách Đơn Hàng Nâng Cấp Pro VIP
            </h3>
            <span className="text-xs text-slate-500">
              {filteredOrders.length} đơn hàng
            </span>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <div className="text-3xl">📭</div>
              <p className="text-xs">Chưa có đơn hàng nào được tạo.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Mã Đơn</th>
                    <th className="py-3.5 px-4">Học Viên</th>
                    <th className="py-3.5 px-4">Gói Pro</th>
                    <th className="py-3.5 px-4">Số Tiền</th>
                    <th className="py-3.5 px-4">Cú Pháp Chuyển Khoản</th>
                    <th className="py-3.5 px-4">Trạng Thái</th>
                    <th className="py-3.5 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredOrders.map((order) => {
                    const isDone = order.status === 'completed';
                    return (
                      <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {order.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="block text-slate-900">{order.userName}</strong>
                          <span className="text-[11px] text-slate-400">{order.userEmail}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-[11px]">
                            {order.planName}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {order.amount.toLocaleString('vi-VN')} đ
                        </td>
                        <td className="py-3.5 px-4 font-mono text-indigo-600 font-black">
                          {order.transferCode}
                        </td>
                        <td className="py-3.5 px-4">
                          {isDone ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                              <CheckCircle2 className="w-3 h-3" /> Đã Kích Hoạt Pro
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                              <Clock className="w-3 h-3" /> Chờ Chuyển Tiền
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {!isDone ? (
                            <button
                              onClick={() => handleApproveOrder(order.id)}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
                            >
                              Kích Hoạt Pro ⚡
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-medium">Hoàn tất</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: USERS MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">
              Danh Sách Học Viên Đăng Ký Hệ Thống
            </h3>
            <span className="text-xs text-slate-500">
              {filteredUsers.length} tài khoản
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Học Viên</th>
                  <th className="py-3.5 px-4">Hạng Tài Khoản</th>
                  <th className="py-3.5 px-4">Level Hiện Tại</th>
                  <th className="py-3.5 px-4">EXP & Streak</th>
                  <th className="py-3.5 px-4 text-right">Nâng Cấp Nhanh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{u.avatar}</span>
                        <div>
                          <strong className="block text-slate-900">{u.name}</strong>
                          <span className="text-[11px] text-slate-400">{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {u.isPro ? (
                        <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-[11px] shadow-xs">
                          👑 Pro VIP ({u.proPlan || 'Trọn Đời'})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium">
                          Tài khoản Free
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800 uppercase">
                      {u.currentLevel} ({u.completedLessons.length} bài xong)
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-amber-600">⚡ {u.exp} EXP</span> • <span className="text-slate-500">🔥 {u.streakDays} ngày</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleManualUpgradeUser(u.id, '1_year')}
                          className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Tặng 1 Năm VIP 🎁
                        </button>
                        <button
                          onClick={() => handleManualUpgradeUser(u.id, 'lifetime')}
                          className="px-2.5 py-1 bg-amber-100 hover:bg-amber-400 text-slate-950 rounded-lg text-[11px] font-black transition-colors cursor-pointer"
                        >
                          Trọn Đời 👑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: BANK CONFIGURATION */}
      {activeTab === 'bank' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">
                Cài Đặt Tài Khoản Ngân Hàng Nhận Tiền Tự Động
              </h3>
              <p className="text-xs text-slate-500">
                Mọi thông tin bạn nhập ở đây sẽ tự động cập nhật lên mã VietQR và trang Bảng Giá (`/pricing`) cho học viên quét.
              </p>
            </div>

            <form onSubmit={handleSaveBank} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Ngân hàng nhận tiền:</label>
                <select
                  value={bankConfig.bankId}
                  onChange={(e) => {
                    const found = POPULAR_BANKS.find(b => b.id === e.target.value);
                    setBankConfig({
                      ...bankConfig,
                      bankId: e.target.value,
                      bankName: found ? found.name : e.target.value
                    });
                  }}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {POPULAR_BANKS.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Số tài khoản ngân hàng:</label>
                <input
                  type="text"
                  value={bankConfig.accountNumber}
                  onChange={(e) => setBankConfig({ ...bankConfig, accountNumber: e.target.value })}
                  placeholder="Ví dụ: 19036888999018"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Tên chủ tài khoản (In hoa không dấu):</label>
                <input
                  type="text"
                  value={bankConfig.accountName}
                  onChange={(e) => setBankConfig({ ...bankConfig, accountName: e.target.value.toUpperCase() })}
                  placeholder="Ví dụ: NGUYEN THI KIM ANH"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Lưu Cấu Hình Ngân Hàng
                </button>
                {isSavedBankSuccess && (
                  <span className="text-xs text-emerald-600 font-bold ml-3 animate-fade-in">
                    ✅ Đã lưu thành công! Mã QR đã được cập nhật.
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Live VietQR Preview */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 text-white text-center space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                Live VietQR Preview
              </span>
              <h4 className="text-sm font-bold text-indigo-200">Mã QR Hiển Thị Cho Khách</h4>
            </div>

            <div className="bg-white p-3 rounded-2xl inline-block mx-auto shadow-lg">
              <img
                src={`https://img.vietqr.io/image/${bankConfig.bankId}-${bankConfig.accountNumber}-compact2.png?amount=499000&addInfo=VIBETALK%20TEST&accountName=${encodeURIComponent(bankConfig.accountName)}`}
                alt="VietQR Preview"
                className="w-44 h-44 object-contain mx-auto"
              />
            </div>

            <div className="text-xs space-y-1 text-slate-300">
              <p className="font-bold text-white">{bankConfig.bankName}</p>
              <p className="font-mono text-amber-300 font-black">{bankConfig.accountNumber}</p>
              <p className="uppercase text-[11px]">{bankConfig.accountName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
