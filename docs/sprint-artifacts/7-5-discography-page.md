# Story 7.5: Discography Page

Status: done

## Story

As a **fan**,
I want **a dedicated discography page**,
so that **I can browse all of Vågal's music releases**.

## Acceptance Criteria

1. `src/pages/Diskografi.tsx` is created
2. Route `/diskografi` is added to `src/routes.tsx`
3. Navigation links are updated (navbar + footer + mobile)
4. Page displays all releases in a grid layout:
   - Cover image
   - Title
   - Release type badge (Single/EP/Album)
   - Release date
   - Links to streaming platforms (icon buttons)
5. Releases are sorted by release date (newest first)
6. Page uses SEO component with appropriate meta tags
7. Page has hero section with title "DISKOGRAFI"
8. Grid is responsive (1 col mobile, 2 cols tablet, 3-4 cols desktop)

## Dependencies

**CRITICAL: This story depends on Story 7.4 being completed first!**

Story 7.4 creates:
- `release` schema in Sanity
- `useReleases` hook
- `Release` TypeScript interface
- `releasesQuery` GROQ query

This story consumes those to build the page UI.

## Tasks / Subtasks

- [x] Task 1: Create Diskografi page component (AC: 1, 4, 5, 6, 7, 8)
  - [x] Create `src/pages/Diskografi.tsx`
  - [x] Import and use `useReleases` hook from Story 7.4
  - [x] Add SEO component with Norwegian meta content
  - [x] Add PageHero with title "DISKOGRAFI"
  - [x] Handle loading state with LoadingSpinner
  - [x] Handle error state with ErrorMessage
  - [x] Handle empty state (no releases yet)

- [x] Task 2: Create ReleaseCard component (AC: 4)
  - [x] Create `src/components/ReleaseCard.tsx`
  - [x] Display cover image using `urlFor()` helper
  - [x] Display title prominently
  - [x] Display release type badge (styled differently per type)
  - [x] Display release date (formatted for Norwegian locale)
  - [x] Display streaming platform icon buttons (Spotify, Apple Music, YouTube)
  - [x] Icons open in new tab with proper rel attributes

- [x] Task 3: Implement responsive grid layout (AC: 8)
  - [x] 1 column on mobile (< 640px)
  - [x] 2 columns on tablet (640px - 1023px)
  - [x] 3 columns on desktop (1024px+)
  - [x] Consistent gap spacing between cards
  - [x] Cards have equal height (cover image aspect ratio)

- [x] Task 4: Add route to routes.tsx (AC: 2)
  - [x] Import Diskografi page
  - [x] Add route `{ path: "diskografi", element: <Diskografi /> }`
  - [x] Place route before NotFoundPage catch-all

- [x] Task 5: Update navigation (AC: 3)
  - [x] Add "Diskografi" to navbar items array
  - [x] Verify mobile sheet includes new link
  - [x] (Footer uses NavLink array so will auto-include if needed - check existing pattern)

- [x] Task 6: Verify and test (AC: 1-8)
  - [x] Run `npm run build` - no TypeScript errors
  - [x] Test all responsive breakpoints
  - [x] Test empty state (no releases in CMS)
  - [x] Test streaming links open correctly
  - [x] Verify navigation works on desktop and mobile

## Dev Notes

### CRITICAL: Depends on Story 7.4

This story **REQUIRES** Story 7.4 to be completed first. Story 7.4 creates:
- `studio/schemaTypes/release.ts` - Sanity schema
- `src/hooks/useReleases.ts` - Data fetching hook
- `src/types/sanity.ts` - `Release` interface
- `src/lib/sanity/queries.ts` - `releasesQuery`

If Story 7.4 is not complete, this story will fail to compile.

### Page Structure Pattern (from Bandet.tsx)

```tsx
// src/pages/Diskografi.tsx
import { useReleases } from "@/hooks/useReleases"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ErrorMessage } from "@/components/ErrorMessage"
import { PageHero } from "@/components/PageHero"
import ReleaseCard from "@/components/ReleaseCard"
import SEO from "@/components/SEO"

export default function Diskografi() {
  const { data, loading, error } = useReleases()

  if (loading) {
    return (
      <>
        <SEO
          title="Diskografi"
          description="Utforsk Vågal sin diskografi. Singler, EP-er og album fra bygderock-bandet."
          url="/diskografi"
        />
        <PageHero title="DISKOGRAFI" />
        <main className="container-page py-10 md:py-14">
          <LoadingSpinner size="lg" className="min-h-[200px]" />
        </main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <SEO
          title="Diskografi"
          description="Utforsk Vågal sin diskografi. Singler, EP-er og album fra bygderock-bandet."
          url="/diskografi"
        />
        <PageHero title="DISKOGRAFI" />
        <main className="container-page py-10 md:py-14">
          <ErrorMessage message="Kunne ikke laste utgivelser" />
        </main>
      </>
    )
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <>
        <SEO
          title="Diskografi"
          description="Utforsk Vågal sin diskografi. Singler, EP-er og album fra bygderock-bandet."
          url="/diskografi"
        />
        <PageHero title="DISKOGRAFI" />
        <main className="container-page py-10 md:py-14">
          <div className="text-center text-[var(--color-muted)]">
            <p>Ingen utgivelser ennå. Følg med!</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <SEO
        title="Diskografi"
        description="Utforsk Vågal sin diskografi. Singler, EP-er og album fra bygderock-bandet."
        url="/diskografi"
      />
      <PageHero title="DISKOGRAFI" subtitle="Singler, EP-er og album" />
      <main className="container-page py-10 md:py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((release) => (
            <ReleaseCard key={release._id} release={release} />
          ))}
        </div>
      </main>
    </>
  )
}
```

