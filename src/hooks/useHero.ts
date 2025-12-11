import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity/client'
import { heroQuery } from '@/lib/sanity/queries'
import type { HeroContent } from '@/types/sanity'

/**
 * Hook to fetch hero content from Sanity CMS
 * Follows the standard data fetching pattern from architecture
 *
 * @returns { data, loading, error } - Hero content state
 *
 * @example
 * const { data, loading, error } = useHero()
 * if (loading) return <LoadingSpinner />
 * if (error) return <ErrorMessage message={error.message} />
 * return <Hero data={data} />
 */
export function useHero() {
  const [data, setData] = useState<HeroContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<HeroContent>(heroQuery)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
