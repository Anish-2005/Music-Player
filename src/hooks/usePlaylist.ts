/**
 * Custom hook for playlist management
 * Handles track selection, shuffle, and navigation logic
 * Separation of Concerns - isolated from audio playback
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Track } from '@/types';
import { shuffleArray } from '@/utils/helpers';
import { STORAGE_KEYS } from '@/constants/config';
import { getStorageItem, setStorageItem } from '@/utils/helpers';

interface UsePlaylistProps {
  tracks: Track[];
}

export const usePlaylist = ({ tracks }: UsePlaylistProps) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => 
    getStorageItem(STORAGE_KEYS.LAST_TRACK_INDEX, 0)
  );
  const [isShuffleOn, setIsShuffleOn] = useState(() =>
    getStorageItem(STORAGE_KEYS.SHUFFLE, false)
  );
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  // Create shuffled indices when shuffle is enabled
  useEffect(() => {
    if (isShuffleOn) {
      const indices = tracks.map((_, i) => i);
      const shuffled = shuffleArray(indices);
      setShuffledIndices(shuffled);
    }
  }, [isShuffleOn, tracks]);

  // Get current track based on shuffle state
  const currentTrack = useMemo(() => {
    if (!tracks.length) return null;
    const index = isShuffleOn && shuffledIndices.length 
      ? shuffledIndices[currentTrackIndex] 
      : currentTrackIndex;
    return tracks[index] || tracks[0];
  }, [tracks, currentTrackIndex, isShuffleOn, shuffledIndices]);

  // Save current track index
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.LAST_TRACK_INDEX, currentTrackIndex);
  }, [currentTrackIndex]);

  // Navigate to next track
  const nextTrack = useCallback(() => {
    setCurrentTrackIndex(prev => {
      const maxIndex = isShuffleOn ? shuffledIndices.length - 1 : tracks.length - 1;
      return prev < maxIndex ? prev + 1 : 0;
    });
  }, [tracks.length, isShuffleOn, shuffledIndices.length]);

  // Navigate to previous track
  const previousTrack = useCallback(() => {
    setCurrentTrackIndex(prev => {
      const maxIndex = isShuffleOn ? shuffledIndices.length - 1 : tracks.length - 1;
      return prev > 0 ? prev - 1 : maxIndex;
    });
  }, [tracks.length, isShuffleOn, shuffledIndices.length]);

  // Select specific track
  const selectTrack = useCallback((index: number) => {
    if (index >= 0 && index < tracks.length) {
      setCurrentTrackIndex(index);
    }
  }, [tracks.length]);

  // Toggle shuffle
  const toggleShuffle = useCallback(() => {
    setIsShuffleOn(prev => {
      const newValue = !prev;
      setStorageItem(STORAGE_KEYS.SHUFFLE, newValue);
      return newValue;
    });
  }, []);

  return {
    currentTrack,
    currentTrackIndex,
    isShuffleOn,
    nextTrack,
    previousTrack,
    selectTrack,
    toggleShuffle,
    totalTracks: tracks.length,
  };
};
