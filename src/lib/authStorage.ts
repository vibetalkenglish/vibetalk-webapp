import { UserAccount, LeaderboardUser, LevelId, VocabItem, PaymentOrder, BankConfig } from '@/types';
import { getUserProgress, saveUserProgress } from './storage';

const ACCOUNTS_KEY = 'VIBETALK_ACCOUNTS_V1';
const CURRENT_USER_KEY = 'VIBETALK_ACTIVE_USER_ID_V1';

const DEFAULT_GUEST: UserAccount = {
  id: 'guest_user_1',
  name: 'Học Viên VibeTalk',
  email: 'learner@vibetalk.vn',
  avatar: '👨‍🎓',
  createdAt: Date.now() - 7 * 86400000,
  exp: 320,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  currentLevel: 'lv0',
  unlockedLevels: ['lv0'],
  completedLessons: ['lv0-lesson-1'],
  savedWords: [],
  savedLessons: [],
  testResults: {},
};

export const PRESET_AVATARS = [
  '👨‍🎓', '👩‍🎓', '🧑‍💻', '👩‍💻', '👨‍💼', '👩‍💼', 
  '🦸‍♂️', '🦸‍♀️', '🚀', '🌟', '🎧', '☕'
];

// Seeded Leaderboard Users
const MOCK_LEADERBOARD_USERS: Omit<LeaderboardUser, 'rank'>[] = [
  { id: 'u_top1', name: 'Minh Anh (Hà Nội)', avatar: '👩‍💻', levelBadge: 'Level 3: Du Lịch (B2)', exp: 2450, streakDays: 28, completedLessonsCount: 22 },
  { id: 'u_top2', name: 'Tuấn Hùng (TP.HCM)', avatar: '🧑‍💻', levelBadge: 'Level 3: Du Lịch (B2)', exp: 2180, streakDays: 21, completedLessonsCount: 19 },
  { id: 'u_top3', name: 'Hương Giang (Đà Nẵng)', avatar: '👩‍💼', levelBadge: 'Level 2: Đi Làm (B1)', exp: 1890, streakDays: 15, completedLessonsCount: 16 },
  { id: 'u_top4', name: 'Bảo Nam (Hải Phòng)', avatar: '👨‍💼', levelBadge: 'Level 2: Đi Làm (B1)', exp: 1420, streakDays: 12, completedLessonsCount: 14 },
  { id: 'u_top5', name: 'Thu Hà (Cần Thơ)', avatar: '👩‍🎓', levelBadge: 'Level 1: Đời Thường (A2)', exp: 980, streakDays: 8, completedLessonsCount: 9 },
  { id: 'u_top6', name: 'Khánh Linh (Nha Trang)', avatar: '🌟', levelBadge: 'Level 1: Đời Thường (A2)', exp: 760, streakDays: 6, completedLessonsCount: 7 },
  { id: 'u_top7', name: 'Quốc Việt (Huế)', avatar: '🚀', levelBadge: 'Level 0: Phát Âm (A1)', exp: 520, streakDays: 4, completedLessonsCount: 5 },
];

export function getAllAccounts(): UserAccount[] {
  if (typeof window === 'undefined') return [DEFAULT_GUEST];
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) {
      const initial = [DEFAULT_GUEST];
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading accounts:', err);
    return [DEFAULT_GUEST];
  }
}

export function saveAccounts(accounts: UserAccount[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.error('Error saving accounts:', err);
  }
}

export function getActiveUser(): UserAccount {
  if (typeof window === 'undefined') return DEFAULT_GUEST;
  const accounts = getAllAccounts();
  const activeId = localStorage.getItem(CURRENT_USER_KEY);
  
  let current = accounts.find(a => a.id === activeId);
  if (!current) {
    current = accounts[0] || DEFAULT_GUEST;
    localStorage.setItem(CURRENT_USER_KEY, current.id);
  }

  // Synchronize with storage user progress
  const progress = getUserProgress();
  if (progress) {
    current.currentLevel = progress.currentLevel;
    current.unlockedLevels = progress.unlockedLevels;
    current.completedLessons = progress.completedLessons;
    current.savedWords = progress.savedWords;
    current.savedLessons = progress.savedLessons;
    current.streakDays = progress.streakDays;
    current.lastActiveDate = progress.lastActiveDate;
    current.testResults = progress.testResults;
    current.isAdminMode = progress.isAdminMode;
    if (progress.exp !== undefined && progress.exp > current.exp) {
      current.exp = progress.exp;
    }
  }

  return current;
}

