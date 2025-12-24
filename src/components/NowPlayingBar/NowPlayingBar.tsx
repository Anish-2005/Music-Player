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
    <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-black/50 backdrop-blur-[40px] border-t border-white/10 grid grid-cols-[1fr_2fr_1fr] items-center px-4 gap-4 z-[1000] max-lg:grid-cols-[1fr_1.5fr_0.5fr] max-md:h-auto max-md:grid-cols-1 max-md:py-3 max-md:gap-3">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
          <img src={track.albumArt} alt={track.name} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-semibold text-white overflow-hidden text-ellipsis whitespace-nowrap mb-1">
            {track.name}
          </div>
          <div className="text-[13px] text-white/60 overflow-hidden text-ellipsis whitespace-nowrap">
            {track.artist}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2">
          <button
            className={`bg-transparent border-none cursor-pointer p-2 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10 ${
              playerState.isShuffleOn ? 'text-primary' : 'text-white/80 hover:text-white'
            }`}
            onClick={onToggleShuffle}
            aria-label="Shuffle"
          >
            <Shuffle size={18} />
          </button>
          <button className="bg-transparent border-none text-white/80 cursor-pointer p-2 flex items-center justify-center rounded-full transition-all duration-200 hover:text-white hover:bg-white/10" onClick={onPrevious} aria-label="Previous">
            <SkipBack size={20} />
          </button>
          <button className="w-10 h-10 bg-white text-black border-none cursor-pointer rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110" onClick={onPlayPause} aria-label={playerState.isPlaying ? 'Pause' : 'Play'}>
            {playerState.isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button className="bg-transparent border-none text-white/80 cursor-pointer p-2 flex items-center justify-center rounded-full transition-all duration-200 hover:text-white hover:bg-white/10" onClick={onNext} aria-label="Next">
            <SkipForward size={20} />
          </button>
          <button
            className={`bg-transparent border-none cursor-pointer p-2 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10 ${
              playerState.repeatMode !== RepeatMode.OFF ? 'text-primary' : 'text-white/80 hover:text-white'
            }`}
            onClick={onToggleRepeat}
            aria-label="Repeat"
          >
            <RepeatIcon size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3 w-full max-w-[600px]">
          <span className="text-xs text-white/70 font-mono min-w-[40px] text-center">
            {formatTime(playerState.currentTime)}
          </span>
          <div className="relative flex-1 h-1.5 bg-white/10 rounded-sm overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-primary rounded-sm pointer-events-none transition-[width] duration-100 linear"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="absolute top-1/2 left-0 w-full h-1.5 -translate-y-1/2 appearance-none bg-transparent cursor-pointer z-[2] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:transition-opacity hover:[&::-webkit-slider-thumb]:opacity-100"
              aria-label="Seek slider"
            />
          </div>
          <span className="text-xs text-white/70 font-mono min-w-[40px] text-center">
            {formatTime(playerState.duration)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 max-md:hidden">
        <button className="bg-transparent border-none text-white/80 cursor-pointer p-2 flex items-center justify-center rounded-full transition-all duration-200 hover:text-white hover:bg-white/10" onClick={onToggleMute} aria-label="Volume">
          <VolumeIcon size={20} />
        </button>
        <div className="relative w-[100px] h-1.5 bg-white/10 rounded-sm overflow-hidden max-lg:w-[60px]">
          <div
            className="absolute top-0 left-0 h-full bg-primary rounded-sm pointer-events-none transition-[width] duration-100 ease-out"
            style={{ width: `${playerState.isMuted ? 0 : playerState.volume * 100}%` }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.isMuted ? 0 : playerState.volume * 100}
            onChange={handleVolumeChange}
            className="absolute top-1/2 left-0 w-full h-1.5 -translate-y-1/2 appearance-none bg-transparent cursor-pointer z-[2] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:transition-opacity hover:[&::-webkit-slider-thumb]:opacity-100"
            aria-label="Volume slider"
          />
        </div>
      </div>
    </div>
  );
};

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
    <div className="now-playing-bar">
      <div className="npb-track-info">
        <div className="npb-artwork">
          <img src={track.albumArt} alt={track.name} />
        </div>
        <div className="npb-details">
          <div className="npb-track-name">{track.name}</div>
          <div className="npb-track-artist">{track.artist}</div>
        </div>
      </div>

      <div className="npb-controls-center">
        <div className="npb-buttons">
          <button
            className={`npb-btn ${playerState.isShuffleOn ? 'active' : ''}`}
            onClick={onToggleShuffle}
            aria-label="Shuffle"
          >
            <Shuffle size={18} />
          </button>
          <button className="npb-btn" onClick={onPrevious} aria-label="Previous">
            <SkipBack size={20} />
          </button>
          <button className="npb-btn npb-play-btn" onClick={onPlayPause} aria-label={playerState.isPlaying ? 'Pause' : 'Play'}>
            {playerState.isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button className="npb-btn" onClick={onNext} aria-label="Next">
            <SkipForward size={20} />
          </button>
          <button
            className={`npb-btn ${playerState.repeatMode !== RepeatMode.OFF ? 'active' : ''}`}
            onClick={onToggleRepeat}
            aria-label="Repeat"
          >
            <RepeatIcon size={18} />
          </button>
        </div>

        <div className="npb-progress">
          <span className="npb-time">{formatTime(playerState.currentTime)}</span>
          <div className="npb-progress-container">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="npb-progress-slider"
            />
            <div className="npb-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="npb-time">{formatTime(playerState.duration)}</span>
        </div>
      </div>

      <div className="npb-controls-right">
        <button className="npb-btn" onClick={onToggleMute} aria-label="Volume">
          <VolumeIcon size={20} />
        </button>
        <div className="npb-volume-container">
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.isMuted ? 0 : playerState.volume * 100}
            onChange={handleVolumeChange}
            className="npb-volume-slider"
          />
          <div
            className="npb-volume-fill"
            style={{ width: `${playerState.isMuted ? 0 : playerState.volume * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
