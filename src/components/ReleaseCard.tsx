import { Link } from "react-router-dom"
import { imageSrcSet, imageUrl } from "@/lib/sanity/image"
import { artistNames, formatDato, isUpcoming, songPath, typeLabel, yearOf } from "@/lib/songs"
import { cn } from "@/lib/utils"
import type { Release } from "@/types/sanity"

type Props = {
  release: Release
  /** How wide the tile is drawn, for the browser's image choice (the `sizes` attribute) */
  sizes?: string
  className?: string
}

/**
 * ReleaseCard: cover, title and year as one link to the song page, where every
 * streaming service is listed. One big target instead of a row of small chips,
 * and compact enough for two columns on a phone.
 */
export default function ReleaseCard({
  release,
  sizes = "(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw",
  className,
}: Props) {
  const upcoming = isUpcoming(release)
  const artists = artistNames(release)

  return (
    <Link
      to={songPath(release)}
      aria-label={`${release.title}: alle strømmetjenester`}
      className={cn(
        "group block min-w-0 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
        className
      )}
    >
      <div className="aspect-square overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
        {release.coverImage?.asset && (
          <img
            src={imageUrl(release.coverImage, 420, { ratio: 1 })}
            srcSet={imageSrcSet(release.coverImage, [200, 320, 420, 640], { ratio: 1 })}
            sizes={sizes}
            alt=""
            width={420}
            height={420}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
          />
        )}
      </div>
      <h3 className="mt-2 text-[15.5px] font-semibold leading-tight text-[var(--color-text)] transition-colors [overflow-wrap:anywhere] group-hover:text-[var(--color-accent-hover)] md:text-base">
        {release.title}
      </h3>
      <p
        className={cn(
          "mt-0.5 text-[13.5px] leading-snug",
          upcoming ? "font-semibold text-[var(--color-accent-hover)]" : "text-[var(--color-muted)]"
        )}
      >
        {upcoming
          ? `Kommer ${formatDato(release.releaseDate)}`
          : `${artists.length > 1 ? artists.join(", ") : typeLabel(release)} · ${yearOf(release)}`}
      </p>
    </Link>
  )
}
