import React from 'react';
import { Track } from '@/types';
import { TrackCard } from '@/components/TrackCard/TrackCard';

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
    <div className="p-8 max-w-[1600px] mx-auto max-lg:p-6 max-md:p-4 max-sm:p-3 pb-32 max-sm:pb-24">
      <section className="mb-12 p-12 bg-gradient-to-br from-primary/30 via-purple-600/20 to-primary-dark/30 rounded-3xl backdrop-blur-xl border border-white/10 max-lg:p-10 max-md:p-6 max-sm:p-5 max-md:mb-8 max-sm:mb-6 max-sm:rounded-2xl shadow-[0_20px_60px_rgba(147,51,234,0.3)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="relative text-center z-10">
          <h1 className="text-6xl font-black mb-5 bg-gradient-to-br from-white via-purple-200 to-primary bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(147,51,234,0.4)] max-lg:text-5xl max-md:text-3xl max-sm:text-2xl max-sm:mb-3 animate-fade-in">
            Welcome to Your Music
          </h1>
          <p className="text-xl text-white/70 font-medium max-lg:text-lg max-md:text-base max-sm:text-sm">
            Discover and play your favorite tracks
          </p>
        </div>
      </section>

      <section className="mb-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-2 max-md:text-2xl">
              Featured Tracks
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-purple-600 rounded-full shadow-lg shadow-primary/50 max-sm:h-1 max-sm:w-16"></div>
          </div>
          <button className="px-5 py-2.5 bg-transparent border border-white/20 rounded-xl text-white/70 text-sm font-bold cursor-pointer transition-all duration-300 hover:text-white hover:bg-white/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95">
            See All
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 xl:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] max-md:grid-cols-2 max-md:gap-4">
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

      <section className="mb-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-2 max-md:text-2xl">
              More Tracks
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 to-primary rounded-full shadow-lg shadow-purple-500/50"></div>
          </div>
          <button className="px-5 py-2.5 bg-transparent border border-white/20 rounded-xl text-white/70 text-sm font-bold cursor-pointer transition-all duration-300 hover:text-white hover:bg-white/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95">
            See All
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 xl:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] max-md:grid-cols-2 max-md:gap-4">
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
        <section className="mb-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-2 max-md:text-2xl">
                All Songs
              </h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-primary via-purple-500 to-primary-dark rounded-full shadow-lg shadow-primary/50"></div>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 xl:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] max-md:grid-cols-2 max-md:gap-4">
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
