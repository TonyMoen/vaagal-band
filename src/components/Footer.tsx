import { NavLink } from "react-router-dom"
import logo from "../assets/vaagal-logo.svg"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto grid max-w-[1100px] gap-8 px-4 py-12 md:grid-cols-3 md:py-16">
        <div className="flex justify-center md:justify-start">
          <NavLink
            to="/"
            end
            className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-lg"
          >
            <img
              src={logo}
              alt="Vågal"
              className="h-24 w-auto md:h-32 lg:h-40"
              loading="eager"
              decoding="async"
            />
          </NavLink>
        </div>

        <nav aria-label="Bunnmeny" className="grid gap-3 text-center md:text-left">
          <NavLink
            className={({ isActive }) =>
              `py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded ${
                isActive
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
              }`
            }
            to="/"
            end
          >
            Hjem
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded ${
                isActive
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
              }`
            }
            to="/bandet"
          >
            Bandet
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded ${
                isActive
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
              }`
            }
            to="/konserter"
          >
            Konserter
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded ${
                isActive
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
              }`
            }
            to="/kontakt-oss"
          >
            Kontakt oss
          </NavLink>
        </nav>

        <div className="grid gap-4 text-center md:text-left">
          <div className="font-medium text-[var(--color-text)]">Følg oss</div>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
              href="https://open.spotify.com/artist/4aFADqsMf5HWZhfBrZzM3L"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify - Vågal artist page (opens in new tab)"
            >
              Spotify
            </a>
            <a
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
              href="https://www.youtube.com/@vaagalband"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube - Vågal channel (opens in new tab)"
            >
              YouTube
            </a>
            <a
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
              href="https://www.instagram.com/vaagal_band/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram - Vågal (opens in new tab)"
            >
              Instagram
            </a>
            <a
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
              href="https://www.facebook.com/vaagal.band.no/?locale=nb_NO"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook - Vågal (opens in new tab)"
            >
              Facebook
            </a>
            <a
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
              href="https://www.tiktok.com/@vaagalband"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok - Vågal (opens in new tab)"
            >
              TikTok
            </a>
          </div>
          <div className="text-sm text-[var(--color-muted)]">© {year} Vågal</div>
        </div>
      </div>
    </footer>
  )
}
