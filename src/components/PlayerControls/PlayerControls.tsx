/**
 * PlayerControls Component
 * Main playback control interface
 */

import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Repeat1, Shuffle, Loader } from 'lucide-react';
import { RepeatMode } from '@/types';
import './PlayerControls.css';

interface PlayerControlsProps {
  isPlaying: boolean;
  repeatMode: RepeatMode;
  isShuffleOn: boolean;
  isBuffering: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleRepeat: () => void;
  onToggleShuffle: () => void;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  repeatMode,
  isShuffleOn,
  isBuffering,
  onPlayPause,
  onPrevious,
  onNext,
  onToggleRepeat,
  onToggleShuffle,
}) => {
  const RepeatIcon = repeatMode === RepeatMode.ONE ? Repeat1 : Repeat;

  return (
    <div className="player-controls">
      <button
        className={`control-btn secondary ${isShuffleOn ? 'active' : ''}`}
        onClick={onToggleShuffle}
        aria-label="Shuffle"
        title="Shuffle"
      >
        <Shuffle size={20} />
      </button>

      <button
        className="control-btn"
        onClick={onPrevious}
        aria-label="Previous track"
      >
        <SkipBack size={24} />
      </button>

      <button
        className="control-btn primary"
        onClick={onPlayPause}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        disabled={isBuffering}
      >
        {isBuffering ? <Loader size={32} className="animate-spin" /> : (isPlaying ? <Pause size={32} /> : <Play size={32} />)}
      </button>

      <button
        className="control-btn"
        onClick={onNext}
        aria-label="Next track"
      >
        <SkipForward size={24} />
      </button>

      <button
        className={`control-btn secondary ${repeatMode !== RepeatMode.OFF ? 'active' : ''}`}
        onClick={onToggleRepeat}
        aria-label="Repeat"
        title={`Repeat: ${repeatMode}`}
      >
        <RepeatIcon size={20} />
      </button>
    </div>
  );
};
