import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Music2 } from 'lucide-react';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Header } from '@/components/Header/Header';
import { HomeView, IndexedTrack, TrackSection } from '@/components/HomeView/HomeView';
import { NowPlayingBar } from '@/components/NowPlayingBar/NowPlayingBar';
import { getStorageItem, setStorageItem } from '@/utils/helpers';

type ViewId = 'home' | 'library' | 'playlists' | 'favorites' | 'recent';

type ViewMode = 'grid' | 'list';

const STORAGE_KEYS = {
  viewMode: 'musicPlayer_viewMode',
  likedTrackIds: 'musicPlayer_likedTrackIds',
  recentTrackIds: 'musicPlayer_recentTrackIds',
} as const;

const VIEW_LABELS: Record<ViewId, string> = {
  home: 'Home',
  library: 'Your Library',
  playlists: 'Playlists',
  favorites: 'Liked Songs',
  recent: 'Recently Played',
};

const matchesSearch = (entry: IndexedTrack, query: string): boolean => {
  if (!query) return true;

  const normalizedName = entry.track.name.toLowerCase();
  const normalizedArtist = entry.track.artist.toLowerCase();

  return normalizedName.includes(query) || normalizedArtist.includes(query);
};

export const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewId>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>(() => getStorageItem(STORAGE_KEYS.viewMode, 'grid'));
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>(() =>
    getStorageItem(STORAGE_KEYS.likedTrackIds, [])
  );
  const [recentTrackIds, setRecentTrackIds] = useState<string[]>(() =>
    getStorageItem(STORAGE_KEYS.recentTrackIds, [])
  );

  const { playerState, playlistState, currentTrack, audioControls } = useMusicPlayer();
  const { togglePlayPause, seek, selectTrack } = audioControls;

  const allEntries = useMemo<IndexedTrack[]>(
    () => playlistState.tracks.map((track, index) => ({ track, index })),
    [playlistState.tracks]
  );

  const likedTrackSet = useMemo(() => new Set(likedTrackIds), [likedTrackIds]);

  const trackById = useMemo(() => {
    const map = new Map<string, IndexedTrack>();
    allEntries.forEach((entry) => map.set(entry.track.id, entry));
    return map;
  }, [allEntries]);

  const likedEntries = useMemo(
    () => allEntries.filter((entry) => likedTrackSet.has(entry.track.id)),
    [allEntries, likedTrackSet]
  );

  const recentEntries = useMemo(
    () =>
      recentTrackIds
        .map((trackId) => trackById.get(trackId))
        .filter((entry): entry is IndexedTrack => Boolean(entry)),
    [recentTrackIds, trackById]
  );

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const pageContent = useMemo(() => {
    const withSearch = (entries: IndexedTrack[]) => entries.filter((entry) => matchesSearch(entry, normalizedQuery));

    const homeSections: TrackSection[] = normalizedQuery
      ? [
          {
            id: 'search-results',
            title: 'Search Results',
            description: `Showing matches for "${searchQuery.trim()}"`,
            tracks: withSearch(allEntries),
          },
        ]
      : [
          {
            id: 'continue-listening',
            title: 'Continue Listening',
            description: 'Pick up from your recent rotation.',
            tracks: recentEntries.length > 0 ? recentEntries.slice(0, 8) : allEntries.slice(0, 8),
          },
          {
            id: 'spotlight',
            title: 'Spotlight Picks',
            description: 'Tracks curated for a polished listening session.',
            tracks: allEntries.slice(0, 10),
          },
          {
            id: 'fresh-finds',
            title: 'Fresh Finds',
            description: 'Deep cuts and standout vocals.',
            tracks: allEntries.slice(6, 13),
          },
        ];

    const playlistSections: TrackSection[] = [
      {
        id: 'playlist-cinematic',
        title: 'Cinematic Hits',
        description: 'Big hooks and cinematic builds.',
        tracks: withSearch(allEntries.slice(0, 8)),
      },
      {
        id: 'playlist-vocal',
        title: 'Vocal Focus',
        description: 'Melody-first songs for focused listening.',
        tracks: withSearch(allEntries.filter((_, index) => index % 2 === 0).slice(0, 8)),
      },
      {
        id: 'playlist-late-night',
        title: 'Late Night Mix',
        description: 'Low-key rhythm and smooth pacing.',
        tracks: withSearch(allEntries.filter((_, index) => index % 2 !== 0).slice(0, 8)),
      },
    ].filter((section) => section.tracks.length > 0);

    switch (activeView) {
      case 'library':
        return {
          pageTitle: 'Your Library',
          pageDescription: 'Your complete catalogue in one place.',
          highlightTitle: 'Your Full Collection',
          highlightSubtitle: 'Browse every track with fast search, list view, and focused playback controls.',
          sections: [
            {
              id: 'library-all',
              title: 'All Tracks',
              description: 'Every song currently in your player.',
              tracks: withSearch(allEntries),
            },
          ],
        };
      case 'playlists':
        return {
          pageTitle: 'Playlists',
          pageDescription: 'Curated sets for different moods and sessions.',
          highlightTitle: 'Curated Playlist Sessions',
          highlightSubtitle: 'Move quickly between thematic mixes without losing playback context.',
          sections: playlistSections,
        };
      case 'favorites':
        return {
          pageTitle: 'Liked Songs',
          pageDescription: 'Your saved favorites, instantly playable.',
          highlightTitle: 'Favorites Collection',
          highlightSubtitle: 'Your liked songs are kept ready for quick replay and queue building.',
          sections: [
            {
              id: 'favorites-all',
              title: 'Saved Tracks',
              description: 'Songs you have liked in this player.',
              tracks: withSearch(likedEntries),
            },
          ],
        };
      case 'recent':
        return {
          pageTitle: 'Recently Played',
          pageDescription: 'Return to tracks you listened to most recently.',
          highlightTitle: 'Playback History',
          highlightSubtitle: 'Jump back into your latest sessions with one click.',
          sections: [
            {
              id: 'recent-all',
              title: 'Recent Queue',
              description: 'Ordered by most recent playback.',
              tracks: withSearch(recentEntries),
            },
          ],
        };
      default:
        return {
          pageTitle: 'Home',
          pageDescription: 'Curated listening zones built for flow.',
          highlightTitle: 'Professional Music Workspace',
          highlightSubtitle: 'Clean navigation, fast playback control, and richer discovery sections for day-to-day listening.',
          sections: homeSections,
        };
    }
  }, [activeView, allEntries, likedEntries, normalizedQuery, recentEntries, searchQuery]);

  const totalTracksInView = useMemo(
    () => pageContent.sections.reduce((total, section) => total + section.tracks.length, 0),
    [pageContent.sections]
  );

  const currentTrackLiked = currentTrack ? likedTrackSet.has(currentTrack.id) : false;

  const sidebarCounts = useMemo(
    () => ({
      home: allEntries.length,
      library: allEntries.length,
      playlists: 3,
      favorites: likedEntries.length,
      recent: recentEntries.length,
    }),
    [allEntries.length, likedEntries.length, recentEntries.length]
  );

  const toggleTrackLike = useCallback((trackId: string) => {
    setLikedTrackIds((previousIds) => {
      if (previousIds.includes(trackId)) {
        return previousIds.filter((id) => id !== trackId);
      }
      return [trackId, ...previousIds];
    });
  }, []);

  const handleSelectTrack = useCallback(
    (index: number) => {
      setIsNowPlayingOpen(true);
      selectTrack(index);
    },
    [selectTrack]
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.viewMode, viewMode);
  }, [viewMode]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.likedTrackIds, likedTrackIds);
  }, [likedTrackIds]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.recentTrackIds, recentTrackIds);
  }, [recentTrackIds]);

  useEffect(() => {
    if (!currentTrack?.id) return;

    setRecentTrackIds((previousIds) => {
      const deduped = previousIds.filter((trackId) => trackId !== currentTrack.id);
      return [currentTrack.id, ...deduped].slice(0, 30);
    });
  }, [currentTrack?.id]);

  useEffect(() => {
    const handleGlobalPlaybackShortcuts = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable =
        target?.isContentEditable ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT';

      if (isEditable) return;

      if (event.code === 'Space') {
        event.preventDefault();
        setIsNowPlayingOpen(true);
        void togglePlayPause();
      }

      if (event.code === 'ArrowRight') {
        event.preventDefault();
        seek(Math.min(playerState.currentTime + 10, playerState.duration));
      }

      if (event.code === 'ArrowLeft') {
        event.preventDefault();
        seek(Math.max(playerState.currentTime - 10, 0));
      }
    };

    window.addEventListener('keydown', handleGlobalPlaybackShortcuts);

    return () => {
      window.removeEventListener('keydown', handleGlobalPlaybackShortcuts);
    };
  }, [playerState.currentTime, playerState.duration, seek, togglePlayPause]);

  return (
    <div className="relative min-h-screen" role="main">
      <Sidebar
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view as ViewId);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        counts={sidebarCounts}
        currentTrack={currentTrack}
        isPlaying={playerState.isPlaying}
      />

      <main className="min-h-screen lg:pl-[272px]">
        <Header
          onSearch={setSearchQuery}
          onMenuClick={() => setIsSidebarOpen(true)}
          activeViewLabel={VIEW_LABELS[activeView]}
          trackCount={totalTracksInView}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <HomeView
          pageTitle={pageContent.pageTitle}
          pageDescription={pageContent.pageDescription}
          highlightTitle={pageContent.highlightTitle}
          highlightSubtitle={pageContent.highlightSubtitle}
          sections={pageContent.sections}
          currentTrackIndex={playlistState.currentTrackIndex}
          isPlaying={playerState.isPlaying}
          viewMode={viewMode}
          likedTrackIds={likedTrackSet}
          libraryCount={allEntries.length}
          likedCount={likedEntries.length}
          recentCount={recentEntries.length}
          onSelectTrack={handleSelectTrack}
          onToggleLike={toggleTrackLike}
        />
      </main>

      {isNowPlayingOpen && (
        <NowPlayingBar
          track={currentTrack}
          playerState={playerState}
          isLiked={currentTrackLiked}
          queueCount={playlistState.tracks.length}
          onPlayPause={audioControls.togglePlayPause}
          onNext={audioControls.nextTrack}
          onPrevious={audioControls.previousTrack}
          onSeek={audioControls.seek}
          onVolumeChange={audioControls.setVolume}
          onToggleMute={audioControls.toggleMute}
          onToggleRepeat={audioControls.toggleRepeat}
          onToggleShuffle={audioControls.toggleShuffle}
          onToggleLike={() => {
            if (currentTrack) {
              toggleTrackLike(currentTrack.id);
            }
          }}
          onClose={() => setIsNowPlayingOpen(false)}
        />
      )}

      {!isNowPlayingOpen && currentTrack && (
        <button
          type="button"
          onClick={() => setIsNowPlayingOpen(true)}
          className="fixed bottom-4 right-4 z-[95] inline-flex items-center gap-2 rounded-full border border-cyan-100/25 bg-slate-950/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-100 shadow-lg shadow-slate-950/50 backdrop-blur-xl transition hover:border-cyan-300/50 hover:text-white"
        >
          <Music2 size={14} />
          Now Playing
        </button>
      )}
    </div>
  );
};
