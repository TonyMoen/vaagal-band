import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Cloud, CloudOff, Save, Check } from "lucide-react";

export default function AiSettings() {
  const [apiUrl, setApiUrl] = useState(
    () => localStorage.getItem("vaagal-api-url") || ""
  );
  const [saved, setSaved] = useState(false);

  const health = useQuery({
    queryKey: ["health"],
    queryFn: api.health,
    retry: false,
  });

  const handleSave = () => {
    if (apiUrl.trim()) {
      localStorage.setItem("vaagal-api-url", apiUrl.trim());
    } else {
      localStorage.removeItem("vaagal-api-url");
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="mb-2 font-condensed text-3xl font-bold uppercase tracking-wider">
        Innstillingar
      </h1>
      <p className="mb-8 text-sm text-[var(--color-muted)]">
        Backend-tilkopling og konfigurasjon
      </p>

      {/* Connection status */}
      <div className="mb-6 border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--color-muted)]">
          Backend-status
        </h2>
        <div className="flex items-center gap-3">
          {health.isSuccess ? (
            <>
              <Cloud size={20} className="text-emerald-500" />
              <div>
                <p className="font-semibold text-emerald-500">Tilkoblet</p>
                <p className="text-xs text-[var(--color-muted)]">
                  Backend kjører og svarer på forespørsler
                </p>
              </div>
            </>
          ) : (
            <>
              <CloudOff size={20} className="text-red-400" />
              <div>
                <p className="font-semibold text-red-400">Frakoblet</p>
                <p className="text-xs text-[var(--color-muted)]">
                  Kan ikkje nå backend. Sjekk at serveren kjører.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* API URL */}
      <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--color-muted)]">
          API URL
        </h2>
        <p className="mb-3 text-xs text-[var(--color-muted)]">
          Overstyrer VITE_API_URL. La stå tom for å bruke standard (http://localhost:8000).
        </p>
        <div className="flex gap-2">
          <input
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="http://localhost:8000"
            className="flex-1 border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50 focus:border-[var(--color-accent)] focus:outline-none"
          />
          <button onClick={handleSave} className="btn gap-2 px-4 text-sm">
            {saved ? <Check size={14} /> : <Save size={14} />}
            {saved ? "Lagret" : "Lagre"}
          </button>
        </div>
      </div>
    </div>
  );
}
