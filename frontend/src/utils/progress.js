// Utility for storing and retrieving progress data
const STORAGE_KEY = 'orthoplay_progress';

export function getProgress() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addProgressEntry(date, completed) {
  const progress = getProgress();
  const existing = progress.find(p => p.date === date);
  if (existing) {
    existing.completed = completed;
  } else {
    progress.push({ date, completed });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
} 