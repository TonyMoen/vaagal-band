import { urlFor } from "@/lib/sanity/image"
import type { Release } from "@/types/sanity"
import { cn } from "@/lib/utils"

type Props = {
  release: Release
}

/**
 * ReleaseCard component for displaying music releases
 * Shows cover image, title, release type badge, date, and streaming links
 */
export default function ReleaseCard({ release }: Props) {
  // Format date for Norwegian locale
  const formattedDate = new Date(release.releaseDate).toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Release type badge styling
  const badgeStyles: Record<string, string> = {
    single: "bg-[var(--color-accent)]/20 text-[var(--color-accent)]",
    EP: "bg-blue-500/20 text-blue-400",
    album: "bg-green-500/20 text-green-400",
  }

  return (
    <article className="overflow-hidden rounded-2xl card-surface">
      {/* Cover Image */}
      {release.coverImage && (
        <div className="aspect-square overflow-hidden">
          <img
            src={urlFor(release.coverImage).width(400).height(400).url()}
            alt={`${release.title} cover`}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-5">
        {/* Release Type Badge */}
        {release.releaseType && (
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
              badgeStyles[release.releaseType] || badgeStyles.single
            )}
          >
            {release.releaseType}
          </span>
        )}

        {/* Title */}
        <h2 className="mt-2 text-lg font-semibold text-[var(--color-text)]">
          {release.title}
        </h2>

        {/* Release Date */}
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          {formattedDate}
        </p>

        {/* Streaming Links */}
        <div className="mt-4 flex flex-wrap gap-2">
          {release.spotifyUrl && (
            <a
              href={release.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-[#1DB954]/20 px-3 text-sm font-medium text-[#1DB954] transition-colors hover:bg-[#1DB954]/30"
              aria-label={`Lytt til ${release.title} på Spotify`}
            >
              Spotify
            </a>
          )}
          {release.appleMusicUrl && (
            <a
              href={release.appleMusicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-[#FC3C44]/20 px-3 text-sm font-medium text-[#FC3C44] transition-colors hover:bg-[#FC3C44]/30"
              aria-label={`Lytt til ${release.title} på Apple Music`}
            >
              Apple Music
            </a>
          )}
          {release.youtubeUrl && (
            <a
              href={release.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-[#FF0000]/20 px-3 text-sm font-medium text-[#FF0000] transition-colors hover:bg-[#FF0000]/30"
              aria-label={`Se ${release.title} på YouTube`}
            >
              YouTube
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
