import { useQuery } from '@tanstack/react-query'
import { sanityFetch } from '@/lib/sanity/client'
import { latestReleaseQuery } from '@/lib/sanity/queries'
import { osloToday } from '@/lib/songs'
import { seededFrom } from '@/lib/initialData'
import type { Release } from '@/types/sanity'

/**
 * The release the homepage hero promotes: the newest one that is out, or the
 * one pinned in Sanity.
 *
 * @returns { data, loading, error }
 */
export function useLatestRelease() {
  const query = useQuery({
    queryKey: ['latestRelease'],
    queryFn: () => sanityFetch<Release | null>(latestReleaseQuery, { today: osloToday() }),
    ...seededFrom((data) => data.latestRelease),
  })
  return { data: query.data ?? null, loading: query.isPending, error: query.error }
}
