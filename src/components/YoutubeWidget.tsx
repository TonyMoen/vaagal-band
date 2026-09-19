import { useState } from 'react'
import { Play } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { WidgetErrorBoundary } from '@/components/WidgetErrorBoundary'
import { cn } from '@/lib/utils'

interface YouTubeEmbedProps {
  url: string
  title?: string
  start?: number
  controls?: boolean
  /** Skip the thumbnail and load the player straight away */
  autoplay?: boolean
  className?: string
}

/**
 * Extract YouTube video ID from various URL formats
 * Supports: youtu.be, youtube.com/watch, youtube.com/embed, youtube.com/shorts
 */
function getYouTubeId(rawUrl: string): string | null {
  try {
    const u = new URL(rawUrl)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('?')[0]
    const v = u.searchParams.get('v')
    if (v) return v
    const parts = u.pathname.split('/')
    const idx = parts.findIndex((p) => p === 'embed' || p === 'shorts')
    return idx !== -1 ? parts[idx + 1] : null
  } catch {
    return null
  }
}

/**
 * YouTube embed behind a thumbnail. The player is about 1 MB of script, so it
 * is only loaded when someone presses play; until then the page shows the
 * video's own thumbnail (a few KB) with a play button. Same nocookie embed as
 * before once it starts.
 * Use YouTubeWidget for the wrapped version with error boundary
 */
export function YouTubeEmbed({
  url,
  title = 'YouTube video',
  start = 0,
  controls = true,
  autoplay = false,
  className,
}: YouTubeEmbedProps) {
  const [activated, setActivated] = useState(autoplay)
  const [isLoading, setIsLoading] = useState(true)
  // sddefault (640px) is missing for some videos; hqdefault (480px) always exists.
  // YouTube answers a missing size with a 120px grey placeholder, not an error.
  const [thumb, setThumb] = useState<'sddefault' | 'hqdefault'>('sddefault')

  const id = getYouTubeId(url)
  if (!id) return null

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    controls: controls ? '1' : '0',
    autoplay: '1',
    start: String(start),
  })

  const src = `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`

  return (
    <div
      className={cn('relative w-full', className)}
      role="region"
      aria-label={`YouTube video player: ${title}`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {activated ? (
          <>
            {isLoading && (
              <Skeleton
                className="absolute inset-0 h-full w-full rounded-none bg-card"
                aria-hidden="true"
              />
            )}
            <iframe
              className="absolute inset-0 h-full w-full rounded-none"
              src={src}
              title={title}
              style={{ opacity: isLoading ? 0 : 1 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
            />
          </>
        ) : (
          <button
            type="button"
            onClick={() => setActivated(true)}
            aria-label={`Spill av: ${title}`}
            className="group absolute inset-0 h-full w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-accent-hover)]"
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/${thumb}.jpg`}
              onLoad={(event) => {
                if (event.currentTarget.naturalWidth <= 120) setThumb('hqdefault')
              }}
              onError={() => setThumb('hqdefault')}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
              aria-hidden="true"
            />
            <span className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[var(--color-accent)] text-white transition-colors group-hover:bg-[var(--color-accent-hover)]">
              <Play className="h-8 w-8 fill-current" aria-hidden="true" />
            </span>
            <span className="absolute inset-x-3.5 bottom-3 font-semibold leading-snug text-white">
              {title}
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * YouTube widget with error boundary wrapper
 * This is the recommended component for use in pages
 */
interface YouTubeWidgetProps extends YouTubeEmbedProps {
  fallbackUrl?: string
}

export default function YouTubeWidget({
  url,
  title = 'YouTube video',
  start = 0,
  controls = true,
  autoplay = false,
  className,
  fallbackUrl = 'https://www.youtube.com/@vaagalband',
}: YouTubeWidgetProps) {
  return (
    <WidgetErrorBoundary
      name="YouTube"
      fallbackUrl={fallbackUrl}
      className={cn('min-h-[200px]', className)}
    >
      <YouTubeEmbed
        url={url}
        title={title}
        start={start}
        controls={controls}
        autoplay={autoplay}
      />
    </WidgetErrorBoundary>
  )
}
