import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Heart,
  Loader2,
  Radio,
} from 'lucide-react';
import { Track, PlayerState, RepeatMode } from '@/types';
import { formatTime } from '@/utils/helpers';

interface NowPlayingBarProps {
  track: Track | null;
  playerState: PlayerState;
  isLiked: boolean;
  queueCount: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onToggleRepeat: () => void;
  onToggleShuffle: () => void;
  onToggleLike: () => void;
}

export const NowPlayingBar: React.FC<NowPlayingBarProps> = ({
  track,
  playerState,
  isLiked,
  queueCount,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleRepeat,
  onToggleShuffle,
  onToggleLike,
}) => {
  if (!track) return null;

  const progress = playerState.duration > 0 ? (playerState.currentTime / playerState.duration) * 100 : 0;
  const RepeatIcon = playerState.repeatMode === RepeatMode.ONE ? Repeat1 : Repeat;
  const VolumeIcon = playerState.isMuted ? VolumeX : Volume2;

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextTime = (Number(event.target.value) / 100) * playerState.duration;
    onSeek(nextTime);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(Number(event.target.value) / 100);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] border-t border-cyan-100/20 bg-slate-950/92 backdrop-blur-2xl">
      <div className="mx-auto grid w-full max-w-[1680px] grid-cols-1 gap-3 px-4 py-3 md:grid-cols-[minmax(220px,1fr)_minmax(340px,1.7fr)_minmax(220px,1fr)] md:items-center md:gap-6 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <img src={track.albumArt} alt={track.name} className="h-12 w-12 rounded-xl object-cover md:h-14 md:w-14" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white md:text-base">{track.name}</p>
            <p className="truncate text-xs text-cyan-100/60 md:text-sm">{track.artist}</p>
          </div>
          <button
            type="button"
            onClick={onToggleLike}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-cyan-100/70 transition hover:bg-white/10 hover:text-cyan-100"
            aria-label={isLiked ? 'Remove from liked songs' : 'Add to liked songs'}
          >
            <Heart size={17} className={isLiked ? 'fill-amber-300 text-amber-300' : ''} />
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-center gap-1.5 md:gap-2.5">
            <button
              type="button"
              onClick={onToggleShuffle}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition ${
                playerState.isShuffleOn ? 'bg-cyan-300/22 text-cyan-100' : 'text-cyan-100/65 hover:bg-white/10 hover:text-white'
              }`}
              aria-label="Toggle shuffle"
            >
              <Shuffle size={16} />
            </button>
            <button
              type="button"
              onClick={onPrevious}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-cyan-100/75 transition hover:bg-white/10 hover:text-white"
              aria-label="Previous track"
            >
              <SkipBack size={18} />
            </button>
            <button
              type="button"
              onClick={onPlayPause}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-300/25 transition hover:scale-105"
              aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
            >
              {playerState.isBuffering ? (
                <Loader2 size={18} className="animate-spin" />
              ) : playerState.isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} className="translate-x-[1px]" />
              )}
            </button>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-cyan-100/75 transition hover:bg-white/10 hover:text-white"
              aria-label="Next track"
            >
              <SkipForward size={18} />
            </button>
            <button
              type="button"
              onClick={onToggleRepeat}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition ${
                playerState.repeatMode !== RepeatMode.OFF
                  ? 'bg-cyan-300/22 text-cyan-100'
                  : 'text-cyan-100/65 hover:bg-white/10 hover:text-white'
              }`}
              aria-label="Toggle repeat"
            >
              <RepeatIcon size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <span className="w-10 text-right text-[10px] font-semibold tabular-nums text-cyan-100/60 md:text-xs">
              {formatTime(playerState.currentTime)}
            </span>
            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10 md:h-2">
              <div
                className="pointer-events-none absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-amber-200"
                style={{ width: `${progress}%` }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="player-range absolute inset-0"
                aria-label="Seek"
              />
            </div>
            <span className="w-10 text-[10px] font-semibold tabular-nums text-cyan-100/60 md:text-xs">
              {formatTime(playerState.duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 md:justify-end">
          <div className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-cyan-100/60 md:inline-flex">
            <Radio size={12} />
            Queue {queueCount}
          </div>

          <div className="flex items-center gap-2 md:min-w-[148px]">
            <button
              type="button"
              onClick={onToggleMute}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-cyan-100/75 transition hover:bg-white/10 hover:text-white"
              aria-label={playerState.isMuted ? 'Unmute' : 'Mute'}
            >
              <VolumeIcon size={17} />
            </button>
            <div className="relative h-1.5 w-28 overflow-hidden rounded-full bg-white/10 md:h-2 md:w-32">
              <div
                className="pointer-events-none absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-cyan-300 to-sky-200"
                style={{ width: `${playerState.isMuted ? 0 : playerState.volume * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={playerState.isMuted ? 0 : playerState.volume * 100}
                onChange={handleVolumeChange}
                className="player-range absolute inset-0"
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
