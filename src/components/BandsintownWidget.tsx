import { useEffect, useRef, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { WidgetErrorBoundary } from '@/components/WidgetErrorBoundary'
import { cn } from '@/lib/utils'

interface BandsintownEmbedProps {
  artistId?: string
  className?: string
  onEmptyState?: () => void
}

/**
 * Raw Bandsintown embed component with loading state
 * Uses script injection pattern with MutationObserver for load detection
 */
export function BandsintownEmbed({
  artistId = 'id_15561560',
  className,
  onEmptyState,
}: BandsintownEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
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

    // Track script load errors
    script.onerror = () => {
      console.error('[Bandsintown Widget Error]: Failed to load script')
      setIsLoading(false)
      // Throw error to trigger error boundary
      throw new Error('Failed to load Bandsintown widget script')
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

    // Timeout fallback - if widget doesn't load within 10 seconds, hide skeleton
    const timeout = setTimeout(() => {
      setIsLoading(false)
      observer.disconnect()
    }, 10000)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
      el.innerHTML = ''
    }
  }, [artistId, onEmptyState])

  return (
    <div
      className={cn('relative w-full', className)}
      role="region"
      aria-label="Upcoming concerts for Vågal"
      aria-live="polite"
    >
      {isLoading && (
        <Skeleton
          className="absolute inset-0 min-h-[200px] w-full rounded-lg bg-card"
          aria-hidden="true"
        />
      )}
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
      />
    </div>
  )
}

/**
 * Bandsintown widget with error boundary wrapper
 * This is the recommended component for use in pages
 */
interface BandsintownWidgetProps extends BandsintownEmbedProps {
  fallbackUrl?: string
}

export default function BandsintownWidget({
  artistId = 'id_15561560',
  className,
  fallbackUrl = 'https://www.bandsintown.com/a/15561560-vgal',
  onEmptyState,
}: BandsintownWidgetProps) {
  return (
    <WidgetErrorBoundary
      name="Bandsintown"
      fallbackUrl={fallbackUrl}
      className={cn('min-h-[200px]', className)}
    >
      <BandsintownEmbed artistId={artistId} onEmptyState={onEmptyState} />
    </WidgetErrorBoundary>
  )
}
