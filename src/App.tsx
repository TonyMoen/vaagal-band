import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster";

// Vercel Web Analytics and Speed Insights only exist once they are switched on in the
// Vercel dashboard; until then their scripts 404. Set VITE_ANALYTICS=on when you do.
const analyticsOn = import.meta.env.VITE_ANALYTICS === "on";

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* First stop for keyboard and screen-reader users: past the navigation */}
      <a
        href="#innhold"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-[var(--color-cta)] focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
      >
        Hopp til innhold
      </a>
      <NavBar />
      <main id="innhold" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {/* Cookieless visitor counts and real-visitor load times */}
      {analyticsOn && <Analytics />}
      {analyticsOn && <SpeedInsights />}
    </div>
  );
}
