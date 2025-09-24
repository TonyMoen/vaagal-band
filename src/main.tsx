import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* Pages */
import Konserter from "./pages/Konserter";
import Merch from "./pages/Merch";
import Bandet from "./pages/Bandet";
import KontaktOss from "./pages/KontaktOss";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/konserter", element: <Konserter /> },
  { path: "/merch", element: <Merch /> },
  { path: "/bandet", element: <Bandet /> },
  { path: "/kontakt-oss", element: <KontaktOss /> },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
