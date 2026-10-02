/**
 * Read-only access to the Sanity content API through its CDN. A plain fetch
 * instead of @sanity/client: the site only ever reads public content, and the
 * client library cost the visitors' bundle tens of kilobytes. Works in the
 * browser and in Node (the build's prerender step uses the same queries).
 */
export const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID as string,
  dataset: import.meta.env.VITE_SANITY_DATASET as string,
  apiVersion: '2025-02-06',
}

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  const { projectId, dataset, apiVersion } = sanityConfig
  const url = new URL(`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`)
  url.searchParams.set('query', query)
  for (const [name, value] of Object.entries(params)) {
    url.searchParams.set(`$${name}`, JSON.stringify(value))
  }
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Sanity answered ${response.status}`)
  const body = (await response.json()) as { result: T }
  return body.result
}
