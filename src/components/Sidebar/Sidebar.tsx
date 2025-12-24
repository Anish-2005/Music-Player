import React from 'react';
import { Home, Music, ListMusic, Heart, Clock, Plus } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'library', label: 'Your Library', icon: Music },
    { id: 'playlists', label: 'Playlists', icon: ListMusic },
    { id: 'favorites', label: 'Liked Songs', icon: Heart },
    { id: 'recent', label: 'Recently Played', icon: Clock },
  ];

  return (
    <aside className="w-[280px] h-screen glass-dark flex flex-col border-r border-white/10 fixed left-0 top-0 z-[100] lg:w-[280px] md:w-[240px] max-md:w-full max-md:h-auto max-md:relative">
      <div className="p-8 md:p-6 flex items-center gap-4 border-b border-white/10">
        <Music size={32} className="text-primary" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-white">
          Music Player
        </h1>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto max-md:flex max-md:overflow-x-auto max-md:p-0">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`w-full flex items-center gap-4 px-6 py-3.5 bg-transparent border-none text-white/70 cursor-pointer transition-all duration-200 text-base font-medium text-left hover:bg-white/5 hover:text-white max-md:flex-col max-md:p-4 max-md:gap-2 max-md:min-w-[80px] ${
                activeView === item.id ? 'text-white bg-primary/15 border-l-4 border-primary' : ''
              }`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/10 max-md:hidden">
        <button className="w-full flex items-center justify-center gap-3 px-3.5 py-3.5 glass border border-white/20 rounded-lg text-white cursor-pointer transition-all duration-200 text-[15px] font-semibold hover:bg-white/15 hover:-translate-y-0.5">
          <Plus size={20} />
          <span>Create Playlist</span>
        </button>
      </div>
    </aside>
  );
};
