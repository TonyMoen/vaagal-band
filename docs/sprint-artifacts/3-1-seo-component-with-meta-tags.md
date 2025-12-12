# Story 3.1: SEO Component with Meta Tags

Status: done

## Story

As a **fan searching for Vågal**,
I want **the website to have proper meta tags**,
so that **I can find the band through search engines**.

## Acceptance Criteria

1. **Given** the site needs SEO optimization
   **When** I install react-helmet-async
   **Then** `react-helmet-async` package is installed in dependencies

2. **Given** react-helmet-async is installed
   **When** I configure the provider
   **Then** `HelmetProvider` wraps the app in the root component (main.tsx or App.tsx)

3. **Given** the provider is configured
   **When** I create the SEO component
   **Then** `src/components/SEO.tsx` exists with props for:
   - `title` (string, required)
   - `description` (string, required)
   - `image` (optional string for OG image)
   - `url` (optional string for canonical URL)

4. **Given** the SEO component exists
   **When** I use it on a page
   **Then** the component renders:
   - `<title>` tag with format: "{page title} | Vågal" (FR24)
   - `<meta name="description">` tag (FR25)
   - `<link rel="canonical">` tag with the canonical URL

5. **Given** the SEO component is ready
   **When** I integrate it with each page
   **Then** each page (Hjem, Bandet, Konserter, KontaktOss) uses the SEO component with unique title and description

6. **Given** the target audience is Norwegian
   **When** the SEO component renders
   **Then** the document has `lang="nb"` attribute and Norwegian language meta tags

## Tasks / Subtasks

