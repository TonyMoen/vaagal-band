import { useQuery } from '@tanstack/react-query'
import { sanityFetch } from '@/lib/sanity/client'
import { releasesQuery } from '@/lib/sanity/queries'
import { seededFrom } from '@/lib/initialData'
import type { Release } from '@/types/sanity'

/**
 * All releases, newest first. Feeds the discography, the release rail and the
 * song pages. Starts from the releases the page was built with, so the song
 * pages render at once, and refreshes in the background.
 *
 * @returns { data, loading, error }
 */
export function useReleases() {
  const query = useQuery({
    queryKey: ['releases'],
    queryFn: () => sanityFetch<Release[]>(releasesQuery),
    ...seededFrom((data) => data.releases),
  })
  return { data: query.data ?? null, loading: query.isPending, error: query.error }
}
