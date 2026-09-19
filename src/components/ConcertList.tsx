import { ExternalLink, Calendar, Ticket } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useConcerts } from '@/hooks/useConcerts'
import {
  BANDSINTOWN_URL,
  eventDate,
  monthLabel,
  ticketUrl,
  venueLabel,
  weekdayAndTime,
  type BandsintownEvent,
} from '@/lib/concerts'

interface ConcertListProps {
  className?: string
  maxEvents?: number
  showEmptyState?: boolean
  /** Put a "Oktober 2026" divider above each month (the concerts page) */
  groupByMonth?: boolean
}

export function ConcertList({
  className,
  maxEvents,
  showEmptyState = true,
  groupByMonth = false,
}: ConcertListProps) {
  const { data, isLoading, isError } = useConcerts()

  if (isLoading) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: maxEvents ?? 3 }, (_, i) => (
          <Skeleton key={i} className="h-[78px] w-full rounded-none lg:h-[88px]" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-3 rounded-none bg-card p-6 text-center',
          className
        )}
        role="alert"
      >
        <p className="text-muted-foreground">Kunne ikke hente konserter</p>
        <a href={BANDSINTOWN_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">
          Se konserter på Bandsintown
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    )
  }

  const events = maxEvents ? (data ?? []).slice(0, maxEvents) : data ?? []

  if (events.length === 0) {
    if (!showEmptyState) return null

    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-4 rounded-none bg-card p-8 text-center',
          className
        )}
      >
        <Calendar className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
        <div>
          <p className="text-lg font-medium">Ingen kommende konserter</p>
          <p className="text-sm text-muted-foreground">
            Følg oss på Bandsintown for å få beskjed når nye konserter legges ut
          </p>
        </div>
        <a href={BANDSINTOWN_URL} target="_blank" rel="noopener noreferrer" className="btn">
          Følg på Bandsintown
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    )
  }

  return (
    <ul className={cn('border-t border-[var(--color-border)]', groupByMonth && 'border-t-0', className)}>
      {events.map((event, index) => {
        const month = monthLabel(eventDate(event))
        const newMonth =
          groupByMonth && (index === 0 || monthLabel(eventDate(events[index - 1])) !== month)
        return (
          <li key={event.id}>
            {newMonth && (
              <h2
                className={cn(
                  'border-b border-[var(--color-border)] pb-2.5 font-condensed text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]',
                  index > 0 && 'pt-6'
                )}
              >
                {month}
              </h2>
            )}
            <ConcertRow event={event} />
          </li>
        )
      })}
    </ul>
  )
}

/** One gig: date block, venue and city, and a 44px action on the right. */
function ConcertRow({ event }: { event: BandsintownEvent }) {
  const date = eventDate(event)
  const tickets = ticketUrl(event)
  const name = venueLabel(event)

  return (
    <div className="grid min-h-[78px] grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3.5 border-b border-[var(--color-border)] py-[11px] lg:min-h-[88px] lg:grid-cols-[64px_minmax(0,1fr)_auto] lg:gap-5">
      <time
        dateTime={event.datetime}
        className="flex h-14 w-14 flex-col items-center justify-center border border-[var(--color-tertiary)] bg-[var(--color-surface)] lg:h-16 lg:w-16"
      >
        <span className="text-[11px] font-semibold uppercase leading-none tracking-[0.1em] text-[var(--color-muted)]">
          {date.toLocaleDateString('nb-NO', { month: 'short' }).replace('.', '')}
        </span>
        <span className="mt-1 text-2xl font-bold leading-none">{date.getDate()}</span>
      </time>

      <div className="min-w-0">
        <h3 className="text-[17px] font-semibold leading-tight [overflow-wrap:anywhere] lg:text-[19px]">
          {name}
        </h3>
        <p className="mt-0.5 text-[14.5px] leading-snug text-[var(--color-muted)]">
          {event.venue.city} · {weekdayAndTime(date)}
        </p>
      </div>

      {tickets ? (
        <a
          href={tickets}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Billetter: ${name}, ${event.venue.city} (åpnes i ny fane)`}
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-none bg-[var(--color-accent)] px-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hover)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
        >
          <Ticket className="h-[17px] w-[17px]" aria-hidden="true" />
          Billetter
        </a>
      ) : (
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Mer info: ${name}, ${event.venue.city} (åpnes i ny fane)`}
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-none border border-[var(--color-tertiary)] px-3.5 text-[15px] font-semibold transition-colors hover:border-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          Info
          <ExternalLink className="h-[17px] w-[17px]" aria-hidden="true" />
        </a>
      )}
    </div>
  )
}

export default ConcertList
