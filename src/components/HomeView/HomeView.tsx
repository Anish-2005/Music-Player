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
    <div className="p-8 max-w-[1600px] mx-auto max-md:p-4">
      <section className="mb-12 p-12 bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-2xl backdrop-blur-lg border border-white/10 max-md:p-8 max-md:mb-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)] max-md:text-4xl">
            Welcome to Your Music
          </h1>
          <p className="text-xl text-white/80 max-md:text-base">
            Discover and play your favorite tracks
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white max-md:text-2xl">Featured Tracks</h2>
          <button className="bg-transparent border-none text-white/70 text-[15px] font-semibold cursor-pointer transition-colors duration-200 hover:text-primary">
            See All
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 xl:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] max-md:grid-cols-2 max-md:gap-4">
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

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white max-md:text-2xl">More Tracks</h2>
          <button className="bg-transparent border-none text-white/70 text-[15px] font-semibold cursor-pointer transition-colors duration-200 hover:text-primary">
            See All
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 xl:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] max-md:grid-cols-2 max-md:gap-4">
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
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white max-md:text-2xl">All Songs</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 xl:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] max-md:grid-cols-2 max-md:gap-4">
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
