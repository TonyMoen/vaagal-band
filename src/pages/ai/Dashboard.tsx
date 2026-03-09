import { NavLink } from "react-router-dom";
import { Zap, Layers, MessageSquare, Image, CloudOff, Cloud } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const quickActions = [
  {
    to: "/ai/create",
    label: "YOLO Mode",
    description: "Ein prompt, full pakke",
    icon: Zap,
    color: "bg-[var(--color-accent)]",
  },
  {
    to: "/ai/batch",
    label: "Batch",
    description: "Masseproduser innhold",
    icon: Layers,
    color: "bg-emerald-600",
  },
  {
    to: "/ai/chat",
    label: "Chat",
    description: "Steg-for-steg med AI",
    icon: MessageSquare,
    color: "bg-blue-600",
  },
  {
    to: "/ai/library",
    label: "Bildebibliotek",
    description: "Administrer bilder",
    icon: Image,
    color: "bg-purple-600",
  },
];

export default function Dashboard() {
  const health = useQuery({
    queryKey: ["health"],
    queryFn: api.health,
    retry: false,
    refetchInterval: 30_000,
  });

  const drafts = api.getDrafts();
  const recentDrafts = drafts.slice(0, 5);

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-condensed text-3xl font-bold uppercase tracking-wider">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Lag innhold for Vågal sine sosiale medier
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {health.isSuccess ? (
            <>
              <Cloud size={16} className="text-emerald-500" />
              <span className="text-emerald-500">Backend tilkoblet</span>
            </>
          ) : (
            <>
              <CloudOff size={16} className="text-red-400" />
              <span className="text-red-400">Backend frakoblet</span>
            </>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <section className="mb-10">
        <h2 className="mb-4 font-condensed text-lg font-semibold uppercase tracking-wider text-[var(--color-muted)]">
          Lag innhold
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map(({ to, label, description, icon: Icon, color }) => (
            <NavLink
              key={to}
              to={to}
              className="group flex flex-col gap-3 border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-accent)]/40"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center ${color} text-white`}
              >
                <Icon size={20} />
              </div>
              <div>
                <p className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
                  {label}
                </p>
                <p className="text-sm text-[var(--color-muted)]">{description}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Recent drafts */}
      <section>
        <h2 className="mb-4 font-condensed text-lg font-semibold uppercase tracking-wider text-[var(--color-muted)]">
          Nylige utkast
        </h2>
        {recentDrafts.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-[var(--color-border)] py-16 text-center">
            <p className="text-[var(--color-muted)]">Ingen utkast ennå</p>
            <NavLink
              to="/ai/create"
              className="mt-3 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
            >
              Lag ditt første innlegg
            </NavLink>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {recentDrafts.map((draft) => (
              <NavLink
                key={draft.id}
                to={`/ai/review/${draft.id}`}
                className="flex items-center justify-between border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 transition-colors hover:border-[var(--color-accent)]/30"
              >
                <div>
                  <p className="font-semibold">{draft.prompt}</p>
                  <p className="text-sm text-[var(--color-muted)]">
                    {draft.platforms.join(", ")} &middot;{" "}
                    {new Date(draft.created_at).toLocaleDateString("nb-NO")}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    draft.status === "published"
                      ? "text-emerald-500"
                      : draft.status === "ready"
                        ? "text-blue-400"
                        : "text-[var(--color-muted)]"
                  }`}
                >
                  {draft.status}
                </span>
              </NavLink>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
