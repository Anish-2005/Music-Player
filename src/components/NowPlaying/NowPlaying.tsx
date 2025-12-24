/**
 * NowPlaying Component
 * Displays current track information with animated album art
 */

import React from 'react';
import { Track } from '@/types';
import { Music } from 'lucide-react';
import './NowPlaying.css';

interface NowPlayingProps {
  track: Track | null;
  isPlaying: boolean;
  currentIndex: number;
  totalTracks: number;
}

export const NowPlaying: React.FC<NowPlayingProps> = ({
  track,
  isPlaying,
  currentIndex,
  totalTracks,
}) => {
  if (!track) {
    return (
      <div className="now-playing">
        <div className="album-art-placeholder">
          <Music size={64} />
        </div>
        <div className="track-info">
          <p className="track-number">No track loaded</p>
        </div>
      </div>
    );
  }

  return (
    <div className="now-playing">
      <div className="track-number-badge">
        {currentIndex + 1} / {totalTracks}
      </div>
      
      <div className={`album-art-container ${isPlaying ? 'playing' : ''}`}>
        <div className="album-art-glow" />
        <img
          src={track.albumArt}
          alt={`${track.name} album art`}
          className="album-art"
          loading="eager"
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23667eea" width="300" height="300"/%3E%3C/svg%3E';
          }}
        />
        <div className="vinyl-effect" />
        {isPlaying && (
          <div className="sound-waves">
            <span className="wave" />
            <span className="wave" />
            <span className="wave" />
            <span className="wave" />
          </div>
        )}
      </div>

      <div className="track-info">
        <h2 className="track-name">{track.name}</h2>
        <p className="track-artist">{track.artist}</p>
      </div>
    </div>
  );
};
