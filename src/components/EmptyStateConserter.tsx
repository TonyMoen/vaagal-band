import { Instagram, Facebook, Music } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateConserterProps {
  className?: string
}

/**
 * Empty state component for the Konserter (Concerts) page
 * Displays a friendly Norwegian message when no upcoming concerts are available
 */
export function EmptyStateConserter({ className }: EmptyStateConserterProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-6 rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center',
        className
      )}
      role="region"
      aria-label="Ingen kommende konserter"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-[var(--color-text)]">
          Ingen kommende konserter akkurat nå
        </h2>
        <p className="text-[var(--color-muted)]">
          Følg oss for oppdateringer
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="https://www.instagram.com/vaagal_band/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-none border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)]"
          aria-label="Følg oss på Instagram (åpnes i ny fane)"
        >
          <Instagram className="h-4 w-4" aria-hidden="true" />
          Instagram
        </a>
        <a
          href="https://www.facebook.com/vaagal.band.no/?locale=nb_NO"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-none border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)]"
          aria-label="Følg oss på Facebook (åpnes i ny fane)"
        >
          <Facebook className="h-4 w-4" aria-hidden="true" />
          Facebook
        </a>
        <a
          href="https://open.spotify.com/artist/5M9ZQMR3vvDdLgv1D43MO9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-none border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)]"
          aria-label="Lytt til oss på Spotify (åpnes i ny fane)"
        >
          <Music className="h-4 w-4" aria-hidden="true" />
          Spotify
        </a>
      </div>
    </div>
  )
}
