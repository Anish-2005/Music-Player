import React, { useMemo } from 'react';
import { PlayCircle, Clock3, Heart, Library } from 'lucide-react';
import { Track } from '@/types';
import { TrackCard } from '@/components/TrackCard/TrackCard';

export interface IndexedTrack {
  track: Track;
  index: number;
}

export interface TrackSection {
  id: string;
  title: string;
  description: string;
  tracks: IndexedTrack[];
}

interface HomeViewProps {
  pageTitle: string;
  pageDescription: string;
  highlightTitle: string;
  highlightSubtitle: string;
  sections: TrackSection[];
  currentTrackIndex: number;
  isPlaying: boolean;
  viewMode: 'grid' | 'list';
  likedTrackIds: Set<string>;
  libraryCount: number;
  likedCount: number;
  recentCount: number;
  onSelectTrack: (index: number) => void;
  onToggleLike: (trackId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  pageTitle,
  pageDescription,
  highlightTitle,
  highlightSubtitle,
  sections,
  currentTrackIndex,
  isPlaying,
  viewMode,
  likedTrackIds,
  libraryCount,
  likedCount,
  recentCount,
  onSelectTrack,
  onToggleLike,
}) => {
  const totalTracksVisible = useMemo(
    () => sections.reduce((total, section) => total + section.tracks.length, 0),
    [sections]
  );

  const firstPlayableTrack = useMemo(
    () => sections.find((section) => section.tracks.length > 0)?.tracks[0],
    [sections]
  );

  return (
    <div className="mx-auto w-full max-w-[1680px] px-4 py-6 pb-36 lg:px-8">
      <section className="surface-strong relative overflow-hidden rounded-3xl p-5 md:p-8">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />

        <div className="relative z-10 flex flex-wrap items-start justify-between gap-5">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/55">Refined Listening Experience</p>
            <h2 className="title-font mt-3 text-3xl font-semibold text-white md:text-5xl">{highlightTitle}</h2>
            <p className="mt-2 max-w-3xl text-sm text-cyan-100/70 md:text-base">{highlightSubtitle}</p>
          </div>

          <button
            type="button"
            disabled={!firstPlayableTrack}
            onClick={() => {
              if (firstPlayableTrack) {
                onSelectTrack(firstPlayableTrack.index);
              }
            }}
            className="interactive-lift inline-flex h-11 items-center gap-2 rounded-xl border border-cyan-200/40 bg-cyan-300/15 px-4 text-sm font-semibold text-cyan-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PlayCircle size={18} />
            Play Featured
          </button>
        </div>

        <div className="relative z-10 mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="surface rounded-2xl p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-cyan-100/55">
              <Library size={14} /> Library
            </div>
            <p className="mt-1.5 text-2xl font-semibold text-white">{libraryCount}</p>
          </div>
          <div className="surface rounded-2xl p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-cyan-100/55">
              <Heart size={14} /> Liked
            </div>
            <p className="mt-1.5 text-2xl font-semibold text-white">{likedCount}</p>
          </div>
          <div className="surface rounded-2xl p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-cyan-100/55">
              <Clock3 size={14} /> Recent
            </div>
            <p className="mt-1.5 text-2xl font-semibold text-white">{recentCount}</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <h3 className="title-font text-2xl font-semibold text-white md:text-3xl">{pageTitle}</h3>
            <p className="text-sm text-cyan-100/65">{pageDescription}</p>
          </div>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-cyan-100/65">
            {totalTracksVisible} visible
          </span>
        </div>

        {totalTracksVisible === 0 && (
          <div className="surface rounded-2xl border border-dashed border-cyan-100/25 p-8 text-center">
            <p className="title-font text-xl font-semibold text-white">No tracks found</p>
            <p className="mt-2 text-sm text-cyan-100/65">Try a different search term or switch to another section.</p>
          </div>
        )}

        <div className="space-y-7">
          {sections.map((section) => {
            if (section.tracks.length === 0) return null;

            return (
              <div key={section.id}>
                <div className="mb-3 flex items-end justify-between gap-3">
                  <div>
                    <h4 className="title-font text-xl font-semibold text-white md:text-2xl">{section.title}</h4>
                    <p className="text-xs text-cyan-100/65 md:text-sm">{section.description}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-cyan-100/55">{section.tracks.length} tracks</span>
                </div>

                <div
                  className={`stagger-children ${
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                      : 'flex flex-col gap-2'
                  }`}
                >
                  {section.tracks.map(({ track, index }, sectionIndex) => (
                    <TrackCard
                      key={`${section.id}-${track.id}`}
                      track={track}
                      index={index}
                      order={sectionIndex + 1}
                      isPlaying={isPlaying}
                      isCurrentTrack={currentTrackIndex === index}
                      isLiked={likedTrackIds.has(track.id)}
                      layout={viewMode}
                      onPlay={onSelectTrack}
                      onToggleLike={onToggleLike}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
