/**
 * TrackCard Component - Individual track display card
 */

import React from 'react';
import { Track } from '@/types';
import { Play, Pause } from 'lucide-react';
import './TrackCard.css';

interface TrackCardProps {
  track: Track;
  index: number;
  isPlaying: boolean;
  isCurrentTrack: boolean;
  onPlay: (index: number) => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({
  track,
  index,
  isPlaying,
  isCurrentTrack,
  onPlay,
}) => {
  return (
    <div
      className={`track-card ${isCurrentTrack ? 'active' : ''}`}
      onClick={() => onPlay(index)}
    >
      <div className="track-card-artwork">
        <img src={track.albumArt} alt={track.name} loading="lazy" />
        <div className="track-card-overlay">
          {isCurrentTrack && isPlaying ? (
            <Pause size={28} className="play-icon" />
          ) : (
            <Play size={28} className="play-icon" />
          )}
        </div>
      </div>
      
      <div className="track-card-info">
        <h3 className="track-card-name">{track.name}</h3>
        <p className="track-card-artist">{track.artist}</p>
      </div>
    </div>
  );
};
