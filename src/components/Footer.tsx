import { NavLink } from "react-router-dom";
import logo from "../assets/vaagal-logo.svg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border">
      <div className="mx-auto grid max-w-[1100px] gap-8 px-4 py-8 md:grid-cols-3">
        <div>
          <NavLink to="/" end className="inline-flex items-center">
            <img
              src={logo}
              alt="Vågal"
              className="h-40 w-auto"
              loading="eager"
              decoding="async"
            />
          </NavLink>
        </div>

        <nav aria-label="Bunnmeny" className="grid gap-2 text-sm">
          <NavLink className="hover:underline" to="/" end>
            Hjem
          </NavLink>
          <NavLink className="hover:underline" to="/bandet">
            Bandet
          </NavLink>
          <NavLink className="hover:underline" to="/konserter">
            Konserter
          </NavLink>
          <NavLink className="hover:underline" to="/merch">
            Merch
          </NavLink>
          <NavLink className="hover:underline" to="/kontakt-oss">
            Kontakt oss
          </NavLink>
        </nav>

        <div className="grid gap-2 text-sm">
          <div className="font-medium">Følg oss</div>
          <div className="flex gap-3">
            <a
              className="hover:underline"
              href="https://www.instagram.com/vaagal_band/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              className="hover:underline"
              href="https://www.facebook.com/vaagal.band.no/?locale=nb_NO"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              className="hover:underline"
              href="https://www.tiktok.com/@vaagalband"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              TikTok
            </a>
          </div>
          <div className="text-sm">© {year} Vågal</div>
        </div>
      </div>
    </footer>
  );
}
