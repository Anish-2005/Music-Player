/**
 * ProgressBar Component
 * Reusable component following Single Responsibility Principle
 * Handles seeking and visual progress display
 */

import React from 'react';
import { formatTime } from '@/utils/helpers';
import './ProgressBar.css';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
}) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    onSeek(newTime);
  };

  return (
    <div className="progress-bar">
      <span className="time-label">{formatTime(currentTime)}</span>
      <div className="progress-container">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="progress-slider"
          aria-label="Seek slider"
        />
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="time-label">{formatTime(duration)}</span>
    </div>
  );
};
