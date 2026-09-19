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
      <AuthGuard>
        <AiLayout />
      </AuthGuard>
    </AuthProvider>
  );
}
