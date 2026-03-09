import { useState, useEffect } from "react";
import { X, Loader2, Search } from "lucide-react";
import { api, type ImageFile } from "@/lib/api";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface ImagePickerModalProps {
  platform: string;
  error?: string;
  onSelect: (imageKey: string) => void;
  onClose: () => void;
}

export default function ImagePickerModal({
  platform,
  error,
  onSelect,
  onClose,
}: ImagePickerModalProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selecting, setSelecting] = useState<string | null>(null);

  useEffect(() => {
    api.getLibrary().then((data) => {
      setImages(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = search
    ? images.filter(
        (img) =>
          img.filename.toLowerCase().includes(search.toLowerCase()) ||
          (img.folder || "").toLowerCase().includes(search.toLowerCase())
      )
    : images;

  // Group by folder
  const grouped: Record<string, ImageFile[]> = {};
  for (const img of filtered) {
    const folder = img.folder || "Generelt";
    if (!grouped[folder]) grouped[folder] = [];
    grouped[folder].push(img);
  }

  // Reset selecting state when error comes in
  useEffect(() => {
    if (error) setSelecting(null);
  }, [error]);

  const handleSelect = (img: ImageFile) => {
    const key = img.folder ? `${img.folder}/${img.filename}` : img.filename;
    setSelecting(key);
    onSelect(key);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative flex max-h-[85vh] w-full max-w-3xl flex-col border border-[var(--color-border)] bg-[var(--color-surface)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3">
          <h2 className="font-condensed text-lg font-bold uppercase tracking-wider">
            Vel bilde
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--color-muted)] hover:text-[var(--color-text)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-[var(--color-border)] px-5 py-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Søk etter bilder..."
              className="w-full border border-[var(--color-border)] bg-[var(--color-bg)] py-2 pl-9 pr-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50 focus:border-[var(--color-accent)] focus:outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-5 mt-3 border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Image grid */}
        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={24} className="animate-spin text-[var(--color-muted)]" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-[var(--color-muted)]">
              Ingen bilder funne
            </p>
          ) : (
            Object.entries(grouped).map(([folder, imgs]) => (
              <div key={folder} className="mb-6">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">
                  {folder}
                </h3>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {imgs.map((img) => {
                    const key = img.folder ? `${img.folder}/${img.filename}` : img.filename;
                    const imgPath = img.folder ? `${img.folder}/${img.filename}` : img.filename;
                    return (
                      <button
                        key={key}
                        onClick={() => handleSelect(img)}
                        disabled={selecting !== null}
                        className="group relative aspect-square overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-accent)] disabled:opacity-50"
                      >
                        <img
                          src={`${API_BASE}/api/images/library/${imgPath}`}
                          alt={img.filename}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        {selecting === key && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <Loader2 size={20} className="animate-spin text-white" />
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-4 opacity-0 transition-opacity group-hover:opacity-100">
                          <p className="truncate text-[10px] text-white">
                            {img.filename}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
