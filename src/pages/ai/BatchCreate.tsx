import { useState } from "react";
import { api, type Draft } from "@/lib/api";
import { Layers, Loader2, Plus, X, Check, Eye } from "lucide-react";
import { NavLink } from "react-router-dom";
import PostPreview from "@/components/ai/PostPreview";

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

interface BatchResult {
  draft: Draft;
}

async function downloadImage(url: string, filename: string) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  } catch {
    window.open(url, "_blank");
  }
}

export default function BatchCreate() {
  const [items, setItems] = useState<{ id: string; prompt: string }[]>([
    { id: crypto.randomUUID(), prompt: "" },
  ]);
  const [platforms, setPlatforms] = useState<string[]>([
    "instagram_feed",
    "facebook_feed",
  ]);
  const [numImages, setNumImages] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState<BatchResult[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const addItem = () => {
    setItems((prev) => [...prev, { id: crypto.randomUUID(), prompt: "" }]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, prompt: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, prompt } : i)));
  };

  const togglePlatform = (id: string) => {
    setPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const updateCaption = (draftIdx: number, postIdx: number, caption: string) => {
    setResults((prev) =>
      prev.map((r, ri) => {
        if (ri !== draftIdx) return r;
        const updatedPosts = r.draft.posts.map((p, pi) =>
          pi === postIdx ? { ...p, caption } : p
        );
        const updatedDraft = { ...r.draft, posts: updatedPosts };
        api.saveDraft(updatedDraft);
        return { ...r, draft: updatedDraft };
      })
    );
  };

  const runBatch = async () => {
    const prompts = items.filter((i) => i.prompt.trim()).map((i) => i.prompt.trim());
    if (prompts.length === 0 || platforms.length === 0) return;

    setIsRunning(true);
    setResults([]);
    setErrors([]);
    setTotal(prompts.length);

    try {
      await api.yoloBatchStream(
        prompts,
        platforms,
        numImages,
        // onProgress
        (index, _total, prompt) => {
          setCurrentIdx(index);
          setCurrentPrompt(prompt);
        },
        // onResult — each result appears immediately
        (result) => {
          if (result.error || !result.posts?.length) {
            setErrors((prev) => [
              ...prev,
              `"${result.prompt}": ${result.error || "Ingen respons"}`,
            ]);
            return;
          }

          const draft: Draft = {
            id: crypto.randomUUID(),
            prompt: result.prompt,
            platforms,
            posts: (result.posts || []).map((p) => ({
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
            status: "draft" as const,
            created_at: new Date().toISOString(),
          };
          api.saveDraft(draft);
          setResults((prev) => [...prev, { draft }]);
        },
        // onDone
        () => {
          setIsRunning(false);
          setCurrentIdx(-1);
          setCurrentPrompt("");
        }
      );
    } catch (err) {
      setErrors((prev) => [...prev, (err as Error).message]);
      setIsRunning(false);
    }
  };

  const validCount = items.filter((i) => i.prompt.trim()).length;

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="mb-2 font-condensed text-3xl font-bold uppercase tracking-wider">
        Batch
      </h1>
      <p className="mb-8 text-sm text-[var(--color-muted)]">
        Masseproduser innhold &mdash; skriv fleire idear og generer alt på ein gong
      </p>

      {/* Input form */}
      <div className="mb-8 border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="mb-4 flex flex-col gap-3">
          {items.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-2">
              <span className="w-6 text-center text-sm font-bold text-[var(--color-muted)]">
                {idx + 1}
              </span>
              <input
                value={item.prompt}
                onChange={(e) => updateItem(item.id, e.target.value)}
                placeholder="Beskriv innlegget..."
                className="flex-1 border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50 focus:border-[var(--color-accent)] focus:outline-none"
                disabled={isRunning}
              />
              {items.length > 1 && !isRunning && (
                <button
                  onClick={() => removeItem(item.id)}
                  className="flex h-9 w-9 items-center justify-center text-[var(--color-muted)] hover:text-red-400"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {!isRunning && (
          <button
            onClick={addItem}
            className="flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
          >
            <Plus size={14} /> Legg til fleire
          </button>
        )}

        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold text-[var(--color-muted)]">Plattformer</p>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => togglePlatform(id)}
                disabled={isRunning}
                className={`border px-4 py-2 text-sm font-semibold transition-colors ${
                  platforms.includes(id)
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                    : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-muted)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold text-[var(--color-muted)]">Bilder per post</p>
          <div className="flex gap-2">
            {IMAGE_COUNTS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setNumImages(value)}
                disabled={isRunning}
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
          onClick={runBatch}
          disabled={isRunning || validCount === 0 || platforms.length === 0}
          className="btn mt-6 w-full gap-2 disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Genererer {currentIdx + 1} av {total}: &quot;{currentPrompt}&quot;
            </>
          ) : (
            <>
              <Layers size={18} />
              Generer {validCount} innlegg
            </>
          )}
        </button>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="mb-6 border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          <p className="mb-1 font-semibold">Nokre innlegg feila:</p>
          {errors.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
      )}

      {/* Results appear one by one as they stream in */}
      {results.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-condensed text-lg font-semibold uppercase tracking-wider text-[var(--color-muted)]">
              {results.length} innlegg {isRunning ? "så langt" : "generert"}
            </h2>
            {!isRunning && (
              <span className="flex items-center gap-1 text-sm text-emerald-500">
                <Check size={14} /> Alle lagret som utkast
              </span>
            )}
          </div>

          {results.map((result, ri) => (
            <div
              key={result.draft.id}
              className="mb-10 border-b border-[var(--color-border)] pb-8 last:border-0"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold">
                  {ri + 1}. {result.draft.prompt}
                </h3>
                <NavLink
                  to={`/ai/review/${result.draft.id}`}
                  className="flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
                >
                  <Eye size={12} /> Fullstendig visning
                </NavLink>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {result.draft.posts.map((post, pi) => (
                  <PostPreview
                    key={post.id}
                    platform={post.platform}
                    caption={post.caption}
                    imageUrls={post.image_urls?.length ? post.image_urls : post.image_url ? [post.image_url] : []}
                    onCaptionChange={(val) => updateCaption(ri, pi, val)}
                    onDownload={
                      post.image_url
                        ? () => {
                            const ext = post.image_url.split(".").pop()?.split("?")[0] || "jpg";
                            downloadImage(
                              post.image_url,
                              `${result.draft.prompt.slice(0, 20).replace(/\s+/g, "-")}_${post.platform}.${ext}`
                            );
                          }
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
