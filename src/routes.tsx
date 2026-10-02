import type { ComponentType } from "react";
import type { RouteObject } from "react-router-dom";
import App from "./App";
import Home from "./pages/Hjem";
import Konserter from "./pages/Konserter";
import Bandet from "./pages/Bandet";
import Diskografi from "./pages/Diskografi";
import Booking from "./pages/Booking";
import KontaktOss from "./pages/KontaktOss";
import Merch from "./pages/Merch";
import Sang from "./pages/Sang";
import NotFoundPage from "./pages/NotFoundPage";
import { LoadingSpinner } from "./components/LoadingSpinner";

/**
 * Pages that only run in the browser are split out and downloaded when someone
 * goes there: the AI dashboard (band members only) and the unlisted /arrangor page.
 */
const onDemand = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
});

const pageLoading = <LoadingSpinner size="lg" className="min-h-dvh" />;

/**
 * The route table, shared by the browser (src/main.tsx) and the build's
 * server renderer (src/entry-server.tsx), so both render the same pages.
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "konserter", element: <Konserter /> },
      { path: "bandet", element: <Bandet /> },
      { path: "diskografi", element: <Diskografi /> },
      { path: "booking", element: <Booking /> },
      { path: "kontakt-oss", element: <KontaktOss /> },
      { path: "arrangor", lazy: onDemand(() => import("./pages/Arrangoerer")), hydrateFallbackElement: pageLoading },
      { path: "merch", element: <Merch /> },
      // One page per release: vaagalband.no/<slug>. Unknown slugs render the 404 page.
      { path: ":slug", element: <Sang /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/ai",
    lazy: onDemand(() => import("./layouts/AiShell")),
    // Shown while the dashboard chunk loads when /ai is the first page opened
    hydrateFallbackElement: pageLoading,
    children: [
      { index: true, lazy: onDemand(() => import("./pages/ai/Dashboard")) },
      { path: "create", lazy: onDemand(() => import("./pages/ai/Create")) },
      { path: "batch", lazy: onDemand(() => import("./pages/ai/BatchCreate")) },
      { path: "chat", lazy: onDemand(() => import("./pages/ai/Chat")) },
      { path: "review", lazy: onDemand(() => import("./pages/ai/Review")) },
      { path: "review/:id", lazy: onDemand(() => import("./pages/ai/DraftDetail")) },
      { path: "schedule", lazy: onDemand(() => import("./pages/ai/Schedule")) },
      { path: "library", lazy: onDemand(() => import("./pages/ai/Library")) },
      { path: "settings", lazy: onDemand(() => import("./pages/ai/AiSettings")) },
    ],
  },
];

/** Public pages the build renders to static HTML (song pages are added from Sanity). */
export const STATIC_PAGES = ["/", "/konserter", "/bandet", "/diskografi", "/booking", "/merch", "/kontakt-oss"];
