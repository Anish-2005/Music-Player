/**
 * VolumeControl Component
 * Encapsulates volume adjustment UI
 */

import React from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import './VolumeControl.css';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}) => {
  const displayVolume = isMuted ? 0 : volume;
  
  const VolumeIcon = isMuted ? VolumeX : displayVolume > 0.5 ? Volume2 : Volume1;

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(parseFloat(e.target.value) / 100);
  };

  return (
    <div className="volume-control">
      <button
        className="volume-icon-btn"
        onClick={onToggleMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        <VolumeIcon size={20} />
      </button>
      <div className="volume-slider-container">
        <input
          type="range"
          min="0"
          max="100"
          value={displayVolume * 100}
          onChange={handleVolumeChange}
          className="volume-slider"
          aria-label="Volume slider"
        />
        <div
          className="volume-fill"
          style={{ width: `${displayVolume * 100}%` }}
        />
      </div>
    </div>
  );
};
