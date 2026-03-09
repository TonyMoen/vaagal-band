import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api, type Draft } from "@/lib/api";
import { Zap, Loader2 } from "lucide-react";

const PLATFORMS = [
  { id: "instagram_feed", label: "Instagram Feed" },
  { id: "facebook_feed", label: "Facebook Feed" },
];

const IMAGE_COUNTS = [
  { value: 0, label: "Auto" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];

export default function Create() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [numImages, setNumImages] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "instagram_feed",
    "facebook_feed",
  ]);

  const yolo = useMutation({
    mutationFn: () => api.yolo(prompt, selectedPlatforms, numImages),
    onSuccess: (data) => {
      // Use structured posts from pipeline, fall back to empty
      const apiPosts = data.posts || [];

      const draft: Draft = {
        id: crypto.randomUUID(),
        prompt,
        platforms: selectedPlatforms,
        posts: apiPosts.map((p) => ({
          id: crypto.randomUUID(),
          platform: p.platform,
          caption: p.caption,
          image_url: p.image_url || "",
          image_filename: p.image_filename || "",
          image_urls: p.image_urls || (p.image_url ? [p.image_url] : []),
          image_filenames: p.image_filenames || (p.image_filename ? [p.image_filename] : []),
          status: "draft" as const,
          created_at: new Date().toISOString(),
        })),
        status: "draft",
        created_at: new Date().toISOString(),
      };
      api.saveDraft(draft);

      // Navigate to the review page for this draft
      navigate(`/ai/review/${draft.id}`);
    },
  });

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || selectedPlatforms.length === 0) return;
    yolo.mutate();
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="mb-2 font-condensed text-3xl font-bold uppercase tracking-wider">
        YOLO Mode
      </h1>
      <p className="mb-8 text-sm text-[var(--color-muted)]">
        Ein prompt &mdash; full innholdspakke for alle plattformer
      </p>

      <form onSubmit={handleSubmit}>
        <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <label className="mb-2 block text-sm font-semibold text-[var(--color-muted)]">
            Kva skal innlegget handle om?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='F.eks. "Promo for Siste Runde" eller "Behind the scenes fra øving"'
            rows={3}
            className="w-full resize-none border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50 focus:border-[var(--color-accent)] focus:outline-none"
          />

          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-[var(--color-muted)]">Plattformer</p>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => togglePlatform(id)}
                  className={`border px-4 py-2 text-sm font-semibold transition-colors ${
                    selectedPlatforms.includes(id)
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                      : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-muted)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-[var(--color-muted)]">Bilder per post</p>
            <div className="flex gap-2">
              {IMAGE_COUNTS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setNumImages(value)}
                  className={`border px-4 py-2 text-sm font-semibold transition-colors ${
                    numImages === value
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                      : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-muted)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={yolo.isPending || !prompt.trim() || selectedPlatforms.length === 0}
            className="btn mt-6 w-full gap-2 disabled:opacity-50"
          >
            {yolo.isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Genererer...
              </>
            ) : (
              <>
                <Zap size={18} />
                Generer innhold
              </>
            )}
          </button>
        </div>
      </form>

      {yolo.isError && (
        <div className="mt-6 border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          {(yolo.error as Error).message}
        </div>
      )}
    </div>
  );
}
