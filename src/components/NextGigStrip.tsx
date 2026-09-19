import { ChevronRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useConcerts } from '@/hooks/useConcerts'
import { eventDate, isToday, ticketUrl, venueLabel, weekdayAndTime } from '@/lib/concerts'

/**
 * The next gig in one tappable row, straight under the homepage hero, so
 * "when do they play?" is answered on the first screen. Renders nothing when
 * there are no dates or Bandsintown cannot be reached.
 */
export default function NextGigStrip() {
  const { data, isLoading } = useConcerts()

  // Same height as the row, so the page does not jump when the dates arrive
  if (isLoading) return <Skeleton className="h-[72px] w-full rounded-none lg:h-[76px]" />

  const next = data?.[0]
  if (!next) return null

  const date = eventDate(next)
  const name = venueLabel(next)
  const [weekday, time] = weekdayAndTime(date).split(' ')

  return (
    <a
      id="neste-konsert"
      href={ticketUrl(next) ?? next.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Neste konsert: ${name}, ${next.venue.city}, ${date.toLocaleDateString('nb-NO', { day: 'numeric', month: 'long' })} (åpnes i ny fane)`}
      className="group block border-b border-l-[3px] border-b-[var(--color-border)] border-l-[var(--color-accent)] bg-[var(--color-surface)] transition-colors hover:bg-[var(--color-tertiary)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-accent)]"
    >
      <span className="container-page grid min-h-[72px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3.5 py-2.5 lg:min-h-[76px]">
        <span className="min-w-[46px] text-center">
          <span className="block text-[11px] font-semibold uppercase leading-none tracking-[0.1em] text-[var(--color-muted)]">
            {weekday}
          </span>
          <span className="block text-[26px] font-bold leading-[1.05]">{date.getDate()}</span>
          <span className="block text-[11px] font-semibold uppercase leading-none tracking-[0.1em] text-[var(--color-muted)]">
            {date.toLocaleDateString('nb-NO', { month: 'short' }).replace('.', '')}
          </span>
        </span>
        <span className="min-w-0">
          <span className="block font-condensed text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-hover)]">
            Neste konsert{isToday(date) ? ' · i kveld' : ''}
          </span>
          <span className="mt-0.5 block text-[16.5px] font-semibold leading-tight [overflow-wrap:anywhere]">
            {name}{' '}
            <span className="text-[14.5px] font-normal text-[var(--color-muted)]">
              · {next.venue.city}
              {time ? ` · ${time}` : ''}
            </span>
          </span>
        </span>
        <ChevronRight
          className="h-5 w-5 text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-accent-hover)]"
          aria-hidden="true"
        />
      </span>
    </a>
  )
}
