type Spotify = {
  url: string;
  title: string;
  height: number;
  theme: "dark" | "light";
};

export default function SpotifyEmbed({
  url,
  title = "Spotify player",
  height = 352,
  theme = "dark",
}: Spotify) {
  const embedSrc = `https://open.spotify.com/embed${new URL(url).pathname}?utm_source=generator&theme=${
    theme === "dark" ? 0 : 1
  }`;

  return (
    <div className="card-surface">
      <iframe
        title={title}
        loading="lazy"
        src={embedSrc}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
    </div>
  );
}
