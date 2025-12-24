import React, { useState } from 'react';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Header } from '@/components/Header/Header';
import { HomeView } from '@/components/HomeView/HomeView';
import { NowPlayingBar } from '@/components/NowPlayingBar/NowPlayingBar';

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
    <div className="flex min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_10%_20%,rgba(102,126,234,0.15)_0%,transparent_50%),radial-gradient(circle_at_90%_80%,rgba(118,75,162,0.15)_0%,transparent_50%)] before:pointer-events-none before:animate-[gradient-shift_20s_ease-in-out_infinite] max-lg:flex-col">
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
      
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 ml-[280px] flex flex-col relative z-[1] lg:ml-[280px] md:ml-[240px] max-lg:ml-0">
        <Header onSearch={setSearchQuery} />
        
        <div className="flex-1 overflow-y-auto pb-[120px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/50 hover:scrollbar-thumb-primary/70 max-lg:pb-[200px] max-sm:pb-[220px]">
          <style>{`
            .scrollbar-thin::-webkit-scrollbar {
              width: 10px;
            }
            .scrollbar-track-transparent::-webkit-scrollbar-track {
              background: transparent;
            }
            .scrollbar-thumb-primary\\/50::-webkit-scrollbar-thumb {
              background: rgba(102, 126, 234, 0.5);
              border-radius: 5px;
            }
            .scrollbar-thumb-primary\\/50:hover::-webkit-scrollbar-thumb {
              background: rgba(102, 126, 234, 0.7);
            }
          `}</style>
          
          {activeView === 'home' && (
            <HomeView
              tracks={filteredTracks}
              currentTrackIndex={playlistState.currentTrackIndex}
              isPlaying={playerState.isPlaying}
              onSelectTrack={audioControls.selectTrack}
            />
          )}
          
          {activeView === 'library' && (
            <div className="p-8 max-w-[1600px] mx-auto max-md:p-4">
              <h2 className="text-5xl font-extrabold text-white mb-2 max-md:text-4xl">Your Library</h2>
              <p className="text-lg text-white/60 mb-8">All your tracks in one place</p>
              <HomeView
                tracks={filteredTracks}
                currentTrackIndex={playlistState.currentTrackIndex}
                isPlaying={playerState.isPlaying}
                onSelectTrack={audioControls.selectTrack}
              />
            </div>
          )}

          {activeView === 'playlists' && (
            <div className="p-8 max-w-[1600px] mx-auto max-md:p-4">
              <h2 className="text-5xl font-extrabold text-white mb-2 max-md:text-4xl">Playlists</h2>
              <p className="text-lg text-white/60 mb-8">Create and manage your playlists</p>
              <HomeView
                tracks={filteredTracks}
                currentTrackIndex={playlistState.currentTrackIndex}
                isPlaying={playerState.isPlaying}
                onSelectTrack={audioControls.selectTrack}
              />
            </div>
          )}

          {activeView === 'favorites' && (
            <div className="p-8 max-w-[1600px] mx-auto max-md:p-4">
              <h2 className="text-5xl font-extrabold text-white mb-2 max-md:text-4xl">Liked Songs</h2>
              <p className="text-lg text-white/60 mb-8">Your favorite tracks</p>
              <HomeView
                tracks={filteredTracks}
                currentTrackIndex={playlistState.currentTrackIndex}
                isPlaying={playerState.isPlaying}
                onSelectTrack={audioControls.selectTrack}
              />
            </div>
          )}

          {activeView === 'recent' && (
            <div className="p-8 max-w-[1600px] mx-auto max-md:p-4">
              <h2 className="text-5xl font-extrabold text-white mb-2 max-md:text-4xl">Recently Played</h2>
              <p className="text-lg text-white/60 mb-8">Tracks you've listened to recently</p>
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
