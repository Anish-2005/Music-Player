import React, { useEffect, useMemo, useState } from 'react';
import { Check, ListPlus, ListMinus, X } from 'lucide-react';
import { IndexedTrack } from '@/components/HomeView/HomeView';

type PlaylistEditMode = 'add' | 'remove';

interface PlaylistSongsModalProps {
  isOpen: boolean;
  mode: PlaylistEditMode;
  playlistName: string;
  tracks: IndexedTrack[];
  onClose: () => void;
  onSubmit: (trackIds: string[]) => void;
}

export const PlaylistSongsModal: React.FC<PlaylistSongsModalProps> = ({
  isOpen,
  mode,
  playlistName,
  tracks,
  onClose,
  onSubmit,
}) => {
  const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    setSelectedTrackIds([]);
  }, [isOpen, mode, playlistName]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const title = mode === 'add' ? 'Add Songs' : 'Remove Songs';
  const Icon = mode === 'add' ? ListPlus : ListMinus;
  const actionText = mode === 'add' ? 'Add Selected' : 'Remove Selected';

  const isSelectionEmpty = selectedTrackIds.length === 0;

  const trackMap = useMemo(() => new Set(selectedTrackIds), [selectedTrackIds]);

  if (!isOpen) return null;

  const toggleTrack = (trackId: string) => {
    setSelectedTrackIds((previous) => {
      if (previous.includes(trackId)) {
        return previous.filter((id) => id !== trackId);
      }
      return [...previous, trackId];
    });
  };

  return (
    <div className="fixed inset-0 z-[145] flex items-end justify-center bg-slate-950/75 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <div className="surface-strong flex h-[85dvh] w-full max-w-2xl flex-col rounded-t-2xl border border-cyan-100/20 sm:h-auto sm:max-h-[80dvh] sm:rounded-2xl">
        <div className="flex items-start justify-between border-b border-cyan-100/10 p-4 sm:p-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/55">Playlist Editor</p>
            <h2 className="title-font mt-1 flex items-center gap-2 text-xl font-semibold text-white">
              <Icon size={18} />
              {title}
            </h2>
            <p className="mt-1 truncate text-xs text-cyan-100/65">{playlistName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-cyan-100/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Close playlist song manager"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {tracks.length === 0 ? (
            <div className="surface rounded-xl border border-dashed border-cyan-100/25 p-4 text-sm text-cyan-100/65">
              {mode === 'add'
                ? 'No available songs left to add.'
                : 'There are no songs in this playlist to remove.'}
            </div>
          ) : (
            <div className="space-y-2">
              {tracks.map(({ track }) => {
                const selected = trackMap.has(track.id);

                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => toggleTrack(track.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                      selected
                        ? 'border-cyan-200/45 bg-cyan-300/15'
                        : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
                    }`}
                  >
                    <img src={track.albumArt} alt={track.name} className="h-11 w-11 rounded-lg object-cover" loading="lazy" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">{track.name}</p>
                      <p className="truncate text-xs text-cyan-100/65">{track.artist}</p>
                    </div>
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-md border ${
                        selected ? 'border-cyan-200/40 bg-cyan-300/18 text-cyan-50' : 'border-white/15 text-transparent'
                      }`}
                    >
                      <Check size={14} />
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2.5 border-t border-cyan-100/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-end sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-cyan-100/80 transition hover:bg-white/10 hover:text-white sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSelectionEmpty}
            onClick={() => onSubmit(selectedTrackIds)}
            className="w-full rounded-lg border border-cyan-200/40 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-300/25 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};
