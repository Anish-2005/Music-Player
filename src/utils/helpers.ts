/**
 * Utility functions following Single Responsibility Principle
 * Each function has one clear purpose
 */

/**
 * Formats time in seconds to MM:SS format
 */
export const formatTime = (seconds: number): string => {
  if (!isFinite(seconds) || seconds < 0) return '00:00';
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Safely gets a value from localStorage with type safety
 */
export const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Safely sets a value in localStorage
 */
export const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

/**
 * Shuffles an array using Fisher-Yates algorithm
 * Returns a new array without mutating the original
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Clamps a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <TArgs extends unknown[]>(
  func: (...args: TArgs) => void,
  wait: number
): ((...args: TArgs) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: TArgs) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
