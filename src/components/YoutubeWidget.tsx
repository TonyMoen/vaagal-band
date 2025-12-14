import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { WidgetErrorBoundary } from '@/components/WidgetErrorBoundary'
import { cn } from '@/lib/utils'

interface YouTubeEmbedProps {
  url: string
  title?: string
  start?: number
  controls?: boolean
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
 * Raw YouTube embed component with loading state
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
  const [isLoading, setIsLoading] = useState(true)

  const id = getYouTubeId(url)
  if (!id) return null

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    controls: controls ? '1' : '0',
    autoplay: autoplay ? '1' : '0',
    start: String(start),
  })

  const src = `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`

  return (
    <div
      className={cn('relative w-full', className)}
      role="region"
      aria-label={`YouTube video player: ${title}`}
    >
      <div className="relative w-full pb-[56.25%]">
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
          loading="lazy"
          style={{ opacity: isLoading ? 0 : 1 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          aria-label={title}
        />
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
  fallbackUrl = 'https://www.youtube.com/@vagalband',
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
