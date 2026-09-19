import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity/client'
import { latestReleaseQuery } from '@/lib/sanity/queries'
import { osloToday } from '@/lib/songs'
import type { Release } from '@/types/sanity'

/**
 * Hook to fetch the release the homepage hero promotes: the newest one that
 * is out, or the one pinned in Sanity
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
      .fetch<Release | null>(latestReleaseQuery, { today: osloToday() })
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
