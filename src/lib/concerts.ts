/**
 * Concerts come from the Bandsintown REST API. The lists, the homepage strip
 * and the concerts page read them through useConcerts() / usePastConcerts(),
 * and the build reads the same functions to put them in the static HTML.
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

async function fetchEvents(scope: 'upcoming' | 'past'): Promise<BandsintownEvent[]> {
  const date = scope === 'past' ? '&date=past' : ''
  const response = await fetch(
    `https://rest.bandsintown.com/artists/id_${ARTIST_ID}/events/?app_id=${BANDSINTOWN_APP_ID}${date}`
  )
  if (!response.ok) throw new Error('Failed to fetch events')
  const data = await response.json()
  return Array.isArray(data) ? data : []
}

/** Upcoming events, soonest first (the order Bandsintown returns). */
export function fetchConcerts(): Promise<BandsintownEvent[]> {
  return fetchEvents('upcoming')
}

/** Past events, newest first. */
export async function fetchPastConcerts(): Promise<BandsintownEvent[]> {
  return (await fetchEvents('past')).sort((a, b) => b.datetime.localeCompare(a.datetime))
}

/**
 * The name to show for a gig. Bandsintown titles look like
 * "Vågal til Banken Pub // Lillesand", "Bygdefest | Vågal | Olsen på Hjørnet // Mjøndalen"
 * or "Vågal // Ruffen Bar - Kragerø"; the city has its own line, so the row shows the venue.
 */
export function venueLabel(event: Pick<BandsintownEvent, 'title' | 'venue'>): string {
  const raw = (event.title || event.venue?.name || '').trim()
  const lastPart = raw.split('|').pop()?.trim() ?? raw
  const city = (event.venue?.city ?? '').trim().toLowerCase()
  let cleaned = lastPart
    .replace(/^vågal\s*(til|på|i|@|\/\/)\s*/i, '')
    .replace(/\s*\/\/.*$/, '')
    .replace(/\s+AS$/i, '')
    .trim()
  // "Ruffen Bar - Kragerø": the city already has its own line
  const dash = cleaned.lastIndexOf(' - ')
  if (city && dash > 0 && cleaned.slice(dash + 3).trim().toLowerCase() === city) cleaned = cleaned.slice(0, dash).trim()
  return cleaned || raw
}

/** The ticket link, when tickets are on sale. */
export function ticketUrl(event: Pick<BandsintownEvent, 'offers'>): string | undefined {
  return event.offers?.find((offer) => offer.status === 'available')?.url
}

// Fixed Norwegian names instead of toLocaleDateString: the server and every
// browser must print exactly the same text, or React can't reuse the HTML.
const MONTHS = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']
const MONTHS_SHORT = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
const WEEKDAYS_SHORT = ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør']

/** The parts of the venue's local date and time, read straight from the string. */
export function eventParts(event: Pick<BandsintownEvent, 'datetime'>) {
  const [date, time = '00:00:00'] = event.datetime.split('T')
  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)
  // Weekday from the calendar date alone (UTC noon avoids any zone or DST edge)
  const weekday = new Date(Date.UTC(year, month - 1, day, 12)).getUTCDay()
  return { date, year, month, day, hour, minute, weekday }
}

export function monthShort(event: Pick<BandsintownEvent, 'datetime'>): string {
  return MONTHS_SHORT[eventParts(event).month - 1]
}

/** "lør 21:00", or just "lør" when Bandsintown has no start time (midnight). */
export function weekdayAndTime(event: Pick<BandsintownEvent, 'datetime'>): string {
  const { weekday, hour, minute } = eventParts(event)
  const day = WEEKDAYS_SHORT[weekday]
  if (hour === 0 && minute === 0) return day
  return `${day} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

/** "Oktober 2026", used as a divider on the concerts page. */
export function monthLabel(event: Pick<BandsintownEvent, 'datetime'>): string {
  const { month, year } = eventParts(event)
  const name = MONTHS[month - 1]
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${year}`
}

/** "3. oktober 2026" */
export function longDate(event: Pick<BandsintownEvent, 'datetime'>): string {
  const { day, month, year } = eventParts(event)
  return `${day}. ${MONTHS[month - 1]} ${year}`
}

export function isOnDate(event: Pick<BandsintownEvent, 'datetime'>, today: string): boolean {
  return event.datetime.slice(0, 10) === today
}

/**
 * The start time with Norway's UTC offset ("2026-10-03T21:00:00+02:00"), which
 * structured data needs. Norway is +01:00 in winter and +02:00 in summer.
 */
export function isoWithOsloOffset(event: Pick<BandsintownEvent, 'datetime'>): string {
  const { year, month, day, hour, minute } = eventParts(event)
  const guessUtc = Date.UTC(year, month - 1, day, hour, minute)
  const osloName = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Oslo', timeZoneName: 'shortOffset' })
    .formatToParts(new Date(guessUtc))
    .find((part) => part.type === 'timeZoneName')?.value
  const offsetHours = Number(osloName?.replace('GMT', '') || 1)
  const sign = offsetHours >= 0 ? '+' : '-'
  const local = event.datetime.length === 16 ? `${event.datetime}:00` : event.datetime.slice(0, 19)
  return `${local}${sign}${String(Math.abs(offsetHours)).padStart(2, '0')}:00`
}

/** Unique venues and festivals from past gigs, newest first: "Sommerbust, Kristiansand". */
export function playedAt(events: BandsintownEvent[], limit = 24): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const event of events) {
    const label = `${venueLabel(event)}, ${event.venue.city}`
    const key = label.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(label)
    if (out.length >= limit) break
  }
  return out
}
