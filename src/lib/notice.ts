// Tiny app-wide toast channel. Each key is shown at most once per browser session.
export const NOTICE_EVENT = 'vibetalk:notice';

export function showNotice(message: string, key?: string) {
  if (typeof window === 'undefined' || !message) return;
  if (key) {
    try {
      const seen = sessionStorage.getItem('VIBETALK_NOTICE_' + key);
      if (seen) return;
      sessionStorage.setItem('VIBETALK_NOTICE_' + key, '1');
    } catch {
      // storage unavailable: show anyway
    }
  }
  window.dispatchEvent(new CustomEvent(NOTICE_EVENT, { detail: message }));
}
