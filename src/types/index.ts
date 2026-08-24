export type IpaCategory = 'monophthong' | 'diphthong' | 'consonant-voiced' | 'consonant-voiceless';

export interface ExampleWord {
  word: string;
  ipa: string;
  meaningVi: string;
  syllables?: string; // e.g. "com-fort-a-ble"
  highlightPart?: string; // specific phoneme or ending sound
}

export interface IpaSound {
  id: string;
  symbol: string;
  type: IpaCategory;
  name: string;
  vietnameseGuide: string;
  vietnameseCommonMistake: string;
  mouthGuide: string;
  examples: ExampleWord[];
  audioSampleWord: string;
}

export interface VocabItem {
  id: string;
  word: string;
  ipa: string;
  meaningVi: string;
  partOfSpeech: string;
  exampleSentence: string;
  exampleSentenceVi: string;
  endingSoundNote?: string;
  americanTip?: string;
  savedAt?: number;
}

export interface DialogueLine {
  id: string;
  speaker: 'A' | 'B';
  speakerName: string;
  avatar: string;
  textEn: string;
  textVi: string;
  ipa: string;
  audioSlow?: boolean;
}

export type LevelId = 'lv0' | 'lv1' | 'lv2' | 'lv3';

export interface Lesson {
  id: string;
  levelId: LevelId;
  titleEn: string;
  titleVi: string;
  descriptionVi: string;
  icon: string;
  durationMinutes: number;
  tags: string[];
  keyTakeaways: string[];
  vocabulary: VocabItem[];
  dialogue?: DialogueLine[];
  vietnamesePronunciationTips: {
    title: string;
    description: string;
    rule: string;
    examples: { en: string; ipa: string; vi: string; soundTip?: string }[];
  }[];
}

export interface LevelInfo {
  id: LevelId;
  title: string;
  subTitle: string;
  cefrLevel: string; // e.g. "A1", "A2", "B1", "B2"
  badge: string;
  descriptionVi: string;
  targetVi: string;
  color: string;
  lessons: string[]; // lesson ids
  requiredScoreToPass: number;
}

export interface TestQuestion {
  id: string;
  type: 'listen-choose-word' | 'ipa-identification' | 'dialogue-completion' | 'ending-sound-check';
  prompt: string;
  promptVi: string;
  audioText?: string;
  options: string[];
  correctAnswerIndex: number;
  explanationVi: string;
}

export interface LevelTest {
  levelId: LevelId;
  titleVi: string;
  descriptionVi: string;
  passingScore: number;
  totalQuestions: number;
  questions: TestQuestion[];
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: number;
  exp: number;
  streakDays: number;
  lastActiveDate: string;
  currentLevel: LevelId;
  unlockedLevels: LevelId[];
  completedLessons: string[];
  savedWords: VocabItem[];
  savedLessons: string[];
  testResults: Record<string, { score: number; passed: boolean; completedAt: number }>;
  isAdminMode?: boolean;
}

export interface UserProgress {
  currentLevel: LevelId;
  unlockedLevels: LevelId[];
  completedLessons: string[]; // lesson IDs
  savedWords: VocabItem[];
  savedLessons: string[]; // lesson IDs
  streakDays: number;
  lastActiveDate: string;
  testResults: Record<string, { score: number; passed: boolean; completedAt: number }>;
  isAdminMode?: boolean;
  exp?: number;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  levelBadge: string;
  exp: number;
  streakDays: number;
  completedLessonsCount: number;
  rank: number;
  isCurrentUser?: boolean;
}
