/**
 * Hybrid Studio Audio Manager for VibeTalk
 * Plays studio-grade Neural Audio (OpenAI / ElevenLabs / Pre-cached MP3)
 * with graceful fallback to browser speech synthesis
 */

import { speechEngine } from './speechHelper';

class StudioAudioManager {
  private currentAudio: HTMLAudioElement | null = null;
  private audioCache = new Map<string, string>(); // text:key -> objectURL

  public async play(
    text: string,
    options: {
      rate?: number;
      gender?: 'female' | 'male';
      audioUrl?: string;
      onEnd?: () => void;
      onError?: () => void;
    } = {}
  ) {
    this.stop();

    const cleanText = text.trim();
    if (!cleanText) {
      if (options.onEnd) options.onEnd();
      return;
    }

    // 1. If explicit pre-rendered MP3 URL is provided, play directly
    if (options.audioUrl) {
      this.playHtmlAudio(options.audioUrl, options.rate || 1.0, options.onEnd, () => {
        // Fallback to speech synthesis if MP3 fails to load
        this.fallbackSpeech(cleanText, options.rate, options.onEnd);
      });
      return;
    }

    // 2. Check if we have a cached Blob URL for this text
    const cacheKey = `${cleanText}_${options.gender || 'female'}`;
    if (this.audioCache.has(cacheKey)) {
      const blobUrl = this.audioCache.get(cacheKey)!;
      this.playHtmlAudio(blobUrl, options.rate || 1.0, options.onEnd, () => {
        this.fallbackSpeech(cleanText, options.rate, options.onEnd);
      });
      return;
    }

    // 3. Try to fetch from Neural TTS API
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          voice: options.gender === 'male' ? 'male' : 'female',
          speed: options.rate || 1.0,
        }),
      });

      if (res.ok && res.headers.get('Content-Type')?.includes('audio')) {
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        this.audioCache.set(cacheKey, blobUrl);
        this.playHtmlAudio(blobUrl, options.rate || 1.0, options.onEnd, () => {
          this.fallbackSpeech(cleanText, options.rate, options.onEnd);
        });
        return;
      }
    } catch (e) {
      // Network or API route unreachable
    }

    // 4. Ultimate High-Quality Client-Side Fallback
    this.fallbackSpeech(cleanText, options.rate, options.onEnd);
  }

  private playHtmlAudio(
    src: string,
    rate: number = 1.0,
    onEnd?: () => void,
    onError?: () => void
  ) {
    try {
      const audio = new Audio(src);
      this.currentAudio = audio;
      audio.playbackRate = Math.max(0.5, Math.min(2.0, rate));

      audio.onended = () => {
        this.currentAudio = null;
        if (onEnd) onEnd();
      };

      audio.onerror = () => {
        this.currentAudio = null;
        if (onError) onError();
        else if (onEnd) onEnd();
      };

      audio.play().catch(() => {
        if (onError) onError();
      });
    } catch (e) {
      if (onError) onError();
    }
  }

  private fallbackSpeech(text: string, rate: number = 0.88, onEnd?: () => void) {
    speechEngine.speak(text, { rate, onEnd });
  }

  public stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    speechEngine.stop();
  }
}

export const studioAudio = new StudioAudioManager();

/**
 * Universal American Speech Player
 */
export function playAmericanSpeech(
  text: string,
  rate: number = 0.88,
  onEnd?: () => void,
  options: { gender?: 'female' | 'male'; audioUrl?: string } = {}
) {
  studioAudio.play(text, { rate, onEnd, ...options });
}
