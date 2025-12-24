/**
 * Dashboard Home View Component
 */

import React from 'react';
import { Track } from '@/types';
import { TrackCard } from '@/components/TrackCard/TrackCard';
import './HomeView.css';

interface HomeViewProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  tracks,
  currentTrackIndex,
  isPlaying,
  onSelectTrack,
}) => {
  const featuredTracks = tracks.slice(0, 6);
  const recentTracks = tracks.slice(6, 12);

  return (
    <div className="home-view">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Your Music</h1>
          <p className="hero-subtitle">
            Discover and play your favorite tracks
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">Featured Tracks</h2>
          <button className="see-all-btn">See All</button>
        </div>
        <div className="tracks-grid">
          {featuredTracks.map((track, index) => (
            <TrackCard
              key={track.id}
              track={track}
              index={index}
              isPlaying={isPlaying}
              isCurrentTrack={currentTrackIndex === index}
              onPlay={onSelectTrack}
            />
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">More Tracks</h2>
          <button className="see-all-btn">See All</button>
        </div>
        <div className="tracks-grid">
          {recentTracks.map((track, index) => {
            const actualIndex = index + 6;
            return (
              <TrackCard
                key={track.id}
                track={track}
                index={actualIndex}
                isPlaying={isPlaying}
                isCurrentTrack={currentTrackIndex === actualIndex}
                onPlay={onSelectTrack}
              />
            );
          })}
        </div>
      </section>

      {tracks.length > 12 && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">All Songs</h2>
          </div>
          <div className="tracks-grid">
            {tracks.slice(12).map((track, index) => {
              const actualIndex = index + 12;
              return (
                <TrackCard
                  key={track.id}
                  track={track}
                  index={actualIndex}
                  isPlaying={isPlaying}
                  isCurrentTrack={currentTrackIndex === actualIndex}
                  onPlay={onSelectTrack}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
