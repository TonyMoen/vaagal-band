// src/components/NavBar.tsx
import { useState } from "react"
import { NavLink } from "react-router-dom"
import logo from "../assets/vaagal-logo.svg"
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
import SocialIcons from "@/components/SocialIcons"

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

        {/* Desktop Navigation - Centered links */}
        <NavigationMenu className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <NavigationMenuList className="gap-2">
            {items.map(({ to, label, end }) => (
              <NavigationMenuItem key={to}>
                <NavLink
                  to={to}
                  end={end as boolean | undefined}
                  className={({ isActive }) =>
                    cn(
                      "relative inline-flex items-center px-4 py-2 text-base font-semibold transition-colors rounded-none",
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
          <SocialIcons iconSize={24} />
        </div>

        {/* Mobile Navigation with shadcn/ui Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="lg:hidden inline-flex h-12 w-12 items-center justify-center rounded-none border border-[var(--color-border)] hover:bg-[var(--color-tertiary)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              aria-label="Meny"
            >
              <svg
                className="h-6 w-6"
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
            className="w-[280px] bg-[var(--color-surface)] border-l border-[var(--color-border)] p-0"
          >
            <SheetTitle className="sr-only">Navigasjonsmeny</SheetTitle>
            <nav
              className="flex flex-col gap-1 px-4 py-6 pt-12"
              aria-label="Mobilnavigasjon"
            >
              {items.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end as boolean | undefined}
                  className={({ isActive }) =>
                    cn(
                      "relative block rounded-none px-5 py-4 text-base font-semibold transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
                      isActive
                        ? "bg-[var(--color-bg)]/30 text-[var(--color-text)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-tertiary)]/50"
                    )
                  }
                  onClick={() => setOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-none bg-[var(--color-accent)]" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto border-t border-[var(--color-border)] px-4 py-6">
              <SocialIcons iconSize={20} className="justify-center" />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
