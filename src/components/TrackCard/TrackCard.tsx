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
      className={`group glass-premium rounded-2xl p-5 cursor-pointer transition-all duration-500 border border-transparent hover:border-primary/30 hover:bg-gradient-to-br hover:from-white/15 hover:to-white/5 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(147,51,234,0.2)] active:scale-95 ${
        isCurrentTrack ? 'bg-gradient-to-br from-primary/20 to-purple-600/20 border-primary/40 shadow-[0_8px_32px_rgba(147,51,234,0.3)]' : ''
      }`}
      onClick={handleClick}
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 bg-black/40 shadow-xl group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-500">
        <img 
          src={track.albumArt} 
          alt={track.name} 
          loading="eager" 
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-600/30 flex items-center justify-center opacity-0 transition-all duration-500 backdrop-blur-sm ${isCurrentTrack ? 'opacity-100' : 'group-hover:opacity-100'}`}>
          <div className={`p-4 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 shadow-2xl transition-all duration-300 ${isCurrentTrack ? 'scale-100 animate-pulse-slow' : 'scale-0 group-hover:scale-100'}`}>
            {isCurrentTrack && isPlaying ? (
              <Pause size={32} className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />
            ) : (
              <Play size={32} className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />
            )}
          </div>
        </div>
        {isCurrentTrack && (
          <div className="absolute top-3 right-3 flex gap-1">
            <div className="w-1 h-4 bg-primary rounded-full animate-sound-wave"></div>
            <div className="w-1 h-6 bg-primary rounded-full animate-sound-wave animation-delay-100"></div>
            <div className="w-1 h-5 bg-primary rounded-full animate-sound-wave animation-delay-200"></div>
          </div>
        )}
      </div>
      
      <div className="px-1">
        <h3 className="text-base font-bold text-white mb-2 overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-primary transition-colors duration-300">
          {track.name}
        </h3>
        <p className="text-sm text-white/50 overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-white/70 transition-colors duration-300 font-medium">
          {track.artist}
        </p>
      </div>
    </div>
  );
};
