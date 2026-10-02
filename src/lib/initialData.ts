import type { BandMember, HeroContent, Release } from '@/types/sanity'
import type { BandsintownEvent } from '@/lib/concerts'

/**
 * The content a page was built with. The build (scripts/prerender.mjs) loads it
 * once, renders every public page to HTML with it, and inlines it in each page
 * as window.__VAAGAL_DATA__. The app then starts from exactly the data the HTML
 * was made from, so React can take over the server markup without a flash, and
 * refreshes it in the background.
 */
export interface InitialData {
  /** ISO timestamp of the build */
  builtAt: string
  /** YYYY-MM-DD in Norway at build time */
  today: string
  hero: HeroContent | null
  latestRelease: Release | null
  releases: Release[]
  members: BandMember[]
  concerts: BandsintownEvent[]
  pastConcerts: BandsintownEvent[]
}

declare global {
  interface Window {
    __VAAGAL_DATA__?: InitialData
  }
}

let store: InitialData | null = typeof window !== 'undefined' ? window.__VAAGAL_DATA__ ?? null : null

/** The server renderer sets this before rendering each page. */
export function setInitialData(data: InitialData | null) {
  store = data
}

export function getInitialData(): InitialData | null {
  return store
}

/**
 * React Query options that start a query from the built-in data, marked as
 * fetched at build time, so it renders at once and refetches when stale.
 */
export function seededFrom<T>(pick: (data: InitialData) => T | undefined) {
  const data = store
  if (!data) return {}
  const value = pick(data)
  return value === undefined ? {} : { initialData: value, initialDataUpdatedAt: Date.parse(data.builtAt) }
}
