import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { WidgetErrorBoundary } from '@/components/WidgetErrorBoundary'
import { cn } from '@/lib/utils'

interface SpotifyEmbedProps {
  url: string
  title?: string
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
  height = 352,
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
      {isLoading && (
        <Skeleton
          className="absolute inset-0 rounded-lg bg-card"
          style={{ height }}
          aria-hidden="true"
        />
      )}
      <iframe
        title={title}
        loading="lazy"
        src={embedSrc}
        width="100%"
        height={height}
        style={{ border: 0, opacity: isLoading ? 0 : 1 }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        onLoad={() => setIsLoading(false)}
        aria-label={title}
      />
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
  height = 352,
  theme = 'dark',
  className,
  fallbackUrl = 'https://open.spotify.com/artist/5M9ZQMR3vvDdLgv1D43MO9',
}: SpotifyWidgetProps) {
  return (
    <WidgetErrorBoundary
      name="Spotify"
      fallbackUrl={fallbackUrl}
      className={cn('min-h-[200px]', className)}
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
