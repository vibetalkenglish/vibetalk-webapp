import { UserProgress, VocabItem, LevelId } from '@/types';

const STORAGE_KEY = 'VIBETALK_USER_PROGRESS_V1';
const LEGACY_STORAGE_KEY = 'AMITALK_USER_PROGRESS_V1';

const DEFAULT_PROGRESS: UserProgress = {
  currentLevel: 'lv0',
  unlockedLevels: ['lv0'],
  completedLessons: [],
  savedWords: [],
  savedLessons: [],
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  testResults: {},
};

// Event emitter to notify components of storage changes
type Listener = (progress: UserProgress) => void;
const listeners: Set<Listener> = new Set();

export function subscribeToProgress(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners(progress: UserProgress) {
  listeners.forEach(fn => fn(progress));
}

export function getUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Migrate from legacy key if exists
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        raw = legacyRaw;
        localStorage.setItem(STORAGE_KEY, legacyRaw);
      }
    }

    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROGRESS));
      return DEFAULT_PROGRESS;
    }

    const parsed: UserProgress = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error('Error reading user progress:', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    notifyListeners(progress);
  } catch (err) {
    console.error('Error saving user progress:', err);
  }
}

export function updateStreak() {
  const progress = getUserProgress();
  const today = new Date().toISOString().split('T')[0];

  if (progress.lastActiveDate !== today) {
    const lastDate = new Date(progress.lastActiveDate);
    const currentDate = new Date(today);
    const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      progress.streakDays += 1;
    } else if (diffDays > 1) {
      progress.streakDays = 1;
    }

    progress.lastActiveDate = today;
    saveUserProgress(progress);
  }
}

export function toggleSaveWord(word: VocabItem): boolean {
  const progress = getUserProgress();
  const exists = progress.savedWords.some(w => w.id === word.id || w.word.toLowerCase() === word.word.toLowerCase());
  
  let isSaved = false;
  if (exists) {
    progress.savedWords = progress.savedWords.filter(w => w.id !== word.id && w.word.toLowerCase() !== word.word.toLowerCase());
    isSaved = false;
  } else {
    progress.savedWords.push({ ...word, savedAt: Date.now() });
    isSaved = true;
  }
  
  saveUserProgress(progress);
  return isSaved;
}

export function isWordSaved(wordIdOrText: string): boolean {
  const progress = getUserProgress();
  return progress.savedWords.some(
    w => w.id === wordIdOrText || w.word.toLowerCase() === wordIdOrText.toLowerCase()
  );
}

export function toggleSaveLesson(lessonId: string): boolean {
  const progress = getUserProgress();
  const exists = progress.savedLessons.includes(lessonId);
  
  let isSaved = false;
  if (exists) {
    progress.savedLessons = progress.savedLessons.filter(id => id !== lessonId);
    isSaved = false;
  } else {
    progress.savedLessons.push(lessonId);
    isSaved = true;
  }
  
  saveUserProgress(progress);
  return isSaved;
}

export function isLessonSaved(lessonId: string): boolean {
  const progress = getUserProgress();
  return progress.savedLessons.includes(lessonId);
}

export function markLessonCompleted(lessonId: string) {
  const progress = getUserProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    saveUserProgress(progress);
  }
}

export function recordTestResult(levelId: LevelId, score: number, passed: boolean) {
  const progress = getUserProgress();
  progress.testResults[levelId] = {
    score,
    passed,
    completedAt: Date.now(),
  };

  if (passed) {
    if (levelId === 'lv0' && !progress.unlockedLevels.includes('lv1')) {
      progress.unlockedLevels.push('lv1');
      progress.currentLevel = 'lv1';
    } else if (levelId === 'lv1' && !progress.unlockedLevels.includes('lv2')) {
      progress.unlockedLevels.push('lv2');
      progress.currentLevel = 'lv2';
    } else if (levelId === 'lv2' && !progress.unlockedLevels.includes('lv3')) {
      progress.unlockedLevels.push('lv3');
      progress.currentLevel = 'lv3';
    }
  }

  saveUserProgress(progress);
}

export function toggleAdminMode(): boolean {
  const progress = getUserProgress();
  const nextState = !progress.isAdminMode;
  progress.isAdminMode = nextState;

  if (nextState) {
    // When admin mode is active, make sure all levels are in unlockedLevels
    progress.unlockedLevels = ['lv0', 'lv1', 'lv2', 'lv3'];
  }

  saveUserProgress(progress);
  return nextState;
}

export function setAdminMode(enabled: boolean) {
  const progress = getUserProgress();
  progress.isAdminMode = enabled;
  if (enabled) {
    progress.unlockedLevels = ['lv0', 'lv1', 'lv2', 'lv3'];
  }
  saveUserProgress(progress);
}

export function unlockAllLessonsAndLevels() {
  const progress = getUserProgress();
  progress.isAdminMode = true;
  progress.unlockedLevels = ['lv0', 'lv1', 'lv2'];
  saveUserProgress(progress);
}

export function resetToStudentProgress() {
  const progress = getUserProgress();
  progress.isAdminMode = false;
  progress.unlockedLevels = ['lv0'];
  progress.currentLevel = 'lv0';
  progress.completedLessons = [];
  saveUserProgress(progress);
}
