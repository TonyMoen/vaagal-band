import { useAuth } from "@/lib/auth";
import Login from "@/pages/ai/Login";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { email, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[var(--color-bg)]">
        <div className="h-8 w-8 animate-spin border-4 border-[var(--color-accent)] border-t-transparent" />
      </div>
    );
  }

  if (!email) {
    return <Login />;
  }

  return <>{children}</>;
}
