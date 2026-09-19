import type { ComponentType } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Hjem";
import Konserter from "./pages/Konserter";
import Bandet from "./pages/Bandet";
import Diskografi from "./pages/Diskografi";
import KontaktOss from "./pages/KontaktOss";
import Arrangoerer from "./pages/Arrangoerer";
import Merch from "./pages/Merch";
import Sang from "./pages/Sang";
import NotFoundPage from "./pages/NotFoundPage";
import { LoadingSpinner } from "./components/LoadingSpinner";

/**
 * The AI dashboard is for logged-in band members only, so it is split out of
 * the main bundle: each /ai route is downloaded when someone goes there, and
 * fans on a phone never pay for it.
 */
const onDemand = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "konserter", element: <Konserter /> },
      { path: "bandet", element: <Bandet /> },
      { path: "diskografi", element: <Diskografi /> },
      { path: "kontakt-oss", element: <KontaktOss /> },
      { path: "arrangor", element: <Arrangoerer /> },
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
    hydrateFallbackElement: <LoadingSpinner size="lg" className="min-h-dvh" />,
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
]);
