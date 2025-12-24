/**
 * Core type definitions for the Music Player application
 * Following software engineering principles:
 * - Single Responsibility: Each type has a clear, single purpose
 * - Type Safety: Strict TypeScript interfaces for compile-time safety
 * - Immutability: Read-only properties where appropriate
 */

export interface Track {
  readonly id: string;
  readonly name: string;
  readonly artist: string;
  readonly albumArt: string;
  readonly audioUrl: string;
  readonly duration?: number;
}

export interface PlaylistState {
  readonly tracks: Track[];
  readonly currentTrackIndex: number;
}

export enum RepeatMode {
  OFF = 'off',
  ONE = 'one',
  ALL = 'all',
}

export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  repeatMode: RepeatMode;
  isShuffleOn: boolean;
  isBuffering: boolean;
}

export interface AudioControls {
  play: () => Promise<void>;
  pause: () => void;
  togglePlayPause: () => Promise<void>;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  selectTrack: (index: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
}

export type MusicPlayerContextType = {
  playerState: PlayerState;
  playlistState: PlaylistState;
  currentTrack: Track | null;
  audioControls: AudioControls;
};
