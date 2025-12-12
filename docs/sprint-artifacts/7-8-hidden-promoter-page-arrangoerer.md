# Story 7.8: Hidden Promoter Page (Arrangører)

Status: ready-for-dev

## Story

As a **promoter or event organizer**,
I want **a dedicated page with riders and press kit**,
so that **I can quickly access all professional materials needed for booking**.

## Acceptance Criteria

1. `src/pages/Arrangoerer.tsx` is created with the promoter materials page
2. Route `/arrangoerer` is added to `src/routes.tsx`
3. The page is NOT linked in navigation (navbar, footer, mobile menu) - accessible via direct URL only
4. Page uses SEO component with `noindex` meta tag (hidden from search engines)
5. Page has hero section with title "FOR ARRANGØRER"
6. Page is styled consistently with dark theme using the established color palette

**Page Content Sections:**

7. **Technical Rider section:**
   - Stage plot / input list (PDF download link)
   - Sound requirements
   - Lighting requirements
   - Backline needs
   - Power requirements

8. **Hospitality Rider section:**
   - Catering requirements
   - Dressing room needs
   - Travel/accommodation notes

9. **Press Kit section:**
   - Band bio (short and long versions displayed inline)
   - High-resolution band photos (download links from Sanity media library)
   - Logo files (PNG, SVG download links)
   - Genre/style description
   - Social media links and stats
   - Spotify/streaming links
   - Contact information for booking

