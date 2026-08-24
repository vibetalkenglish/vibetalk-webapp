/**
 * Enhanced American Speech Synthesis Engine
 * Priority: Microsoft Natural / Apple Enhanced / Google Neural American Voices
 */

export interface VoiceOption {
  name: string;
  lang: string;
  gender: 'female' | 'male' | 'neutral';
  isNatural: boolean;
  labelVi: string;
}

const VOICE_PREF_KEY = 'VIBETALK_SELECTED_VOICE_NAME_V1';
const GENDER_PREF_KEY = 'VIBETALK_VOICE_GENDER_PREF_V1';

class AmericanSpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private currentVoice: SpeechSynthesisVoice | null = null;
  private availableVoices: SpeechSynthesisVoice[] = [];
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

  public initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    // Filter American English voices
    this.availableVoices = voices.filter(
      v => v.lang === 'en-US' || v.lang.startsWith('en_US') || v.lang === 'en'
    );

    const savedVoiceName = typeof window !== 'undefined' ? localStorage.getItem(VOICE_PREF_KEY) : null;
    const savedGender = typeof window !== 'undefined' ? localStorage.getItem(GENDER_PREF_KEY) : 'auto';

    if (savedVoiceName) {
      const found = this.availableVoices.find(v => v.name === savedVoiceName);
      if (found) {
        this.currentVoice = found;
        this.isInitialized = true;
        return;
      }
    }

    // Top tier natural/enhanced American voices ranked by audio quality
    const topNaturalVoices = [
      // Microsoft Natural (Edge / Windows 11) - Highest quality AI voices
      'Microsoft Jenny Online (Natural) - English (United States)',
      'Microsoft Guy Online (Natural) - English (United States)',
      'Microsoft Aria Online (Natural) - English (United States)',
      'Microsoft Christopher Online (Natural) - English (United States)',
      'Microsoft Eric Online (Natural) - English (United States)',
      // Apple Enhanced / Siri (macOS / iOS) - Warm & Clear
      'Ava (Enhanced)',
      'Evan (Enhanced)',
      'Zoe (Enhanced)',
      'Samantha (Enhanced)',
      'Tom (Enhanced)',
      'Allison (Enhanced)',
      'Alex',
      // Google US English (Android / Chrome)
      'Google US English',
      'Samantha',
      'Victoria',
      'Microsoft David Desktop - English (United States)',
      'Microsoft Zira Desktop - English (United States)'
    ];

    if (savedGender === 'female') {
      const femaleRanked = [
        'Jenny', 'Ava', 'Aria', 'Zoe', 'Samantha (Enhanced)', 'Allison', 'Samantha', 'Victoria', 'Zira'
      ];
      for (const name of femaleRanked) {
        const found = this.availableVoices.find(v => v.name.includes(name));
        if (found) {
          this.currentVoice = found;
          this.isInitialized = true;
          return;
        }
      }
    } else if (savedGender === 'male') {
      const maleRanked = [
        'Guy', 'Evan', 'Christopher', 'Tom (Enhanced)', 'Eric', 'Alex', 'David'
      ];
      for (const name of maleRanked) {
        const found = this.availableVoices.find(v => v.name.includes(name));
        if (found) {
          this.currentVoice = found;
          this.isInitialized = true;
          return;
        }
      }
    }

    // Fallback: pick the best available voice from top list
    for (const name of topNaturalVoices) {
      const found = this.availableVoices.find(v => v.name.includes(name) || v.name === name);
      if (found) {
        this.currentVoice = found;
        this.isInitialized = true;
        return;
      }
    }

    // Ultimate fallback to any en-US voice
    this.currentVoice = this.availableVoices[0] || null;
    this.isInitialized = true;
  }

  public getVoicesList(): VoiceOption[] {
    if (!this.isInitialized || this.availableVoices.length === 0) {
      this.initVoices();
    }

    return this.availableVoices.map(v => {
      const name = v.name;
      const isNatural = name.includes('Natural') || name.includes('Enhanced') || name.includes('Google') || name === 'Alex';
      let gender: 'female' | 'male' | 'neutral' = 'neutral';

      if (/jenny|ava|aria|zoe|samantha|allison|victoria|zira|susan|female/i.test(name)) {
        gender = 'female';
      } else if (/guy|evan|christopher|tom|eric|alex|david|male|fred/i.test(name)) {
        gender = 'male';
      }

      let labelVi = name.replace('Microsoft ', '').replace(' Online (Natural) - English (United States)', ' (Chuẩn AI)').replace(' - English (United States)', '');
      if (gender === 'female') labelVi += ' 👩 (Giọng Nữ)';
      if (gender === 'male') labelVi += ' 👨 (Giọng Nam)';

      return {
        name: v.name,
        lang: v.lang,
        gender,
        isNatural,
        labelVi,
      };
    });
  }

  public setVoiceByName(voiceName: string) {
    if (!this.synth) return;
    const found = this.availableVoices.find(v => v.name === voiceName);
    if (found) {
      this.currentVoice = found;
      if (typeof window !== 'undefined') {
        localStorage.setItem(VOICE_PREF_KEY, voiceName);
      }
    }
  }

  public setGenderPreference(gender: 'female' | 'male' | 'auto') {
    if (typeof window !== 'undefined') {
      localStorage.setItem(GENDER_PREF_KEY, gender);
    }
    this.initVoices();
  }

  public getCurrentVoiceName(): string {
    return this.currentVoice?.name || 'Giọng Chuẩn Mỹ Mặc Định';
  }

  public speak(text: string, options: { rate?: number; pitch?: number; onEnd?: () => void } = {}) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (options.onEnd) options.onEnd();
      return;
    }

    if (!this.synth) {
      this.synth = window.speechSynthesis;
    }

    // Fix for mobile Safari pausing
    if (this.synth.paused) {
      this.synth.resume();
    }

    // Cancel ongoing speech to prevent overlap
    this.synth.cancel();

    if (!this.isInitialized || !this.currentVoice) {
      this.initVoices();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = options.rate ?? 0.88; // Slightly crisp for clear phonetic understanding
    utterance.pitch = options.pitch ?? 1.0;

    if (this.currentVoice) {
      utterance.voice = this.currentVoice;
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

    // Safety timeout
    setTimeout(() => {
      if (!hasEnded && this.synth && !this.synth.speaking) {
        handleEnd();
      }
    }, Math.max(3000, text.length * 160));

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const speechEngine = new AmericanSpeechEngine();

const SPEED_PREF_KEY = 'VIBETALK_AUDIO_SPEED_PREF_V1';

export function getGlobalAudioSpeed(): number {
  if (typeof window === 'undefined') return 1.0;
  const saved = localStorage.getItem(SPEED_PREF_KEY);
  if (!saved) return 1.0;
  const parsed = parseFloat(saved);
  return isNaN(parsed) ? 1.0 : parsed;
}

export function setGlobalAudioSpeed(speed: number) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SPEED_PREF_KEY, speed.toString());
  }
}

/**
 * Universal American Speech Player
 * Uses Neural TTS / Studio Audio with graceful client fallback
 */
export function playAmericanSpeech(
  text: string, 
  rate?: number, 
  onEnd?: () => void,
  options?: { gender?: 'female' | 'male'; audioUrl?: string }
) {
  const globalSpeed = getGlobalAudioSpeed();
  const effectiveRate = (rate ?? 0.88) * globalSpeed;

  // If in browser and studio audio manager is available, use hybrid pipeline
  if (typeof window !== 'undefined') {
    import('./audioManager').then(({ studioAudio }) => {
      studioAudio.play(text, { rate: effectiveRate, onEnd, ...options });
    }).catch(() => {
      speechEngine.speak(text, { rate: effectiveRate, onEnd });
    });
  } else {
    speechEngine.speak(text, { rate: effectiveRate, onEnd });
  }
}
