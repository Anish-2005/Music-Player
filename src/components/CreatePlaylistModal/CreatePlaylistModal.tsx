import React, { useEffect, useRef, useState } from 'react';
import { X, ListMusic } from 'lucide-react';

interface CreatePlaylistModalProps {
  isOpen: boolean;
  suggestedName: string;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  isOpen,
  suggestedName,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState(suggestedName);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setName(suggestedName);
    setError('');
  }, [isOpen, suggestedName]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    inputRef.current?.select();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Playlist name is required.');
      return;
    }

    onCreate(trimmedName);
  };

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-sm sm:p-5">
      <div className="surface-strong w-full max-w-md rounded-2xl border border-cyan-100/20 p-4 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/55">Playlist Builder</p>
            <h2 className="title-font mt-1 text-xl font-semibold text-white sm:text-2xl">Create Playlist</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-cyan-100/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Close create playlist modal"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-cyan-100/70" htmlFor="playlist-name">
            Playlist Name
          </label>
          <input
            ref={inputRef}
            id="playlist-name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (error) setError('');
            }}
            placeholder="My Playlist"
            maxLength={60}
            className="surface w-full rounded-xl border border-cyan-100/20 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-cyan-100/45 focus:border-cyan-200/45"
          />
          {error && <p className="mt-2 text-xs font-medium text-amber-300">{error}</p>}

          <p className="mt-3 flex items-center gap-1.5 text-xs text-cyan-100/60">
            <ListMusic size={13} />
            The playlist will be created with your current listening context.
          </p>

          <div className="mt-5 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-cyan-100/80 transition hover:bg-white/10 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg border border-cyan-200/40 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-300/25"
            >
              Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
