import { NavLink } from "react-router-dom"
import logo from "../assets/vaagal-logo.svg"
import SocialIcons from "@/components/SocialIcons"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-10">
        {/* Top row: Logo left, CTA right */}
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            end
            className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-lg"
          >
            <img
              src={logo}
              alt="Vågal"
              className="h-16 w-auto"
              loading="eager"
              decoding="async"
            />
          </NavLink>

          <NavLink
            to="/kontakt-oss"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[var(--color-accent)] px-6 text-sm font-semibold text-white transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
          >
            Book oss
          </NavLink>
        </div>

        {/* Social icons centered */}
        <SocialIcons iconSize={24} className="justify-center" />

        {/* Border line and copyright */}
        <div className="border-t border-[var(--color-border)] pt-4">
          <p className="text-center text-sm text-[var(--color-muted)]">
            © {year} Vågal
          </p>
        </div>
      </div>
    </footer>
  )
}
