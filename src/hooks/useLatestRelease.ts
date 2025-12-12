import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity/client'
import { latestReleaseQuery } from '@/lib/sanity/queries'
import type { Release } from '@/types/sanity'

/**
 * Hook to fetch the latest featured release from Sanity CMS
 * Used for homepage hero feature
 *
 * @returns { data, loading, error } - Latest release state
 *
 * @example
 * const { data, loading, error } = useLatestRelease()
 * if (loading) return <LoadingSpinner />
 * if (!data) return <DefaultHero />
 * return <LatestReleaseHero release={data} />
 */
export function useLatestRelease() {
  const [data, setData] = useState<Release | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<Release | null>(latestReleaseQuery)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