10. All downloadable files are stored and managed via Sanity CMS (media library)
11. Download buttons use accent color styling (#E65C00)
12. Page is responsive across all breakpoints

**Sanity Schema Additions:**

13. `promoterMaterials` document type created with fields:
    - `technicalRider` (file upload for PDF)
    - `hospitalityRider` (file upload or rich text)
    - `bandBioShort` (text)
    - `bandBioLong` (portable text / block content)
    - `pressPhotos` (array of images with download option)
    - `logoFiles` (array of files - PNG, SVG)
    - `contactEmail` (string)
    - `contactPhone` (string, optional)

## Tasks / Subtasks

- [ ] Task 1: Create Sanity schema for promoterMaterials (AC: 13)
  - [ ] Create `studio/schemaTypes/promoterMaterials.ts` with all fields
  - [ ] Add to `studio/schemaTypes/index.ts` exports
  - [ ] Deploy Sanity schema changes

- [ ] Task 2: Create TypeScript types (AC: 13)
  - [ ] Add `PromoterMaterials` interface to `src/types/sanity.ts`

- [ ] Task 3: Create GROQ query (AC: 10)
  - [ ] Add `promoterMaterialsQuery` to `src/lib/sanity/queries.ts`

- [ ] Task 4: Create data hook (AC: 10)
  - [ ] Create `src/hooks/usePromoterMaterials.ts` following established pattern

- [ ] Task 5: Create Arrangoerer page component (AC: 1, 5, 6, 7, 8, 9, 11, 12)
  - [ ] Create `src/pages/Arrangoerer.tsx` with PageHero
  - [ ] Add Technical Rider section with download buttons
  - [ ] Add Hospitality Rider section
  - [ ] Add Press Kit section with photo/logo downloads
  - [ ] Add contact information section
  - [ ] Implement loading/error/empty states

- [ ] Task 6: Add route without navigation (AC: 2, 3)
  - [ ] Add `/arrangoerer` route to `src/routes.tsx`
  - [ ] Verify NO links added to NavBar, Footer, or mobile menu

- [ ] Task 7: Update SEO component for noindex (AC: 4)
  - [ ] Add optional `noindex` prop to SEO component
  - [ ] Apply noindex to Arrangoerer page

- [ ] Task 8: Build verification
  - [ ] Run `npm run build` to verify no TypeScript errors
  - [ ] Test page at `/arrangoerer` in browser
  - [ ] Verify page is NOT in navigation
  - [ ] Verify download links work when CMS content is added

## Dev Notes

### Architecture Compliance - CRITICAL

**File Naming & Location Patterns (from Architecture doc):**

| Pattern | Convention | Example |
|---------|------------|---------|
| Sanity Schema | camelCase | `promoterMaterials.ts` |
| Page Component | PascalCase | `Arrangoerer.tsx` |
| Hook | camelCase with `use` prefix | `usePromoterMaterials.ts` |
| TypeScript Interface | PascalCase | `PromoterMaterials` |

**Project Structure (Follow Exactly):**
```
studio/schemaTypes/
├── promoterMaterials.ts    # NEW - Sanity schema

src/
├── pages/
│   └── Arrangoerer.tsx     # NEW - Page component
├── hooks/
│   └── usePromoterMaterials.ts  # NEW - Data hook
├── types/
│   └── sanity.ts           # MODIFY - Add interface
├── lib/sanity/
│   └── queries.ts          # MODIFY - Add GROQ query
└── routes.tsx              # MODIFY - Add route
```

### Sanity Schema Pattern (Follow release.ts)

```typescript
// studio/schemaTypes/promoterMaterials.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'promoterMaterials',
  title: 'Promoter Materials',
  type: 'document',
  fields: [
    defineField({
      name: 'technicalRider',
      title: 'Technical Rider (PDF)',
      type: 'file',
      description: 'Upload stage plot and input list PDF',
      options: {
        accept: '.pdf'
      }
    }),
    defineField({
      name: 'hospitalityRider',
      title: 'Hospitality Rider',
      type: 'text',
      rows: 8,
      description: 'Catering, dressing room, travel requirements'
    }),
    defineField({
      name: 'bandBioShort',
      title: 'Band Bio (Short)',
      type: 'text',
      rows: 3,
      description: 'Brief band description (1-2 sentences)',
      validation: (Rule) => Rule.max(300)
    }),
    defineField({
      name: 'bandBioLong',
      title: 'Band Bio (Long)',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Full band biography with rich text formatting'
    }),
    defineField({
      name: 'pressPhotos',
      title: 'Press Photos',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true }
      }],
      description: 'High-resolution band photos for press use'
    }),
    defineField({
      name: 'logoFiles',
      title: 'Logo Files',
      type: 'array',
      of: [{
        type: 'file',
        options: {
          accept: '.png,.svg'
        }
      }],
      description: 'Band logo in PNG and SVG formats'
    }),
    defineField({
      name: 'contactEmail',
      title: 'Booking Email',
      type: 'string',
      validation: (Rule) => Rule.email()
    }),
    defineField({
      name: 'contactPhone',
      title: 'Booking Phone',
      type: 'string',
      description: 'Optional phone number for booking inquiries'
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Promoter Materials',
        subtitle: 'Press kit and rider information'
      }
    }
  }
})
```

### TypeScript Interface (Add to sanity.ts)

```typescript
// Add to src/types/sanity.ts

/**
 * Promoter materials content from Sanity CMS
 * Used by usePromoterMaterials hook and Arrangoerer page
 */
export interface PromoterMaterials {
  _id: string
  technicalRider?: {
    asset: {
      _ref: string
      url: string
    }
  }
  hospitalityRider?: string
  bandBioShort?: string
  bandBioLong?: PortableTextBlock[]
  pressPhotos?: SanityImageSource[]
  logoFiles?: {
    asset: {
      _ref: string
      url: string
    }
  }[]
  contactEmail?: string
  contactPhone?: string
}

// Add type for portable text blocks
export interface PortableTextBlock {
  _type: string
  _key: string
  children: {
    _type: string
    _key: string
    text: string
    marks?: string[]
  }[]
  markDefs?: unknown[]
  style?: string
}
```

### GROQ Query (Add to queries.ts)

```typescript
// Add to src/lib/sanity/queries.ts

/**
 * Promoter materials query - fetches the press kit and rider content
 * Returns: Single promoterMaterials document with all fields
 */
export const promoterMaterialsQuery = `*[_type == "promoterMaterials"][0] {
  _id,
  "technicalRider": technicalRider.asset->url,
  hospitalityRider,
  bandBioShort,
  bandBioLong,
  pressPhotos,
  "logoFiles": logoFiles[].asset->url,
  contactEmail,
  contactPhone
}`
```

### Hook Pattern (Follow useLatestRelease.ts)

```typescript
// src/hooks/usePromoterMaterials.ts
import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity/client'
import { promoterMaterialsQuery } from '@/lib/sanity/queries'
import type { PromoterMaterials } from '@/types/sanity'

/**
 * Hook to fetch promoter materials from Sanity CMS
 * Used for the hidden /arrangoerer page
 */
export function usePromoterMaterials() {
  const [data, setData] = useState<PromoterMaterials | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<PromoterMaterials | null>(promoterMaterialsQuery)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
```

### SEO Component Update (Add noindex prop)

The SEO component needs an optional `noindex` prop to prevent search engine indexing of the promoter page:

```typescript
// Update SEO.tsx props interface
interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
  noindex?: boolean  // NEW - for hidden pages
}

// Add to Helmet in SEO component
{noindex && <meta name="robots" content="noindex, nofollow" />}
```

### Page Component Pattern (Follow Diskografi.tsx)

```typescript
// src/pages/Arrangoerer.tsx
import { usePromoterMaterials } from "@/hooks/usePromoterMaterials"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ErrorMessage } from "@/components/ErrorMessage"
import { PageHero } from "@/components/PageHero"
import SEO from "@/components/SEO"
import { urlFor } from "@/lib/sanity/image"
import { Button } from "@/components/ui/button"
import { Download, Mail, Phone } from "lucide-react"

export default function Arrangoerer() {
  const { data, loading, error } = usePromoterMaterials()

  // Loading state
  if (loading) {
    return (
      <>
        <SEO
          title="For Arrangører"
          description="Professionelle materialer for booking av Vågal. Teknisk og hospitality rider, pressepakke og kontaktinformasjon."
          url="/arrangoerer"
          noindex={true}
        />
        <PageHero title="FOR ARRANGØRER" />
        <main className="container-page py-10 md:py-14">
          <LoadingSpinner size="lg" className="min-h-[200px]" />
        </main>
      </>
    )
  }

  // Error state
  if (error) {
    return (
      <>
        <SEO
          title="For Arrangører"
          description="Professionelle materialer for booking av Vågal."
          url="/arrangoerer"
          noindex={true}
        />
        <PageHero title="FOR ARRANGØRER" />
        <main className="container-page py-10 md:py-14">
          <ErrorMessage message="Kunne ikke laste materialer" />
        </main>
      </>
    )
  }

  // Empty state (no CMS data yet)
  if (!data) {
    return (
      <>
        <SEO
          title="For Arrangører"
          description="Professionelle materialer for booking av Vågal."
          url="/arrangoerer"
          noindex={true}
        />
        <PageHero title="FOR ARRANGØRER" subtitle="Pressepakke og rider informasjon" />
        <main className="container-page py-10 md:py-14">
          <div className="text-center text-[var(--color-muted)]">
            <p>Materialer kommer snart. Ta kontakt for mer info.</p>
          </div>
        </main>
      </>
    )
  }

  // Full content render
  return (
    <>
      <SEO
        title="For Arrangører"
        description="Professionelle materialer for booking av Vågal. Teknisk og hospitality rider, pressepakke og kontaktinformasjon."
        url="/arrangoerer"
        noindex={true}
      />
      <PageHero title="FOR ARRANGØRER" subtitle="Pressepakke og rider informasjon" />
      <main className="container-page py-10 md:py-14 space-y-16">
        {/* Technical Rider Section */}
        {/* Hospitality Rider Section */}
        {/* Press Kit Section */}
        {/* Contact Section */}
      </main>
    </>
  )
}
```

### Route Addition (NO Navigation Links!)

```typescript
// src/routes.tsx - Add ONLY the route, no navigation links
import Arrangoerer from "./pages/Arrangoerer"

// Add to children array:
{ path: "arrangoerer", element: <Arrangoerer /> },

// CRITICAL: Do NOT add to NavBar.tsx, Footer.tsx, or mobile menu
```

### Color Palette Reference (from Story 7.7)

Use CSS variables consistently - do NOT hardcode hex values:

```
BACKGROUNDS:
- Primary: var(--color-bg) / bg-background         (#0A0A0A)
- Secondary: var(--color-surface) / bg-card        (#1A1A1A) - Use for cards/sections
- Tertiary: var(--color-border)                    (#2A2A2A) - Use for borders/dividers

TEXT:
- Primary: var(--color-text) / text-foreground     (#F5F5F5)
- Secondary: var(--color-muted) / text-muted-foreground (#A3A3A3)

ACCENT:
- Primary: var(--color-accent)                     (#E65C00) - Download buttons
- Hover: var(--color-accent-hover)                 (#FF6B00)
```

### Download Button Styling

```tsx
// Use accent color for download buttons
<Button
  variant="default"
  className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white"
  asChild
>
  <a href={downloadUrl} download>
    <Download className="mr-2 h-4 w-4" />
    Last ned teknisk rider
  </a>
</Button>
```

### Section Layout Pattern

Each section should use consistent styling:

```tsx
{/* Section Template */}
<section className="space-y-6">
  <h2 className="font-condensed text-2xl font-bold text-[var(--color-text)] md:text-3xl">
    SECTION TITLE
  </h2>
  <div className="rounded-lg bg-[var(--color-surface)] p-6 md:p-8">
    {/* Section content */}
  </div>
</section>
```

### Image Download Pattern

For press photos with download capability:

```tsx
{data.pressPhotos?.map((photo, index) => (
  <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
    <img
      src={urlFor(photo).width(800).url()}
      alt={`Pressebilde ${index + 1}`}
      className="h-full w-full object-cover"
    />
    <a
      href={urlFor(photo).url()}
      download
      className="absolute bottom-3 right-3 rounded-md bg-[var(--color-accent)] p-2 hover:bg-[var(--color-accent-hover)]"
    >
      <Download className="h-5 w-5 text-white" />
    </a>
  </div>
))}
```

### Previous Story Intelligence (Story 7.7)

Key learnings from Story 7.7 color palette update:
- Two color systems exist (global.css and index.css) - use CSS variables for consistency
- Card backgrounds should use `var(--color-surface)` / `bg-card` (#1A1A1A)
- Metadata text uses `var(--color-muted)` / `text-muted-foreground` (#A3A3A3)
- Accent color is `var(--color-accent)` (#E65C00) - use for buttons

### Git Context

Recent commits show consistent patterns:
```
3f8118f feat: Add latest release feature to homepage hero (Story 7.6)
7207263 feat: Add discography page with release cards (Story 7.5)
7cf0b4d feat: Add discography content schema in Sanity (Story 7.4)
```

### Testing Checklist

- [ ] Page loads at `/arrangoerer` without errors
- [ ] Page is NOT visible in navigation (navbar, footer, mobile)
- [ ] SEO noindex meta tag is present in page source
- [ ] PageHero displays with correct title
- [ ] Loading/error states work correctly
- [ ] Empty state displays when no CMS content
- [ ] Technical rider downloads when CMS content exists
- [ ] Press photos display with download buttons
- [ ] Contact section shows email/phone
- [ ] Colors match established palette
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Build passes without TypeScript errors

### Edge Cases

1. **No CMS content**: Display empty state with "Materialer kommer snart" message
2. **Partial content**: Handle missing optional fields gracefully (hospitalityRider, phone, etc.)
3. **No press photos**: Hide photos section if array is empty
4. **No logo files**: Hide logos section if array is empty
5. **File download errors**: Ensure Sanity CDN URLs work for downloads

### Anti-Patterns to AVOID

- DO NOT add navigation links to this page - it should be hidden
- DO NOT use hardcoded hex colors - use CSS variables
- DO NOT skip the noindex meta tag - page must be hidden from search
- DO NOT create inline styles - use Tailwind classes
- DO NOT fetch Sanity data without the hook pattern
- DO NOT skip loading/error/empty states

### References

- [Source: docs/epics.md#Story 7.8: Hidden Promoter Page (Arrangører)]
- [Source: docs/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: docs/architecture.md#Project Structure & Boundaries]
- [Source: docs/ux-design-specification.md#Color System]
- [Source: studio/schemaTypes/release.ts] - Schema pattern reference
- [Source: src/hooks/useLatestRelease.ts] - Hook pattern reference
- [Source: src/pages/Diskografi.tsx] - Page component pattern reference

## Dev Agent Record

### Context Reference

<!-- Story created by create-story workflow - 2025-12-12 -->

### Agent Model Used

<!-- To be filled by dev agent -->

### Debug Log References

<!-- To be filled during implementation -->

### Completion Notes List

<!-- To be filled after implementation -->

### File List

**Files to Create:**
- `studio/schemaTypes/promoterMaterials.ts` - Sanity schema
- `src/pages/Arrangoerer.tsx` - Page component
- `src/hooks/usePromoterMaterials.ts` - Data fetching hook

**Files to Modify:**
- `studio/schemaTypes/index.ts` - Add promoterMaterials export
- `src/types/sanity.ts` - Add PromoterMaterials and PortableTextBlock interfaces
- `src/lib/sanity/queries.ts` - Add promoterMaterialsQuery
- `src/routes.tsx` - Add /arrangoerer route
- `src/components/SEO.tsx` - Add optional noindex prop
