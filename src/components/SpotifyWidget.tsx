import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { WidgetErrorBoundary } from '@/components/WidgetErrorBoundary'
import { cn } from '@/lib/utils'
import { SPOTIFY_ARTIST_URL } from '@/lib/links'

/**
 * Spotify draws a different player depending on the height it is given.
 * On touch layouts we ask for the 152px compact player: it has nothing to
 * scroll inside, so a thumb that lands on it still scrolls the page. From lg
 * (mouse and room to spare) it becomes the 352px player with the track list.
 */
const RESPONSIVE_HEIGHT = 'h-[152px] lg:h-[352px]'

interface SpotifyEmbedProps {
  url: string
  title?: string
  /** Fixed height in px. Leave out for the responsive compact/full player. */
  height?: number
  theme?: 'dark' | 'light'
  className?: string
}

/**
 * Raw Spotify embed component with loading state
 * Use SpotifyWidget for the wrapped version with error boundary
 */
export function SpotifyEmbed({
  url,
  title = 'Spotify player',
  height,
  theme = 'dark',
  className,
}: SpotifyEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)

  const embedSrc = `https://open.spotify.com/embed${new URL(url).pathname}?utm_source=generator&theme=${
    theme === 'dark' ? 0 : 1
  }`

  return (
    <div
      className={cn('relative w-full', className)}
      role="region"
      aria-label={`Spotify music player: ${title}`}
    >
      {/* Spotify rounds its own corners at 12px, so the frame follows them instead of fighting them */}
      <div
        className={cn(
          'relative overflow-hidden rounded-[12px] bg-[var(--color-surface)]',
          height === undefined && RESPONSIVE_HEIGHT
        )}
        style={height === undefined ? undefined : { height }}
      >
        {isLoading && (
          <Skeleton className="absolute inset-0 rounded-none bg-card" aria-hidden="true" />
        )}
        <iframe
          className="absolute inset-0 h-full w-full"
          title={title}
          loading="lazy"
          src={embedSrc}
          style={{ border: 0, opacity: isLoading ? 0 : 1 }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  )
}

/**
 * Spotify widget with error boundary wrapper
 * This is the recommended component for use in pages
 */
interface SpotifyWidgetProps extends SpotifyEmbedProps {
  fallbackUrl?: string
}

export default function SpotifyWidget({
  url,
  title = 'Spotify player',
  height,
  theme = 'dark',
  className,
  fallbackUrl = SPOTIFY_ARTIST_URL,
}: SpotifyWidgetProps) {
  return (
    <WidgetErrorBoundary
      name="Spotify"
      fallbackUrl={fallbackUrl}
      className={cn('min-h-[152px]', className)}
    >
      <SpotifyEmbed
        url={url}
        title={title}
        height={height}
        theme={theme}
      />
    </WidgetErrorBoundary>
  )
}
