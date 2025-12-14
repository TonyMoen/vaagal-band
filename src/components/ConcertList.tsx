import { useEffect, useState } from 'react'
import { ExternalLink, MapPin, Calendar, Ticket } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const BANDSINTOWN_API_KEY = '662fa34dff038486d0ff0ff242fa9503'
const ARTIST_ID = '15561560'
const BANDSINTOWN_URL = `https://www.bandsintown.com/a/${ARTIST_ID}-vgal`

interface BandsintownEvent {
  id: string
  artist_id: string
  url: string
  datetime: string
  title: string
  description: string
  venue: {
    name: string
    location: string
    city: string
    region: string
    country: string
  }
  offers: Array<{
    type: string
    url: string
    status: string
  }>
  lineup: string[]
}

interface ConcertListProps {
  className?: string
  maxEvents?: number
  showEmptyState?: boolean
}

export function ConcertList({
  className,
  maxEvents,
  showEmptyState = true,
}: ConcertListProps) {
  const [events, setEvents] = useState<BandsintownEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `https://rest.bandsintown.com/artists/id_${ARTIST_ID}/events/?app_id=${BANDSINTOWN_API_KEY}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }

        const data = await response.json()
        setEvents(maxEvents ? data.slice(0, maxEvents) : data)
      } catch (err) {
        console.error('[ConcertList] Error fetching events:', err)
        setError('Kunne ikke hente konserter')
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [maxEvents])

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-none" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-3 rounded-none bg-card p-6 text-center',
          className
        )}
        role="alert"
      >
        <p className="text-muted-foreground">{error}</p>
        <a
          href={BANDSINTOWN_URL}
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

  if (events.length === 0) {
    if (!showEmptyState) return null

    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-4 rounded-none bg-card p-8 text-center',
          className
        )}
      >
        <Calendar className="h-12 w-12 text-muted-foreground" />
        <div>
          <p className="text-lg font-medium">Ingen kommende konserter</p>
          <p className="text-sm text-muted-foreground">
            Følg oss på Bandsintown for å få beskjed når nye konserter legges ut
          </p>
        </div>
        <a
          href={BANDSINTOWN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-none bg-accent-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-primary/90"
        >
          Følg på Bandsintown
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {events.map((event) => (
        <ConcertCard key={event.id} event={event} />
      ))}
    </div>
  )
}

function ConcertCard({ event }: { event: BandsintownEvent }) {
  const date = new Date(event.datetime)
  const ticketOffer = event.offers?.find((o) => o.status === 'available')

  return (
    <div className="flex flex-col gap-4 rounded-none border border-tertiary bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Date */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-none border border-tertiary bg-background">
          <span className="text-xs font-medium uppercase text-muted-foreground">
            {date.toLocaleDateString('nb-NO', { month: 'short' })}
          </span>
          <span className="text-2xl font-bold">{date.getDate()}</span>
        </div>

        {/* Venue Info */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold">
            {event.title || event.venue.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">
              {event.venue.city}, {event.venue.country}
            </span>
          </div>
        </div>
      </div>

      {/* Ticket Button */}
      <div className="flex-shrink-0">
        {ticketOffer ? (
          <Button asChild className="w-full sm:w-auto">
            <a
              href={ticketOffer.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Ticket className="mr-2 h-4 w-4" />
              Billetter
            </a>
          </Button>
        ) : (
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <a href={event.url} target="_blank" rel="noopener noreferrer">
              Mer info
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}

export default ConcertList
