import React from 'react';
import { Home, Music2, ListMusic, Heart, History, Plus, X, Disc3 } from 'lucide-react';
import { Track } from '@/types';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
  counts: Record<string, number>;
  currentTrack: Track | null;
  isPlaying: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange,
  isOpen,
  onClose,
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
        className={`fixed left-0 top-0 z-50 flex h-[100dvh] w-[88vw] max-w-[300px] flex-col border-r border-cyan-100/15 bg-slate-950/80 shadow-2xl backdrop-blur-2xl transition-transform duration-300 lg:w-[272px] lg:max-w-none lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between border-b border-cyan-100/10 px-5 py-5">
          <div className="flex items-center gap-3">
            <img src="/mm-logo.png" alt="Music Maniac" className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <p className="title-font text-base font-semibold text-white">Music Maniac</p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-cyan-100/55">Studio Console</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-cyan-100/65 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
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
                className={`interactive-lift mb-1.5 flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left ${
                  isActive
                    ? 'border-cyan-300/45 bg-cyan-300/16 text-white'
                    : 'border-transparent text-cyan-50/70 hover:bg-white/8 hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-cyan-200' : 'text-cyan-100/65'} />
                <span className="text-sm font-semibold">{item.label}</span>
                <span className="ml-auto rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.07em] text-cyan-100/65">
                  {counts[item.id] ?? 0}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-cyan-100/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            className="interactive-lift flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-200/35 bg-cyan-400/12 px-3 py-3 text-sm font-semibold text-cyan-50"
          >
            <Plus size={16} />
            Create Playlist
          </button>

          {currentTrack && (
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
          )}
        </div>
      </aside>
    </>
  );
};
