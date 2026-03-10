const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("vaagal-token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options?.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || res.statusText);
  }
  return res.json();
}

// --- Types ---

export interface Post {
  id: string;
  platform: string;
  caption: string;
  image_url: string;
  image_filename: string;
  image_urls: string[];
  image_filenames: string[];
  status: "draft" | "review" | "ready" | "published";
  created_at: string;
}

export interface YoloPost {
  platform: string;
  caption: string;
  image_url: string;
  image_filename: string;
  image_urls: string[];
  image_filenames: string[];
}

export interface YoloResponse {
  response: string;
  thread_id: string;
  posts?: YoloPost[];
}

export interface ChatResponse {
  response: string;
  thread_id: string;
  images: string[];
}

export interface ImageFile {
  filename: string;
  folder?: string;
  path: string;
  size: number;
}

export interface Draft {
  id: string;
  prompt: string;
  platforms: string[];
  posts: Post[];
  status: "draft" | "review" | "ready" | "published";
  created_at: string;
}

export interface ScheduledPost {
  post_id: string;
  draft_id: string;
  platform: string;
  caption: string;
  image_url: string;
  image_urls: string[];
  scheduled_date: string; // YYYY-MM-DD
  scheduled_time: string; // HH:mm
  category: string; // release_promo, event_announcement, behind_the_scenes, etc.
  reason: string; // AI's reasoning for this placement
  posted: boolean;
}

export interface Schedule {
  id: string;
  name: string;
  strategy_notes: string; // AI's overall strategy summary
  posts: ScheduledPost[];
  created_at: string;
}

// --- API calls ---

