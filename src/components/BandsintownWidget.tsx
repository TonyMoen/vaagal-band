import { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface BandsintownEmbedProps {
  artistId?: string
  className?: string
  onEmptyState?: () => void
  fallbackUrl?: string
}

/**
 * Raw Bandsintown embed component with loading state
 * Uses script injection pattern with MutationObserver for load detection
 */
const DEFAULT_FALLBACK_URL = 'https://www.bandsintown.com/a/15561560-vgal'

export function BandsintownEmbed({
  artistId = 'id_15561560',
  className,
  onEmptyState,
  fallbackUrl = DEFAULT_FALLBACK_URL,
}: BandsintownEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.innerHTML = ''

    // Create the widget initializer anchor
    const a = document.createElement('a')
    a.className = 'bit-widget-initializer'
    a.setAttribute('data-artist-name', artistId)
    a.setAttribute('data-auto-style', 'true')
    a.setAttribute('data-background-color', 'rgba(0,0,0,0)')
    a.setAttribute('data-separator-color', '#2A2A2A')  // Tertiary
    a.setAttribute('data-text-color', '#F5F5F5')       // Text Primary
    a.setAttribute(
      'data-font',
      'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif'
    )
    a.setAttribute('data-display-local-dates', 'true')
    a.setAttribute('data-display-rsvp', 'false')
    a.setAttribute('data-event-rsvp-position', 'hidden')
    a.setAttribute('data-local-dates-position', 'tab')
    a.setAttribute('data-display-past-dates', 'true')
    a.setAttribute('data-display-details', 'false')
    a.setAttribute('data-display-lineup', 'false')
    a.setAttribute('data-display-start-time', 'false')
    a.setAttribute('data-display-limit', 'all')
    a.setAttribute('data-date-format', 'MMM. D, YYYY')
    a.setAttribute('data-date-orientation', 'horizontal')
    a.setAttribute('data-date-border-color', '#2A2A2A')  // Tertiary
    a.setAttribute('data-date-border-width', '1px')
    a.setAttribute('data-date-border-radius', '12px')
    a.setAttribute('data-date-capitalization', 'capitalize')
    a.setAttribute('data-event-ticket-cta-size', 'large')
    a.setAttribute('data-event-ticket-text', 'BILLETTER')
    a.setAttribute('data-event-ticket-icon', 'false')
    a.setAttribute('data-event-ticket-cta-text-color', '#ffffff')
    a.setAttribute('data-event-ticket-cta-bg-color', '#E65C00')    // Accent Primary
    a.setAttribute('data-event-ticket-cta-border-color', '#E65C00')  // Accent Primary
    a.setAttribute('data-event-ticket-cta-border-width', '0px')
    a.setAttribute('data-event-ticket-cta-border-radius', '12px')
    a.setAttribute('data-button-label-capitalization', 'uppercase')
    a.setAttribute('data-header-capitalization', 'uppercase')
    a.setAttribute('data-location-capitalization', 'uppercase')
    a.setAttribute('data-venue-capitalization', 'uppercase')
    a.setAttribute('data-bit-logo-position', 'bottomRight')
    a.setAttribute('data-bit-logo-color', '#A3A3A3')  // Text Secondary
    a.setAttribute('data-language', 'en')
    a.setAttribute('data-layout-breakpoint', '900')

    el.appendChild(a)

    // Create and append the script
    const script = document.createElement('script')
    script.src = 'https://widgetv3.bandsintown.com/main.min.js'
    script.async = true
    script.charset = 'utf-8'

    // Track script load errors - use state instead of throwing
    script.onerror = () => {
      console.error('[Bandsintown Widget Error]: Failed to load script')
      setIsLoading(false)
      setHasError(true)
    }

    el.appendChild(script)

    // Use MutationObserver to detect when widget content is injected
    const observer = new MutationObserver(() => {
      // Check if Bandsintown widget has rendered content
      // The widget creates elements with classes like 'bit-events', 'bit-no-dates', or 'bit-widget'
      const hasNoDates = el.querySelector('.bit-no-dates')
      const hasEvents = el.querySelector('.bit-events')
      const hasWidget = el.querySelector('.bit-widget')

      if (hasEvents || hasNoDates || hasWidget) {
        setIsLoading(false)
        observer.disconnect()

        // Call onEmptyState callback when no concerts are found
        if (hasNoDates && onEmptyState) {
          onEmptyState()
        }
      }
    })

    observer.observe(el, { childList: true, subtree: true })

    // Timeout fallback - if widget doesn't load within 10 seconds, show error
    const timeout = setTimeout(() => {
      observer.disconnect()
      setIsLoading(false)
      // Check if anything rendered - if not, show fallback
      const hasContent = el.querySelector('.bit-events') || el.querySelector('.bit-no-dates') || el.querySelector('.bit-widget')
      if (!hasContent) {
        setHasError(true)
      }
    }, 10000)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
      el.innerHTML = ''
    }
  }, [artistId, onEmptyState])

  // Show fallback UI when widget fails to load
  if (hasError) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-3 rounded-none bg-card p-6 text-center min-h-[352px]',
          className
        )}
        role="alert"
      >
        <p className="text-muted-foreground">
          Konsertkalenderen er midlertidig utilgjengelig
        </p>
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-none border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Se konserter på Bandsintown
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    )
  }

  return (
    <div
      className={cn('relative w-full', className)}
      role="region"
      aria-label="Upcoming concerts for Vågal"
      aria-live="polite"
    >
      {isLoading && (
        <Skeleton
          className="absolute inset-0 min-h-[352px] w-full rounded-none bg-card"
          aria-hidden="true"
        />
      )}
      <div
        ref={ref}
        className={cn(
          'rounded-none border transition-opacity duration-300 min-h-[352px]',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
      />
    </div>
  )
}

/**
 * Bandsintown widget - the recommended component for use in pages
 * Handles its own error state and fallback UI
 */
export default function BandsintownWidget({
  artistId = 'id_15561560',
  className,
  fallbackUrl = DEFAULT_FALLBACK_URL,
  onEmptyState,
}: BandsintownEmbedProps) {
  return (
    <BandsintownEmbed
      artistId={artistId}
      className={cn('min-h-[352px]', className)}
      fallbackUrl={fallbackUrl}
      onEmptyState={onEmptyState}
    />
  )
}
