import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Hjem";
import Konserter from "./pages/Konserter";
import Merch from "./pages/Merch";
import Bandet from "./pages/Bandet";
import KontaktOss from "./pages/KontaktOss";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "konserter", element: <Konserter /> },
      { path: "merch", element: <Merch /> },
      { path: "bandet", element: <Bandet /> },
      { path: "kontakt-oss", element: <KontaktOss /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
