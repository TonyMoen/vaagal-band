import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Hjem";
import Konserter from "./pages/Konserter";
import Bandet from "./pages/Bandet";
import Diskografi from "./pages/Diskografi";
import KontaktOss from "./pages/KontaktOss";
import Arrangoerer from "./pages/Arrangoerer";
import Merch from "./pages/Merch";
import NotFoundPage from "./pages/NotFoundPage";
import AiLayout from "./layouts/AiLayout";
import Dashboard from "./pages/ai/Dashboard";
import Create from "./pages/ai/Create";
import BatchCreate from "./pages/ai/BatchCreate";
import Chat from "./pages/ai/Chat";
import Library from "./pages/ai/Library";
import AiSettings from "./pages/ai/AiSettings";
import Review from "./pages/ai/Review";
import DraftDetail from "./pages/ai/DraftDetail";
import Schedule from "./pages/ai/Schedule";

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
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/ai",
    element: <AiLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "create", element: <Create /> },
      { path: "batch", element: <BatchCreate /> },
      { path: "chat", element: <Chat /> },
      { path: "review", element: <Review /> },
      { path: "review/:id", element: <DraftDetail /> },
      { path: "schedule", element: <Schedule /> },
      { path: "library", element: <Library /> },
      { path: "settings", element: <AiSettings /> },
    ],
  },
]);
