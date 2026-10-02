import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// Barlow served from the site itself: no request to Google before the first paint
import "@fontsource/barlow/latin-400.css"
import "@fontsource/barlow/latin-500.css"
import "@fontsource/barlow/latin-600.css"
import "@fontsource/barlow/latin-700.css"
import "@fontsource/barlow-condensed/latin-600.css"
import "@fontsource/barlow-condensed/latin-700.css"
import "./index.css"
import { routes } from "./routes"

const router = createBrowserRouter(routes)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1 },
  },
})

const app = (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
)

const container = document.getElementById("root")!

// Pages built by scripts/prerender.mjs arrive as finished HTML plus the data
// they were made from: React takes over that markup instead of redrawing it.
// Pages without it (/ai, /arrangor, the dev server) start from an empty root.
if (window.__VAAGAL_DATA__ && container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
