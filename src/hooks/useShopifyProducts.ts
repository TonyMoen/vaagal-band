import { useState, useEffect } from 'react'
import { shopifyFetch } from '@/lib/shopify/client'
import { productsQuery } from '@/lib/shopify/queries'
import type { ShopifyProduct, ShopifyProductsResponse } from '@/types/shopify'

interface UseShopifyProductsOptions {
  limit?: number
  filterByArtist?: string
}

/**
 * Hook to fetch products from Shopify Storefront API
 * Follows the standard data fetching pattern from architecture
 *
 * @param options - Configuration options
 * @param options.limit - Maximum number of products to fetch (default: 30)
 * @param options.filterByArtist - Filter products to only include those with this text in the title
 * @returns { data, loading, error } - Products state
 *
 * @example
 * const { data, loading, error } = useShopifyProducts({ filterByArtist: 'Vågal' })
 * if (loading) return <LoadingSkeleton />
 * if (error) return <ErrorMessage message={error.message} />
 * return <ProductGrid products={data} />
 */
export function useShopifyProducts(options: UseShopifyProductsOptions = {}) {
  const { limit = 30, filterByArtist } = options
  const [data, setData] = useState<ShopifyProduct[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    shopifyFetch<ShopifyProductsResponse>(productsQuery, {
      first: limit,
      sortKey: 'BEST_SELLING',
    })
      .then((response) => {
        let products = response.products.edges.map((edge) => edge.node)

        // Filter by artist name if specified
        // Uses Unicode normalization and fallback matching for Norwegian characters
        if (filterByArtist) {
          // Normalize filter to ASCII for robust matching
          const toAscii = (str: string) =>
            str.toLowerCase()
              .normalize('NFKD')
              .replace(/[\u0300-\u036f]/g, '') // Remove combining diacritics
              .replace(/[åÅ\u212B]/g, 'a')     // Å variants including Angstrom
              .replace(/[øØ]/g, 'o')
              .replace(/[æÆ]/g, 'ae')

          const asciiFilter = toAscii(filterByArtist)

          products = products.filter((product) => {
            const asciiTitle = toAscii(product.title)
            return asciiTitle.includes(asciiFilter)
          })
        }

        setData(products)
      })
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [limit, filterByArtist])

  return { data, loading, error }
}
