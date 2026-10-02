import { useQuery } from '@tanstack/react-query'
import { sanityFetch } from '@/lib/sanity/client'
import { promoterMaterialsQuery } from '@/lib/sanity/queries'
import type { PromoterMaterials } from '@/types/sanity'

/**
 * Promoter materials (riders, press kit) for the unlisted /arrangor page and
 * the rider link on the booking page.
 *
 * @returns { data, loading, error }
 */
export function usePromoterMaterials() {
  const query = useQuery({
    queryKey: ['promoter'],
    queryFn: () => sanityFetch<PromoterMaterials | null>(promoterMaterialsQuery),
    staleTime: 10 * 60_000,
  })
  return { data: query.data ?? null, loading: query.isPending, error: query.error }
}
