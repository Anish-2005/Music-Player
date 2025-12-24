/**
 * Constants configuration file
 * Centralized configuration following DRY principle
 */

export const STORAGE_KEYS = {
  VOLUME: 'musicPlayer_volume',
  REPEAT_MODE: 'musicPlayer_repeatMode',
  SHUFFLE: 'musicPlayer_shuffle',
  LAST_TRACK_INDEX: 'musicPlayer_lastTrackIndex',
} as const;

export const DEFAULT_VOLUME = 0.7;
export const VOLUME_STEP = 0.1;
export const SEEK_STEP = 5;

export const ANIMATION_DURATION = {
  SHORT: 200,
  MEDIUM: 300,
  LONG: 500,
} as const;

export const PLAYER_CONFIG = {
  UPDATE_INTERVAL: 100, // ms for progress bar updates
  DEBOUNCE_DELAY: 300,
  AUTO_PLAY_NEXT: true,
} as const;
