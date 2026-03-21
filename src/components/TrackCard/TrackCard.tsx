import React from 'react';
import { Heart, Play, Pause, Music2 } from 'lucide-react';
import { Track } from '@/types';

interface TrackCardProps {
  track: Track;
  index: number;
  order: number;
  isPlaying: boolean;
  isCurrentTrack: boolean;
  isLiked: boolean;
  layout: 'grid' | 'list';
  onPlay: (index: number) => void;
  onToggleLike: (trackId: string) => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({
  track,
  index,
  order,
  isPlaying,
  isCurrentTrack,
  isLiked,
  layout,
  onPlay,
  onToggleLike,
}) => {
  const handleClick = () => {
    onPlay(index);
  };

  const handleLikeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onToggleLike(track.id);
  };

  if (layout === 'list') {
    return (
      <article
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick();
          }
        }}
        className={`interactive-lift surface flex cursor-pointer items-center gap-2.5 rounded-xl border px-2.5 py-2.5 min-[390px]:gap-3 min-[390px]:px-3 md:px-4 md:py-3 ${
          isCurrentTrack ? 'border-cyan-200/55 bg-cyan-300/14' : 'border-white/8'
        }`}
      >
        <span className="hidden w-7 text-center text-xs font-semibold text-cyan-100/60 min-[390px]:inline">{order}</span>

        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-900/65 min-[390px]:h-12 min-[390px]:w-12 md:h-14 md:w-14">
          <img src={track.albumArt} alt={track.name} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/55">
            {isCurrentTrack && isPlaying ? (
              <Pause size={16} className="text-white min-[390px]:h-[18px] min-[390px]:w-[18px]" />
            ) : (
              <Play size={16} className="text-white min-[390px]:h-[18px] min-[390px]:w-[18px]" />
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xs font-semibold text-white min-[390px]:text-sm md:text-base">{track.name}</h3>
          <p className="truncate text-xs text-cyan-100/60 md:text-sm">{track.artist}</p>
        </div>

        {isCurrentTrack && (
          <div className="hidden items-end gap-0.5 md:flex" aria-hidden="true">
            <span className="h-3 w-1 origin-bottom rounded-full bg-cyan-300 [animation:pulse-bars_800ms_ease-in-out_infinite]" />
            <span className="h-4 w-1 origin-bottom rounded-full bg-cyan-300 [animation:pulse-bars_800ms_ease-in-out_120ms_infinite]" />
            <span className="h-3 w-1 origin-bottom rounded-full bg-cyan-300 [animation:pulse-bars_800ms_ease-in-out_220ms_infinite]" />
          </div>
        )}

        <button
          type="button"
          onClick={handleLikeClick}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-cyan-100/70 transition hover:bg-white/10 hover:text-cyan-100"
          aria-label={isLiked ? 'Remove from liked songs' : 'Add to liked songs'}
        >
          <Heart size={16} className={isLiked ? 'fill-amber-300 text-amber-300' : ''} />
        </button>
      </article>
    );
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick();
        }
      }}
      className={`interactive-lift surface group relative cursor-pointer rounded-2xl border p-2.5 min-[390px]:p-3 sm:p-4 ${
        isCurrentTrack ? 'border-cyan-200/55 bg-cyan-300/12' : 'border-white/8'
      }`}
    >
      <button
        type="button"
        onClick={handleLikeClick}
        className="absolute right-2.5 top-2.5 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-950/45 text-cyan-100/70 transition hover:border-cyan-200/45 hover:text-cyan-100 sm:right-3 sm:top-3 sm:h-8 sm:w-8"
        aria-label={isLiked ? 'Remove from liked songs' : 'Add to liked songs'}
      >
        <Heart size={15} className={isLiked ? 'fill-amber-300 text-amber-300' : ''} />
      </button>

      <div className="relative mb-3 overflow-hidden rounded-xl bg-slate-900/55">
        <img
          src={track.albumArt}
          alt={track.name}
          loading="lazy"
          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

        <div className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-slate-950/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-cyan-50/80">
          <Music2 size={12} />
          Track {order}
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-100 transition duration-300 sm:opacity-0 sm:group-hover:opacity-100">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-300/85 text-slate-950 shadow-xl shadow-cyan-300/30">
            {isCurrentTrack && isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </div>
        </div>
      </div>

      <h3 className="truncate text-sm font-semibold text-white md:text-base">{track.name}</h3>
      <p className="truncate text-xs text-cyan-100/60 md:text-sm">{track.artist}</p>

      {isCurrentTrack && (
        <div className="mt-2 flex items-end gap-0.5" aria-hidden="true">
          <span className="h-2.5 w-1 origin-bottom rounded-full bg-cyan-300 [animation:pulse-bars_780ms_ease-in-out_infinite]" />
          <span className="h-3.5 w-1 origin-bottom rounded-full bg-cyan-300 [animation:pulse-bars_780ms_ease-in-out_100ms_infinite]" />
          <span className="h-2.5 w-1 origin-bottom rounded-full bg-cyan-300 [animation:pulse-bars_780ms_ease-in-out_200ms_infinite]" />
        </div>
      )}
    </article>
  );
};
