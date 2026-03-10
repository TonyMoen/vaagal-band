import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  FolderSync,
  Upload,
  Loader2,
  Image as ImageIcon,
  Filter,
  CloudUpload,
} from "lucide-react";

export default function Library() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<"library" | "processed">("library");

  const library = useQuery({
    queryKey: ["images", "library"],
    queryFn: api.getLibrary,
  });

  const processed = useQuery({
    queryKey: ["images", "processed"],
    queryFn: api.getProcessed,
  });

  const syncDrive = useMutation({
    mutationFn: api.syncDrive,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["images"] }),
  });

  const indexImages = useMutation({
    mutationFn: api.indexImages,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["images"] }),
  });

  const publishImages = useMutation({
    mutationFn: api.publishImages,
  });

  const uploadImage = useMutation({
    mutationFn: (file: File) => api.uploadImage(file),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["images"] }),
  });

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = async () => {
      if (!input.files) return;
      for (const file of input.files) {
        await uploadImage.mutateAsync(file);
      }
    };
    input.click();
  };

  const images = tab === "library" ? library.data : processed.data;
  const isLoading = tab === "library" ? library.isLoading : processed.isLoading;
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-condensed text-3xl font-bold uppercase tracking-wider">
            Bilder
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Bildebibliotek og prosesserte bilder
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => syncDrive.mutate()}
            disabled={syncDrive.isPending}
            className="flex items-center gap-2 border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-50"
          >
            {syncDrive.isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <FolderSync size={14} />
            )}
            Sync Drive
          </button>
          <button
            onClick={handleUpload}
            disabled={uploadImage.isPending}
            className="flex items-center gap-2 border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-50"
          >
            <Upload size={14} />
            Last opp
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 border-b border-[var(--color-border)]">
        <button
          onClick={() => setTab("library")}
          className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
            tab === "library"
              ? "border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]"
              : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
          }`}
        >
          <span className="flex items-center gap-2">
            <ImageIcon size={14} />
            Bibliotek
            {library.data && (
              <span className="text-xs text-[var(--color-muted)]">({library.data.length})</span>
            )}
          </span>
        </button>
        <button
          onClick={() => setTab("processed")}
          className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
            tab === "processed"
              ? "border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]"
              : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
          }`}
        >
          <span className="flex items-center gap-2">
            <Filter size={14} />
            Prosessert
            {processed.data && (
              <span className="text-xs text-[var(--color-muted)]">({processed.data.length})</span>
            )}
          </span>
        </button>
      </div>

      {/* Action bar for processed tab */}
      {tab === "processed" && processed.data && processed.data.length > 0 && (
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => publishImages.mutate()}
            disabled={publishImages.isPending}
            className="btn gap-2 px-4 py-2 text-sm"
          >
            {publishImages.isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <CloudUpload size={14} />
            )}
            Publiser til GCS
          </button>
          <button
            onClick={() => indexImages.mutate()}
            disabled={indexImages.isPending}
            className="flex items-center gap-2 border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-50"
          >
            {indexImages.isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <ImageIcon size={14} />
            )}
            Reindekser CLIP
          </button>
        </div>
      )}

      {/* Image grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-[var(--color-muted)]" />
        </div>
      ) : images && images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img) => (
            <div
              key={img.filename}
              className="group relative overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg)]"
            >
              <div className="aspect-square">
                <img
                  src={
                    tab === "processed"
                      ? `${API_BASE}/api/images/processed/${img.filename}`
                      : `${API_BASE}/api/images/library/${img.folder ? img.folder + "/" : ""}${img.filename}`
                  }
                  alt={img.filename}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/80 px-2 py-1.5 text-xs text-white backdrop-blur transition-transform group-hover:translate-y-0">
                {img.filename}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-dashed border-[var(--color-border)] py-20 text-center">
          <ImageIcon size={32} className="mb-3 text-[var(--color-muted)]" />
          <p className="text-[var(--color-muted)]">Ingen bilder funne</p>
          <button
            onClick={() => syncDrive.mutate()}
            className="mt-3 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
          >
            Sync frå Google Drive
          </button>
        </div>
      )}
    </div>
  );
}
