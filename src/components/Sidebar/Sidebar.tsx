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
    <aside className="w-[280px] h-screen glass-dark flex flex-col border-r border-white/5 fixed left-0 top-0 z-[100] lg:w-[280px] md:w-[240px] max-md:w-full max-md:h-auto max-md:relative backdrop-blur-2xl shadow-2xl">
      <div className="p-8 md:p-6 flex items-center gap-4 border-b border-white/5 bg-gradient-to-br from-white/5 to-transparent">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary via-primary-dark to-purple-600 shadow-lg shadow-primary/30 animate-pulse-slow">
          <Music size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary-dark bg-clip-text text-transparent">
          Music Player
        </h1>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto max-md:flex max-md:overflow-x-auto max-md:p-0 px-3">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              className={`w-full flex items-center gap-4 px-4 py-3.5 mb-2 rounded-xl bg-transparent border-none cursor-pointer transition-all duration-300 text-base font-medium text-left max-md:flex-col max-md:p-4 max-md:gap-2 max-md:min-w-[80px] group ${
                isActive 
                  ? 'text-white bg-gradient-to-r from-primary/25 to-purple-500/25 shadow-lg shadow-primary/20 scale-[1.02]' 
                  : 'text-white/60 hover:text-white hover:bg-white/10 hover:scale-[1.01]'
              }`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon 
                size={22} 
                className={`transition-all duration-300 ${
                  isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(147,51,234,0.5)]' : 'group-hover:scale-110'
                }`}
              />
              <span className="font-semibold">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 max-md:hidden bg-gradient-to-t from-white/5 to-transparent">
        <button className="w-full flex items-center justify-center gap-3 px-4 py-4 glass-premium border border-white/20 rounded-xl text-white cursor-pointer transition-all duration-300 text-[15px] font-bold hover:bg-gradient-to-r hover:from-primary/30 hover:to-purple-600/30 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Create Playlist</span>
        </button>
      </div>
    </aside>
  );
};
