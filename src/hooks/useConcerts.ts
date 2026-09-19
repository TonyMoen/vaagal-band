import { useQuery } from '@tanstack/react-query'
import { fetchConcerts } from '@/lib/concerts'

/**
 * Upcoming concerts from Bandsintown. One cached request shared by the
 * homepage strip, the homepage list and the concerts page.
 */
export function useConcerts() {
  return useQuery({
    queryKey: ['concerts'],
    queryFn: fetchConcerts,
    staleTime: 5 * 60_000,
  })
}
