'use client';

// Keeps the local progress cache (src/lib/storage.ts) in sync with Supabase
// while a user is signed in. Pages keep using the synchronous local API; this
// module pulls cloud data on sign-in and pushes local changes (debounced).

import type { User } from '@supabase/supabase-js';
import { LevelId, UserProgress, VocabItem } from '@/types';
import { getSupabase } from './supabase/client';
import { getUserProgress, saveUserProgress, subscribeToProgress, resetUserProgress } from './storage';
import { CloudUser, getCloudUser, setCloudUser, subscribeToCloudUser } from './cloudUser';

const LEVEL_ORDER: LevelId[] = ['lv0', 'lv1', 'lv2', 'lv3'];
const PUSH_DELAY_MS = 1500;

let started = false;
let applyingRemote = false;
let pushTimer: ReturnType<typeof setTimeout> | null = null;
let syncedWordIds = new Set<string>();
let lastPushedProfile = '';

type ProfileRow = {
  id: string; email: string | null; display_name: string; avatar: string; role: 'user' | 'admin';
  is_pro: boolean; pro_plan: CloudUser['proPlan'] | null; pro_until: string | null;
  xp: number; streak_days: number; last_active_date: string | null; migrated_at: string | null; created_at: string;
};
type ProgressRow = {
  current_level: LevelId; unlocked_levels: LevelId[]; completed_lessons: string[];
  saved_lessons: string[]; test_results: UserProgress['testResults'];
};

const wordKey = (w: VocabItem) => (w.id || w.word).toLowerCase();
const union = <T,>(a: T[], b: T[]) => Array.from(new Set([...a, ...b]));
const today = () => new Date().toISOString().split('T')[0];

function toCloudUser(p: ProfileRow, fallbackEmail: string): CloudUser {
  const proUntil = p.pro_until ? Date.parse(p.pro_until) : undefined;
  return {
    id: p.id,
    email: p.email || fallbackEmail,
    name: p.display_name,
    avatar: p.avatar,
    role: p.role,
    isPro: Boolean(p.is_pro && proUntil && proUntil > Date.now()),
    proPlan: p.pro_plan || undefined,
    proExpiresAt: proUntil,
    createdAt: Date.parse(p.created_at),
  };
}

function writeLocal(progress: UserProgress) {
  applyingRemote = true;
  try {
    saveUserProgress(progress);
  } finally {
    applyingRemote = false;
  }
}

function mergeTestResults(a: UserProgress['testResults'], b: UserProgress['testResults']) {
  const out = { ...a };
  for (const [k, v] of Object.entries(b || {})) {
    if (!out[k] || v.score > out[k].score) out[k] = v;
  }
  return out;
}