### ReleaseCard Component Pattern

```tsx
// src/components/ReleaseCard.tsx
import { urlFor } from "@/lib/sanity/image"
import type { Release } from "@/types/sanity"
import { cn } from "@/lib/utils"

// Streaming platform icons - use simple SVG inline or lucide-react if installed
// For simplicity, using text-based buttons initially

type Props = {
  release: Release
}

export default function ReleaseCard({ release }: Props) {
  // Format date for Norwegian locale
  const formattedDate = new Date(release.releaseDate).toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Release type badge styling
  const badgeStyles = {
    single: "bg-[var(--color-accent)]/20 text-[var(--color-accent)]",
    EP: "bg-blue-500/20 text-blue-400",
    album: "bg-green-500/20 text-green-400",
  }

  return (
    <article className="overflow-hidden rounded-2xl card-surface">
      {/* Cover Image */}
      {release.coverImage && (
        <div className="aspect-square overflow-hidden">
          <img
            src={urlFor(release.coverImage).width(400).height(400).url()}
            alt={`${release.title} cover`}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-5">
        {/* Release Type Badge */}
        {release.releaseType && (
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
              badgeStyles[release.releaseType] || badgeStyles.single
            )}
          >
            {release.releaseType}
          </span>
        )}

        {/* Title */}
        <h2 className="mt-2 text-lg font-semibold text-[var(--color-text)]">
          {release.title}
        </h2>

        {/* Release Date */}
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          {formattedDate}
        </p>

        {/* Streaming Links */}
        <div className="mt-4 flex flex-wrap gap-2">
          {release.spotifyUrl && (
            <a
              href={release.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-[#1DB954]/20 px-3 text-sm font-medium text-[#1DB954] transition-colors hover:bg-[#1DB954]/30"
              aria-label={`Lytt til ${release.title} på Spotify`}
            >
              Spotify
            </a>
          )}
          {release.appleMusicUrl && (
            <a
              href={release.appleMusicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-[#FC3C44]/20 px-3 text-sm font-medium text-[#FC3C44] transition-colors hover:bg-[#FC3C44]/30"
              aria-label={`Lytt til ${release.title} på Apple Music`}
            >
              Apple Music
            </a>
          )}
          {release.youtubeUrl && (
            <a
              href={release.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-[#FF0000]/20 px-3 text-sm font-medium text-[#FF0000] transition-colors hover:bg-[#FF0000]/30"
              aria-label={`Se ${release.title} på YouTube`}
            >
              YouTube
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
```

### Route Update Pattern (from routes.tsx)

```tsx
// src/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Hjem";
import Konserter from "./pages/Konserter";
import Bandet from "./pages/Bandet";
import Diskografi from "./pages/Diskografi";  // ADD THIS
import KontaktOss from "./pages/KontaktOss";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "konserter", element: <Konserter /> },
      { path: "bandet", element: <Bandet /> },
      { path: "diskografi", element: <Diskografi /> },  // ADD THIS
      { path: "kontakt-oss", element: <KontaktOss /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
```

### Navigation Update Pattern (from NavBar.tsx)

```tsx
// In NavBar.tsx, update items array:
const items = [
  { to: "/", label: "Hjem", end: true },
  { to: "/bandet", label: "Bandet" },
  { to: "/diskografi", label: "Diskografi" },  // ADD THIS
  { to: "/konserter", label: "Konserter" },
  { to: "/kontakt-oss", label: "Kontakt oss" },
]
```

### Architecture Compliance

**File Organization (MUST follow):**
- Pages: `src/pages/` - Diskografi.tsx
- Components: `src/components/` - ReleaseCard.tsx

**Naming Conventions (MUST follow):**
- Page component: PascalCase (`Diskografi.tsx`)
- Card component: PascalCase (`ReleaseCard.tsx`)
- Route path: lowercase (`diskografi`)

