/**
 * Playlist Component
 * Displays and manages the music library
 */

import React, { useState } from 'react';
import { Track } from '@/types';
import { Music, Play, ChevronDown, ChevronUp } from 'lucide-react';
import './Playlist.css';

interface PlaylistProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
}

export const Playlist: React.FC<PlaylistProps> = ({
  tracks,
  currentTrackIndex,
  isPlaying,
  onSelectTrack,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`playlist ${isExpanded ? 'expanded' : ''}`}>
      <button
        className="playlist-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Hide playlist' : 'Show playlist'}
      >
        <Music size={20} />
        <span>Playlist ({tracks.length} songs)</span>
        {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </button>

      {isExpanded && (
        <div className="playlist-content">
          <div className="playlist-items">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={`playlist-item ${index === currentTrackIndex ? 'active' : ''}`}
                onClick={() => onSelectTrack(index)}
              >
                <div className="playlist-item-artwork">
                  <img src={track.albumArt} alt="" loading="lazy" />
                  {index === currentTrackIndex && isPlaying && (
                    <div className="playing-indicator">
                      <span />
                      <span />
                      <span />
                    </div>
                  )}
                  {index === currentTrackIndex && !isPlaying && (
                    <div className="play-overlay">
                      <Play size={16} />
                    </div>
                  )}
                </div>
                <div className="playlist-item-info">
                  <div className="playlist-item-name">{track.name}</div>
                  <div className="playlist-item-artist">{track.artist}</div>
                </div>
                <div className="playlist-item-number">#{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
