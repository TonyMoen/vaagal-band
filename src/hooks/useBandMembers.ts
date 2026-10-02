import { useQuery } from '@tanstack/react-query'
import { sanityFetch } from '@/lib/sanity/client'
import { bandMembersQuery } from '@/lib/sanity/queries'
import { seededFrom } from '@/lib/initialData'
import type { BandMember } from '@/types/sanity'

/**
 * Band members in Sanity order. Starts from the members the page was built
 * with and refreshes in the background.
 *
 * @returns { data, loading, error }
 */
export function useBandMembers() {
  const query = useQuery({
    queryKey: ['members'],
    queryFn: () => sanityFetch<BandMember[]>(bandMembersQuery),
    ...seededFrom((data) => data.members),
  })
  return { data: query.data ?? null, loading: query.isPending, error: query.error }
}
