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
  totalTracks?: number;
  editable?: boolean;
  onAddSongs?: () => void;
  onRemoveSongs?: () => void;
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
    <div className="mx-auto w-full max-w-[1680px] px-3 py-4 pb-[230px] sm:px-4 sm:py-6 sm:pb-[260px] md:pb-40 lg:px-8">
      <section className="surface-strong relative overflow-hidden rounded-2xl p-4 sm:rounded-3xl sm:p-5 md:p-8">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />

        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 sm:gap-5">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/55">Refined Listening Experience</p>
            <h2 className="title-font mt-2 text-2xl font-semibold text-white sm:mt-3 sm:text-3xl md:text-5xl">{highlightTitle}</h2>
            <p className="mt-2 max-w-3xl text-xs text-cyan-100/70 sm:text-sm md:text-base">{highlightSubtitle}</p>
          </div>

          <button
            type="button"
            disabled={!firstPlayableTrack}
            onClick={() => {
              if (firstPlayableTrack) {
                onSelectTrack(firstPlayableTrack.index);
              }
            }}
            className="interactive-lift inline-flex h-10 items-center gap-2 rounded-xl border border-cyan-200/40 bg-cyan-300/15 px-3.5 text-xs font-semibold text-cyan-50 disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:px-4 sm:text-sm"
          >
            <PlayCircle size={16} className="sm:h-[18px] sm:w-[18px]" />
            Play Featured
          </button>
        </div>

        <div className="relative z-10 mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3 lg:grid-cols-3">
          <div className="surface rounded-2xl p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-cyan-100/55">
              <Library size={14} /> Library
            </div>
            <p className="mt-1.5 text-xl font-semibold text-white sm:text-2xl">{libraryCount}</p>
          </div>
          <div className="surface rounded-2xl p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-cyan-100/55">
              <Heart size={14} /> Liked
            </div>
            <p className="mt-1.5 text-xl font-semibold text-white sm:text-2xl">{likedCount}</p>
          </div>
          <div className="surface col-span-2 rounded-2xl p-3 lg:col-span-1">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-cyan-100/55">
              <Clock3 size={14} /> Recent
            </div>
            <p className="mt-1.5 text-xl font-semibold text-white sm:text-2xl">{recentCount}</p>
          </div>
        </div>
      </section>

      <section className="mt-6 sm:mt-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3 sm:mb-5">
          <div>
            <h3 className="title-font text-xl font-semibold text-white sm:text-2xl md:text-3xl">{pageTitle}</h3>
            <p className="text-xs text-cyan-100/65 sm:text-sm">{pageDescription}</p>
          </div>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-cyan-100/65 sm:text-xs">
            {totalTracksVisible} visible
          </span>
        </div>

        {totalTracksVisible === 0 && (
          <div className="surface rounded-2xl border border-dashed border-cyan-100/25 p-8 text-center">
            <p className="title-font text-xl font-semibold text-white">No tracks found</p>
            <p className="mt-2 text-sm text-cyan-100/65">Try a different search term or switch to another section.</p>
          </div>
        )}

        <div className="space-y-6 sm:space-y-7">
          {sections.map((section) => {
            return (
              <div key={section.id}>
                <div className="mb-2.5 flex items-end justify-between gap-3 sm:mb-3">
                  <div>
                    <h4 className="title-font text-lg font-semibold text-white sm:text-xl md:text-2xl">{section.title}</h4>
                    <p className="text-xs text-cyan-100/65 md:text-sm">{section.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {section.editable && (
                      <>
                        <button
                          type="button"
                          onClick={section.onAddSongs}
                          className="rounded-lg border border-cyan-200/30 bg-cyan-300/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-cyan-50 transition hover:bg-cyan-300/22 sm:text-xs"
                        >
                          Add Songs
                        </button>
                        <button
                          type="button"
                          onClick={section.onRemoveSongs}
                          className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-cyan-100/80 transition hover:bg-white/12 hover:text-white sm:text-xs"
                        >
                          Remove Songs
                        </button>
                      </>
                    )}
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-cyan-100/55 sm:text-xs">
                      {section.totalTracks ?? section.tracks.length} tracks
                    </span>
                  </div>
                </div>

                {section.tracks.length === 0 ? (
                  <div className="surface rounded-xl border border-dashed border-cyan-100/25 p-5 text-xs text-cyan-100/65">
                    No tracks in this playlist yet. Use Add Songs to include tracks.
                  </div>
                ) : (
                  <div
                    className={`stagger-children ${
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 gap-2.5 min-[430px]:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
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
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
