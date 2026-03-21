import React from 'react';
import { Home, Music2, ListMusic, Heart, History, Plus, X, Disc3, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Track } from '@/types';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onCreatePlaylist: () => void;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  counts: Record<string, number>;
  currentTrack: Track | null;
  isPlaying: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange,
  onCreatePlaylist,
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
  counts,
  currentTrack,
  isPlaying,
}) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'library', label: 'Library', icon: Music2 },
    { id: 'playlists', label: 'Playlists', icon: ListMusic },
    { id: 'favorites', label: 'Liked Songs', icon: Heart },
    { id: 'recent', label: 'Recently Played', icon: History },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-[100dvh] w-[88vw] max-w-[300px] flex-col overflow-hidden border-r border-cyan-100/15 bg-slate-950/85 shadow-2xl backdrop-blur-2xl transition-[transform,width] duration-300 ease-in-out ${
          isCollapsed ? 'lg:w-[92px]' : 'lg:w-[272px]'
        } lg:max-w-none lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={`relative border-b border-cyan-100/10 px-5 py-5 ${
            isCollapsed ? 'lg:px-2.5 lg:py-4' : ''
          }`}
        >
          <button
            type="button"
            onClick={onToggleCollapse}
            className={`absolute right-2 top-2 hidden h-8 w-8 items-center justify-center rounded-lg text-cyan-100/65 transition hover:bg-white/10 hover:text-white ${
              isCollapsed ? 'lg:hidden' : 'lg:inline-flex'
            }`}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-cyan-100/65 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>

          <div className={`flex min-w-0 items-center gap-3 ${isCollapsed ? 'lg:flex-col lg:items-center lg:gap-2' : ''}`}>
            <div
              className={`shrink-0 rounded-xl border border-cyan-100/20 bg-cyan-200/[0.08] p-1 ${
                isCollapsed ? 'h-12 w-12' : 'h-11 w-11'
              }`}
            >
              <img src="/mm-logo.svg" alt="Music Maniac" className="h-full w-full rounded-lg object-cover" />
            </div>

            <div
              className={`min-w-0 overflow-hidden transition-all duration-300 ease-in-out ${
                isCollapsed
                  ? 'lg:max-h-0 lg:max-w-0 lg:opacity-0'
                  : 'lg:max-h-20 lg:max-w-[150px] lg:opacity-100'
              }`}
            >
              <p className="title-font text-base font-semibold text-white">Music Maniac</p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-cyan-100/55">Studio Console</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onViewChange(item.id)}
                className={`mb-1.5 flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all duration-300 ease-in-out ${
                  isCollapsed
                    ? 'lg:mx-auto lg:h-12 lg:w-12 lg:justify-center lg:gap-0 lg:rounded-2xl lg:px-0 lg:py-0'
                    : ''
                } ${
                  isActive
                    ? 'border-cyan-300/45 bg-cyan-300/16 text-white shadow-[0_8px_22px_rgba(29,78,216,0.16)]'
                    : 'border-transparent text-cyan-50/70 hover:bg-white/8 hover:text-white'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={18} className={`shrink-0 ${isActive ? 'text-cyan-200' : 'text-cyan-100/65'}`} />

                <span
                  className={`inline-block overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 ease-in-out ${
                    isCollapsed ? 'lg:max-w-0 lg:opacity-0' : 'lg:max-w-[120px] lg:opacity-100'
                  }`}
                >
                  {item.label}
                </span>

                <div
                  className={`${isCollapsed ? 'lg:ml-0' : 'ml-auto'} overflow-hidden transition-all duration-300 ease-in-out ${
                    isCollapsed ? 'lg:max-w-0 lg:opacity-0' : 'lg:max-w-[60px] lg:opacity-100'
                  }`}
                >
                  <span className="inline-flex rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.07em] text-cyan-100/65">
                    {counts[item.id] ?? 0}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        <div
          className={`overflow-hidden px-3 transition-all duration-300 ease-in-out ${
            isCollapsed ? 'max-h-20 pb-3 opacity-100 lg:block' : 'max-h-0 pb-0 opacity-0 lg:hidden'
          }`}
        >
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden h-10 w-full items-center justify-center rounded-xl border border-cyan-100/20 bg-cyan-200/[0.08] text-cyan-100/75 transition hover:border-cyan-200/45 hover:bg-cyan-200/[0.16] hover:text-white lg:flex"
            aria-label="Expand sidebar"
            title="Expand sidebar"
          >
            <PanelLeftOpen size={16} />
          </button>
        </div>

        <div
          className={`border-t border-cyan-100/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] ${
            isCollapsed ? 'space-y-2.5 lg:flex lg:flex-col lg:items-center lg:space-y-2.5 lg:px-2.5' : 'space-y-3'
          }`}
        >
          <button
            type="button"
            onClick={onCreatePlaylist}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-200/35 bg-cyan-400/12 px-3 py-3 text-sm font-semibold text-cyan-50 transition-all duration-300 ease-in-out hover:bg-cyan-300/22 ${
              isCollapsed ? 'lg:h-11 lg:w-11 lg:gap-0 lg:rounded-2xl lg:px-0 lg:py-0' : ''
            }`}
            title={isCollapsed ? 'Create Playlist' : undefined}
          >
            <Plus size={16} className="shrink-0" />
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
                isCollapsed ? 'lg:hidden' : 'lg:max-w-[130px] lg:opacity-100'
              }`}
            >
              Create Playlist
            </span>
          </button>

          {currentTrack && (
            <>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isCollapsed ? 'lg:max-h-[74px] lg:opacity-100' : 'lg:max-h-0 lg:opacity-0'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onViewChange('recent')}
                  className="relative hidden w-full items-center justify-center rounded-2xl border border-cyan-100/20 bg-cyan-200/[0.08] p-2.5 transition hover:border-cyan-200/45 lg:inline-flex"
                  title={`Now Playing: ${currentTrack.name}`}
                >
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                    <img
                      src={currentTrack.albumArt}
                      alt={currentTrack.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/30" />
                  </div>
                  <Disc3
                    size={12}
                    className={`absolute mt-7 rounded-full bg-slate-950/75 p-0.5 text-cyan-200 ${
                      isPlaying ? 'animate-[rotate-slow_4s_linear_infinite]' : ''
                    }`}
                  />
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isCollapsed ? 'lg:max-h-0 lg:opacity-0' : 'lg:max-h-[120px] lg:opacity-100'
                }`}
              >
                <div className="surface rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-cyan-100/55">Now Playing</p>
                  <div className="mt-2 flex items-center gap-2.5">
                    <img
                      src={currentTrack.albumArt}
                      alt={currentTrack.name}
                      className="h-10 w-10 rounded-lg object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">{currentTrack.name}</p>
                      <p className="truncate text-xs text-cyan-100/60">{currentTrack.artist}</p>
                    </div>
                    <Disc3
                      size={16}
                      className={`text-cyan-200 ${isPlaying ? 'animate-[rotate-slow_4s_linear_infinite]' : ''}`}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};
