import React, { useMemo, useState } from 'react';
import { Search, Menu, LayoutGrid, List } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onMenuClick: () => void;
  activeViewLabel: string;
  trackCount: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onMenuClick,
  activeViewLabel,
  trackCount,
  viewMode,
  onViewModeChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }).format(new Date()),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1680px] flex-wrap items-center gap-3 px-3 py-3 sm:px-4 sm:py-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3 lg:flex-1">
          <button
            type="button"
            onClick={onMenuClick}
            className="surface inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-100 transition hover:border-cyan-300/50 hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100/60 sm:text-[11px]">
              {todayLabel}
            </p>
            <h1 className="title-font truncate text-lg font-semibold text-white sm:text-xl md:text-2xl">{activeViewLabel}</h1>
          </div>
        </div>

        <label className="surface order-3 flex w-full min-w-0 items-center gap-2.5 rounded-xl px-3 py-2.5 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 lg:order-none lg:flex-1 lg:min-w-[260px]">
          <Search size={16} className="text-cyan-100/50 sm:h-[18px] sm:w-[18px]" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search tracks, artists, moods"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-cyan-100/45"
            aria-label="Search tracks"
          />
        </label>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="surface inline-flex rounded-xl p-1" role="group" aria-label="Switch layout mode">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition sm:h-9 sm:gap-2 sm:px-3 ${
                viewMode === 'grid' ? 'bg-cyan-300/25 text-cyan-50' : 'text-cyan-100/65 hover:text-white'
              }`}
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition sm:h-9 sm:gap-2 sm:px-3 ${
                viewMode === 'list' ? 'bg-cyan-300/25 text-cyan-50' : 'text-cyan-100/65 hover:text-white'
              }`}
            >
              <List size={14} />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

          <div className="surface hidden h-11 items-center rounded-xl px-4 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-50/90 sm:inline-flex">
            {trackCount} tracks
          </div>
        </div>
      </div>
    </header>
  );
};
