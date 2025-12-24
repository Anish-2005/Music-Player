/**
 * Sidebar Component - Spotify-like navigation
 */

import React from 'react';
import { Home, Music, ListMusic, Heart, Clock, Plus } from 'lucide-react';
import './Sidebar.css';

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
    <aside className="sidebar">
      <div className="sidebar-header">
        <Music size={32} className="logo-icon" />
        <h1 className="logo-text">Music Player</h1>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="create-playlist-btn">
          <Plus size={20} />
          <span>Create Playlist</span>
        </button>
      </div>
    </aside>
  );
};
