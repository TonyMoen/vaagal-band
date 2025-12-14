import { useState, useEffect } from 'react'
import { shopifyFetch } from '@/lib/shopify/client'
import { productsQuery } from '@/lib/shopify/queries'
import type { ShopifyProduct, ShopifyProductsResponse } from '@/types/shopify'

/**
 * Hook to fetch products from Shopify Storefront API
 * Follows the standard data fetching pattern from architecture
 *
 * @param limit - Maximum number of products to fetch (default: 30)
 * @returns { data, loading, error } - Products state
 *
 * @example
 * const { data, loading, error } = useShopifyProducts()
 * if (loading) return <LoadingSkeleton />
 * if (error) return <ErrorMessage message={error.message} />
 * return <ProductGrid products={data} />
 */
export function useShopifyProducts(limit: number = 30) {
  const [data, setData] = useState<ShopifyProduct[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    shopifyFetch<ShopifyProductsResponse>(productsQuery, {
      first: limit,
      sortKey: 'BEST_SELLING',
    })
      .then((response) => {
        const products = response.products.edges.map((edge) => edge.node)
        setData(products)
      })
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [limit])

  return { data, loading, error }
}
