/**
 * Intelligent Pronunciation Assessment Engine (Client-Side, 100% Free)
 * Evaluates spoken English against target text with specialized diagnostics for Vietnamese learners.
 */

export interface WordScore {
  targetWord: string;
  spokenWord?: string;
  ipa?: string;
  score: number; // 0 - 100
  status: 'excellent' | 'good' | 'poor' | 'missing';
  vietnameseFeedback?: string;
}

export interface PronunciationResult {
  overallScore: number; // 0 - 100
  fluencyScore: number; // 0 - 100
  completenessScore: number; // 0 - 100
  transcript: string;
  targetText: string;
  words: WordScore[];
  generalFeedbackVi: string;
  endingSoundFeedbackVi?: string;
}

// Clean punctuation and normalize text for accurate comparison
function cleanWord(w: string): string {
  return w.toLowerCase().replace(/[^a-z0-9']/g, '').trim();
}

// Levenshtein similarity score between two words (0 - 100)
function calculateWordSimilarity(a: string, b: string): number {
  const s1 = cleanWord(a);
  const s2 = cleanWord(b);
  if (!s1 && !s2) return 100;
  if (!s1 || !s2) return 0;
  if (s1 === s2) return 100;

  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  const distance = dp[m][n];
  const maxLen = Math.max(m, n);
  const similarity = Math.max(0, (1 - distance / maxLen) * 100);
  return Math.round(similarity);
}

// Check specific Vietnamese learner ending sound mistakes
function checkEndingSoundMistake(target: string, spoken: string): string | undefined {
  const t = cleanWord(target);
  const s = cleanWord(spoken);

  // Missing /s/ or /z/ (e.g., target 'nice'/'is' -> spoken 'ni'/'i')
  if (t.endsWith('s') || t.endsWith('ce') || t.endsWith('se') || t.endsWith('x')) {
    if (!s.endsWith('s') && !s.endsWith('x') && !s.endsWith('ce') && !s.endsWith('se')) {
      return `Có vẻ bạn chưa bật rõ âm đuôi xì /s/ hoặc /z/ ở cuối từ "${target}".`;
    }
  }

  // Missing /t/ or /d/ (e.g., target 'light' -> spoken 'lie', target 'need' -> 'nee')
  if (t.endsWith('t') || t.endsWith('te') || t.endsWith('d') || t.endsWith('de') || t.endsWith('ed')) {
    if (!s.endsWith('t') && !s.endsWith('d') && !s.endsWith('te') && !s.endsWith('de')) {
      return `Hãy chú ý bật âm nén hơi /t/ hoặc rung /d/ ở cuối từ "${target}" để người nghe không nhầm sang từ khác.`;
    }
  }

  // Missing /k/ (e.g., target 'like' -> spoken 'lie')
  if (t.endsWith('k') || t.endsWith('ke') || t.endsWith('c') || t.endsWith('ck')) {
    if (!s.endsWith('k') && !s.endsWith('c') && !s.endsWith('ck') && !s.endsWith('ke')) {
      return `Từ "${target}" cần bật âm /k/ giòn trong cổ họng ở cuối từ.`;
    }
  }

  // Missing /tʃ/ or /dʒ/ (e.g., target 'beach', 'watch', 'bridge')
  if (t.endsWith('ch') || t.endsWith('tch') || t.endsWith('ge') || t.endsWith('dge')) {
    if (!s.endsWith('ch') && !s.endsWith('ge') && !s.endsWith('tch')) {
      return `Nhớ chu môi và bật âm giật /tʃ/ hoặc /dʒ/ ở đuôi từ "${target}".`;
    }
  }

  return undefined;
}

/**
 * Main evaluation function comparing target text and recognized spoken transcript
 */
export function evaluatePronunciation(targetText: string, spokenTranscript: string): PronunciationResult {
  const targetWords = targetText.trim().split(/\s+/).filter(Boolean);
  const spokenWords = spokenTranscript.trim().split(/\s+/).filter(Boolean);

  const wordScores: WordScore[] = [];
  let totalScore = 0;
  let endingSoundIssues: string[] = [];

  targetWords.forEach((targetW, idx) => {
    // Find best match in spoken words
    let bestScore = 0;
    let matchedSpoken = '';

    if (spokenWords[idx]) {
      const directSim = calculateWordSimilarity(targetW, spokenWords[idx]);
      bestScore = directSim;
      matchedSpoken = spokenWords[idx];
    }

    // Search nearby words in case of insertion/omission
    for (let j = Math.max(0, idx - 2); j <= Math.min(spokenWords.length - 1, idx + 2); j++) {
      const sim = calculateWordSimilarity(targetW, spokenWords[j]);
      if (sim > bestScore) {
        bestScore = sim;
        matchedSpoken = spokenWords[j];
      }
    }

    let status: WordScore['status'] = 'poor';
    if (bestScore >= 85) {
      status = 'excellent';
    } else if (bestScore >= 55) {
      status = 'good';
    } else {
      status = matchedSpoken ? 'poor' : 'missing';
    }

    let vietnameseFeedback: string | undefined;
    if (matchedSpoken) {
      const endingError = checkEndingSoundMistake(targetW, matchedSpoken);
      if (endingError) {
        vietnameseFeedback = endingError;
        endingSoundIssues.push(endingError);
        // Slightly penalize if ending sound was dropped
        if (bestScore > 75) bestScore = 70;
      }
    } else {
      vietnameseFeedback = `Bạn dường như đã bỏ quên từ này khi đọc.`;
    }

    wordScores.push({
      targetWord: targetW,
      spokenWord: matchedSpoken || undefined,
      score: bestScore,
      status,
      vietnameseFeedback,
    });

    totalScore += bestScore;
  });

  const averageScore = targetWords.length > 0 ? Math.round(totalScore / targetWords.length) : 0;
  const completeness = targetWords.length > 0 
    ? Math.round((wordScores.filter(w => w.status !== 'missing').length / targetWords.length) * 100) 
    : 0;

  // General feedback message in Vietnamese (Engaging, Witty & Motivating)
  let generalFeedbackVi = '';
  if (averageScore >= 88) {
    generalFeedbackVi = '🌟 Đỉnh chóp! Giọng này mang sang Mỹ nói chuyện tự tin rồi đấy!';
  } else if (averageScore >= 70) {
    generalFeedbackVi = '👍 Giọng nghe khá "vibe" rồi đấy! Bắn thêm chút âm đuôi nữa là chuẩn bài.';
  } else if (averageScore >= 50) {
    generalFeedbackVi = '💪 Khá ổn! Chú ý mở khẩu hình to hơn và đừng nuốt âm đuôi nhé.';
  } else {
    generalFeedbackVi = '🎯 Chưa sao cả! Nghe lại giọng mẫu một lần nữa rồi cùng làm lại cú nữa nào!';
  }

  const endingSoundFeedbackVi = endingSoundIssues.length > 0 ? endingSoundIssues[0] : undefined;

  return {
    overallScore: averageScore,
    fluencyScore: Math.min(100, Math.round(averageScore * 0.95 + 5)),
    completenessScore: completeness,
    transcript: spokenTranscript,
    targetText,
    words: wordScores,
    generalFeedbackVi,
    endingSoundFeedbackVi,
  };
}

/**
 * Browser Speech Recognition Helper
 */
export class BrowserSpeechRecognizer {
  private recognition: any = null;
  private isListening = false;
  private onResultCallback: ((transcript: string, isFinal: boolean) => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          const currentText = finalTranscript || interimTranscript;
          if (this.onResultCallback) {
            this.onResultCallback(currentText, Boolean(finalTranscript));
          }
        };

        this.recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          this.isListening = false;
          if (this.onErrorCallback) {
            this.onErrorCallback(event.error);
          }
        };

        this.recognition.onend = () => {
          this.isListening = false;
          if (this.onEndCallback) {
            this.onEndCallback();
          }
        };
      }
    }
  }

  public isSupported(): boolean {
    return Boolean(this.recognition);
  }

  public start(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ) {
    if (!this.recognition) {
      onError('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói Web Speech API.');
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
    }

    this.onResultCallback = onResult;
    this.onErrorCallback = onError;
    this.onEndCallback = onEnd;

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (err) {
      console.error('Failed to start recognition:', err);
      onError('Không thể khởi động micro. Vui lòng thử lại.');
    }
  }

  public stop() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (err) {
        // ignore
      }
      this.isListening = false;
    }
  }
}
