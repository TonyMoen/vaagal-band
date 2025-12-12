import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity/client'
import { bandMembersQuery } from '@/lib/sanity/queries'
import type { BandMember } from '@/types/sanity'

/**
 * Hook to fetch band members from Sanity CMS
 * Follows the standard data fetching pattern from architecture
 *
 * @returns { data, loading, error } - Band members state
 *
 * @example
 * const { data, loading, error } = useBandMembers()
 * if (loading) return <LoadingSpinner />
 * if (error) return <ErrorMessage message={error.message} />
 * return <BandMemberList members={data} />
 */
export function useBandMembers() {
  const [data, setData] = useState<BandMember[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<BandMember[]>(bandMembersQuery)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