/** Load the user's cloud data into the local cache; on first login, upload guest progress first. */
async function pullFromCloud(user: User) {
  const supabase = getSupabase();
  if (!supabase) return;

  const [{ data: profile, error: pErr }, { data: progressRow }, { data: notebook }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).maybeSingle<ProfileRow>(),
    supabase.from('progress').select('*').eq('user_id', user.id).maybeSingle<ProgressRow>(),
    supabase.from('notebook_entries').select('word_id, word, saved_at').eq('user_id', user.id),
  ]);
  if (pErr || !profile) {
    console.warn('Could not load profile from Supabase:', pErr?.message);
    return;
  }

  const cloudWords: VocabItem[] = (notebook || []).map((r: { word: VocabItem; saved_at: string }) => ({
    ...r.word,
    savedAt: Date.parse(r.saved_at),
  }));
  const cloudUser = toCloudUser(profile, user.email || '');
  const remote: UserProgress = {
    currentLevel: progressRow?.current_level || 'lv0',
    unlockedLevels: progressRow?.unlocked_levels?.length ? progressRow.unlocked_levels : ['lv0'],
    completedLessons: progressRow?.completed_lessons || [],
    savedWords: cloudWords,
    savedLessons: progressRow?.saved_lessons || [],
    streakDays: profile.streak_days,
    lastActiveDate: profile.last_active_date || today(),
    testResults: progressRow?.test_results || {},
    exp: profile.xp,
  };

  let next = remote;
  const firstLogin = !profile.migrated_at;
  // Only the guest's own data may be uploaded — never a previous account's cache.
  const localIsGuest = !getCloudUser() || getCloudUser()?.id === user.id;

  if (firstLogin && localIsGuest) {
    const local = getUserProgress();
    const unlocked = union(remote.unlockedLevels, local.unlockedLevels || []);
    const words = new Map<string, VocabItem>();
    [...remote.savedWords, ...(local.savedWords || [])].forEach((w) => words.set(wordKey(w), w));
    next = {
      currentLevel: LEVEL_ORDER[Math.max(LEVEL_ORDER.indexOf(remote.currentLevel), LEVEL_ORDER.indexOf(local.currentLevel), 0)],
      unlockedLevels: unlocked,
      completedLessons: union(remote.completedLessons, local.completedLessons || []),
      savedWords: Array.from(words.values()),
      savedLessons: union(remote.savedLessons, local.savedLessons || []),
      streakDays: Math.max(remote.streakDays, local.streakDays || 1),
      lastActiveDate: today(),
      testResults: mergeTestResults(remote.testResults, local.testResults || {}),
      exp: Math.max(remote.exp || 0, local.exp || 0),
    };
  }

  if (cloudUser.isPro) next.unlockedLevels = [...LEVEL_ORDER];
  next.isPro = cloudUser.isPro;
  next.proPlan = cloudUser.proPlan;
  next.proExpiresAt = cloudUser.proExpiresAt;
  next.isAdminMode = cloudUser.role === 'admin' ? getUserProgress().isAdminMode : false;

  syncedWordIds = new Set(cloudWords.map(wordKey));
  lastPushedProfile = JSON.stringify([cloudUser.name, cloudUser.avatar]);
  setCloudUser(cloudUser);
  writeLocal(next);

  if (firstLogin) {
    if (localIsGuest) await pushNow();
    await supabase.from('profiles').update({ migrated_at: new Date().toISOString() }).eq('id', user.id);
  }
}

async function pushNow() {
  const supabase = getSupabase();
  const cloud = getCloudUser();
  if (!supabase || !cloud) return;
  const p = getUserProgress();

  const results = await Promise.all([
    supabase.from('progress').upsert({
      user_id: cloud.id,
      current_level: p.currentLevel,
      unlocked_levels: p.unlockedLevels,
      completed_lessons: p.completedLessons,
      saved_lessons: p.savedLessons,
      test_results: p.testResults,
    }),
    supabase.from('profiles').update({
      xp: Math.max(0, Math.round(p.exp || 0)),
      streak_days: p.streakDays,
      last_active_date: p.lastActiveDate,
    }).eq('id', cloud.id),
  ]);
  results.forEach((r) => r.error && console.warn('Sync error:', r.error.message));

  // Notebook: insert new words, delete removed ones.
  const localWords = new Map(p.savedWords.map((w) => [wordKey(w), w]));
  const toAdd = [...localWords.entries()].filter(([k]) => !syncedWordIds.has(k));
  const toRemove = [...syncedWordIds].filter((k) => !localWords.has(k));
  if (toAdd.length) {
    const { error } = await supabase.from('notebook_entries').upsert(
      toAdd.map(([k, w]) => ({
        user_id: cloud.id,
        word_id: k,
        word: w,
        saved_at: new Date(w.savedAt || Date.now()).toISOString(),
      })),
      { onConflict: 'user_id,word_id' },
    );
    if (!error) toAdd.forEach(([k]) => syncedWordIds.add(k));
    else console.warn('Notebook sync error:', error.message);
  }
  if (toRemove.length) {
    const { error } = await supabase.from('notebook_entries').delete().eq('user_id', cloud.id).in('word_id', toRemove);
    if (!error) toRemove.forEach((k) => syncedWordIds.delete(k));
  }
}