export const api = {
  // Content generation
  yolo: (prompt: string, platforms: string[], numImages: number = 1) =>
    request<YoloResponse>("/api/yolo", {
      method: "POST",
      body: JSON.stringify({ prompt, platforms, num_images: numImages }),
    }),

  yoloBatchStream: (
    prompts: string[],
    platforms: string[],
    numImages: number,
    onProgress: (index: number, total: number, prompt: string) => void,
    onResult: (result: {
      prompt: string;
      response: string | null;
      posts?: YoloPost[];
      thread_id: string;
      error: string | null;
    }) => void,
    onDone: () => void
  ) => {
    return fetch(`${API_BASE}/api/yolo/batch`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify({ prompts, platforms, num_images: numImages }),
    }).then(async (res) => {
      if (!res.ok) throw new Error(await res.text());
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No stream");
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // NDJSON: each line is a complete JSON object
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const data = JSON.parse(line);
            if (data.type === "progress") {
              onProgress(data.index, data.total, data.prompt);
            } else if (data.type === "result") {
              onResult(data);
            } else if (data.type === "done") {
              onDone();
              return;
            }
          } catch {
            // Skip malformed lines
          }
        }
      }

      onDone();
    });
  },

  chat: (message: string, threadId?: string) =>
    request<ChatResponse>("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message, thread_id: threadId }),
    }),

  // Images
  getLibrary: () => request<ImageFile[]>("/api/images/library"),
  getProcessed: () => request<ImageFile[]>("/api/images/processed"),
  uploadImage: (file: File, folder?: string) => {
    const form = new FormData();
    form.append("file", file);
    if (folder) form.append("folder", folder);
    return fetch(`${API_BASE}/api/images/upload`, { method: "POST", body: form, headers: getAuthHeaders() }).then(
      (r) => r.json()
    );
  },
  filterImage: (image_filename: string, platform: string) =>
    request("/api/images/filter", {
      method: "POST",
      body: JSON.stringify({ image_filename, platform }),
    }),
  textOverlay: (image_filename: string, text: string, platform: string, position?: string) =>
    request("/api/images/text-overlay", {
      method: "POST",
      body: JSON.stringify({ image_filename, text, platform, position }),
    }),
  publishImages: () => request("/api/images/publish", { method: "POST" }),
  indexImages: () => request("/api/images/index", { method: "POST" }),
  swapImage: (imageKey: string, platform: string, textOverlay?: string) =>
    request<{ image_url: string; image_filename: string }>("/api/images/swap", {
      method: "POST",
      body: JSON.stringify({ image_key: imageKey, platform, text_overlay: textOverlay }),
    }),
  searchImages: (query: string, platform?: string, numResults?: number) =>
    request<{ result: string }>(`/api/images/search?query=${encodeURIComponent(query)}${platform ? `&platform=${platform}` : ""}${numResults ? `&num_results=${numResults}` : ""}`),

  // Drive
  syncDrive: () => request("/api/drive/sync", { method: "POST" }),
  listDrive: () => request("/api/drive/list"),

  // RAG
  searchLyrics: (query: string) => request(`/api/lyrics/search?query=${encodeURIComponent(query)}`),
  searchPosts: (query: string) => request(`/api/posts/search?query=${encodeURIComponent(query)}`),
  searchKnowledge: (query: string) =>
    request(`/api/knowledge/search?query=${encodeURIComponent(query)}`),

  // Health
  health: () => request<{ status: string }>("/api/health"),

  // Drafts (local storage based for now)
  getDrafts: (): Draft[] => {
    const raw = localStorage.getItem("vaagal-drafts");
    return raw ? JSON.parse(raw) : [];
  },
  saveDraft: (draft: Draft) => {
    const drafts = api.getDrafts();
    const idx = drafts.findIndex((d) => d.id === draft.id);
    if (idx >= 0) drafts[idx] = draft;
    else drafts.unshift(draft);
    localStorage.setItem("vaagal-drafts", JSON.stringify(drafts));
    return draft;
  },
  deleteDraft: (id: string) => {
    const drafts = api.getDrafts().filter((d) => d.id !== id);
    localStorage.setItem("vaagal-drafts", JSON.stringify(drafts));
  },

  // Direct publish (from calendar)
  publishDirect: (caption: string, platform: string, imageUrls: string[], scheduledPublishTime: string = "now") =>
    request<{status: string; meta_post_id: string | null; url: string | null; error: string | null}>("/api/publish/direct", {
      method: "POST",
      body: JSON.stringify({ caption, platform, image_urls: imageUrls, scheduled_publish_time: scheduledPublishTime }),
    }),

  // Schedule
  planSchedule: (posts: Array<{id: string; draft_id: string; platform: string; caption: string; image_url: string; image_urls: string[]}>, startDate: string, endDate: string) =>
    request<{schedule: Array<{post_id: string; scheduled_date: string; scheduled_time: string; category: string; reason: string}>; strategy_notes: string}>("/api/schedule/plan", {
      method: "POST",
      body: JSON.stringify({ posts, start_date: startDate, end_date: endDate }),
    }),

  // Schedule storage (localStorage like drafts)
  getSchedules: (): Schedule[] => {
    const raw = localStorage.getItem("vaagal-schedules");
    return raw ? JSON.parse(raw) : [];
  },
  saveSchedule: (schedule: Schedule) => {
    const schedules = api.getSchedules();
    const idx = schedules.findIndex((s) => s.id === schedule.id);
    if (idx >= 0) schedules[idx] = schedule;
    else schedules.unshift(schedule);
    localStorage.setItem("vaagal-schedules", JSON.stringify(schedules));
    return schedule;
  },
  deleteSchedule: (id: string) => {
    const schedules = api.getSchedules().filter((s) => s.id !== id);
    localStorage.setItem("vaagal-schedules", JSON.stringify(schedules));
  },

  // Style learning (passive — saves corrections when users edit captions)
  saveStyleCorrection: (original: string, edited: string, platform: string = "", contentType: string = "") =>
    request("/api/style/correction", {
      method: "POST",
      body: JSON.stringify({ original, edited, platform, content_type: contentType }),
    }),
  getStyleStats: () => request<{ result: string }>("/api/style/stats"),
  summarizeStylePatterns: () => request<{ result: string }>("/api/style/summarize", { method: "POST" }),

  // Auth
  login: (email: string, password: string) =>
    request<{ token: string; email: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  authMe: () =>
    request<{ email: string }>("/api/auth/me"),
};
