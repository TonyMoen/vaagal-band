import { useQuery } from '@tanstack/react-query'
import { sanityFetch } from '@/lib/sanity/client'
import { heroQuery } from '@/lib/sanity/queries'
import { seededFrom } from '@/lib/initialData'
import type { HeroContent } from '@/types/sanity'

/**
 * Hero content from Sanity: the background photo and the latest music video.
 * Starts from the content the page was built with, refreshes in the background.
 *
 * @returns { data, loading, error }
 */
export function useHero() {
  const query = useQuery({
    queryKey: ['hero'],
    queryFn: () => sanityFetch<HeroContent | null>(heroQuery),
    ...seededFrom((data) => data.hero),
  })
  return { data: query.data ?? null, loading: query.isPending, error: query.error }
}
