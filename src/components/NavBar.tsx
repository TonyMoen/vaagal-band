// src/components/NavBar.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/vaagal-logo.svg";

const items = [
  { to: "/", label: "Hjem", end: true },
  { to: "/bandet", label: "Bandet" },
  { to: "/konserter", label: "Konserter" },
  { to: "/kontakt-oss", label: "Kontakt oss" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const linkBase =
    "relative inline-flex items-center rounded-2xl px-5 py-4 text-base font-semibold transition";
  const linkInactive =
    "text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)]/30";
  const linkActive = "text-[var(--color-text)] bg-[var(--color-bg)]/30";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-surface)]/80">
      <nav
        className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-8 px-6"
        aria-label="Hovednavigasjon"
      >
        <NavLink
          to="/"
          end
          className="inline-flex items-center"
          aria-label="Vågal – Hjem"
        >
          <img
            src={logo}
            alt="Vågal"
            className="h-16 w-auto"
            loading="eager"
            decoding="async"
          />
        </NavLink>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-2">
          {items.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end as boolean | undefined}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className={`absolute inset-x-4 -bottom-1 h-1 rounded-full bg-[var(--color-accent)] transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--color-border)] hover:bg-[var(--color-bg)]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          aria-label="Meny"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className={`h-6 w-6 ${open ? "hidden" : "block"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 7h16M4 12h16M4 17h16"
            />
          </svg>
          <svg
            className={`h-6 w-6 ${open ? "block" : "hidden"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] transition-[max-height] duration-200 ${
          open ? "max-h-96" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="mx-auto max-w-[1280px] px-6 py-2 flex flex-col gap-1">
          {items.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end as boolean | undefined}
                className={({ isActive }) =>
                  `block rounded-2xl px-5 py-4 text-base font-semibold ${
                    isActive
                      ? "bg-[var(--color-bg)]/30 text-[var(--color-text)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)]/30"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
