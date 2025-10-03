import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.title = "404 – Siden finnes ikke";
    h1Ref.current?.focus();
  }, []);

  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <h1 ref={h1Ref} tabIndex={-1} className="text-3xl font-semibold">
        Denne siden eksisterer ikke
      </h1>
      <p className="mt-2 text-sm opacity-70">Gå tilbake til forsiden.</p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl border px-4 py-2"
        >
          Gå tilbake
        </button>
        <Link to="/" className="rounded-xl bg-black px-4 py-2 text-white">
          Til forsiden
        </Link>
      </div>
    </div>
  );
}
