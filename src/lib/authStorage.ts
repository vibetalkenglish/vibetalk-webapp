import { UserAccount, LeaderboardUser, LevelId, BankConfig } from '@/types';
import { getUserProgress, saveUserProgress } from './storage';
import { getCloudUser, setCloudUser } from './cloudUser';
import { getSupabase } from './supabase/client';
import { DEFAULT_BANK_CONFIG } from './bankConfig';

// Guest (not signed in) data still lives in localStorage, as before.
const ACCOUNTS_KEY = 'VIBETALK_ACCOUNTS_V1';
const CURRENT_USER_KEY = 'VIBETALK_ACTIVE_USER_ID_V1';

const DEFAULT_GUEST: UserAccount = {
  id: 'guest_user_1',
  name: 'Học Viên VibeTalk',
  email: '',
  avatar: '👨‍🎓',
  createdAt: Date.now(),
  exp: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  currentLevel: 'lv0',
  unlockedLevels: ['lv0'],
  completedLessons: [],
  savedWords: [],
  savedLessons: [],
  testResults: {},
};

export const PRESET_AVATARS = [
  '👨‍🎓', '👩‍🎓', '🧑‍💻', '👩‍💻', '👨‍💼', '👩‍💼',
  '🦸‍♂️', '🦸‍♀️', '🚀', '🌟', '🎧', '☕'
];

function getGuestAccount(): UserAccount {
  if (typeof window === 'undefined') return DEFAULT_GUEST;
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    const accounts: UserAccount[] = raw ? JSON.parse(raw) : [];
    const activeId = localStorage.getItem(CURRENT_USER_KEY);
    return accounts.find(a => a.id === activeId) || accounts[0] || DEFAULT_GUEST;
  } catch {
    return DEFAULT_GUEST;
  }
}

function saveGuestAccount(account: UserAccount) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    const accounts: UserAccount[] = raw ? JSON.parse(raw) : [];
    const others = accounts.filter(a => a.id !== account.id);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([account, ...others]));
    localStorage.setItem(CURRENT_USER_KEY, account.id);
  } catch (err) {
    console.error('Error saving guest account:', err);
  }
}

/** The current learner: the signed-in Supabase user, or the local guest. */
export function getActiveUser(): UserAccount {
  const progress = getUserProgress();
  const cloud = getCloudUser();

  const base: UserAccount = cloud
    ? {
        id: cloud.id,
        name: cloud.name,
        email: cloud.email,
        avatar: cloud.avatar,
        createdAt: cloud.createdAt,
        exp: progress.exp ?? 0,
        isPro: cloud.isPro,
        proPlan: cloud.proPlan,
        proExpiresAt: cloud.proExpiresAt,
        ...pickProgress(progress),
      }
    : { ...getGuestAccount(), ...pickProgress(progress) };

  if (!cloud && progress.exp !== undefined && progress.exp > base.exp) {
    base.exp = progress.exp;
  }
  return base;
}

function pickProgress(progress: ReturnType<typeof getUserProgress>) {
  return {
    currentLevel: progress.currentLevel,
    unlockedLevels: progress.unlockedLevels,
    completedLessons: progress.completedLessons,
    savedWords: progress.savedWords,
    savedLessons: progress.savedLessons,
    streakDays: progress.streakDays,
    lastActiveDate: progress.lastActiveDate,
    testResults: progress.testResults,
    isAdminMode: progress.isAdminMode,
  };
}

/** Change display name / avatar. Synced to Supabase by cloudSync when signed in. */
export function updateUserProfile(updates: Partial<Pick<UserAccount, 'name' | 'avatar'>>) {
  const cloud = getCloudUser();
  if (cloud) {
    setCloudUser({ ...cloud, ...updates });
    return;
  }
  saveGuestAccount({ ...getGuestAccount(), ...updates });
}

