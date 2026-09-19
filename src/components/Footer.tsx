import { NavLink } from "react-router-dom"
import logo from "../assets/vaagal-logo.webp"
import SocialIcons from "@/components/SocialIcons"

const links = [
  { to: "/", label: "Hjem", end: true },
  { to: "/bandet", label: "Bandet" },
  { to: "/diskografi", label: "Diskografi" },
  { to: "/konserter", label: "Konserter" },
  { to: "/merch", label: "Merch" },
  { to: "/kontakt-oss", label: "Kontakt oss" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto grid max-w-[1200px] gap-4 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-7 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-x-8 md:px-8 md:pt-10 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
        {/* Logo left, CTA right (the CTA moves into the nav row from md up) */}
        <div className="flex items-center justify-between gap-4">
          <NavLink
            to="/"
            end
            className="inline-flex min-h-[48px] items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-none"
            aria-label="Vågal – Hjem"
          >
            <img
              src={logo}
              alt="Vågal"
              width={192}
              height={192}
              className="h-12 w-12 md:h-14 md:w-14"
              loading="lazy"
              decoding="async"
            />
          </NavLink>

          <NavLink to="/kontakt-oss" className="btn md:hidden">
            Book oss
          </NavLink>
        </div>

        {/* Footer navigation: two columns of 48px rows on phones, one line from md */}
        <nav
          className="grid grid-cols-2 gap-x-4 md:order-3 md:col-span-2 md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-6 lg:order-none lg:col-span-1"
          aria-label="Bunnnavigasjon"
        >
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end as boolean | undefined}
              className="flex min-h-[48px] items-center border-b border-[var(--color-border)] font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] md:min-w-[44px] md:justify-center md:border-b-0 md:text-sm md:font-medium md:text-[var(--color-muted)]"
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-4 md:order-2 md:justify-end lg:order-none">
          <SocialIcons iconSize={24} className="flex-1 justify-between md:flex-none md:justify-end" />
          <NavLink to="/kontakt-oss" className="btn hidden md:inline-flex">
            Book oss
          </NavLink>
        </div>

        {/* Border line and copyright */}
        <div className="border-t border-[var(--color-border)] pt-4 md:order-4 md:col-span-2 lg:order-none lg:col-span-3">
          <p className="text-center text-sm text-[var(--color-muted)]">
            © {year} Vågal
          </p>
        </div>
      </div>
    </footer>
  )
}
