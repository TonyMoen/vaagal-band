import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="container-page mx-auto max-w-xl py-16 text-center">
      {/* Never index a "not found" page, also when it is shown with status 200 inside the app */}
      <Helmet>
        <title>Siden finnes ikke | Vågal</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1 className="text-3xl font-semibold">
        Denne siden eksisterer ikke
      </h1>
      <p className="mt-2 text-sm opacity-70">Gå tilbake til forsiden.</p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button onClick={() => navigate(-1)} className="btn-outline">
          Gå tilbake
        </button>
        <Link to="/" className="btn">
          Til forsiden
        </Link>
      </div>
    </div>
  );
}
