/**
 * Song pages: every release in Sanity gets its own page at vaagalband.no/<slug>
 * with links to all streaming services. These helpers are shared by the page
 * and the cards that link to it. scripts/prerender-songs.mjs mirrors slugify,
 * songSlug and services for the static share pages, so keep them in step.
 */
import type { Release } from "@/types/sanity"

export type ServiceName =
  | "spotify"
  | "apple"
  | "youtube"
  | "youtubeMusic"
  | "tidal"
  | "deezer"
  | "amazon"

export interface Service {
  key: ServiceName
  label: string
  /** "Lytt" or "Se", shown on the right side of the row */
  verb: string
  url: string
}

export const BAND_NAME = "Vågal"

/** Top level routes the site owns. A song can never take one of these. */
const RESERVED_SLUGS = new Set([
  "konserter",
  "bandet",
  "diskografi",
  "kontakt-oss",
  "arrangor",
  "merch",
  "ai",
  "assets",
])

/** "Øst til Vest" -> "ost-til-vest", "Bånn Gass" -> "bann-gass" */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " og ")
    .replace(/['’`´]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

/** The slug from Sanity, or one made from the title when the field is empty. */
export function songSlug(release: Pick<Release, "title" | "slug">): string {
  const slug = release.slug?.current?.trim() || slugify(release.title)
  return RESERVED_SLUGS.has(slug) ? `${slug}-sang` : slug
}

export function songPath(release: Pick<Release, "title" | "slug">): string {
  return `/${songSlug(release)}`
}

/** Finds the release that owns a slug. The newest one wins if two titles collide. */
export function findReleaseBySlug(releases: Release[], slug: string): Release | undefined {
  return releases.find((release) => songSlug(release) === slug)
}

/** Today's date in Norway as YYYY-MM-DD. */
export function osloToday(): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Oslo" }).format(new Date())
}

/** True until the release date arrives (Norwegian time). */
export function isUpcoming(release: Pick<Release, "releaseDate">, today = osloToday()): boolean {
  return release.releaseDate > today
}

export function yearOf(release: Pick<Release, "releaseDate">): string {
  return release.releaseDate.slice(0, 4)
}

/** "4. juli 2025" */
export function formatDato(iso: string): string {
  return new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Oslo",
  }).format(new Date(`${iso}T12:00:00Z`))
}

/** "Singel", "EP" or "Album" */
export function typeLabel(release: Pick<Release, "releaseType">): string {
  if (release.releaseType === "EP") return "EP"
  if (release.releaseType === "album") return "Album"
  return "Singel"
}

/** ["Vågal", "Endless"]. Vågal alone unless the release names collaborators. */
export function artistNames(release: Pick<Release, "artistLine">): string[] {
  const names = (release.artistLine ?? "")
    .split(/,|·|&| og /)
    .map((name) => name.trim())
    .filter(Boolean)
  return names.length > 0 ? names : [BAND_NAME]
}

function joinNames(names: string[]): string {
  return names.length <= 1
    ? names.join("")
    : `${names.slice(0, -1).join(", ")} og ${names[names.length - 1]}`
}

/**
 * The text under the title. Uses the description from Sanity when there is
 * one, otherwise a factual sentence built from the metadata, so nothing is
 * invented.
 */
export function songSummary(release: Release): string {
  const description = release.description?.trim()
  if (description) return description
  const who = joinNames(artistNames(release))
  const what = release.releaseType === "EP" ? "en EP" : release.releaseType === "album" ? "et album" : "en singel"
  if (isUpcoming(release)) {
    return `«${release.title}» er ${what} fra ${who} som slippes ${formatDato(release.releaseDate)}.`
  }
  return `«${release.title}» er ${what} fra ${who}, utgitt ${yearOf(release)}.`
}

/** Video id from youtube.com/watch, music.youtube.com/watch, youtu.be and /shorts links. */
export function youtubeId(url?: string | null): string | null {
  if (!url) return null
  try {
    const parsed = new URL(url)
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1) || null
    const fromQuery = parsed.searchParams.get("v")
    if (fromQuery) return fromQuery
    const match = parsed.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]{6,})/)
    return match ? match[1] : null
  } catch {
    return null
  }
}

/** Streaming services with a link, Spotify first. Rows without a link are left out. */
export function services(release: Release): Service[] {
  const videoId = youtubeId(release.youtubeUrl)
  const youtube = videoId ? `https://www.youtube.com/watch?v=${videoId}` : release.youtubeUrl
  const youtubeMusic = videoId ? `https://music.youtube.com/watch?v=${videoId}` : undefined

  const all: Array<[ServiceName, string, string, string | null | undefined]> = [
    ["spotify", "Spotify", "Lytt", release.spotifyUrl],
    ["apple", "Apple Music", "Lytt", release.appleMusicUrl],
    ["youtube", "YouTube", "Se", youtube],
    ["youtubeMusic", "YouTube Music", "Lytt", youtubeMusic],
    ["tidal", "Tidal", "Lytt", release.tidalUrl],
    ["deezer", "Deezer", "Lytt", release.deezerUrl],
    ["amazon", "Amazon Music", "Lytt", release.amazonMusicUrl],
  ]

  return all.flatMap(([key, label, verb, url]) => (url ? [{ key, label, verb, url }] : []))
}
