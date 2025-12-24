/**
 * NowPlayingBar Component - Bottom player bar (Spotify-like)
 */

import React from 'react';
import { Track, PlayerState } from '@/types';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1, Volume2, VolumeX } from 'lucide-react';
import { RepeatMode } from '@/types';
import { formatTime } from '@/utils/helpers';
import './NowPlayingBar.css';

interface NowPlayingBarProps {
  track: Track | null;
  playerState: PlayerState;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onToggleRepeat: () => void;
  onToggleShuffle: () => void;
}

export const NowPlayingBar: React.FC<NowPlayingBarProps> = ({
  track,
  playerState,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleRepeat,
  onToggleShuffle,
}) => {
  const progress = playerState.duration > 0 ? (playerState.currentTime / playerState.duration) * 100 : 0;
  const RepeatIcon = playerState.repeatMode === RepeatMode.ONE ? Repeat1 : Repeat;
  const VolumeIcon = playerState.isMuted ? VolumeX : Volume2;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * playerState.duration;
    onSeek(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(parseFloat(e.target.value) / 100);
  };

  if (!track) return null;

  return (
    <div className="now-playing-bar">
      <div className="npb-track-info">
        <div className="npb-artwork">
          <img src={track.albumArt} alt={track.name} />
        </div>
        <div className="npb-details">
          <div className="npb-track-name">{track.name}</div>
          <div className="npb-track-artist">{track.artist}</div>
        </div>
      </div>

      <div className="npb-controls-center">
        <div className="npb-buttons">
          <button
            className={`npb-btn ${playerState.isShuffleOn ? 'active' : ''}`}
            onClick={onToggleShuffle}
            aria-label="Shuffle"
          >
            <Shuffle size={18} />
          </button>
          <button className="npb-btn" onClick={onPrevious} aria-label="Previous">
            <SkipBack size={20} />
          </button>
          <button className="npb-btn npb-play-btn" onClick={onPlayPause} aria-label={playerState.isPlaying ? 'Pause' : 'Play'}>
            {playerState.isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button className="npb-btn" onClick={onNext} aria-label="Next">
            <SkipForward size={20} />
          </button>
          <button
            className={`npb-btn ${playerState.repeatMode !== RepeatMode.OFF ? 'active' : ''}`}
            onClick={onToggleRepeat}
            aria-label="Repeat"
          >
            <RepeatIcon size={18} />
          </button>
        </div>

        <div className="npb-progress">
          <span className="npb-time">{formatTime(playerState.currentTime)}</span>
          <div className="npb-progress-container">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="npb-progress-slider"
            />
            <div className="npb-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="npb-time">{formatTime(playerState.duration)}</span>
        </div>
      </div>

      <div className="npb-controls-right">
        <button className="npb-btn" onClick={onToggleMute} aria-label="Volume">
          <VolumeIcon size={20} />
        </button>
        <div className="npb-volume-container">
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.isMuted ? 0 : playerState.volume * 100}
            onChange={handleVolumeChange}
            className="npb-volume-slider"
          />
          <div
            className="npb-volume-fill"
            style={{ width: `${playerState.isMuted ? 0 : playerState.volume * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
