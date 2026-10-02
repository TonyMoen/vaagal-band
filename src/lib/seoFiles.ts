/**
 * Files the build writes next to the pages: sitemap.xml for search engines and
 * llms.txt, a plain-text summary for AI tools (https://llmstxt.org). Both come
 * from the same data as the pages, so they never disagree with the site.
 */
import { ABOUT, BAND, BOOKING_FAQ, HIGHLIGHTS, SITE_URL, memberSentence } from '@/lib/band'
import { longDate, venueLabel, playedAt } from '@/lib/concerts'
import { songPath, typeLabel, yearOf } from '@/lib/songs'
import type { InitialData } from '@/lib/initialData'

const xmlEscape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Pages whose content changes with the concert list carry today's date. */
const CHANGES_DAILY = new Set(['/', '/konserter', '/booking'])

export function buildSitemap(data: InitialData, pages: string[]): string {
  const releaseByPath = new Map(data.releases.map((r) => [songPath(r), r]))
  const urls = pages.map((page) => {
    const release = releaseByPath.get(page)
    const lastmod = CHANGES_DAILY.has(page)
      ? data.today
      : release
        ? release.releaseDate > data.today
          ? data.today
          : release.releaseDate
        : undefined
    return [
      '  <url>',
      `    <loc>${xmlEscape(`${SITE_URL}${page}`)}</loc>`,
      ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
      '  </url>',
    ].join('\n')
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

export function buildLlmsTxt(data: InitialData): string {
  const members = memberSentence(data.members)
  const released = data.releases.filter((r) => r.releaseDate <= data.today)
  const lines = [
    `# ${BAND.name}`,
    '',
    `> ${BAND.oneLiner}`,
    '',
    ...ABOUT.flatMap((paragraph) => [paragraph, '']),
    '## Fakta',
    '',
    `- Sjanger: ${BAND.genres.join(', ').toLowerCase()}`,
    `- Fra: ${BAND.hometown}, ${BAND.region}`,
    `- Startet: ${BAND.founded}`,
    ...(members ? [`- Medlemmer: ${members}`] : []),
    `- Konsert: ${BAND.setLength}, bare egne låter`,
    `- Spiller på: ${BAND.eventTypes.join(', ')} – over ${BAND.coverage}`,
    `- Booking: ${BAND.booking.agency}, ${BAND.booking.phoneLabel}, ${BAND.booking.email}`,
    `- E-post til bandet: ${BAND.email}`,
    '',
    '## Hvorfor Vågal',
    '',
    ...HIGHLIGHTS.map((line) => `- ${line}`),
    '',
    '## Sider',
    '',
    `- [Booking](${SITE_URL}/booking): hva arrangører får, rider og kontakt`,
    `- [Konserter](${SITE_URL}/konserter): kommende og tidligere konserter`,
    `- [Bandet](${SITE_URL}/bandet): historien, medlemmene, spørsmål og svar`,
    `- [Diskografi](${SITE_URL}/diskografi): alle utgivelser med lenker til strømmetjenester`,
    '',
  ]

  if (data.concerts.length) {
    lines.push('## Kommende konserter', '')
    for (const event of data.concerts) {
      lines.push(`- ${longDate(event)}: ${venueLabel(event)}, ${event.venue.city}`)
    }
    lines.push('')
  }

  const venues = playedAt(data.pastConcerts, 30)
  if (venues.length) {
    lines.push('## Har spilt på (utvalg)', '', venues.join('; '), '')
  }

  if (released.length) {
    lines.push('## Låter', '')
    for (const release of released) {
      lines.push(`- [${release.title}](${SITE_URL}${songPath(release)}): ${typeLabel(release).toLowerCase()}, ${yearOf(release)}`)
    }
    lines.push('')
  }

  lines.push('## Spørsmål fra arrangører', '')
  for (const item of BOOKING_FAQ) lines.push(`- ${item.question} ${item.answer}`)
  lines.push('', '## Profiler', '', ...BAND.profiles.map((url) => `- ${url}`), '')

  return lines.join('\n')
}
