/**
 * Main MusicPlayer Component
 * Orchestrates all child components
 * Component Composition pattern for maintainability
 */

import React from 'react';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { NowPlaying } from '@/components/NowPlaying/NowPlaying';
import { PlayerControls } from '@/components/PlayerControls/PlayerControls';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { VolumeControl } from '@/components/VolumeControl/VolumeControl';
import { Playlist } from '@/components/Playlist/Playlist';
import './MusicPlayer.css';

export const MusicPlayer: React.FC = () => {
  const { playerState, playlistState, currentTrack, audioControls } = useMusicPlayer();

  return (
    <div className="music-player">
      <div className="player-card">
        <NowPlaying
          track={currentTrack}
          isPlaying={playerState.isPlaying}
          currentIndex={playlistState.currentTrackIndex}
          totalTracks={playlistState.tracks.length}
        />

        <div className="player-main-controls">
          <PlayerControls
            isPlaying={playerState.isPlaying}
            repeatMode={playerState.repeatMode}
            isShuffleOn={playerState.isShuffleOn}
            onPlayPause={audioControls.togglePlayPause}
            onPrevious={audioControls.previousTrack}
            onNext={audioControls.nextTrack}
            onToggleRepeat={audioControls.toggleRepeat}
            onToggleShuffle={audioControls.toggleShuffle}
          />

          <ProgressBar
            currentTime={playerState.currentTime}
            duration={playerState.duration}
            onSeek={audioControls.seek}
          />

          <VolumeControl
            volume={playerState.volume}
            isMuted={playerState.isMuted}
            onVolumeChange={audioControls.setVolume}
            onToggleMute={audioControls.toggleMute}
          />
        </div>

        <Playlist
          tracks={playlistState.tracks}
          currentTrackIndex={playlistState.currentTrackIndex}
          isPlaying={playerState.isPlaying}
          onSelectTrack={audioControls.selectTrack}
        />
      </div>
    </div>
  );
};
