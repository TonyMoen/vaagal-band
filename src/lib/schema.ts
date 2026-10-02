/**
 * schema.org structured data. Every page refers to the band by the same @id,
 * so search engines and AI models join the pages into one picture: one band,
 * its members, its songs and its concerts.
 */
import { BAND, SITE_URL, type Faq } from '@/lib/band'
import { imageUrl } from '@/lib/sanity/image'
import { songPath } from '@/lib/songs'
import { isoWithOsloOffset, ticketUrl, venueLabel, type BandsintownEvent } from '@/lib/concerts'
import type { BandMember, Release } from '@/types/sanity'

export const BAND_ID = `${SITE_URL}/#band`

type Node = Record<string, unknown>

export function bandNode({ members = [], releases = [] }: { members?: BandMember[]; releases?: Release[] } = {}): Node {
  return {
    '@type': 'MusicGroup',
    '@id': BAND_ID,
    name: BAND.name,
    alternateName: BAND.alternateNames,
    description: BAND.oneLiner,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    image: `${SITE_URL}/og-image.jpg`,
    genre: BAND.genres,
    foundingDate: BAND.founded,
    foundingLocation: {
      '@type': 'Place',
      name: `${BAND.hometown}, ${BAND.region}`,
      address: { '@type': 'PostalAddress', addressLocality: BAND.hometown, addressRegion: BAND.region, addressCountry: 'NO' },
    },
    email: BAND.email,
    sameAs: BAND.profiles,
    ...(members.length
      ? {
          member: members.map((m) => ({
            '@type': 'OrganizationRole',
            member: { '@type': 'Person', name: m.name },
            ...(m.instrument ? { roleName: m.instrument } : {}),
          })),
        }
      : {}),
    ...(releases.length
      ? {
          track: releases.map((r) => ({
            '@type': 'MusicRecording',
            name: r.title,
            url: `${SITE_URL}${songPath(r)}`,
            datePublished: r.releaseDate,
          })),
        }
      : {}),
  }
}

export function eventNode(event: BandsintownEvent): Node {
  const tickets = ticketUrl(event)
  const venue = venueLabel(event)
  return {
    '@type': 'MusicEvent',
    name: `Vågal – ${venue}`,
    startDate: isoWithOsloOffset(event),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.venue.city,
        ...(event.venue.region ? { addressRegion: event.venue.region } : {}),
        addressCountry: 'NO',
      },
    },
    performer: { '@id': BAND_ID },
    image: `${SITE_URL}/og-image.jpg`,
    url: event.url,
    ...(tickets ? { offers: { '@type': 'Offer', url: tickets, availability: 'https://schema.org/InStock' } } : {}),
  }
}

export function recordingNode(release: Release): Node {
  const url = `${SITE_URL}${songPath(release)}`
  const isAlbum = release.releaseType === 'album' || release.releaseType === 'EP'
  return {
    '@type': isAlbum ? 'MusicAlbum' : 'MusicRecording',
    '@id': `${url}#recording`,
    url,
    name: release.title,
    byArtist: { '@id': BAND_ID },
    datePublished: release.releaseDate,
    inLanguage: 'nb-NO',
    ...(release.coverImage?.asset ? { image: imageUrl(release.coverImage, 1200, { ratio: 1 }) } : {}),
    ...(release.lyrics
      ? {
          recordingOf: {
            '@type': 'MusicComposition',
            name: release.title,
            lyrics: { '@type': 'CreativeWork', text: release.lyrics },
          },
        }
      : {}),
  }
}

export function faqNode(items: Faq[]): Node {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function breadcrumbNode(trail: Array<{ name: string; path: string }>): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: `${SITE_URL}${step.path}`,
    })),
  }
}

/** One JSON-LD document holding several nodes. */
export function graph(...nodes: Node[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}
