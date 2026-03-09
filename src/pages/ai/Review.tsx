import { useState } from "react";
import { NavLink } from "react-router-dom";
import { api } from "@/lib/api";
import { Trash2, Eye, FileText } from "lucide-react";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: "Utkast", color: "text-[var(--color-muted)]" },
  review: { label: "Under gjennomgang", color: "text-yellow-400" },
  ready: { label: "Klar", color: "text-blue-400" },
  published: { label: "Publisert", color: "text-emerald-500" },
};

const PLATFORM_LABELS: Record<string, string> = {
  tiktok: "TikTok",
  instagram_feed: "IG Feed",
  instagram_story: "IG Story",
  facebook_feed: "FB Feed",
  facebook_story: "FB Story",
};

export default function Review() {
  const [drafts, setDrafts] = useState(() => api.getDrafts());
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all" ? drafts : drafts.filter((d) => d.status === filter);

  const handleDelete = (id: string) => {
    api.deleteDraft(id);
    setDrafts(api.getDrafts());
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-condensed text-3xl font-bold uppercase tracking-wider">
            Innhald
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {drafts.length} utkast totalt
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex gap-1 border-b border-[var(--color-border)]">
        {[
          { id: "all", label: "Alle" },
          { id: "draft", label: "Utkast" },
          { id: "review", label: "Gjennomgang" },
          { id: "ready", label: "Klare" },
          { id: "published", label: "Publiserte" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
              filter === tab.id
                ? "border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Draft list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-[var(--color-border)] py-20 text-center">
          <FileText size={32} className="mb-3 text-[var(--color-muted)]" />
          <p className="text-[var(--color-muted)]">Ingen innhald her</p>
          <NavLink
            to="/ai/create"
            className="mt-3 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
          >
            Lag nytt innhald
          </NavLink>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((draft) => {
            const status = STATUS_LABELS[draft.status] || STATUS_LABELS.draft;
            const imageCount = draft.posts.filter((p) => p.image_url).length;

            return (
              <div
                key={draft.id}
                className="flex items-center gap-4 border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 transition-colors hover:border-[var(--color-accent)]/30"
              >
                {/* Thumbnail */}
                <div className="hidden h-16 w-16 shrink-0 overflow-hidden bg-[var(--color-bg)] sm:block">
                  {draft.posts[0]?.image_url ? (
                    <img
                      src={draft.posts[0].image_url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[var(--color-muted)]">
                      <FileText size={20} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="truncate font-semibold">{draft.prompt}</p>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-[var(--color-muted)]">
                    {draft.platforms.map((p) => (
                      <span key={p}>{PLATFORM_LABELS[p] || p}</span>
                    ))}
                    <span>&middot;</span>
                    <span>{imageCount} bilder</span>
                    <span>&middot;</span>
                    <span>
                      {new Date(draft.created_at).toLocaleDateString("nb-NO", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`hidden text-xs font-bold uppercase tracking-widest sm:block ${status.color}`}
                >
                  {status.label}
                </span>

                {/* Actions */}
                <div className="flex gap-1">
                  <NavLink
                    to={`/ai/review/${draft.id}`}
                    className="flex h-9 w-9 items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                    title="Vis"
                  >
                    <Eye size={16} />
                  </NavLink>
                  <button
                    onClick={() => handleDelete(draft.id)}
                    className="flex h-9 w-9 items-center justify-center text-[var(--color-muted)] hover:text-red-400"
                    title="Slett"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
