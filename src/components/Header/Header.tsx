/**
 * Header Component - Search and user controls
 */

import React, { useState } from 'react';
import { Search, User } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <header className="dashboard-header">
      <div className="search-container">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search for songs, artists..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="header-actions">
        <button className="user-profile" aria-label="User profile">
          <User size={20} />
          <span>Guest</span>
        </button>
      </div>
    </header>
  );
};
