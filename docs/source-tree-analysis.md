# Source Tree Analysis

**Generated:** 2025-12-11

---

## Directory Structure

```
vaagal-app/
├── .bmad/                    # BMAD workflow configuration
├── .claude/                  # Claude Code configuration
├── .git/                     # Git repository
├── docs/                     # Documentation output folder
├── node_modules/             # Dependencies (gitignored)
├── public/                   # Static assets served at root
├── src/                      # Source code
│   ├── assets/               # Images and media
│   │   ├── caps.jpg          # Merch product image
│   │   ├── genser.jpg        # Merch product image
│   │   ├── hero-1920.jpg     # Homepage hero image
│   │   ├── marius.jpg        # Band member photo
│   │   ├── sondre.jpg        # Band member photo
│   │   ├── t-skjorte.jpg     # Merch product image
│   │   ├── tony.jpg          # Band member photo
│   │   ├── torstein.jpg      # Band member photo
│   │   ├── truls.jpg         # Band member photo
│   │   └── vaagal-logo.svg   # Band logo (SVG)
│   │
│   ├── components/           # Reusable UI components
│   │   ├── BandMember.tsx    # Band member profile card
│   │   ├── BandsintownWidget.tsx  # Concert listing widget
│   │   ├── ContactForm.tsx   # Contact/booking form
│   │   ├── Footer.tsx        # Site footer with nav + socials
│   │   ├── Hero.tsx          # Full-bleed hero image section
│   │   ├── NavBar.tsx        # Responsive navigation bar
│   │   ├── Products.tsx      # Merch product grid
│   │   ├── SpotifyWidget.tsx # Spotify embed component
│   │   └── YoutubeWidget.tsx # YouTube embed component
│   │
│   ├── pages/                # Route page components
│   │   ├── Bandet.tsx        # /bandet - Band members page
│   │   ├── Hjem.tsx          # / - Homepage
│   │   ├── Konserter.tsx     # /konserter - Concerts page
│   │   ├── KontaktOss.tsx    # /kontakt-oss - Contact page
│   │   ├── Merch.tsx         # /merch - Merchandise page
│   │   └── NotFoundPage.tsx  # /* - 404 error page
│   │
│   ├── styles/               # CSS styles
│   │   └── global.css        # CSS custom properties & utilities
│   │
│   ├── App.tsx               # Root layout component
│   ├── index.css             # Tailwind imports
│   ├── main.tsx              # Application entry point
│   ├── routes.tsx            # React Router configuration
│   └── vite-env.d.ts         # Vite type declarations
│
├── .gitignore                # Git ignore rules
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── package.json              # Dependencies & scripts
├── package-lock.json         # Dependency lock file
├── postcss.config.js         # PostCSS configuration
├── README.md                 # Vite template readme
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.app.json         # TypeScript config (app)
├── tsconfig.json             # TypeScript config (base)
├── tsconfig.node.json        # TypeScript config (node)
└── vite.config.ts            # Vite build configuration
```

## Critical Directories

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `src/` | All source code | Entry point at `main.tsx` |
| `src/components/` | Reusable UI components | 9 components |
| `src/pages/` | Route-level page components | 6 pages |
| `src/assets/` | Static images | Band photos, merch, logo |
| `src/styles/` | Global CSS | Design tokens, utilities |

## Entry Points

| File | Role |
|------|------|
| `index.html` | HTML shell, mounts React app to `#root` |
| `src/main.tsx` | React app bootstrap, renders RouterProvider |
| `src/App.tsx` | Layout wrapper (NavBar + Outlet + Footer) |
| `src/routes.tsx` | Route definitions for all pages |

## File Organization Patterns

1. **Feature-based pages:** Each route has its own page component in `src/pages/`
2. **Shared components:** Reusable UI in `src/components/`
3. **Co-located assets:** Images stored in `src/assets/` (bundled by Vite)
4. **CSS layers:** Using Tailwind with CSS custom properties in separate `global.css`

## Data Flow

```
main.tsx
    └── RouterProvider (routes.tsx)
            └── App.tsx (layout)
                    ├── NavBar.tsx
                    ├── <Outlet /> → [Page Components]
                    │       ├── Hjem.tsx → Hero, SpotifyWidget, BandsintownWidget, YouTubeEmbed
                    │       ├── Bandet.tsx → BandMember (x5)
                    │       ├── Konserter.tsx → BandsintownWidget
                    │       ├── Merch.tsx → Products
                    │       ├── KontaktOss.tsx → ContactForm
                    │       └── NotFoundPage.tsx
                    └── Footer.tsx
```

## Static Assets Inventory

| Asset | Location | Usage |
|-------|----------|-------|
| Hero image | `assets/hero-1920.jpg` | Homepage hero section |
| Band logo | `assets/vaagal-logo.svg` | NavBar, Footer |
| Member photos | `assets/{name}.jpg` | Bandet page (5 photos) |
| Merch images | `assets/*.jpg` | Products component (3 unique images) |
