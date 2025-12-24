/**
 * Dashboard Component - Main Spotify-like layout
 */

import React, { useState } from 'react';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Header } from '@/components/Header/Header';
import { HomeView } from '@/components/HomeView/HomeView';
import { NowPlayingBar } from '@/components/NowPlayingBar/NowPlayingBar';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { playerState, playlistState, currentTrack, audioControls } = useMusicPlayer();

  const filteredTracks = searchQuery
    ? playlistState.tracks.filter(
        track =>
          track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : playlistState.tracks;

  return (
    <div className="dashboard">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="dashboard-main">
        <Header onSearch={setSearchQuery} />
        
        <div className="dashboard-content">
          {activeView === 'home' && (
            <HomeView
              tracks={filteredTracks}
              currentTrackIndex={playlistState.currentTrackIndex}
              isPlaying={playerState.isPlaying}
              onSelectTrack={audioControls.selectTrack}
            />
          )}
          
          {activeView === 'library' && (
            <div className="view-placeholder">
              <h2>Your Library</h2>
              <p>All your tracks in one place</p>
              <HomeView
                tracks={filteredTracks}
                currentTrackIndex={playlistState.currentTrackIndex}
                isPlaying={playerState.isPlaying}
                onSelectTrack={audioControls.selectTrack}
              />
            </div>
          )}

          {activeView === 'playlists' && (
            <div className="view-placeholder">
              <h2>Playlists</h2>
              <p>Create and manage your playlists</p>
              <HomeView
                tracks={filteredTracks}
                currentTrackIndex={playlistState.currentTrackIndex}
                isPlaying={playerState.isPlaying}
                onSelectTrack={audioControls.selectTrack}
              />
            </div>
          )}

          {activeView === 'favorites' && (
            <div className="view-placeholder">
              <h2>Liked Songs</h2>
              <p>Your favorite tracks</p>
              <HomeView
                tracks={filteredTracks}
                currentTrackIndex={playlistState.currentTrackIndex}
                isPlaying={playerState.isPlaying}
                onSelectTrack={audioControls.selectTrack}
              />
            </div>
          )}

          {activeView === 'recent' && (
            <div className="view-placeholder">
              <h2>Recently Played</h2>
              <p>Tracks you've listened to recently</p>
              <HomeView
                tracks={filteredTracks}
                currentTrackIndex={playlistState.currentTrackIndex}
                isPlaying={playerState.isPlaying}
                onSelectTrack={audioControls.selectTrack}
              />
            </div>
          )}
        </div>
      </main>

      <NowPlayingBar
        track={currentTrack}
        playerState={playerState}
        onPlayPause={audioControls.togglePlayPause}
        onNext={audioControls.nextTrack}
        onPrevious={audioControls.previousTrack}
        onSeek={audioControls.seek}
        onVolumeChange={audioControls.setVolume}
        onToggleMute={audioControls.toggleMute}
        onToggleRepeat={audioControls.toggleRepeat}
        onToggleShuffle={audioControls.toggleShuffle}
      />
    </div>
  );
};
