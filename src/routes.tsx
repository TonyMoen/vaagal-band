import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Hjem";
import Konserter from "./pages/Konserter";
import Bandet from "./pages/Bandet";
import Diskografi from "./pages/Diskografi";
import KontaktOss from "./pages/KontaktOss";
import Arrangoerer from "./pages/Arrangoerer";
import NotFoundPage from "./pages/NotFoundPage";

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
      { path: "arrangoerer", element: <Arrangoerer /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
