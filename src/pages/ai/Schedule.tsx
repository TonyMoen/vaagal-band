import { useState, useMemo } from "react";
import { api, type Schedule as ScheduleType, type ScheduledPost } from "@/lib/api";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Copy,
  Check,
  CalendarDays,
  Trash2,
  Loader2,
  Download,
  Send,
} from "lucide-react";

const MONTH_NAMES = [
  "Januar", "Februar", "Mars", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Desember",
];

const DAY_HEADERS = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];

const PLATFORM_STRIPE: Record<string, string> = {
  instagram_feed: "border-l-pink-500",
  instagram_story: "border-l-pink-400",
  facebook_feed: "border-l-blue-500",
  facebook_story: "border-l-blue-400",
  tiktok: "border-l-slate-500",
};

const PLATFORM_DOT: Record<string, string> = {
  instagram_feed: "bg-pink-500",
  instagram_story: "bg-pink-400",
  facebook_feed: "bg-blue-500",
  facebook_story: "bg-blue-400",
  tiktok: "bg-slate-500",
};

const PLATFORM_BADGE: Record<string, { bg: string; label: string }> = {
  instagram_feed: { bg: "bg-pink-500", label: "Instagram" },
  instagram_story: { bg: "bg-pink-400", label: "IG Story" },
  facebook_feed: { bg: "bg-blue-500", label: "Facebook" },
  facebook_story: { bg: "bg-blue-400", label: "FB Story" },
  tiktok: { bg: "bg-slate-600", label: "TikTok" },
};

const PLATFORM_SHORT: Record<string, string> = {
  instagram_feed: "IG",
  instagram_story: "IG",
  facebook_feed: "FB",
  facebook_story: "FB",
  tiktok: "TT",
};

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  release_promo: { label: "Lansering", color: "text-amber-400" },
  event_announcement: { label: "Event", color: "text-purple-400" },
  behind_the_scenes: { label: "BTS", color: "text-teal-400" },
  gig_recap: { label: "Oppsummering", color: "text-orange-400" },
  engagement: { label: "Engasjement", color: "text-cyan-400" },
  general: { label: "Generelt", color: "text-[var(--color-muted)]" },
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function toDateStr(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const days: Array<{ date: Date; dateStr: string; inMonth: boolean }> = [];

  for (let i = startOffset - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({ date: d, dateStr: toDateStr(d), inMonth: false });
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(year, month, i);
    days.push({ date: d, dateStr: toDateStr(d), inMonth: true });
  }

  while (days.length < 42) {
    const d = new Date(year, month + 1, days.length - lastDay.getDate() - startOffset + 1);
    days.push({ date: d, dateStr: toDateStr(d), inMonth: false });
  }

  return days;
}