- [x] Task 1: Install react-helmet-async (AC: #1)
  - [x] Run `npm install react-helmet-async`
  - [x] Verify package added to package.json dependencies

- [x] Task 2: Configure HelmetProvider in root (AC: #2)
  - [x] Import `HelmetProvider` from `react-helmet-async`
  - [x] Wrap the `RouterProvider` with `HelmetProvider` in main.tsx
  - [x] Verify app still builds and runs without errors

- [x] Task 3: Create SEO component (AC: #3, #4)
  - [x] Create `src/components/SEO.tsx`
  - [x] Define TypeScript interface for props (title, description, image?, url?)
  - [x] Import `Helmet` from `react-helmet-async`
  - [x] Render `<title>` with site name suffix pattern
  - [x] Render `<meta name="description">` tag
  - [x] Conditionally render canonical URL if provided
  - [x] Export default component

- [x] Task 4: Integrate SEO with Hjem page (AC: #5)
  - [x] Import SEO component into `src/pages/Hjem.tsx`
  - [x] Add SEO component with title "Hjem" and homepage description
  - [x] Use canonical URL for homepage (/)

- [x] Task 5: Integrate SEO with remaining pages (AC: #5)
  - [x] Add SEO to `src/pages/Bandet.tsx` with title "Bandet" and band page description
  - [x] Add SEO to `src/pages/Konserter.tsx` with title "Konserter" and concerts description
  - [x] Add SEO to `src/pages/KontaktOss.tsx` with title "Kontakt" and contact description

- [x] Task 6: Verify implementation (AC: #4, #5)
  - [x] Build the project (`npm run build`)
  - [x] Start dev server and verify meta tags in browser dev tools
  - [x] Confirm each page has unique title and description
  - [x] Verify no TypeScript errors

## Dev Notes

### Critical Context

**This is Story 1 of Epic 3 - SEO & Discoverability.**

This story establishes the SEO foundation by creating a reusable SEO component using `react-helmet-async`. It covers FR24 (meta titles) and FR25 (meta descriptions). The component will be extended in Story 3.2 to add Open Graph and Twitter Card tags.

### Norwegian SEO Optimization (CRITICAL)

**Target Audience:** Norwegian users searching in Norwegian

**Target Keywords (from PRD):**
- "Vågal band"
- "Vågal musikk"
- "Bygderock Norge"

**Language Requirements:**
- All meta descriptions MUST be in Norwegian
- Add `<html lang="nb">` (Norwegian Bokmål) to document
- Add `<meta name="language" content="Norwegian">` tag
- Consider `<link rel="alternate" hreflang="nb" href="...">` for search engines

**Norwegian-Specific Considerations:**
- Use Norwegian characters (æ, ø, å) correctly in meta content
- "Vågal" contains å - ensure proper encoding
- Descriptions should sound natural to Norwegian speakers
- Use Norwegian terms: "konserter" not "concerts", "bandet" not "the band"

### Technology Selection

**react-helmet-async** is the architecture-mandated choice:
- Specified in Architecture Document for dynamic meta tags per route
- Works with React 19 and concurrent rendering
- Drop-in replacement for deprecated react-helmet
- Perfect for SPA architecture where meta tags need to change per route

### Package to Install

```bash
npm install react-helmet-async
```

### Implementation Pattern

**File: src/components/SEO.tsx**

```typescript
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
}

const SITE_NAME = 'Vågal'
const BASE_URL = 'https://vaagal.no' // Update to actual domain when deployed

export default function SEO({ title, description, image, url }: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const canonicalUrl = url ? `${BASE_URL}${url}` : undefined

  return (
    <Helmet>
      {/* Norwegian language targeting */}
      <html lang="nb" />
      <meta name="language" content="Norwegian" />

      {/* Core meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {canonicalUrl && <link rel="alternate" hrefLang="nb" href={canonicalUrl} />}
    </Helmet>
  )
}
```

**File: src/main.tsx (modified)**

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import { router } from './routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
)
```

**Usage in pages (example: Hjem.tsx)**

```typescript
import SEO from '../components/SEO'

export default function Hjem() {
  return (
    <>
      <SEO
        title="Hjem"
        description="Vågal - Bygderock fra Norge. Hør musikken vår, se konserter og bli kjent med bandet."
        url="/"
      />
      {/* ... rest of page content */}
    </>
  )
}
```

### Page-Specific SEO Content

| Page | Title | Description | URL |
|------|-------|-------------|-----|
| Hjem | Hjem | Vågal - Bygderock fra Norge. Hør musikken vår, se konserter og bli kjent med bandet. | / |
| Bandet | Bandet | Møt medlemmene i Vågal - bygderock-bandet fra Norge. Les om musikerne bak musikken. | /bandet |
| Konserter | Konserter | Se kommende konserter med Vågal. Finn datoer, steder og billettinformasjon. | /konserter |
| Kontakt | Kontakt | Kontakt Vågal for booking, presse eller generelle henvendelser. | /kontakt |

### Architecture Compliance

**From Architecture Document:**

> **SEO Strategy:**
> - react-helmet-async for dynamic meta tags per route
> - Open Graph tags for social sharing
> - JSON-LD structured data (MusicGroup schema)

**From PRD:**

> - FR24: System generates unique meta title tags for each page
> - FR25: System generates unique meta description tags for each page

**File Location:**
- New component: `src/components/SEO.tsx` (follows existing component pattern)
- Modified: `src/main.tsx` (add HelmetProvider wrapper)
- Modified: `src/pages/*.tsx` (add SEO component usage)

### Project Structure After Changes

```
src/
├── main.tsx               # MODIFIED: Add HelmetProvider
├── components/
│   ├── SEO.tsx           # NEW: SEO component
│   ├── Hero.tsx          # Existing
│   ├── LoadingSpinner.tsx # Existing
│   └── ...
└── pages/
    ├── Hjem.tsx          # MODIFIED: Add SEO component
    ├── Bandet.tsx        # MODIFIED: Add SEO component
    ├── Konserter.tsx     # MODIFIED: Add SEO component
    └── KontaktOss.tsx    # MODIFIED: Add SEO component
```

### Previous Epic Learnings

**From Epic 1 & 2:**
- Component file naming: PascalCase (`SEO.tsx`)
- TypeScript interfaces defined inline in component file
- Default exports for components
- Imports use relative paths from component location
- No semicolons in TypeScript files (project convention based on existing code)

### Anti-Patterns to Avoid

- **DO NOT** use deprecated `react-helmet` (use `react-helmet-async` instead)
- **DO NOT** hardcode the full URL in each page (use relative paths with BASE_URL in component)
- **DO NOT** add Open Graph or Twitter tags in this story (that's Story 3.2)
- **DO NOT** add JSON-LD structured data in this story (that's Story 3.3)
- **DO NOT** modify the site's robots.txt or sitemap (that's Story 3.4)
- **DO NOT** forget to wrap the app with HelmetProvider (nothing will render otherwise)

### Dependencies

**New Package:**
- `react-helmet-async` - Async-safe document head manager for React

**No changes to existing packages.**

### Testing Checklist

1. [ ] react-helmet-async installed in package.json
2. [ ] HelmetProvider wraps RouterProvider in main.tsx
3. [ ] SEO.tsx component created with correct TypeScript interface
4. [ ] SEO component renders title in format "{page} | Vågal"
5. [ ] SEO component renders meta description
6. [ ] SEO component conditionally renders canonical URL
7. [ ] **SEO component sets `<html lang="nb">` for Norwegian**
8. [ ] **SEO component includes `<meta name="language" content="Norwegian">`**
9. [ ] Hjem page uses SEO with unique Norwegian content
10. [ ] Bandet page uses SEO with unique Norwegian content
11. [ ] Konserter page uses SEO with unique Norwegian content
12. [ ] KontaktOss page uses SEO with unique Norwegian content
13. [ ] **All descriptions are written in natural Norwegian**
14. [ ] Project builds without errors (`npm run build`)
15. [ ] Dev server shows correct meta tags in browser dev tools

### Future Story Note

**Story 3.2 will extend this component** to add:
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

Design the SEO component to be easily extensible for these additions.

### References

- [Source: docs/epics.md#Story 3.1] - Acceptance criteria
- [Source: docs/prd.md#FR24, FR25] - Meta tag requirements
- [Source: docs/architecture.md#Frontend Architecture] - react-helmet-async decision
- [Source: docs/architecture.md#SEO Implementation] - SEO strategy
- [Source: src/main.tsx] - Current app root structure
- [Source: src/pages/Hjem.tsx] - Example page structure

## Review Follow-ups (AI)

- [ ] [AI-Review][MEDIUM] Konserter.tsx has placeholder social links without href attributes - non-functional buttons. [src/pages/Konserter.tsx:41-42]
- [ ] [AI-Review][LOW] Testing Checklist section has unchecked items `[ ]` despite story marked done.

## Dev Agent Record

### Context Reference

<!-- Story context verified against: docs/prd.md (FR24, FR25), docs/architecture.md (SEO Strategy), docs/epics.md#Story 3.1, previous stories in Epic 2 -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- react-helmet-async@2.0.5 installed with --legacy-peer-deps (peer dependency conflict with React 19)
- TypeScript error fixed: removed unused `image` prop from destructuring (will be used in Story 3.2)
- Build successful in 4.52s

### Completion Notes List

- **Task 1:** Installed react-helmet-async@2.0.5 using `--legacy-peer-deps` due to React 19 peer dependency conflict
- **Task 2:** Added HelmetProvider wrapper in main.tsx around RouterProvider
- **Task 3:** Created SEO.tsx component with Norwegian language targeting (`lang="nb"`, `meta name="language"`), title formatting (`{page} | Vågal`), meta description, canonical URL, and hreflang attribute
- **Task 4:** Integrated SEO component into Hjem.tsx with Norwegian homepage description
- **Task 5:** Integrated SEO into Bandet.tsx, Konserter.tsx, and KontaktOss.tsx with unique Norwegian descriptions
- **Task 6:** Build verified successful, all TypeScript checks pass

### Change Log

- 2025-12-12: Implemented SEO component with meta tags (Story 3.1)
  - Added react-helmet-async package for dynamic meta tag management
  - Created reusable SEO component with Norwegian language targeting
  - Integrated SEO component across all pages with unique Norwegian content
  - Title format: "{page} | Vågal" per FR24
  - Norwegian meta descriptions per FR25

### File List

**New Files:**
- src/components/SEO.tsx

**Modified Files:**
- src/main.tsx (added HelmetProvider wrapper)
- src/pages/Hjem.tsx (added SEO component)
- src/pages/Bandet.tsx (added SEO component)
- src/pages/Konserter.tsx (added SEO component)
- src/pages/KontaktOss.tsx (added SEO component)
- package.json (added react-helmet-async dependency)
- package-lock.json (updated)

