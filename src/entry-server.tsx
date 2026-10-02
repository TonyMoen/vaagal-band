/**
 * Server entry used only by the build (scripts/prerender.mjs). It loads the
 * content once and renders every public page to HTML with the same components
 * the browser uses, so crawlers, link previews and visitors on a slow phone get
 * the finished page before any JavaScript runs.
 */
import { StrictMode } from "react"
import { renderToString } from "react-dom/server"
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router-dom"
import { HelmetProvider, type HelmetServerState } from "react-helmet-async"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { routes, STATIC_PAGES } from "./routes"
import { setInitialData, type InitialData } from "./lib/initialData"
import { sanityFetch } from "./lib/sanity/client"
import { bandMembersQuery, heroQuery, latestReleaseQuery, releasesQuery } from "./lib/sanity/queries"
import { fetchConcerts, fetchPastConcerts } from "./lib/concerts"
import { osloToday, songPath } from "./lib/songs"
import type { BandMember, HeroContent, Release } from "./types/sanity"

export { buildLlmsTxt, buildSitemap } from "./lib/seoFiles"
export { SITE_URL } from "./lib/band"

/** Everything the pages read, fetched once per build. Bandsintown failing must not fail the build. */
export async function loadInitialData(): Promise<InitialData> {
  const today = osloToday()
  const [hero, latestRelease, releases, members, concerts, pastConcerts] = await Promise.all([
    sanityFetch<HeroContent | null>(heroQuery),
    sanityFetch<Release | null>(latestReleaseQuery, { today }),
    sanityFetch<Release[]>(releasesQuery),
    sanityFetch<BandMember[]>(bandMembersQuery),
    fetchConcerts().catch(() => []),
    fetchPastConcerts().catch(() => []),
  ])
  return { builtAt: new Date().toISOString(), today, hero, latestRelease, releases, members, concerts, pastConcerts }
}

/** The public pages to build: the fixed pages plus one per release. */
export function pagesToBuild(data: InitialData): string[] {
  const songs = [...new Set(data.releases.filter((r) => r.title && r.releaseDate).map((r) => songPath(r)))]
  return [...STATIC_PAGES, ...songs]
}

export interface RenderedPage {
  html: string
  head: string
  htmlAttributes: string
}

/** Renders one URL to its body HTML and the head tags the page set through Helmet. */
export async function render(url: string, data: InitialData): Promise<RenderedPage> {
  setInitialData(data)
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(`https://vaagalband.no${url}`))
  if (context instanceof Response) throw new Error(`${url} answered with a redirect`)
  const router = createStaticRouter(handler.dataRoutes, context)

  const helmetContext: { helmet?: HelmetServerState } = {}
  // A fresh cache per page; queries start from the build data and never fetch here
  const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, retry: 1 } } })

  const html = renderToString(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider context={helmetContext}>
          <StaticRouterProvider router={router} context={context} hydrate={false} />
        </HelmetProvider>
      </QueryClientProvider>
    </StrictMode>
  )

  const helmet = helmetContext.helmet
  const head = helmet
    ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((part) => part.toString()).filter(Boolean).join("\n    ")
    : ""
  return { html, head, htmlAttributes: helmet ? helmet.htmlAttributes.toString() : 'lang="nb"' }
}
