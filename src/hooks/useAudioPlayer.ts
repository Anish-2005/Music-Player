/**
 * Custom hook for audio playback management
 * Follows Single Responsibility Principle - only handles audio operations
 * Encapsulates audio element lifecycle and event handling
 */

import { useRef, useEffect, useCallback } from 'react';
import { PlayerState, Track } from '@/types';

interface UseAudioPlayerProps {
  track: Track | null;
  playerState: PlayerState;
  onTimeUpdate: (currentTime: number) => void;
  onDurationChange: (duration: number) => void;
  onEnded: () => void;
  onCanPlay: () => void;
}

export const useAudioPlayer = ({
  track,
  playerState,
  onTimeUpdate,
  onDurationChange,
  onEnded,
  onCanPlay,
}: UseAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    // Event listeners
    const handleTimeUpdate = () => onTimeUpdate(audio.currentTime);
    const handleDurationChange = () => onDurationChange(audio.duration);
    const handleEnded = () => onEnded();
    const handleCanPlay = () => onCanPlay();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
      audio.src = '';
    };
  }, [onTimeUpdate, onDurationChange, onEnded, onCanPlay]);

  // Load track
  useEffect(() => {
    if (audioRef.current && track) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.load();
    }
  }, [track]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (playerState.isPlaying) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [playerState.isPlaying]);

  // Handle volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = playerState.isMuted ? 0 : playerState.volume;
    }
  }, [playerState.volume, playerState.isMuted]);

  // Seek to specific time
  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  return { audioRef, seek };
};
