import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity/client'
import { releasesQuery } from '@/lib/sanity/queries'
import type { Release } from '@/types/sanity'

declare global {
  interface Window {
    /** Releases inlined into prerendered song pages (scripts/prerender-songs.mjs) */
    __VAAGAL_RELEASES__?: Release[]
  }
}

/**
 * Hook to fetch all releases from Sanity CMS
 * Follows the standard data fetching pattern from architecture
 *
 * @returns { data, loading, error } - Releases state
 *
 * @example
 * const { data, loading, error } = useReleases()
 * if (loading) return <LoadingSpinner />
 * if (error) return <ErrorMessage message={error.message} />
 * return <ReleaseGrid releases={data} />
 */
export function useReleases() {
  // Song pages written by scripts/prerender-songs.mjs carry the releases inline,
  // so they render at once. The fetch below still runs and brings fresh data.
  const initial = typeof window !== 'undefined' ? window.__VAAGAL_RELEASES__ ?? null : null
  const [data, setData] = useState<Release[] | null>(initial)
  const [loading, setLoading] = useState(initial === null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<Release[]>(releasesQuery)
      .then(setData)
      .catch((err) => {
        // With inlined releases on screen, a failed refresh is not worth an error page
        if (initial === null) setError(err instanceof Error ? err : new Error(String(err)))
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading, error }
}
