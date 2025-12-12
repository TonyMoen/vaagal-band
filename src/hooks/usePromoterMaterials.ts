import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity/client'
import { promoterMaterialsQuery } from '@/lib/sanity/queries'
import type { PromoterMaterials } from '@/types/sanity'

/**
 * Hook to fetch promoter materials from Sanity CMS
 * Used for the hidden /arrangoerer page
 *
 * @returns { data, loading, error } - Promoter materials state
 *
 * @example
 * const { data, loading, error } = usePromoterMaterials()
 * if (loading) return <LoadingSpinner />
 * if (!data) return <EmptyState />
 * return <PromoterContent materials={data} />
 */
export function usePromoterMaterials() {
  const [data, setData] = useState<PromoterMaterials | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<PromoterMaterials | null>(promoterMaterialsQuery)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