export default function Schedule() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [schedules, setSchedules] = useState<ScheduleType[]>(() => api.getSchedules());
  const [activeScheduleId, setActiveScheduleId] = useState<string>(schedules[0]?.id || "");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [publishingAll, setPublishingAll] = useState(false);

  const activeSchedule = schedules.find((s) => s.id === activeScheduleId) || null;

  const calendarDays = useMemo(
    () => getCalendarDays(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const postsByDate = useMemo(() => {
    const map: Record<string, ScheduledPost[]> = {};
    if (!activeSchedule) return map;
    for (const post of activeSchedule.posts) {
      if (!map[post.scheduled_date]) map[post.scheduled_date] = [];
      map[post.scheduled_date].push(post);
    }
    // Sort each day's posts by time
    for (const key of Object.keys(map)) {
      map[key].sort((a, b) => a.scheduled_time.localeCompare(b.scheduled_time));
    }
    return map;
  }, [activeSchedule]);

  const selectedPosts = selectedDate ? postsByDate[selectedDate] || [] : [];

  // Stats
  const stats = useMemo(() => {
    if (!activeSchedule) return { total: 0, posted: 0, ig: 0, fb: 0 };
    const posts = activeSchedule.posts;
    return {
      total: posts.length,
      posted: posts.filter((p) => p.posted).length,
      ig: posts.filter((p) => p.platform.startsWith("instagram")).length,
      fb: posts.filter((p) => p.platform.startsWith("facebook")).length,
    };
  }, [activeSchedule]);

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }

  function togglePosted(postId: string) {
    if (!activeSchedule) return;
    const updated: ScheduleType = {
      ...activeSchedule,
      posts: activeSchedule.posts.map((p) =>
        p.post_id === postId ? { ...p, posted: !p.posted } : p
      ),
    };
    api.saveSchedule(updated);
    setSchedules(api.getSchedules());
  }

  function copyCaption(text: string, postId: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(postId);
    setTimeout(() => setCopiedId(null), 1500);
  }

  async function publishPost(post: ScheduledPost) {
    if (post.posted) return;
    setPublishingId(post.post_id);
    try {
      const scheduledTime = `${post.scheduled_date}T${post.scheduled_time}:00`;
      const isNow = new Date(scheduledTime) <= new Date();
      const result = await api.publishDirect(
        post.caption,
        post.platform,
        post.image_urls?.length ? post.image_urls : post.image_url ? [post.image_url] : [],
        isNow ? "now" : scheduledTime,
      );
      if (result.status === "success" || result.status === "scheduled") {
        togglePosted(post.post_id);
      } else {
        alert(`Publisering feila: ${result.error || "Ukjent feil"}`);
      }
    } catch (e: any) {
      alert(`Publisering feila: ${e.message || "Nettverksfeil"}`);
    } finally {
      setPublishingId(null);
    }
  }

  async function publishAllUnposted() {
    if (!activeSchedule) return;
    const unposted = activeSchedule.posts.filter(
      (p) => !p.posted && p.platform.startsWith("facebook")
    );
    if (unposted.length === 0) return;
    if (!confirm(`Publiser ${unposted.length} Facebook-innlegg?`)) return;
    setPublishingAll(true);
    for (const post of unposted) {
      await publishPost(post);
    }
    setPublishingAll(false);
  }

  function handleDeleteSchedule(id: string) {
    api.deleteSchedule(id);
    const updated = api.getSchedules();
    setSchedules(updated);
    setActiveScheduleId(updated[0]?.id || "");
    setSelectedDate(null);
  }

  function handleScheduleCreated(schedule: ScheduleType) {
    api.saveSchedule(schedule);
    const updated = api.getSchedules();
    setSchedules(updated);
    setActiveScheduleId(schedule.id);
    setShowCreateModal(false);
  }

  const todayStr = toDateStr(today);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-condensed text-3xl font-bold uppercase tracking-wider">
            Kalender
          </h1>
          {activeSchedule && (
            <>
              <div className="mt-2 flex items-center gap-4 text-xs text-[var(--color-muted)]">
                <span>{stats.total} innlegg</span>
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 bg-pink-500" />
                  {stats.ig} IG
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 bg-blue-500" />
                  {stats.fb} FB
                </span>
                <span className="text-emerald-500">
                  {stats.posted}/{stats.total} posta
                </span>
              </div>
              {activeSchedule.strategy_notes && (
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[var(--color-muted)] italic">
                  {activeSchedule.strategy_notes}
                </p>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          {schedules.length > 0 && (
            <select
              value={activeScheduleId}
              onChange={(e) => {
                setActiveScheduleId(e.target.value);
                setSelectedDate(null);
              }}
              className="border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none"
            >
              {schedules.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          )}
          {activeSchedule && (
            <button
              onClick={() => handleDeleteSchedule(activeSchedule.id)}
              className="flex h-9 w-9 items-center justify-center border border-[var(--color-border)] text-[var(--color-muted)] hover:border-red-400 hover:text-red-400"
              title="Slett plan"
            >
              <Trash2 size={16} />
            </button>
          )}
          {activeSchedule && activeSchedule.posts.some((p) => !p.posted && p.platform.startsWith("facebook")) && (
            <button
              onClick={publishAllUnposted}
              disabled={publishingAll}
              className="flex items-center gap-2 border border-blue-500 px-4 py-2 text-sm font-bold uppercase tracking-wider text-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-40"
            >
              {publishingAll ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              Publiser alle FB
            </button>
          )}
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-[var(--color-accent)] px-4 py-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-[var(--color-accent-hover)]"
          >
            <Plus size={16} />
            Ny plan
          </button>
        </div>
      </div>

      {/* Month navigation */}
      <div className="mb-4 flex items-center justify-center gap-6">
        <button
          onClick={prevMonth}
          className="flex h-9 w-9 items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)]"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="font-condensed text-xl font-bold uppercase tracking-wider min-w-[200px] text-center">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={nextMonth}
          className="flex h-9 w-9 items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)]"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
        {/* Calendar grid */}
        <div className="flex-1 min-w-0">
          {/* Day headers */}
          <div className="grid grid-cols-7">
            {DAY_HEADERS.map((d, i) => (
              <div
                key={d}
                className={`border border-[var(--color-border)] px-3 py-2.5 text-center text-xs font-bold uppercase tracking-widest ${
                  i >= 5
                    ? "bg-[var(--color-surface)] text-[var(--color-muted)]"
                    : "bg-[var(--color-surface)] text-[var(--color-muted)]"
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells — 6 rows */}
          <div className="grid grid-cols-7">
            {calendarDays.map(({ dateStr, date, inMonth }, i) => {
              const dayPosts = postsByDate[dateStr] || [];
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selectedDate;
              const dayOfWeek = i % 7;
              const isWeekend = dayOfWeek >= 5;

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(dateStr === selectedDate ? null : dateStr)}
                  className={`relative flex min-h-[100px] flex-col border border-t-0 border-[var(--color-border)] p-2 text-left transition-colors ${
                    isSelected
                      ? "bg-[var(--color-accent)]/5 ring-2 ring-inset ring-[var(--color-accent)]"
                      : isWeekend
                        ? "bg-[var(--color-surface)]/30 hover:bg-[var(--color-surface)]"
                        : "hover:bg-[var(--color-surface)]/50"
                  } ${!inMonth ? "opacity-25" : ""}`}
                >
                  {/* Date number */}
                  <span
                    className={`mb-1.5 flex h-7 w-7 items-center justify-center text-xs font-bold ${
                      isToday
                        ? "bg-[var(--color-accent)] text-white"
                        : isWeekend
                          ? "text-[var(--color-muted)]"
                          : "text-[var(--color-text)]"
                    }`}
                  >
                    {date.getDate()}
                  </span>

                  {/* Post pills with color-coded left stripe */}
                  <div className="flex flex-col gap-1 w-full">
                    {dayPosts.slice(0, 4).map((post) => {
                      const cat = CATEGORY_LABELS[post.category];
                      return (
                        <div
                          key={post.post_id}
                          className={`flex items-center gap-1.5 border-l-[3px] bg-[var(--color-surface)] px-1.5 py-0.5 ${
                            PLATFORM_STRIPE[post.platform] || "border-l-slate-400"
                          } ${post.posted ? "opacity-40 line-through" : ""}`}
                        >
                          <span className="text-[10px] font-bold text-[var(--color-text)]">
                            {PLATFORM_SHORT[post.platform] || "?"}
                          </span>
                          <span className="text-[10px] text-[var(--color-muted)]">
                            {post.scheduled_time}
                          </span>
                          {cat && (
                            <span className={`hidden sm:inline text-[9px] font-semibold ${cat.color}`}>
                              {cat.label}
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {dayPosts.length > 4 && (
                      <span className="text-[10px] text-[var(--color-muted)] pl-1">
                        +{dayPosts.length - 4} til
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-3 flex items-center gap-5 px-1 text-[11px] text-[var(--color-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-0.5 bg-pink-500" /> Instagram
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-0.5 bg-blue-500" /> Facebook
            </span>
          </div>
        </div>

        {/* Day detail sidebar */}
        <div className="w-full xl:w-96 shrink-0">
          {selectedDate ? (
            <div className="border border-[var(--color-border)] bg-[var(--color-surface)] sticky top-8">
              <div className="border-b border-[var(--color-border)] px-5 py-4">
                <h3 className="font-condensed text-lg font-bold uppercase tracking-wider">
                  {new Date(selectedDate + "T12:00:00").toLocaleDateString("nb-NO", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </h3>
                <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                  {selectedPosts.length} innlegg planlagt
                </p>
              </div>

              {selectedPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CalendarDays size={28} className="mb-2 text-[var(--color-muted)]" />
                  <p className="text-sm text-[var(--color-muted)]">Ingen innlegg denne dagen</p>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-[var(--color-border)]">
                  {selectedPosts.map((post) => {
                    const badge = PLATFORM_BADGE[post.platform] || { bg: "bg-slate-500", label: post.platform };

                    return (
                      <div key={post.post_id} className="p-5">
                        {/* Platform badge + category + time + posted toggle */}
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${badge.bg}`}
                            >
                              {badge.label}
                            </span>
                            {post.category && CATEGORY_LABELS[post.category] && (
                              <span className={`text-[10px] font-bold uppercase tracking-wider ${CATEGORY_LABELS[post.category].color}`}>
                                {CATEGORY_LABELS[post.category].label}
                              </span>
                            )}
                            <span className="text-sm font-semibold text-[var(--color-text)]">
                              {post.scheduled_time}
                            </span>
                          </div>
                          <button
                            onClick={() => togglePosted(post.post_id)}
                            className={`flex items-center gap-1 text-xs font-bold transition-colors ${
                              post.posted
                                ? "text-emerald-500"
                                : "text-[var(--color-muted)] hover:text-emerald-500"
                            }`}
                          >
                            <Check size={14} />
                            {post.posted ? "Posta" : "Marker posta"}
                          </button>
                        </div>

                        {/* AI reasoning */}
                        {post.reason && (
                          <p className="mb-2 text-[11px] italic leading-relaxed text-[var(--color-muted)] border-l-2 border-[var(--color-border)] pl-2">
                            {post.reason}
                          </p>
                        )}

                        {/* Image */}
                        {post.image_url && (
                          <div className="mb-3 overflow-hidden border border-[var(--color-border)]">
                            <img
                              src={post.image_url}
                              alt=""
                              className={`h-40 w-full object-cover ${post.posted ? "opacity-50 grayscale" : ""}`}
                            />
                          </div>
                        )}

                        {/* Caption */}
                        <p className={`mb-3 text-sm leading-relaxed ${post.posted ? "text-[var(--color-muted)] line-through" : "text-[var(--color-text)]"}`}>
                          {post.caption}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          {!post.posted && post.platform.startsWith("facebook") && (
                            <button
                              onClick={() => publishPost(post)}
                              disabled={publishingId === post.post_id}
                              className="flex items-center gap-1.5 border border-blue-500 px-3 py-1.5 text-xs font-bold text-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-40"
                            >
                              {publishingId === post.post_id ? (
                                <><Loader2 size={12} className="animate-spin" /> Publiserer...</>
                              ) : (
                                <><Send size={12} /> Publiser</>
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => copyCaption(post.caption, post.post_id)}
                            className="flex items-center gap-1.5 border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                          >
                            {copiedId === post.post_id ? (
                              <><Check size={12} /> Kopiert</>
                            ) : (
                              <><Copy size={12} /> Kopier tekst</>
                            )}
                          </button>
                          {post.image_url && (
                            <a
                              href={post.image_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                            >
                              <Download size={12} /> Last ned
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border border-dashed border-[var(--color-border)] py-20 text-center sticky top-8">
              <CalendarDays size={32} className="mb-3 text-[var(--color-muted)]" />
              <p className="text-sm text-[var(--color-muted)]">Vel ein dag for å sjå detaljar</p>
            </div>
          )}
        </div>
      </div>

      {/* Create schedule modal */}
      {showCreateModal && (
        <CreateScheduleModal
          onClose={() => setShowCreateModal(false)}
          onCreated={handleScheduleCreated}
        />
      )}
    </div>
  );
}

// --- Create Schedule Modal ---

function CreateScheduleModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (schedule: ScheduleType) => void;
}) {
  const allDrafts = api.getDrafts();
  const readyDrafts = allDrafts.filter((d) => d.status === "ready");

  const [selectedDraftIds, setSelectedDraftIds] = useState<Set<string>>(new Set());
  const [planName, setPlanName] = useState("");
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return toDateStr(d);
  });
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return toDateStr(d);
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPosts = useMemo(() => {
    return readyDrafts
      .filter((d) => selectedDraftIds.has(d.id))
      .reduce((sum, d) => sum + d.posts.length, 0);
  }, [readyDrafts, selectedDraftIds]);

  function toggleDraft(id: string) {
    setSelectedDraftIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAll() {
    if (selectedDraftIds.size === readyDrafts.length) {
      setSelectedDraftIds(new Set());
    } else {
      setSelectedDraftIds(new Set(readyDrafts.map((d) => d.id)));
    }
  }

  async function handleCreate() {
    if (selectedDraftIds.size === 0) return;
    if (!startDate || !endDate) return;

    setLoading(true);
    setError(null);

    const selectedDrafts = readyDrafts.filter((d) => selectedDraftIds.has(d.id));
    const postsForApi = selectedDrafts.flatMap((draft) =>
      draft.posts.map((post) => ({
        id: post.id,
        draft_id: draft.id,
        platform: post.platform,
        caption: post.caption,
        image_url: post.image_url,
        image_urls: post.image_urls || [],
      }))
    );

    try {
      const result = await api.planSchedule(postsForApi, startDate, endDate);

      const scheduledPosts: ScheduledPost[] = result.schedule.map((item: any) => {
        let matchedPost = null;
        let matchedDraftId = "";
        for (const draft of selectedDrafts) {
          const found = draft.posts.find((p) => p.id === item.post_id);
          if (found) {
            matchedPost = found;
            matchedDraftId = draft.id;
            break;
          }
        }

        return {
          post_id: item.post_id,
          draft_id: matchedDraftId,
          platform: matchedPost?.platform || "",
          caption: matchedPost?.caption || "",
          image_url: matchedPost?.image_url || "",
          image_urls: matchedPost?.image_urls || [],
          scheduled_date: item.scheduled_date,
          scheduled_time: item.scheduled_time,
          category: item.category || "general",
          reason: item.reason || "",
          posted: false,
        };
      });

      const schedule: ScheduleType = {
        id: crypto.randomUUID(),
        name: planName || `Plan ${MONTH_NAMES[new Date(startDate).getMonth()]} ${new Date(startDate).getFullYear()}`,
        strategy_notes: (result as any).strategy_notes || "",
        posts: scheduledPosts,
        created_at: new Date().toISOString(),
      };

      onCreated(schedule);
    } catch (err) {
      // Fallback: distribute posts evenly if API fails
      setError("AI-planleggar feila, brukar enkel fordeling i staden.");

      const allPosts = selectedDrafts.flatMap((draft) =>
        draft.posts.map((post) => ({ post, draftId: draft.id }))
      );

      const start = new Date(startDate + "T12:00:00");
      const end = new Date(endDate + "T12:00:00");
      const totalDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);

      // Group by draft to pair IG+FB on same day
      const draftGroups: Record<string, typeof allPosts> = {};
      for (const item of allPosts) {
        if (!draftGroups[item.draftId]) draftGroups[item.draftId] = [];
        draftGroups[item.draftId].push(item);
      }

      const groups = Object.values(draftGroups);
      const interval = Math.max(1, Math.floor(totalDays / groups.length));

      const defaultTimes: Record<string, string> = {
        instagram_feed: "18:00",
        instagram_story: "12:00",
        facebook_feed: "17:00",
        facebook_story: "11:00",
        tiktok: "19:00",
      };

      const scheduledPosts: ScheduledPost[] = [];
      groups.forEach((group, gi) => {
        const postDate = new Date(start);
        postDate.setDate(postDate.getDate() + gi * interval);
        if (postDate > end) postDate.setTime(end.getTime());
        const dateStr = toDateStr(postDate);

        for (const { post, draftId } of group) {
          scheduledPosts.push({
            post_id: post.id,
            draft_id: draftId,
            platform: post.platform,
            caption: post.caption,
            image_url: post.image_url,
            image_urls: post.image_urls || [],
            scheduled_date: dateStr,
            scheduled_time: defaultTimes[post.platform] || "18:00",
            category: "general",
            reason: "",
            posted: false,
          });
        }
      });

      const schedule: ScheduleType = {
        id: crypto.randomUUID(),
        name: planName || `Plan ${MONTH_NAMES[new Date(startDate).getMonth()]} ${new Date(startDate).getFullYear()}`,
        strategy_notes: "",
        posts: scheduledPosts,
        created_at: new Date().toISOString(),
      };

      onCreated(schedule);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col border border-[var(--color-border)] bg-[var(--color-bg)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <h2 className="font-condensed text-xl font-bold uppercase tracking-wider">
            Ny plan
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* Plan name */}
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">
            Namn
          </label>
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="t.d. April-plan"
            className="mb-4 w-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none"
          />

          {/* Date range */}
          <div className="mb-4 flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">
                Frå
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">
                Til
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none"
              />
            </div>
          </div>

          {/* Draft selection */}
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">
              Vel innhald ({readyDrafts.length} klare)
            </label>
            {readyDrafts.length > 0 && (
              <button
                onClick={selectAll}
                className="text-xs font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
              >
                {selectedDraftIds.size === readyDrafts.length ? "Fjern alle" : "Vel alle"}
              </button>
            )}
          </div>

          {readyDrafts.length === 0 ? (
            <div className="border border-dashed border-[var(--color-border)] py-8 text-center">
              <p className="text-sm text-[var(--color-muted)]">
                Ingen utkast med status "Klar"
              </p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">
                Marker utkast som klare i Innhald-sida fyrst
              </p>
            </div>
          ) : (
            <div className="flex max-h-60 flex-col gap-1 overflow-y-auto">
              {readyDrafts.map((draft) => {
                const isSelected = selectedDraftIds.has(draft.id);
                const postCount = draft.posts.length;
                const platforms = [...new Set(draft.posts.map((p) => p.platform))];

                return (
                  <button
                    key={draft.id}
                    onClick={() => toggleDraft(draft.id)}
                    className={`flex items-center gap-3 border px-3 py-2.5 text-left transition-colors ${
                      isSelected
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                        : "border-[var(--color-border)] hover:border-[var(--color-accent)]/30"
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center border text-xs ${
                        isSelected
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                          : "border-[var(--color-border)]"
                      }`}
                    >
                      {isSelected && <Check size={12} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{draft.prompt}</p>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-[var(--color-muted)]">
                        <span>{postCount} innlegg</span>
                        <span>&middot;</span>
                        <div className="flex items-center gap-1.5">
                          {platforms.map((p) => (
                            <span key={p} className="flex items-center gap-0.5">
                              <span className={`inline-block h-1.5 w-1.5 ${PLATFORM_DOT[p] || "bg-slate-400"}`} />
                              {PLATFORM_SHORT[p] || p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {error && (
            <div className="mt-3 border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--color-border)] px-5 py-4">
          <button
            onClick={handleCreate}
            disabled={selectedDraftIds.size === 0 || loading}
            className="w-full bg-[var(--color-accent)] px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-[var(--color-accent-hover)] disabled:opacity-40"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                AI planlegg...
              </span>
            ) : (
              `Planlegg ${totalPosts} innlegg`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
