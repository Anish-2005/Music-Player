import React from 'react';
import { Track } from '@/types';
import { Play, Pause } from 'lucide-react';

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
  const handleClick = () => {
    onPlay(index);
  };

  return (
    <div
      className={`group glass rounded-xl p-4 cursor-pointer transition-all duration-300 border border-transparent hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)] ${
        isCurrentTrack ? 'bg-primary/15 border-primary/30' : ''
      }`}
      onClick={handleClick}
    >
      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4 bg-black/30">
        <img src={track.albumArt} alt={track.name} loading="eager" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300 ${isCurrentTrack ? 'opacity-100' : 'group-hover:opacity-100'}`}>
          {isCurrentTrack && isPlaying ? (
            <Pause size={28} className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />
          ) : (
            <Play size={28} className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />
          )}
        </div>
      </div>
      
      <div className="px-1">
        <h3 className="text-base font-semibold text-white mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {track.name}
        </h3>
        <p className="text-sm text-white/60 overflow-hidden text-ellipsis whitespace-nowrap">
          {track.artist}
        </p>
      </div>
    </div>
  );
};
