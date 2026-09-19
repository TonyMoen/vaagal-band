// src/components/NavBar.tsx
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import logo from "../assets/vaagal-logo.webp"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { SPOTIFY_ARTIST_URL } from "@/lib/links"
import { useHideOnScroll } from "@/hooks/useHideOnScroll"
import SocialIcons from "@/components/SocialIcons"
import ServiceIcon from "@/components/ServiceIcon"

const items = [
  { to: "/", label: "Hjem", end: true },
  { to: "/bandet", label: "Bandet" },
  { to: "/diskografi", label: "Diskografi" },
  { to: "/konserter", label: "Konserter" },
  { to: "/merch", label: "Merch" },
  { to: "/kontakt-oss", label: "Kontakt oss" },
]

export default function NavBar() {
  const [open, setOpen] = useState(false)
  // Below lg the bar slides away while scrolling down and returns on the first scroll up
  const hidden = useHideOnScroll()

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-bg)]/85",
        // Keyboard focus inside the bar always brings it back (touch focus does not count, or the bar
        // would stay put after every tap on the menu button)
        "transition-transform duration-200 [&:has(:focus-visible)]:translate-y-0 motion-reduce:transition-none",
        hidden && !open && "max-lg:-translate-y-full"
      )}
    >
      <nav
        className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 pl-4 pr-1 md:pl-8 md:pr-5 lg:h-[72px] lg:gap-8 lg:px-8"
        aria-label="Hovednavigasjon"
      >
        <NavLink
          to="/"
          end
          className="inline-flex min-h-[44px] items-center"
          aria-label="Vågal – Hjem"
        >
          <img
            src={logo}
            alt="Vågal"
            width={192}
            height={192}
            className="h-11 w-11 lg:h-14 lg:w-14"
            loading="eager"
            decoding="async"
          />
        </NavLink>

        {/* Desktop Navigation - Centered links */}
        <NavigationMenu className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <NavigationMenuList className="gap-1 xl:gap-2">
            {items.map(({ to, label, end }) => (
              <NavigationMenuItem key={to}>
                <NavLink
                  to={to}
                  end={end as boolean | undefined}
                  className={({ isActive }) =>
                    cn(
                      "relative inline-flex items-center whitespace-nowrap px-3 py-2 text-[15px] font-semibold transition-colors rounded-none xl:px-4 xl:text-base",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
                      isActive
                        ? "text-[var(--color-text)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-tertiary)]/50"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-none bg-[var(--color-accent)]" />
                      )}
                    </>
                  )}
                </NavLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Social Icons - Right side */}
        <div className="hidden lg:flex items-center">
          <SocialIcons iconSize={22} size="compact" className="gap-1 xl:gap-2" />
        </div>

        {/* Mobile Navigation: full-screen menu with shadcn/ui Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="lg:hidden inline-flex h-12 w-12 items-center justify-center rounded-none hover:bg-[var(--color-tertiary)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              aria-label="Meny"
            >
              <svg
                className="h-7 w-7"
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
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-full max-w-none flex-col overflow-y-auto border-l-0 bg-[var(--color-bg)] p-0 sm:max-w-none"
          >
            <SheetTitle className="sr-only">Navigasjonsmeny</SheetTitle>
            <div className="flex h-14 flex-none items-center pl-4">
              <img src={logo} alt="" width={192} height={192} className="h-11 w-11" />
            </div>
            <nav className="px-4" aria-label="Mobilnavigasjon">
              {items.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end as boolean | undefined}
                  className={({ isActive }) =>
                    cn(
                      "flex min-h-[60px] items-center justify-between border-b border-[var(--color-border)] font-condensed text-[34px] font-bold uppercase leading-none transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
                      isActive
                        ? "text-[var(--color-accent-hover)]"
                        : "text-[var(--color-text)] hover:text-[var(--color-accent-hover)]"
                    )
                  }
                  onClick={() => setOpen(false)}
                >
                  {label}
                  <ChevronRight className="h-5 w-5 text-[var(--color-muted)]" aria-hidden="true" />
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto space-y-3 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-6">
              <a
                href={SPOTIFY_ARTIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-none bg-[#1DB954] px-5 font-semibold text-[#0A0A0A] transition-colors hover:bg-[#1ed760]"
              >
                <ServiceIcon name="spotify" size={20} />
                Lytt på Spotify
              </a>
              <SocialIcons iconSize={24} className="justify-between" />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
