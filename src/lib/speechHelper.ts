/**
 * Speech Synthesis Helper for American English Pronunciation
 * Optimized for Mobile (iOS Safari, Android Chrome) and Desktop browsers
 */

class AmericanSpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private americanVoice: SpeechSynthesisVoice | null = null;
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    // Prefer high quality American voices
    const preferredVoices = [
      'Samantha',
      'Google US English',
      'Alex',
      'Victoria',
      'Allison',
      'Ava',
      'Microsoft David Desktop',
      'Microsoft Zira Desktop',
      'en-US'
    ];

    let chosen: SpeechSynthesisVoice | null = null;

    for (const pref of preferredVoices) {
      chosen = voices.find(v => v.lang === 'en-US' && v.name.includes(pref)) || null;
      if (chosen) break;
    }

    if (!chosen) {
      chosen = voices.find(v => v.lang === 'en-US' || v.lang.startsWith('en_US')) || null;
    }

    if (!chosen) {
      chosen = voices.find(v => v.lang.startsWith('en')) || null;
    }

    this.americanVoice = chosen;
    this.isInitialized = true;
  }

  public speak(text: string, options: { rate?: number; pitch?: number; onEnd?: () => void } = {}) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      if (options.onEnd) options.onEnd();
      return;
    }

    if (!this.synth) {
      this.synth = window.speechSynthesis;
    }

    // Fix for mobile WebKit pausing
    if (this.synth.paused) {
      this.synth.resume();
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    if (!this.isInitialized || !this.americanVoice) {
      this.initVoices();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = options.rate ?? 0.9; // Default slightly clear and natural
    utterance.pitch = options.pitch ?? 1.0;

    if (this.americanVoice) {
      utterance.voice = this.americanVoice;
    }

    let hasEnded = false;
    const handleEnd = () => {
      if (!hasEnded) {
        hasEnded = true;
        if (options.onEnd) options.onEnd();
      }
    };

    utterance.onend = handleEnd;
    utterance.onerror = handleEnd;

    // Safety timeout in case speech engine hangs on mobile
    setTimeout(() => {
      if (!hasEnded && this.synth && !this.synth.speaking) {
        handleEnd();
      }
    }, Math.max(3000, text.length * 150));

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const speechEngine = new AmericanSpeechEngine();

/**
 * Utility function to speak English with American accent
 * @param text The text or word to speak
 * @param rate Speed rate: 0.5 (slow), 0.75 (medium), 1.0 (normal)
 */
export function playAmericanSpeech(text: string, rate: number = 0.9, onEnd?: () => void) {
  speechEngine.speak(text, { rate, onEnd });
}
