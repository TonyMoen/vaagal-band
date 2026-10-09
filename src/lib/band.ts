/**
 * Facts about the band, in one place. The pages, the structured data and
 * llms.txt all read from here, so search engines and AI models see the same
 * facts everywhere. Change them here, never in a page.
 */
import { BOOKING, FACEBOOK_URL, INSTAGRAM_URL, SPOTIFY_ARTIST_URL } from '@/lib/links'
import { BANDSINTOWN_URL } from '@/lib/concerts'

export const SITE_URL = 'https://vaagalband.no'

export const BAND = {
  name: 'Vågal',
  /** Other spellings people search for. Helps search engines tell the band from the adjective and the restaurants. */
  alternateNames: ['Vaagal', 'Vågal band', 'Bygdebandet Vågal'],
  hometown: 'Notodden',
  region: 'Telemark',
  founded: '2023',
  genres: ['Bygderock', 'Norsk country', 'Countryrock'],
  /** The band's own slogan */
  slogan: 'Bygderock og norsk country fra de beste bygdene',
  oneLiner:
    'Vågal er et av Norges mest populære nye bygdeband – bygderock og norsk country fra Notodden i Telemark, med egne låter, allsang og fullt trøkk fra første sekund.',
  setLength: '2 × 45 minutter',
  coverage: 'hele Norge',
  eventTypes: ['festivaler', 'bygdefester', 'puber', 'klubber', 'firmafester', 'julebord', 'bryllup', 'private fester'],
  email: 'vaagalband@gmail.com',
  booking: BOOKING,
  /** Official profiles, used as sameAs in the structured data */
  profiles: [
    SPOTIFY_ARTIST_URL,
    'https://music.apple.com/no/artist/v%C3%A5gal/1707159116',
    'https://tidal.com/artist/42049925',
    'https://www.youtube.com/@vaagalband',
    INSTAGRAM_URL,
    FACEBOOK_URL,
    'https://www.tiktok.com/@vaagalband',
    BANDSINTOWN_URL,
    'https://www.songkick.com/artists/10354045-vagal',
    'https://www.last.fm/music/V%C3%A5gal',
  ],
} as const

/** The "Om Vågal" text: plain sentences that answer who, where, since when and what. */
export const ABOUT = [
  'Vågal er et av Norges mest populære nye bygdeband. Bandet fra Notodden i Telemark ble startet i 2023 og spiller bygderock og norsk country – bare egne låter, laget for allsang, dans og fullt trøkk.',
  'Debutsingelen «Rådebank» kom høsten 2023, havnet rett på Spotifys New Music Friday og lå i flere uker på Spotifys topp 50 over mest delte låter. «I baksetet i min Chevrolet» nådde 7. plass på samme liste, og i dag har bandet titusenvis av lyttere på Spotify hver måned.',
  'Siden har Vågal spilt på festivaler, bygdefester og puber over store deler av Østlandet og Sørlandet – blant annet Sommerbust i Kristiansand, Slåttefestivalen i Hjartdal, Kamerinafestivalen og Solfesten på Rjukan.',
]

/**
 * Why organisers book Vågal: the proof behind "populært bygdeband".
 * Keep every line checkable (Spotify: 34 297 monthly listeners on 2 Oct 2026).
 */
export const HIGHLIGHTS = [
  'Titusenvis av lyttere på Spotify hver måned',
  'Debutsingelen «Rådebank» gikk rett inn på Spotifys New Music Friday',
  '«I baksetet i min Chevrolet» nådde 7. plass på Spotifys topp 50 over mest delte låter',
  'Har spilt på Sommerbust, Slåttefestivalen, Kamerinafestivalen og Solfesten på Rjukan',
]

export interface Faq {
  question: string
  answer: string
}

/** Questions about the band, for the Bandet page (and its FAQ data). */
export function bandFaq(memberLine: string): Faq[] {
  return [
    { question: 'Hvor kommer Vågal fra?', answer: 'Vågal er et bygdeband fra Notodden i Telemark.' },
    { question: 'Når ble Vågal startet?', answer: 'Bandet ble startet i 2023. Debutsingelen «Rådebank» kom samme høst.' },
    {
      question: 'Hva slags musikk spiller Vågal?',
      answer:
        'Bygderock og norsk country – egne låter, laget for allsang og fest. Vågal er et av Norges mest populære nye bygdeband og countryband, med titusenvis av lyttere på Spotify hver måned.',
    },
    {
      question: 'Er Vågal et norsk countryband?',
      answer:
        'Ja. Vågal spiller norsk country og bygderock – egne låter på norsk, med fullt band: vokal, gitar, bass og trommer.',
    },
    ...(memberLine ? [{ question: 'Hvem er med i Vågal?', answer: `${memberLine}.` }] : []),
    {
      question: 'Hvordan booker vi Vågal?',
      answer: `Kontakt ${BOOKING.agency} på telefon ${BOOKING.phoneLabel} eller ${BOOKING.email}. Mer informasjon står på bookingsiden.`,
    },
  ]
}

/** Questions organisers ask, for the booking page (and its FAQ data). */
export const BOOKING_FAQ: Faq[] = [
  {
    question: 'Hvorfor booke Vågal?',
    answer:
      'Vågal er et av Norges mest populære nye bygdeband, med norsk country og bygderock som får salen til å synge med fra første refreng. Bandet har titusenvis av lyttere på Spotify hver måned og har spilt på blant annet Sommerbust, Slåttefestivalen og Solfesten på Rjukan.',
  },
  {
    question: 'Hva koster det å booke Vågal?',
    answer: 'Prisen avhenger av dato, sted og reisevei. Ta kontakt, så får dere et tilbud.',
  },
  { question: 'Hvor lang er konserten?', answer: 'Vanligvis 2 × 45 minutter.' },
  {
    question: 'Spiller dere covers?',
    answer: 'Nei. Vi spiller egne låter – bygderock og norsk country som publikum synger med på.',
  },
  { question: 'Hvor i landet spiller dere?', answer: 'Over hele Norge. Bandet holder til på Notodden i Telemark.' },
  {
    question: 'Hva slags arrangementer spiller dere på?',
    answer:
      'Festivaler, bygdefester, puber og klubber, firmafester og julebord, bryllup og private fester. Trenger dere et band til fest, er det bare å ta kontakt.',
  },
  {
    question: 'Hva trenger dere av teknikk og bevertning?',
    answer: 'Alt står i den tekniske rideren og hospitality-rideren. Dem får dere tilsendt sammen med pressebilder og logoer når konserten er booket.',
  },
]

/** "Marius Presthaug (vokal), Torstein Vala (gitar) og Truls Vennman (trommer)" */
export function memberSentence(members: Array<{ name: string; instrument?: string }>): string {
  const parts = members.map((m) => (m.instrument ? `${m.name} (${m.instrument.toLowerCase()})` : m.name))
  if (parts.length <= 1) return parts.join('')
  return `${parts.slice(0, -1).join(', ')} og ${parts[parts.length - 1]}`
}
