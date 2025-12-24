import React, { useState } from 'react';
import { Search, User } from 'lucide-react';

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
    <header className="flex items-center justify-between px-8 py-6 bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 max-md:px-4 max-md:py-4 max-md:flex-col max-md:gap-4">
      <div className="relative flex-1 max-w-[500px] max-md:max-w-full">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
        <input
          type="text"
          placeholder="Search for songs, artists..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full py-3.5 pl-12 pr-4 glass border border-white/10 rounded-3xl text-white text-[15px] outline-none transition-all duration-300 placeholder:text-white/50 focus:glass focus:border-primary focus:shadow-[0_0_0_3px_rgba(102,126,234,0.2)]"
        />
      </div>

      <div className="flex items-center gap-4">
        <button 
          className="flex items-center gap-3 px-5 py-3 glass border border-white/10 rounded-3xl text-white cursor-pointer transition-all duration-200 text-[15px] font-medium hover:bg-white/15 hover:-translate-y-0.5 max-md:p-3"
          aria-label="User profile"
        >
          <User size={20} />
          <span className="max-md:hidden">Guest</span>
        </button>
      </div>
    </header>
  );
};
