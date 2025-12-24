import React from 'react';
import { Track, PlayerState } from '@/types';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1, Volume2, VolumeX } from 'lucide-react';
import { RepeatMode } from '@/types';
import { formatTime } from '@/utils/helpers';

interface NowPlayingBarProps {
  track: Track | null;
  playerState: PlayerState;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onToggleRepeat: () => void;
  onToggleShuffle: () => void;
}



export const NowPlayingBar: React.FC<NowPlayingBarProps> = ({
  track,
  playerState,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleRepeat,
  onToggleShuffle,
}) => {
  const progress = playerState.duration > 0 ? (playerState.currentTime / playerState.duration) * 100 : 0;
  const RepeatIcon = playerState.repeatMode === RepeatMode.ONE ? Repeat1 : Repeat;
  const VolumeIcon = playerState.isMuted ? VolumeX : Volume2;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * playerState.duration;
    onSeek(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(parseFloat(e.target.value) / 100);
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black via-black/95 to-black/80 backdrop-blur-3xl border-t border-white/10 grid grid-cols-[1fr_2fr_1fr] items-center px-6 gap-6 z-[1000] max-lg:h-auto max-lg:grid-cols-1 max-lg:py-4 max-lg:gap-4 max-lg:px-4 max-sm:px-3 max-sm:py-3 max-sm:gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {/* Track Info */}
      <div className="flex items-center gap-4 min-w-0 max-lg:gap-3">
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/20 to-purple-600/20 shadow-lg group-hover:shadow-primary/30 transition-all duration-300 max-lg:w-14 max-lg:h-14 max-sm:w-12 max-sm:h-12 max-sm:rounded-lg">
          <img src={track.albumArt} alt={track.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-base font-bold text-white overflow-hidden text-ellipsis whitespace-nowrap mb-1 hover:text-primary transition-colors duration-300 cursor-pointer max-lg:text-sm max-sm:text-xs max-sm:mb-0.5">
            {track.name}
          </div>
          <div className="text-sm text-white/50 overflow-hidden text-ellipsis whitespace-nowrap font-medium max-lg:text-xs">
            {track.artist}
          </div>
        </div>
      </div>

      {/* Center Controls */}
      <div className="flex flex-col gap-3 items-center max-lg:gap-2.5">
        <div className="flex items-center gap-3 max-lg:gap-2 max-sm:gap-1.5">
          <button
            className={`bg-transparent border-none cursor-pointer p-2.5 flex items-center justify-center rounded-xl transition-all duration-300 ${
              playerState.isShuffleOn 
                ? 'text-primary bg-primary/20 shadow-lg shadow-primary/30 scale-110' 
                : 'text-white/60 hover:text-white hover:bg-white/10 hover:scale-110'
            }`}
            onClick={onToggleShuffle}
            aria-label="Shuffle"
          >
            <Shuffle size={18} className="max-lg:w-4 max-lg:h-4" />
          </button>
          <button 
            className="bg-transparent border-none text-white/70 cursor-pointer p-2.5 flex items-center justify-center rounded-xl transition-all duration-300 hover:text-white hover:bg-white/10 hover:scale-110 active:scale-95" 
            onClick={onPrevious} 
            aria-label="Previous"
          >
            <SkipBack size={22} fill="currentColor" className="max-lg:w-5 max-lg:h-5" />
          </button>
          <button 
            className="w-12 h-12 bg-gradient-to-br from-primary via-purple-500 to-purple-600 text-white border-none cursor-pointer rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] active:scale-95 shadow-xl max-lg:w-11 max-lg:h-11 max-sm:w-10 max-sm:h-10" 
            onClick={onPlayPause} 
            aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
          >
            {playerState.isPlaying ? <Pause size={26} fill="currentColor" className="max-lg:w-6 max-lg:h-6 max-sm:w-5 max-sm:h-5" /> : <Play size={26} fill="currentColor" className="ml-1 max-lg:w-6 max-lg:h-6 max-sm:w-5 max-sm:h-5" />}
          </button>
          <button 
            className="bg-transparent border-none text-white/70 cursor-pointer p-2.5 flex items-center justify-center rounded-xl transition-all duration-300 hover:text-white hover:bg-white/10 hover:scale-110 active:scale-95" 
            onClick={onNext} 
            aria-label="Next"
          >
            <SkipForward size={22} fill="currentColor" className="max-lg:w-5 max-lg:h-5" />
          </button>
          <button
            className={`bg-transparent border-none cursor-pointer p-2.5 flex items-center justify-center rounded-xl transition-all duration-300 ${
              playerState.repeatMode !== RepeatMode.OFF 
                ? 'text-primary bg-primary/20 shadow-lg shadow-primary/30 scale-110' 
                : 'text-white/60 hover:text-white hover:bg-white/10 hover:scale-110'
            }`}
            onClick={onToggleRepeat}
            aria-label="Repeat"
          >
            <RepeatIcon size={18} className="max-lg:w-4 max-lg:h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full max-w-[650px] max-lg:gap-2 max-sm:gap-1.5">
          <span className="text-xs text-white/60 font-mono min-w-[42px] text-center font-semibold max-lg:min-w-[38px] max-sm:text-[10px] max-sm:min-w-[32px]">
            {formatTime(playerState.currentTime)}
          </span>
          <div className="relative flex-1 h-2 bg-white/10 rounded-full overflow-hidden group backdrop-blur-sm max-sm:h-1.5">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-purple-500 to-primary-dark rounded-full pointer-events-none transition-[width] duration-100 linear shadow-[0_0_10px_rgba(147,51,234,0.5)]"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 appearance-none bg-transparent cursor-pointer z-[2] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:shadow-xl group-hover:[&::-webkit-slider-thumb]:opacity-100 [&::-webkit-slider-thumb]:hover:scale-125"
              aria-label="Seek slider"
            />
          </div>
          <span className="text-xs text-white/60 font-mono min-w-[42px] text-center font-semibold max-lg:min-w-[38px] max-sm:text-[10px] max-sm:min-w-[32px]">
            {formatTime(playerState.duration)}
          </span>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="flex items-center justify-end gap-4 max-lg:hidden">
        <button 
          className={`bg-transparent border-none cursor-pointer p-2.5 flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
            playerState.isMuted ? 'text-red-400 hover:bg-red-400/10' : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          onClick={onToggleMute} 
          aria-label="Volume"
        >
          <VolumeIcon size={22} />
        </button>
        <div className="relative w-[110px] h-2 bg-white/10 rounded-full overflow-hidden max-lg:w-[70px] group backdrop-blur-sm">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-purple-500 rounded-full pointer-events-none transition-[width] duration-100 ease-out shadow-[0_0_8px_rgba(147,51,234,0.4)]"
            style={{ width: `${playerState.isMuted ? 0 : playerState.volume * 100}%` }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.isMuted ? 0 : playerState.volume * 100}
            onChange={handleVolumeChange}
            className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 appearance-none bg-transparent cursor-pointer z-[2] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:shadow-xl group-hover:[&::-webkit-slider-thumb]:opacity-100 [&::-webkit-slider-thumb]:hover:scale-125"
            aria-label="Volume slider"
          />
        </div>
      </div>
    </div>
  );
};
