import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { api, type Draft } from "@/lib/api";
import PostPreview from "@/components/ai/PostPreview";
import ImagePickerModal from "@/components/ai/ImagePickerModal";
import {
  ArrowLeft,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  Send,
} from "lucide-react";

const STATUS_OPTIONS: {
  value: Draft["status"];
  label: string;
  icon: typeof Clock;
  color: string;
}[] = [
  { value: "draft", label: "Utkast", icon: Clock, color: "text-[var(--color-muted)]" },
  { value: "review", label: "Gjennomgang", icon: Clock, color: "text-yellow-400" },
  { value: "ready", label: "Klar", icon: CheckCircle, color: "text-blue-400" },
  { value: "published", label: "Publisert", icon: Send, color: "text-emerald-500" },
];

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

export default function DraftDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [swapTarget, setSwapTarget] = useState<{ postId: string; imageIndex: number } | null>(null);
  const [swapError, setSwapError] = useState("");
  const [applyFilter, setApplyFilter] = useState(true);

  useEffect(() => {
    const drafts = api.getDrafts();
    const found = drafts.find((d) => d.id === id);
    setDraft(found || null);
  }, [id]);

  if (!draft) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <p className="mb-4 text-[var(--color-muted)]">Utkast ikkje funne</p>
        <NavLink
          to="/ai/review"
          className="text-sm font-semibold text-[var(--color-accent)]"
        >
          Tilbake til oversikt
        </NavLink>
      </div>
    );
  }

  const saveDraft = (updated: Draft) => {
    api.saveDraft(updated);
    setDraft({ ...updated });
  };

  const updatePostCaption = (postId: string, caption: string) => {
    const post = draft.posts.find((p) => p.id === postId);
    if (!post) return;

    // Style learning: save the correction silently (fire and forget)
    const originalCaption = post.caption;
    if (originalCaption.trim() !== caption.trim()) {
      api.saveStyleCorrection(originalCaption, caption, post.platform).catch(() => {
        // Silent — don't disrupt the user if backend is down
      });
    }

    const updated = {
      ...draft,
      posts: draft.posts.map((p) =>
        p.id === postId ? { ...p, caption } : p
      ),
    };
    saveDraft(updated);
  };

  const updateStatus = (status: Draft["status"]) => {
    saveDraft({ ...draft, status });
  };

  const handleDelete = () => {
    api.deleteDraft(draft.id);
    navigate("/ai/review");
  };

  const handleSwapImage = async (imageKey: string) => {
    if (!swapTarget) return;
    const post = draft.posts.find((p) => p.id === swapTarget.postId);
    if (!post) return;

    setSwapError("");

    try {
      const result = await api.swapImage(imageKey, post.platform, undefined, applyFilter);
      if (!result.image_url) {
        setSwapError("Kunne ikkje prosessere bildet. Prøv å køyre 'Index bilder' fyrst.");
        return;
      }

      const newUrls = [...(post.image_urls || [])];
      const newFilenames = [...(post.image_filenames || [])];

      if (swapTarget.imageIndex < newUrls.length) {
        newUrls[swapTarget.imageIndex] = result.image_url;
        newFilenames[swapTarget.imageIndex] = result.image_filename;
      } else {
        newUrls.push(result.image_url);
        newFilenames.push(result.image_filename);
      }

      const updated = {
        ...draft,
        posts: draft.posts.map((p) =>
          p.id === swapTarget.postId
            ? {
                ...p,
                image_urls: newUrls,
                image_filenames: newFilenames,
                image_url: newUrls[0] || "",
                image_filename: newFilenames[0] || "",
              }
            : p
        ),
      };
      saveDraft(updated);
      setSwapTarget(null);
    } catch (err) {
      setSwapError(`Feil ved bytte av bilde: ${(err as Error).message}`);
    }
  };

  const handleDownloadAll = async () => {
    for (const post of draft.posts) {
      const urls = post.image_urls?.length ? post.image_urls : post.image_url ? [post.image_url] : [];
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        if (!url) continue;
        const ext = url.split(".").pop()?.split("?")[0] || "jpg";
        const suffix = urls.length > 1 ? `_${i + 1}` : "";
        const filename = `${draft.prompt.slice(0, 30).replace(/\s+/g, "-")}_${post.platform}${suffix}.${ext}`;
        await downloadImage(url, filename);
        await new Promise((r) => setTimeout(r, 300));
      }
    }
  };

  const _currentStatus = STATUS_OPTIONS.find((s) => s.value === draft.status) || STATUS_OPTIONS[0];
  void _currentStatus;

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <NavLink
          to="/ai/review"
          className="mb-3 inline-flex items-center gap-1 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)]"
        >
          <ArrowLeft size={14} /> Tilbake
        </NavLink>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-condensed text-2xl font-bold uppercase tracking-wider">
              {draft.prompt}
            </h1>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {new Date(draft.created_at).toLocaleDateString("nb-NO", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Status + Actions bar */}
      <div className="mb-8 flex flex-wrap items-center gap-3 border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3">
        <span className="mr-2 text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">
          Status:
        </span>
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => updateStatus(opt.value)}
            className={`flex items-center gap-1 border px-3 py-1.5 text-xs font-semibold transition-colors ${
              draft.status === opt.value
                ? `border-current ${opt.color}`
                : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            <opt.icon size={12} />
            {opt.label}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[var(--color-muted)]">
            <button
              onClick={() => setApplyFilter(!applyFilter)}
              className={`relative h-5 w-9 rounded-full transition-colors ${
                applyFilter ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                  applyFilter ? "left-[18px]" : "left-0.5"
                }`}
              />
            </button>
            Filter
          </label>
          <button
            onClick={handleDownloadAll}
            className="flex items-center gap-1 border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <Download size={12} /> Last ned alle bilder
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] hover:border-red-400 hover:text-red-400"
          >
            <Trash2 size={12} /> Slett
          </button>
        </div>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {draft.posts.map((post) => {
          const imageUrls = post.image_urls?.length
            ? post.image_urls
            : post.image_url
              ? [post.image_url]
              : [];

          return (
            <div key={post.id} className="flex flex-col">
              <PostPreview
                platform={post.platform}
                caption={post.caption}
                imageUrls={imageUrls}
                onCaptionChange={(val) => updatePostCaption(post.id, val)}
                onSwapImage={(imageIndex) =>
                  setSwapTarget({ postId: post.id, imageIndex })
                }
                onDownload={
                  imageUrls.length > 0
                    ? () => {
                        imageUrls.forEach((url, i) => {
                          const ext = url.split(".").pop()?.split("?")[0] || "jpg";
                          const suffix = imageUrls.length > 1 ? `_${i + 1}` : "";
                          const filename = `${draft.prompt.slice(0, 30).replace(/\s+/g, "-")}_${post.platform}${suffix}.${ext}`;
                          downloadImage(url, filename);
                        });
                      }
                    : undefined
                }
              />
            </div>
          );
        })}
      </div>

      {/* Image picker modal */}
      {swapTarget && (
        <ImagePickerModal
          platform={
            draft.posts.find((p) => p.id === swapTarget.postId)?.platform ||
            "instagram_feed"
          }
          error={swapError}
          onSelect={handleSwapImage}
          onClose={() => { setSwapTarget(null); setSwapError(""); }}
        />
      )}
    </div>
  );
}