function schedulePush() {
  if (applyingRemote || !getCloudUser()) return;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    pushTimer = null;
    pushNow().catch((e) => console.warn('Sync failed:', e));
  }, PUSH_DELAY_MS);
}

/** Start listening for auth changes and local edits. Safe to call more than once. */
export function initCloudSync() {
  if (started) return;
  const supabase = getSupabase();
  if (!supabase) return;
  started = true;

  subscribeToProgress(() => schedulePush());

  subscribeToCloudUser((u) => {
    if (!u) return;
    const key = JSON.stringify([u.name, u.avatar]);
    if (key === lastPushedProfile) return;
    lastPushedProfile = key;
    supabase.from('profiles').update({ display_name: u.name, avatar: u.avatar }).eq('id', u.id)
      .then(({ error }) => error && console.warn('Profile sync error:', error.message));
  });

  supabase.auth.onAuthStateChange((event, session) => {
    // Defer Supabase calls out of the auth callback (recommended by supabase-js).
    setTimeout(() => {
      if (session?.user && (event === 'INITIAL_SESSION' || event === 'SIGNED_IN')) {
        pullFromCloud(session.user).catch((e) => console.warn('Cloud load failed:', e));
      } else if (event === 'SIGNED_OUT' || (event === 'INITIAL_SESSION' && !session && getCloudUser())) {
        if (pushTimer) clearTimeout(pushTimer);
        syncedWordIds = new Set();
        setCloudUser(null);
        // Don't leave the previous account's data on a shared device.
        resetUserProgress();
      }
    }, 0);
  });
}

/** Re-read profile (e.g. after payment) so Pro status updates without a reload. */
export async function refreshCloudProfile() {
  const supabase = getSupabase();
  if (!supabase) return;
  const { data } = await supabase.auth.getUser();
  if (data.user) await pullFromCloud(data.user);
}

// ─────────────── auth actions used by AuthModal / profile ───────────────

function friendlyAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('invalid login credentials')) return 'Email hoặc mật khẩu không đúng.';
  if (m.includes('email not confirmed')) return 'Email chưa được xác nhận. Vui lòng mở hộp thư và bấm vào link xác nhận.';
  if (m.includes('already registered') || m.includes('already been registered')) return 'Email này đã có tài khoản. Vui lòng đăng nhập.';
  if (m.includes('password should be at least') || m.includes('weak')) return 'Mật khẩu quá yếu: cần ít nhất 6 ký tự.';
  if (m.includes('rate limit') || m.includes('too many')) return 'Bạn thao tác quá nhanh. Vui lòng đợi một lát rồi thử lại.';
  return message;
}

export async function signUpWithPassword(email: string, password: string, displayName: string, avatar: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Tài khoản chưa được cấu hình.');
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName, avatar },
      emailRedirectTo: `${window.location.origin}/profile`,
    },
  });
  if (error) throw new Error(friendlyAuthError(error.message));
  // With "Confirm email" on, there is no session until the user clicks the link.
  return { needsConfirmation: !data.session };
}

export async function signInWithPassword(email: string, password: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Tài khoản chưa được cấu hình.');
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(friendlyAuthError(error.message));
}

export async function sendPasswordReset(email: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Tài khoản chưa được cấu hình.');
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw new Error(friendlyAuthError(error.message));
}

export async function updatePassword(password: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Tài khoản chưa được cấu hình.');
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new Error(friendlyAuthError(error.message));
}

export async function signOut() {
  const supabase = getSupabase();
  if (pushTimer) {
    clearTimeout(pushTimer);
    pushTimer = null;
    await pushNow().catch(() => undefined); // flush pending changes first
  }
  if (supabase) await supabase.auth.signOut();
}