export function awardExp(amount: number, _reason?: string) {
  const current = getActiveUser();
  const newExp = (current.exp || 0) + amount;

  if (!getCloudUser()) {
    saveGuestAccount({ ...getGuestAccount(), exp: newExp });
  }

  const progress = getUserProgress();
  progress.exp = newExp;
  saveUserProgress(progress); // cloudSync pushes the new XP when signed in
}

// ==================== LEADERBOARD ====================

/** Local-only leaderboard (just the current learner). Used before/without Supabase. */
export function getFullLeaderboard(): LeaderboardUser[] {
  const current = getActiveUser();
  return [
    {
      id: current.id,
      name: current.name + ' (Bạn)',
      avatar: current.avatar,
      levelBadge: getLevelBadgeLabel(current.currentLevel),
      exp: current.exp || 0,
      streakDays: current.streakDays || 1,
      completedLessonsCount: current.completedLessons.length || 0,
      isCurrentUser: true,
      rank: 1,
    },
  ];
}

/** Real leaderboard from Supabase, falling back to the local one. */
export async function fetchLeaderboard(limit = 50): Promise<LeaderboardUser[]> {
  const supabase = getSupabase();
  if (!supabase) return getFullLeaderboard();

  const { data, error } = await supabase.rpc('get_leaderboard', { p_limit: limit });
  if (error || !data) {
    console.warn('Leaderboard fetch failed:', error?.message);
    return getFullLeaderboard();
  }

  const rows = (data as Array<{
    rank: number; display_name: string; avatar: string; xp: number; streak_days: number;
    completed_count: number; current_level: LevelId; is_pro: boolean; is_me: boolean;
  }>).map((r) => ({
    id: `rank_${r.rank}`,
    name: r.is_me ? `${r.display_name} (Bạn)` : r.display_name,
    avatar: r.avatar,
    levelBadge: getLevelBadgeLabel(r.current_level) + (r.is_pro ? ' 👑' : ''),
    exp: r.xp,
    streakDays: r.streak_days,
    completedLessonsCount: r.completed_count,
    isCurrentUser: r.is_me,
    rank: r.rank,
  }));

  // Guests are not in the database: show them where they would rank.
  if (!getCloudUser()) {
    const me = getFullLeaderboard()[0];
    const all = [...rows, me].sort((a, b) => b.exp - a.exp);
    return all.map((u, i) => ({ ...u, rank: i + 1 }));
  }
  return rows;
}

function getLevelBadgeLabel(levelId: LevelId): string {
  switch (levelId) {
    case 'lv0': return 'Level 0: Phát Âm (A1)';
    case 'lv1': return 'Level 1: Đời Thường (A2)';
    case 'lv2': return 'Level 2: Đi Làm (B1)';
    case 'lv3': return 'Level 3: Du Lịch (B2)';
    default: return 'Level 0: Phát Âm (A1)';
  }
}

// ==================== BANK CONFIGURATION ====================

const BANK_CONFIG_KEY = 'VIBETALK_BANK_CONFIG_V1';

export { DEFAULT_BANK_CONFIG };

/** Last known bank config (cached). Use fetchBankConfig() for the live value. */
export function getBankConfig(): BankConfig {
  if (typeof window === 'undefined') return DEFAULT_BANK_CONFIG;
  try {
    const raw = localStorage.getItem(BANK_CONFIG_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_BANK_CONFIG;
  } catch {
    return DEFAULT_BANK_CONFIG;
  }
}

export async function fetchBankConfig(): Promise<BankConfig> {
  const supabase = getSupabase();
  if (!supabase) return getBankConfig();
  const { data } = await supabase.from('app_config').select('value').eq('key', 'bank').maybeSingle();
  if (!data?.value) return getBankConfig();
  const config = { ...DEFAULT_BANK_CONFIG, ...(data.value as Partial<BankConfig>) };
  try {
    localStorage.setItem(BANK_CONFIG_KEY, JSON.stringify(config));
  } catch {
    // ignore
  }
  return config;
}
