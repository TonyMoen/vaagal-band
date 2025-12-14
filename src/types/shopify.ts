/**
 * Product from Shopify Storefront API
 * Used by useShopifyProducts hook and ProductCard component
 */
export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  images: {
    edges: Array<{
      node: {
        url: string
        altText: string | null
      }
    }>
  }
  onlineStoreUrl: string
}

/**
 * GraphQL response structure for products query
 */
export interface ShopifyProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct
    }>
  }
}
