const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN

if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
  console.warn('[Shopify] Missing environment variables. Merch features will be unavailable.')
}

const GRAPHQL_ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    throw new Error('Shopify configuration missing')
  }

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`)
  }

  const json = (await response.json()) as GraphQLResponse<T>

  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join(', '))
  }

  if (!json.data) {
    throw new Error('No data returned from Shopify')
  }

  return json.data
}
