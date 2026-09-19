/**
 * Concerts come from the Bandsintown REST API. The list, the homepage strip and
 * the concerts page all read the same request through useConcerts().
 */

const BANDSINTOWN_APP_ID = '662fa34dff038486d0ff0ff242fa9503'
const ARTIST_ID = '15561560'

export const BANDSINTOWN_URL = `https://www.bandsintown.com/a/${ARTIST_ID}-vgal`

export interface BandsintownEvent {
  id: string
  artist_id: string
  url: string
  /** Local time at the venue, no time zone: "2026-10-03T21:00:00" */
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

/** Upcoming events, soonest first (the order Bandsintown returns). */
export async function fetchConcerts(): Promise<BandsintownEvent[]> {
  const response = await fetch(
    `https://rest.bandsintown.com/artists/id_${ARTIST_ID}/events/?app_id=${BANDSINTOWN_APP_ID}`
  )
  if (!response.ok) throw new Error('Failed to fetch events')
  const data = await response.json()
  return Array.isArray(data) ? data : []
}

/**
 * The name to show for a gig. Events are entered as "Vågal til Banken Pub // Lillesand";
 * the city already has its own line, so the row shows "Banken Pub".
 */
export function venueLabel(event: Pick<BandsintownEvent, 'title' | 'venue'>): string {
  const raw = (event.title || event.venue?.name || '').trim()
  const cleaned = raw
    .replace(/^vågal\s+(til|på|i|@)\s+/i, '')
    .replace(/\s*\/\/.*$/, '')
    .trim()
  return cleaned || raw
}

/** The ticket link, when tickets are on sale. */
export function ticketUrl(event: Pick<BandsintownEvent, 'offers'>): string | undefined {
  return event.offers?.find((offer) => offer.status === 'available')?.url
}

/** datetime has no zone, so new Date() reads it as local time, which is what we want to print. */
export function eventDate(event: Pick<BandsintownEvent, 'datetime'>): Date {
  return new Date(event.datetime)
}

/** "lør 21:00", or just "lør" when Bandsintown has no start time (midnight). */
export function weekdayAndTime(date: Date): string {
  const weekday = date.toLocaleDateString('nb-NO', { weekday: 'short' }).replace('.', '')
  if (date.getHours() === 0 && date.getMinutes() === 0) return weekday
  const time = date.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' })
  return `${weekday} ${time}`
}

export function isToday(date: Date, now = new Date()): boolean {
  return date.toDateString() === now.toDateString()
}

/** "Oktober 2026", used as a divider on the concerts page. */
export function monthLabel(date: Date): string {
  const label = date.toLocaleDateString('nb-NO', { month: 'long', year: 'numeric' })
  return label.charAt(0).toUpperCase() + label.slice(1)
}
