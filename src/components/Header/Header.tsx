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
      <div className="mx-auto flex w-full max-w-[1680px] flex-wrap items-center gap-4 px-4 py-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 lg:flex-1">
          <button
            type="button"
            onClick={onMenuClick}
            className="surface inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-100 transition hover:border-cyan-300/50 hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100/60">
              {todayLabel}
            </p>
            <h1 className="title-font truncate text-xl font-semibold text-white md:text-2xl">{activeViewLabel}</h1>
          </div>
        </div>

        <label className="surface flex min-w-[250px] flex-1 items-center gap-3 rounded-2xl px-4 py-3 max-md:order-3 max-md:w-full">
          <Search size={18} className="text-cyan-100/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search tracks, artists, moods"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-cyan-100/45"
            aria-label="Search tracks"
          />
        </label>

        <div className="flex items-center gap-3 max-sm:w-full max-sm:justify-between">
          <div className="surface inline-flex rounded-xl p-1.5" role="group" aria-label="Switch layout mode">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-semibold transition ${
                viewMode === 'grid' ? 'bg-cyan-300/25 text-cyan-50' : 'text-cyan-100/65 hover:text-white'
              }`}
            >
              <LayoutGrid size={15} />
              Grid
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-semibold transition ${
                viewMode === 'list' ? 'bg-cyan-300/25 text-cyan-50' : 'text-cyan-100/65 hover:text-white'
              }`}
            >
              <List size={15} />
              List
            </button>
          </div>

          <div className="surface inline-flex h-11 items-center rounded-xl px-4 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-50/90">
            {trackCount} tracks
          </div>
        </div>
      </div>
    </header>
  );
};
