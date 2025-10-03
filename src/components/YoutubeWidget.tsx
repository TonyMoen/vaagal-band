type Youtube = {
  url: string;
  title: string;
  start: number;
  controls: boolean;
  autoplay: boolean;
};

function getYouTubeId(rawUrl: string): string | null {
  try {
    const u = new URL(rawUrl);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    const v = u.searchParams.get("v");
    if (v) return v;
    const parts = u.pathname.split("/");
    const idx = parts.findIndex((p) => p === "embed" || p === "shorts");
    return idx !== -1 ? parts[idx + 1] : null;
  } catch {
    return null;
  }
}

export default function YouTubeEmbed({
  url,
  title = "YouTube video",
  start = 0,
  controls = true,
  autoplay = false,
}: Youtube) {
  const id = getYouTubeId(url);
  if (!id) return null;

  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    controls: controls ? "1" : "0",
    autoplay: autoplay ? "1" : "0",
    start: String(start),
  });

  const src = `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;

  return (
    <div className="card-surface">
      <div className="relative w-full pb-[56.25%]">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