export function registerAccount(name: string, email: string, avatar: string = '👨‍🎓'): UserAccount {
  const accounts = getAllAccounts();
  const existing = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());
  
  if (existing) {
    throw new Error('Email này đã được đăng ký tài khoản. Vui lòng đăng nhập.');
  }

  const newAccount: UserAccount = {
    id: 'user_' + Date.now(),
    name: name.trim() || 'Thành Viên VibeTalk',
    email: email.trim().toLowerCase(),
    avatar,
    createdAt: Date.now(),
    exp: 100, // Welcome bonus EXP
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    currentLevel: 'lv0',
    unlockedLevels: ['lv0'],
    completedLessons: [],
    savedWords: [],
    savedLessons: [],
    testResults: {},
  };

  accounts.push(newAccount);
  saveAccounts(accounts);
  setActiveAccount(newAccount.id);
  return newAccount;
}

export function loginAccount(email: string): UserAccount {
  const accounts = getAllAccounts();
  const found = accounts.find(a => a.email.toLowerCase() === email.trim().toLowerCase());
  
  if (!found) {
    throw new Error('Không tìm thấy tài khoản với email này. Vui lòng đăng ký tài khoản mới.');
  }

  setActiveAccount(found.id);
  return found;
}

export function setActiveAccount(userId: string) {
  if (typeof window === 'undefined') return;
  const accounts = getAllAccounts();
  const user = accounts.find(a => a.id === userId);
  if (!user) return;

  localStorage.setItem(CURRENT_USER_KEY, userId);

  // Sync into local progress storage
  saveUserProgress({
    currentLevel: user.currentLevel,
    unlockedLevels: user.unlockedLevels,
    completedLessons: user.completedLessons,
    savedWords: user.savedWords,
    savedLessons: user.savedLessons,
    streakDays: user.streakDays,
    lastActiveDate: user.lastActiveDate,
    testResults: user.testResults,
    isAdminMode: user.isAdminMode,
    exp: user.exp,
  });
}

export function updateUserProfile(updates: Partial<Pick<UserAccount, 'name' | 'avatar'>>) {
  const accounts = getAllAccounts();
  const current = getActiveUser();
  
  const updatedAccounts = accounts.map(a => {
    if (a.id === current.id) {
      return { ...a, ...updates };
    }
    return a;
  });

  saveAccounts(updatedAccounts);
}

export function awardExp(amount: number, reason?: string) {
  const accounts = getAllAccounts();
  const current = getActiveUser();
  const newExp = (current.exp || 0) + amount;
  current.exp = newExp;

  const updatedAccounts = accounts.map(a => {
    if (a.id === current.id) {
      return { ...a, exp: newExp };
    }
    return a;
  });

  saveAccounts(updatedAccounts);
  
  const progress = getUserProgress();
  progress.exp = newExp;
  saveUserProgress(progress);
}

export function getFullLeaderboard(): LeaderboardUser[] {
  const current = getActiveUser();
  
  const currentUserBoardItem: Omit<LeaderboardUser, 'rank'> = {
    id: current.id,
    name: current.name + ' (Bạn)',
    avatar: current.avatar,
    levelBadge: getLevelBadgeLabel(current.currentLevel),
    exp: current.exp || 320,
    streakDays: current.streakDays || 1,
    completedLessonsCount: current.completedLessons.length || 0,
    isCurrentUser: true,
  };

  const allEntries = [...MOCK_LEADERBOARD_USERS, currentUserBoardItem];
  
  // Sort descending by EXP
  allEntries.sort((a, b) => b.exp - a.exp);

  return allEntries.map((u, index) => ({
    ...u,
    rank: index + 1,
  }));
}

