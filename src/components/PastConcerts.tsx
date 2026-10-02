import { usePastConcerts } from '@/hooks/useConcerts'
import { eventParts, monthShort, venueLabel } from '@/lib/concerts'

/**
 * "Tidligere konserter": every past gig on Bandsintown, newest first, grouped
 * by year. Shows organisers that the band plays a lot, and where.
 */
export default function PastConcerts({ limit }: { limit?: number }) {
  const { data } = usePastConcerts()
  const events = limit ? (data ?? []).slice(0, limit) : data ?? []
  if (events.length === 0) return null

  const years = new Map<number, typeof events>()
  for (const event of events) {
    const { year } = eventParts(event)
    years.set(year, [...(years.get(year) ?? []), event])
  }

  return (
    <div className="grid gap-6">
      {[...years.entries()].map(([year, list]) => (
        <div key={year}>
          <h3 className="border-b border-[var(--color-border)] pb-2 font-condensed text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {year}
          </h3>
          <ul>
            {list.map((event) => (
              <li
                key={event.id}
                className="grid grid-cols-[64px_minmax(0,1fr)] items-baseline gap-3 border-b border-[var(--color-border)] py-2.5"
              >
                <time dateTime={event.datetime.slice(0, 10)} className="text-[14px] tabular-nums text-[var(--color-muted)]">
                  {eventParts(event).day}. {monthShort(event)}
                </time>
                <span className="min-w-0 text-[15.5px] leading-snug">
                  <span className="font-semibold">{venueLabel(event)}</span>
                  <span className="text-[var(--color-muted)]"> · {event.venue.city}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
