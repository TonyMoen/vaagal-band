import { useState } from "react";
import { useAuth } from "@/lib/auth";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      setError("Feil e-post eller passord");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center bg-[var(--color-accent)] font-condensed text-xl font-bold text-white">
            V
          </div>
          <h1 className="mt-4 font-condensed text-2xl font-bold uppercase tracking-wider text-[var(--color-text)]">
            Vagal AI
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Logg inn for a fa tilgang
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-semibold text-[var(--color-text)]"
            >
              E-post
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
              placeholder="din@epost.no"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-semibold text-[var(--color-text)]"
            >
              Passord
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
              placeholder="Passord"
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-accent)] px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Logger inn..." : "Logg inn"}
          </button>
        </form>
      </div>
    </div>
  );
}
