import { useQuery } from '@tanstack/react-query'
import { fetchConcerts, fetchPastConcerts } from '@/lib/concerts'
import { seededFrom } from '@/lib/initialData'

/**
 * Upcoming concerts from Bandsintown. One cached request shared by the
 * homepage strip, the homepage list and the concerts page. Starts from the
 * concerts the page was built with and refreshes in the background.
 */
export function useConcerts() {
  return useQuery({
    queryKey: ['concerts'],
    queryFn: fetchConcerts,
    staleTime: 5 * 60_000,
    ...seededFrom((data) => data.concerts),
  })
}

/** Past concerts, newest first, for the archive and the booking page. */
export function usePastConcerts() {
  return useQuery({
    queryKey: ['pastConcerts'],
    queryFn: fetchPastConcerts,
    staleTime: 60 * 60_000,
    ...seededFrom((data) => data.pastConcerts),
  })
}
