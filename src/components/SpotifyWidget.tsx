import { useState } from 'react'
import { Play } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { WidgetErrorBoundary } from '@/components/WidgetErrorBoundary'
import { imageUrl, type SanityImageSource } from '@/lib/sanity/image'
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
  /** Cover shown on the button before the player is loaded */
  cover?: SanityImageSource | null
}

/**
 * Spotify player that loads only when tapped. The embed sets Spotify's own
 * cookies (sp_t, sp_landing) the moment it loads, so it waits for the visitor
 * to ask for it, the same way the video does. Until then it is a button of the
 * same size, which also saves about 800 KB on every page view.
 * Use SpotifyWidget for the wrapped version with error boundary
 */
export function SpotifyEmbed({
  url,
  title = 'Spotify player',
  height,
  theme = 'dark',
  className,
  cover,
}: SpotifyEmbedProps) {
  const [activated, setActivated] = useState(false)
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
        {activated ? (
          <>
            {isLoading && (
              <Skeleton className="absolute inset-0 rounded-none bg-card" aria-hidden="true" />
            )}
            <iframe
              className="absolute inset-0 h-full w-full"
              title={title}
              src={embedSrc}
              style={{ border: 0, opacity: isLoading ? 0 : 1 }}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              onLoad={() => setIsLoading(false)}
            />
          </>
        ) : (
          <button
            type="button"
            onClick={() => setActivated(true)}
            aria-label="Last inn Spotify-spilleren"
            className="group absolute inset-0 flex h-full w-full items-center gap-4 bg-[#181818] p-3 text-left transition-colors hover:bg-[#202020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-accent-hover)] lg:flex-col lg:items-start lg:justify-end lg:p-5"
          >
            {cover?.asset && (
              <img
                src={imageUrl(cover, 256, { ratio: 1 })}
                alt=""
                width={128}
                height={128}
                loading="lazy"
                className="h-[128px] w-[128px] flex-none rounded-[6px] object-cover lg:h-[168px] lg:w-[168px]"
              />
            )}
            <span className="min-w-0 flex-1 lg:flex-none">
              <span className="block text-lg font-bold leading-tight text-white">Vågal på Spotify</span>
              <span className="mt-1 block text-[13.5px] leading-snug text-[var(--color-muted)]">
                Trykk for å laste spilleren. Spotify setter egne informasjonskapsler.
              </span>
            </span>
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#1DB954] text-[#0A0A0A] transition-transform group-hover:scale-105 lg:absolute lg:right-5 lg:top-5">
              <Play className="h-5 w-5 translate-x-px fill-current" aria-hidden="true" />
            </span>
          </button>
        )}
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
  cover,
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
        cover={cover}
      />
    </WidgetErrorBoundary>
  )
}
