import React, { useState } from 'react';
import { Search, User, Menu } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <header className="flex items-center justify-between px-8 py-6 bg-gradient-to-br from-black/40 via-black/20 to-transparent backdrop-blur-2xl border-b border-white/5 sticky top-0 z-50 max-lg:px-5 max-lg:py-4 max-md:px-4 max-md:py-3 max-sm:px-3 max-sm:py-2.5 max-md:flex-col max-md:gap-3 max-sm:gap-2.5 shadow-2xl">
      <div className="flex items-center gap-4 flex-1 max-md:w-full max-md:gap-3 max-sm:gap-2">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 hover:bg-white/10 rounded-xl transition-all duration-300 text-white/70 hover:text-white hover:scale-105 active:scale-95 max-sm:p-2"
          aria-label="Open menu"
        >
          <Menu size={24} className="max-sm:w-5 max-sm:h-5" />
        </button>
        
        <div className="relative flex-1 max-w-[500px] max-md:max-w-full max-md:w-full group">
        <Search 
          size={20} 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110 max-md:left-3.5 max-sm:w-4 max-sm:h-4 max-sm:left-3" 
        />
        <input
          type="text"
          placeholder="Search for songs, artists..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full py-4 pl-12 pr-4 glass-premium border border-white/10 rounded-2xl text-white text-[15px] outline-none transition-all duration-300 placeholder:text-white/40 focus:border-primary/50 focus:shadow-[0_0_25px_rgba(147,51,234,0.25)] focus:bg-white/10 hover:bg-white/5 max-md:py-3 max-md:pl-11 max-md:pr-3.5 max-md:rounded-xl max-sm:py-2.5 max-sm:pl-9 max-sm:pr-3 max-sm:text-sm"
        />
      </div>
      </div>

      <div className="flex items-center gap-4 max-md:w-full max-md:justify-end max-sm:gap-3">
        <button 
          className="relative flex items-center gap-3 px-6 py-3.5 glass-premium border border-white/10 rounded-2xl text-white cursor-pointer transition-all duration-300 text-[15px] font-semibold hover:border-primary/40 hover:bg-gradient-to-r hover:from-primary/20 hover:to-purple-600/20 hover:shadow-xl hover:shadow-primary/20 hover:scale-105 active:scale-95 max-md:px-4 max-md:py-2.5 max-md:gap-2 max-md:rounded-xl max-sm:px-3 max-sm:py-2 max-sm:gap-1.5 overflow-hidden group"
          aria-label="User profile"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <div className="relative p-1.5 rounded-full bg-gradient-to-br from-primary to-purple-600 shadow-lg max-sm:p-1">
            <User size={18} className="text-white max-sm:w-4 max-sm:h-4" />
          </div>
          <span className="max-sm:hidden relative">Guest</span>
        </button>
      </div>
    </header>
  );
};