function getLevelBadgeLabel(levelId: LevelId): string {
  switch (levelId) {
    case 'lv0': return 'Level 0: Phát Âm (A1)';
    case 'lv1': return 'Level 1: Đời Thường (A2)';
    case 'lv2': return 'Level 2: Đi Làm (B1)';
    case 'lv3': return 'Level 3: Du Lịch (B2)';
  }
}

// ==================== PAYMENT & BANK CONFIGURATION ====================

const BANK_CONFIG_KEY = 'VIBETALK_BANK_CONFIG_V1';
const ORDERS_KEY = 'VIBETALK_PAYMENT_ORDERS_V1';

export const DEFAULT_BANK_CONFIG: BankConfig = {
  bankId: 'techcombank',
  bankName: 'Techcombank (Ngân hàng Kỹ Thương)',
  accountNumber: '19036888999018',
  accountName: 'NGUYEN THI KIM ANH',
  qrTemplate: 'compact2'
};

export function getBankConfig(): BankConfig {
  if (typeof window === 'undefined') return DEFAULT_BANK_CONFIG;
  try {
    const raw = localStorage.getItem(BANK_CONFIG_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_BANK_CONFIG;
  } catch (e) {
    return DEFAULT_BANK_CONFIG;
  }
}

export function saveBankConfig(config: BankConfig) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BANK_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving bank config:', e);
  }
}

export function getAllOrders(): PaymentOrder[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveOrders(orders: PaymentOrder[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders:', e);
  }
}

export function createPaymentOrder(
  planId: '1_month' | '6_months' | '1_year' | 'lifetime',
  planName: string,
  amount: number
): PaymentOrder {
  const user = getActiveUser();
  const bank = getBankConfig();
  const orderId = `ORD_${Date.now().toString().slice(-6)}`;
  const transferCode = `VIBETALK ${user.id.slice(-4).toUpperCase()}${Date.now().toString().slice(-3)}`;

  const newOrder: PaymentOrder = {
    id: orderId,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    planId,
    planName,
    amount,
    bankCode: bank.bankId,
    accountNumber: bank.accountNumber,
    accountName: bank.accountName,
    transferCode,
    status: 'pending',
    createdAt: Date.now()
  };

  const existing = getAllOrders();
  saveOrders([newOrder, ...existing]);
  return newOrder;
}

export function approveOrder(orderId: string): boolean {
  const orders = getAllOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return false;

  order.status = 'completed';
  order.completedAt = Date.now();
  saveOrders(orders);

  // Upgrade target user
  upgradeUserToPro(order.userId, order.planId);
  return true;
}

export function checkOrderPaymentStatus(transferCodeOrOrderId: string): boolean {
  const orders = getAllOrders();
  const found = orders.find(
    o => o.id === transferCodeOrOrderId || o.transferCode.toLowerCase() === transferCodeOrOrderId.toLowerCase()
  );
  return found?.status === 'completed';
}

export function upgradeUserToPro(
  userId: string, 
  planId: '1_month' | '6_months' | '1_year' | 'lifetime'
) {
  const accounts = getAllAccounts();
  const target = accounts.find(a => a.id === userId);
  if (!target) return;

  const now = Date.now();
  let durationMs = 30 * 86400000; // default 1 month
  if (planId === '6_months') durationMs = 180 * 86400000;
  if (planId === '1_year') durationMs = 365 * 86400000;
  if (planId === 'lifetime') durationMs = 3650 * 86400000; // 10 years

  const expiresAt = now + durationMs;

  const updatedAccounts = accounts.map(a => {
    if (a.id === userId) {
      return {
        ...a,
        isPro: true,
        proPlan: planId,
        proExpiresAt: expiresAt,
        unlockedLevels: ['lv0', 'lv1', 'lv2', 'lv3'] as LevelId[]
      };
    }
    return a;
  });

  saveAccounts(updatedAccounts);

  // If current active user is upgraded, update progress storage
  const activeUser = getActiveUser();
  if (activeUser.id === userId) {
    const progress = getUserProgress();
    progress.isPro = true;
    progress.proPlan = planId;
    progress.proExpiresAt = expiresAt;
    progress.unlockedLevels = ['lv0', 'lv1', 'lv2', 'lv3'];
    saveUserProgress(progress);
  }
}
