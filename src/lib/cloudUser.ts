// Cached copy of the signed-in Supabase user's profile, kept in localStorage so
// the existing synchronous getters (getActiveUser etc.) keep working.

export interface CloudUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: 'user' | 'admin';
  isPro: boolean;
  proPlan?: '1_month' | '6_months' | '1_year' | 'lifetime';
  proExpiresAt?: number;
  createdAt: number;
}

const CLOUD_USER_KEY = 'VIBETALK_CLOUD_USER_V1';

type Listener = (user: CloudUser | null) => void;
const listeners = new Set<Listener>();

export function subscribeToCloudUser(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getCloudUser(): CloudUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CLOUD_USER_KEY);
    return raw ? (JSON.parse(raw) as CloudUser) : null;
  } catch {
    return null;
  }
}

export function setCloudUser(user: CloudUser | null) {
  if (typeof window === 'undefined') return;
  try {
    if (user) localStorage.setItem(CLOUD_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(CLOUD_USER_KEY);
  } catch {
    // storage unavailable (private mode) — keep going in memory
  }
  listeners.forEach((fn) => fn(user));
}

export function isLoggedIn(): boolean {
  return getCloudUser() !== null;
}

export function isCloudAdmin(): boolean {
  return getCloudUser()?.role === 'admin';
}