**Data Fetching Pattern (MUST follow):**
- Use `useReleases` hook from `@/hooks/useReleases`
- Handle loading, error, and empty states
- Data is already sorted by releaseDate (from GROQ query in Story 7.4)

### Styling Notes

**CSS Classes Used:**
- `card-surface` - Existing card background style
- `container-page` - Existing page container (max-width + padding)
- `text-[var(--color-text)]` - Primary text color
- `text-[var(--color-muted)]` - Secondary text color
- `bg-[var(--color-accent)]` - Accent background

**Grid Responsive Pattern:**
```tsx
className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
```
- Mobile (default): 1 column
- sm (640px+): 2 columns
- lg (1024px+): 3 columns

**Cover Image Aspect Ratio:**
```tsx
<div className="aspect-square overflow-hidden">
  <img ... className="h-full w-full object-cover" />
</div>
```

### Norwegian Text

All user-facing text should be in Norwegian:
- Page title: "Diskografi"
- Meta description: "Utforsk Vågal sin diskografi. Singler, EP-er og album fra bygderock-bandet."
- Error message: "Kunne ikke laste utgivelser"
- Empty state: "Ingen utgivelser ennå. Følg med!"
- Streaming button labels: "Spotify", "Apple Music", "YouTube" (brand names stay English)

### Previous Story Intelligence

**From Story 7.3 (PageHero):**
- PageHero component is available at `@/components/PageHero`
- Use `<PageHero title="DISKOGRAFI" subtitle="Singler, EP-er og album" />`

**From Story 7.4 (Release Schema):**
- `useReleases` hook returns `{ data, loading, error }`
- `Release` type includes: `_id`, `title`, `releaseType`, `coverImage`, `releaseDate`, `spotifyUrl`, `appleMusicUrl`, `youtubeUrl`, `isLatest`
- Releases already sorted by releaseDate descending (newest first)

### Git Context

```
7162c3e feat: Add consistent page hero sections (Story 7.3)
4900e0b feat: Simplify footer with icon-only social links and booking CTA (Story 7.2)
15fa4ea feat: Add social media icon buttons to navigation (Story 7.1)
```

**Commit message format:**
`feat: Add discography page with release cards (Story 7.5)`

### Files to Create

| File | Purpose |
|------|---------|
| `src/pages/Diskografi.tsx` | Discography page component |
| `src/components/ReleaseCard.tsx` | Individual release card component |

### Files to Modify

| File | Changes |
|------|---------|
| `src/routes.tsx` | Add diskografi route |
| `src/components/NavBar.tsx` | Add Diskografi to items array |

### Anti-Patterns to AVOID

- Creating the release schema in this story (that's Story 7.4)
- Creating the useReleases hook in this story (that's Story 7.4)
- Modifying existing pages (Hjem, Bandet, etc.)
- Adding footer navigation link (Footer uses a different pattern - check if needed)
- Hardcoding release data instead of using the hook
- Using different grid breakpoints than specified
- Forgetting to handle empty/loading/error states

### References

- [Source: docs/epics.md#Story 7.5: Discography Page]
- [Source: docs/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: docs/sprint-artifacts/7-4-discography-content-schema-in-sanity.md] - Dependencies
- [Source: src/pages/Bandet.tsx] - Page pattern reference
- [Source: src/components/BandMember.tsx] - Card component pattern reference
- [Source: src/components/NavBar.tsx:19-24] - Navigation items pattern
- [Source: src/routes.tsx] - Route configuration pattern

## Dev Agent Record

### Context Reference

<!-- Story created by create-story workflow - 2025-12-12 -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build passed: `npm run build` completed successfully in 15.96s
- No TypeScript errors
- All components compile and wire up correctly

### Completion Notes List

- Created `Diskografi.tsx` page following Bandet.tsx pattern
- Created `ReleaseCard.tsx` component with cover image, title, badge, date, streaming links
- Responsive grid: 1 col mobile (default), 2 cols tablet (sm:), 3 cols desktop (lg:)
- Norwegian locale date formatting using `nb-NO`
- SEO meta tags with Norwegian description
- Loading/error/empty state handling implemented
- Route added at `/diskografi`
- Navigation updated in NavBar.tsx items array (mobile sheet auto-includes)
- Release type badges styled differently: single (orange), EP (blue), album (green)
- Streaming links: Spotify (green), Apple Music (red), YouTube (red) with hover states

### File List

**Files Created:**
- `src/pages/Diskografi.tsx`
- `src/components/ReleaseCard.tsx`

**Files Modified:**
- `src/routes.tsx` - Added Diskografi import and route
- `src/components/NavBar.tsx` - Added Diskografi to items array
