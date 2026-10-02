import { Helmet } from "react-helmet-async";
import { AuthProvider } from "@/lib/auth";
import AuthGuard from "./AuthGuard";
import AiLayout from "./AiLayout";

/**
 * Everything under /ai: the login gate plus the dashboard frame.
 * Loaded on demand from routes.tsx, so visitors to the band site never download it.
 */
export default function AiShell() {
  return (
    <AuthProvider>
      {/* Internal tool: keep it out of search results (vercel.json also sends X-Robots-Tag) */}
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AuthGuard>
        <AiLayout />
      </AuthGuard>
    </AuthProvider>
  );
}
