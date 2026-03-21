/**
 * Music Player Context - Global State Management
 * Implements Context API pattern for state sharing
 * Provides centralized access to player state and controls
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { MusicPlayerContextType, PlayerState, RepeatMode, AudioControls } from '@/types';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { usePlaylist } from '@/hooks/usePlaylist';
import { MUSIC_LIBRARY } from '@/data/musicLibrary';
import { DEFAULT_VOLUME, STORAGE_KEYS } from '@/constants/config';
import { getStorageItem, setStorageItem, clamp } from '@/utils/helpers';

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const MusicPlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Player state
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: getStorageItem(STORAGE_KEYS.VOLUME, DEFAULT_VOLUME),
    isMuted: false,
    repeatMode: getStorageItem(STORAGE_KEYS.REPEAT_MODE, RepeatMode.OFF),
    isShuffleOn: getStorageItem(STORAGE_KEYS.SHUFFLE, false),
    isBuffering: false,
  });

  // Playlist management
  const {
    currentTrack,
    currentTrackIndex,
    nextTrack: playlistNext,
    previousTrack: playlistPrev,
    selectTrack: playlistSelect,
    toggleShuffle: playlistToggleShuffle,
    totalTracks,
    isShuffleOn,
  } = usePlaylist({ tracks: MUSIC_LIBRARY });

  // Audio callbacks
  const handleTimeUpdate = useCallback((currentTime: number) => {
    setPlayerState(prev => ({ ...prev, currentTime }));
  }, []);

  const handleDurationChange = useCallback((duration: number) => {
    setPlayerState(prev => ({ ...prev, duration }));
  }, []);

  const handleEnded = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isPlaying: false }));
    
    // Auto-play next based on repeat mode
    if (playerState.repeatMode === RepeatMode.ONE) {
      setPlayerState(prev => ({ ...prev, isPlaying: true, currentTime: 0 }));
    } else if (playerState.repeatMode === RepeatMode.ALL || currentTrackIndex < totalTracks - 1) {
      playlistNext();
      setTimeout(() => setPlayerState(prev => ({ ...prev, isPlaying: true })), 100);
    }
  }, [playerState.repeatMode, currentTrackIndex, totalTracks, playlistNext]);

  const handleCanPlay = useCallback(() => {
    // Track is ready to play
  }, []);

  const handleBufferingStart = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isBuffering: true }));
  }, []);

  const handleBufferingEnd = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isBuffering: false }));
  }, []);

  // Initialize audio player
  const { seek: audioSeek } = useAudioPlayer({
    track: currentTrack,
    playerState,
    onTimeUpdate: handleTimeUpdate,
    onDurationChange: handleDurationChange,
    onEnded: handleEnded,
    onCanPlay: handleCanPlay,
    onBufferingStart: handleBufferingStart,
    onBufferingEnd: handleBufferingEnd,
  });

  // Audio controls
  const play = useCallback(async () => {
    setPlayerState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const pause = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlayPause = useCallback(async () => {
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const seek = useCallback((time: number) => {
    const clampedTime = clamp(time, 0, playerState.duration);
    audioSeek(clampedTime);
    setPlayerState(prev => ({ ...prev, currentTime: clampedTime }));
  }, [playerState.duration, audioSeek]);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = clamp(volume, 0, 1);
    setPlayerState(prev => ({ ...prev, volume: clampedVolume, isMuted: false }));
    setStorageItem(STORAGE_KEYS.VOLUME, clampedVolume);
  }, []);

  const toggleMute = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  const nextTrack = useCallback(() => {
    playlistNext();
    setPlayerState(prev => ({ ...prev, currentTime: 0 }));
  }, [playlistNext]);

  const previousTrack = useCallback(() => {
    // If more than 3 seconds in, restart current track
    if (playerState.currentTime > 3) {
      seek(0);
    } else {
      playlistPrev();
      setPlayerState(prev => ({ ...prev, currentTime: 0 }));
    }
  }, [playerState.currentTime, playlistPrev, seek]);

  const selectTrack = useCallback((index: number) => {
    // Set playing state immediately for instant feedback
    setPlayerState(prev => ({ ...prev, currentTime: 0, isPlaying: true }));
    playlistSelect(index);
  }, [playlistSelect]);

  const toggleRepeat = useCallback(() => {
    setPlayerState(prev => {
      const modes = [RepeatMode.OFF, RepeatMode.ALL, RepeatMode.ONE];
      const currentIndex = modes.indexOf(prev.repeatMode);
      const newMode = modes[(currentIndex + 1) % modes.length];
      setStorageItem(STORAGE_KEYS.REPEAT_MODE, newMode);
      return { ...prev, repeatMode: newMode };
    });
  }, []);

  const toggleShuffle = useCallback(() => {
    playlistToggleShuffle();
    setPlayerState(prev => ({ ...prev, isShuffleOn: !prev.isShuffleOn }));
  }, [playlistToggleShuffle]);

  const audioControls: AudioControls = {
    play,
    pause,
    togglePlayPause,
    seek,
    setVolume,
    toggleMute,
    nextTrack,
    previousTrack,
    selectTrack,
    toggleRepeat,
    toggleShuffle,
  };

  const value: MusicPlayerContextType = {
    playerState: { ...playerState, isShuffleOn },
    playlistState: {
      tracks: MUSIC_LIBRARY,
      currentTrackIndex,
    },
    currentTrack,
    audioControls,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMusicPlayer = (): MusicPlayerContextType => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within MusicPlayerProvider');
  }
  return context;
};
