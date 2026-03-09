import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Zap,
  Layers,
  MessageSquare,
  FileText,
  Image,
  Calendar,
  Settings,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/ai", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/ai/create", label: "Opprett", icon: Zap },
  { to: "/ai/batch", label: "Batch", icon: Layers },
  { to: "/ai/chat", label: "Chat", icon: MessageSquare },
  { to: "/ai/review", label: "Innhald", icon: FileText },
  { to: "/ai/schedule", label: "Kalender", icon: Calendar },
  { to: "/ai/library", label: "Bilder", icon: Image },
  { to: "/ai/settings", label: "Innstillinger", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center bg-[var(--color-accent)] font-condensed text-lg font-bold text-white">
          V
        </div>
        <div>
          <p className="font-condensed text-base font-bold uppercase tracking-wider text-[var(--color-text)]">
            Vågal AI
          </p>
          <p className="text-xs text-[var(--color-muted)]">Content Studio</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "text-[var(--color-muted)] hover:bg-[var(--color-tertiary)]/50 hover:text-[var(--color-text)]"
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[var(--color-border)] px-3 py-4">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          <ArrowLeft size={18} />
          Tilbake til nettside
        </NavLink>
      </div>
    </>
  );
}

export default function AiLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-dvh bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-10 flex w-60 flex-col bg-[var(--color-surface)]">
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)]"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <p className="font-condensed text-base font-bold uppercase tracking-wider">
            Vågal AI
          </p>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
