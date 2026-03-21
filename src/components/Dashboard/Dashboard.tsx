import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Music2 } from 'lucide-react';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Header } from '@/components/Header/Header';
import { HomeView, IndexedTrack, TrackSection } from '@/components/HomeView/HomeView';
import { NowPlayingBar } from '@/components/NowPlayingBar/NowPlayingBar';
import { CreatePlaylistModal } from '@/components/CreatePlaylistModal/CreatePlaylistModal';
import { PlaylistSongsModal } from '@/components/PlaylistSongsModal/PlaylistSongsModal';
import { getStorageItem, setStorageItem } from '@/utils/helpers';

type ViewId = 'home' | 'library' | 'playlists' | 'favorites' | 'recent';

type ViewMode = 'grid' | 'list';
type ThemeMode = 'dark' | 'light';

interface UserPlaylist {
  id: string;
  name: string;
  trackIds: string[];
  createdAt: string;
}

type PlaylistEditorMode = 'add' | 'remove';

interface PlaylistEditorState {
  isOpen: boolean;
  playlistId: string | null;
  mode: PlaylistEditorMode;
}

const STORAGE_KEYS = {
  viewMode: 'musicPlayer_viewMode',
  themeMode: 'musicPlayer_themeMode',
  sidebarCollapsed: 'musicPlayer_sidebarCollapsed',
  likedTrackIds: 'musicPlayer_likedTrackIds',
  recentTrackIds: 'musicPlayer_recentTrackIds',
  customPlaylists: 'musicPlayer_customPlaylists',
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() =>
    getStorageItem(STORAGE_KEYS.sidebarCollapsed, false)
  );
  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState(true);
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false);
  const [suggestedPlaylistName, setSuggestedPlaylistName] = useState('');
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => getStorageItem(STORAGE_KEYS.themeMode, 'dark'));
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [playlistEditor, setPlaylistEditor] = useState<PlaylistEditorState>({
    isOpen: false,
    playlistId: null,
    mode: 'add',
  });
  const [viewMode, setViewMode] = useState<ViewMode>(() => getStorageItem(STORAGE_KEYS.viewMode, 'grid'));
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>(() =>
    getStorageItem(STORAGE_KEYS.likedTrackIds, [])
  );
  const [recentTrackIds, setRecentTrackIds] = useState<string[]>(() =>
    getStorageItem(STORAGE_KEYS.recentTrackIds, [])
  );
  const [customPlaylists, setCustomPlaylists] = useState<UserPlaylist[]>(() =>
    getStorageItem(STORAGE_KEYS.customPlaylists, [])
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

  const openPlaylistEditor = useCallback((playlistId: string, mode: PlaylistEditorMode) => {
    setPlaylistEditor({
      isOpen: true,
      playlistId,
      mode,
    });
  }, []);

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

    const customPlaylistSections: TrackSection[] = customPlaylists.map((playlist) => {
      const playlistTracks = playlist.trackIds
          .map((trackId) => trackById.get(trackId))
          .filter((entry): entry is IndexedTrack => Boolean(entry));
      return {
        id: `playlist-user-${playlist.id}`,
        title: playlist.name,
        description: `${playlistTracks.length} ${playlistTracks.length === 1 ? 'track' : 'tracks'}`,
        tracks: withSearch(playlistTracks),
        totalTracks: playlistTracks.length,
        editable: true,
        onAddSongs: () => openPlaylistEditor(playlist.id, 'add'),
        onRemoveSongs: () => openPlaylistEditor(playlist.id, 'remove'),
      };
    });

    const curatedPlaylistSections: TrackSection[] = [
      ...customPlaylistSections,
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
    ].filter((section) => !section.editable && section.tracks.length > 0);

    const playlistSections: TrackSection[] = [...customPlaylistSections, ...curatedPlaylistSections];

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
          highlightSubtitle: 'Move quickly between your own playlists and curated mixes without losing playback context.',
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
  }, [activeView, allEntries, customPlaylists, likedEntries, normalizedQuery, openPlaylistEditor, recentEntries, searchQuery, trackById]);

  const totalTracksInView = useMemo(
    () => pageContent.sections.reduce((total, section) => total + section.tracks.length, 0),
    [pageContent.sections]
  );

  const currentTrackLiked = currentTrack ? likedTrackSet.has(currentTrack.id) : false;

  const sidebarCounts = useMemo(
    () => ({
      home: allEntries.length,
      library: allEntries.length,
      playlists: 3 + customPlaylists.length,
      favorites: likedEntries.length,
      recent: recentEntries.length,
    }),
    [allEntries.length, customPlaylists.length, likedEntries.length, recentEntries.length]
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

  const handleOpenCreatePlaylist = useCallback(() => {
    const nextDefaultName = `My Playlist ${customPlaylists.length + 1}`;
    setSuggestedPlaylistName(nextDefaultName);
    setIsSidebarOpen(false);
    setIsCreatePlaylistModalOpen(true);
  }, [customPlaylists.length]);

  const handleCreatePlaylist = useCallback(
    (playlistName: string) => {
      const starterTrackId = currentTrack?.id ?? likedTrackIds[0] ?? recentTrackIds[0] ?? allEntries[0]?.track.id;
      if (!starterTrackId) return;

      const playlist: UserPlaylist = {
        id: `${Date.now()}`,
        name: playlistName,
        trackIds: [starterTrackId],
        createdAt: new Date().toISOString(),
      };

      setCustomPlaylists((previous) => [playlist, ...previous]);
      setActiveView('playlists');
      setIsSidebarOpen(false);
      setIsCreatePlaylistModalOpen(false);
    },
    [allEntries, currentTrack?.id, likedTrackIds, recentTrackIds]
  );

  const handleToggleTheme = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const applyThemeChange = () =>
      setThemeMode((previousTheme) => (previousTheme === 'dark' ? 'light' : 'dark'));

    if (prefersReducedMotion) {
      applyThemeChange();
      return;
    }

    const docWithTransition = document as Document & {
      startViewTransition?: (callback: () => void) => { finished: Promise<void> };
    };

    setIsThemeTransitioning(true);

    if (docWithTransition.startViewTransition) {
      const transition = docWithTransition.startViewTransition(() => {
        applyThemeChange();
      });

      transition.finished.finally(() => {
        setIsThemeTransitioning(false);
      });
      return;
    }

    applyThemeChange();
    window.setTimeout(() => {
      setIsThemeTransitioning(false);
    }, 420);
  }, []);

  const selectedEditorPlaylist = useMemo(
    () => customPlaylists.find((playlist) => playlist.id === playlistEditor.playlistId) ?? null,
    [customPlaylists, playlistEditor.playlistId]
  );

  const playlistEditorTracks = useMemo(() => {
    if (!selectedEditorPlaylist) return [];

    const currentTrackIdSet = new Set(selectedEditorPlaylist.trackIds);

    if (playlistEditor.mode === 'add') {
      return allEntries.filter((entry) => !currentTrackIdSet.has(entry.track.id));
    }

    return selectedEditorPlaylist.trackIds
      .map((trackId) => trackById.get(trackId))
      .filter((entry): entry is IndexedTrack => Boolean(entry));
  }, [allEntries, playlistEditor.mode, selectedEditorPlaylist, trackById]);

  const handleSubmitPlaylistSongs = useCallback(
    (trackIds: string[]) => {
      if (!playlistEditor.playlistId || trackIds.length === 0) {
        setPlaylistEditor((previous) => ({ ...previous, isOpen: false }));
        return;
      }

      setCustomPlaylists((previousPlaylists) =>
        previousPlaylists.map((playlist) => {
          if (playlist.id !== playlistEditor.playlistId) return playlist;

          if (playlistEditor.mode === 'add') {
            const existingTrackIds = new Set(playlist.trackIds);
            return {
              ...playlist,
              trackIds: [...playlist.trackIds, ...trackIds.filter((trackId) => !existingTrackIds.has(trackId))],
            };
          }

          const tracksToRemove = new Set(trackIds);
          return {
            ...playlist,
            trackIds: playlist.trackIds.filter((trackId) => !tracksToRemove.has(trackId)),
          };
        })
      );

      setPlaylistEditor((previous) => ({ ...previous, isOpen: false }));
    },
    [playlistEditor.mode, playlistEditor.playlistId]
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.viewMode, viewMode);
  }, [viewMode]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.themeMode, themeMode);
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-transitioning', isThemeTransitioning);
    return () => {
      document.documentElement.classList.remove('theme-transitioning');
    };
  }, [isThemeTransitioning]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.sidebarCollapsed, isSidebarCollapsed);
  }, [isSidebarCollapsed]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.likedTrackIds, likedTrackIds);
  }, [likedTrackIds]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.recentTrackIds, recentTrackIds);
  }, [recentTrackIds]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.customPlaylists, customPlaylists);
  }, [customPlaylists]);

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

  useEffect(() => {
    const shouldLockScroll = isSidebarOpen || isCreatePlaylistModalOpen || playlistEditor.isOpen;
    const previousOverflow = document.body.style.overflow;

    if (shouldLockScroll) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCreatePlaylistModalOpen, isSidebarOpen, playlistEditor.isOpen]);

  return (
    <div className="relative min-h-screen" role="main">
      <Sidebar
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view as ViewId);
          setIsSidebarOpen(false);
        }}
        onCreatePlaylist={handleOpenCreatePlaylist}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((previous) => !previous)}
        counts={sidebarCounts}
        currentTrack={currentTrack}
        isPlaying={playerState.isPlaying}
      />

      <main
        className={`min-h-screen transition-[padding] duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:pl-[92px]' : 'lg:pl-[272px]'
        }`}
      >
        <Header
          onSearch={setSearchQuery}
          onMenuClick={() => setIsSidebarOpen(true)}
          activeViewLabel={VIEW_LABELS[activeView]}
          trackCount={totalTracksInView}
          viewMode={viewMode}
          themeMode={themeMode}
          onViewModeChange={setViewMode}
          onToggleTheme={handleToggleTheme}
        />

        <HomeView
          pageTitle={pageContent.pageTitle}
          pageDescription={pageContent.pageDescription}
          highlightTitle={pageContent.highlightTitle}
          highlightSubtitle={pageContent.highlightSubtitle}
          sections={pageContent.sections}
          currentTrackIndex={playlistState.currentTrackIndex}
          isPlaying={playerState.isPlaying}
          isNowPlayingOpen={isNowPlayingOpen}
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
          className="fixed bottom-[max(0.9rem,env(safe-area-inset-bottom))] right-3 z-[95] inline-flex items-center gap-2 rounded-full border border-cyan-100/25 bg-slate-950/90 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-100 shadow-lg shadow-slate-950/50 backdrop-blur-xl transition hover:border-cyan-300/50 hover:text-white sm:right-4 sm:px-4 sm:text-xs"
        >
          <Music2 size={14} />
          Now Playing
        </button>
      )}

      <CreatePlaylistModal
        isOpen={isCreatePlaylistModalOpen}
        suggestedName={suggestedPlaylistName}
        onClose={() => setIsCreatePlaylistModalOpen(false)}
        onCreate={handleCreatePlaylist}
      />

      <PlaylistSongsModal
        isOpen={playlistEditor.isOpen}
        mode={playlistEditor.mode}
        playlistName={selectedEditorPlaylist?.name ?? 'Playlist'}
        tracks={playlistEditorTracks}
        onClose={() => setPlaylistEditor((previous) => ({ ...previous, isOpen: false }))}
        onSubmit={handleSubmitPlaylistSongs}
      />

      {isThemeTransitioning && <div className="theme-transition-overlay" aria-hidden="true" />}
    </div>
  );
};
