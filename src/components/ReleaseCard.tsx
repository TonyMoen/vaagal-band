import { urlFor } from "@/lib/sanity/image"
import type { Release } from "@/types/sanity"

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

  return (
    <article className="overflow-hidden rounded-none card-surface">
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
        {/* Title and Date on same line */}
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">
            {release.title}
          </h2>
          <span className="text-sm text-[var(--color-muted)] whitespace-nowrap">
            {formattedDate}
          </span>
        </div>

        {/* Streaming Links */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {release.spotifyUrl && (
            <a
              href={release.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-none bg-[#1DB954]/20 px-3 text-sm font-medium text-[#1DB954] transition-colors hover:bg-[#1DB954]/30"
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
              className="inline-flex h-9 items-center justify-center rounded-none bg-[#FC3C44]/20 px-3 text-sm font-medium text-[#FC3C44] transition-colors hover:bg-[#FC3C44]/30"
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
              className="inline-flex h-9 items-center justify-center rounded-none bg-[#FF0000]/20 px-3 text-sm font-medium text-[#FF0000] transition-colors hover:bg-[#FF0000]/30"
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
