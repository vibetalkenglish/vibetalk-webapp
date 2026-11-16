// Daily limits per user for paid AI features (reset at midnight Vietnam time).
// Change freely; used by the server (src/lib/server/quota.ts) and shown in the UI.
export const DAILY_LIMITS = {
  ai_chat: { free: 20, pro: 200 },
  tts: { free: 50, pro: 500 },
} as const;
