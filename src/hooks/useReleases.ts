import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity/client'
import { releasesQuery } from '@/lib/sanity/queries'
import type { Release } from '@/types/sanity'

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
  const [data, setData] = useState<Release[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<Release[]>(releasesQuery)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
