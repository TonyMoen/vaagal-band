# Story 2.4: Integrate Band Members with Frontend

Status: Done

## Story

As a **visitor**,
I want **to see band member profiles powered by the CMS**,
so that **I always see the latest information about each member**.

## Acceptance Criteria

1. **Given** the band member schema exists in Sanity
   **When** I create the data fetching hook
   **Then** `src/hooks/useBandMembers.ts` exists with:
   - Fetch all band members from Sanity
   - Loading, error, and data states
   - Standard hook pattern from Architecture

2. **Given** the hook exists
   **When** I modify the BandMember component
   **Then** `src/components/BandMember.tsx` is modified to:
   - Accept band member data as props matching Sanity schema
   - Display Sanity image using image URL builder
   - Handle missing optional fields gracefully

3. **Given** the component is updated
   **When** I modify the Bandet page
   **Then** `src/pages/Bandet.tsx` is modified to:
   - Use `useBandMembers` hook
   - Display loading spinner while fetching
   - Display error message if fetch fails
   - Render all band members when data loads (FR17, FR18)

4. **Given** all integration is complete
   **When** CMS content is published
   **Then** changes reflect on the site after publishing (FR7)

## Tasks / Subtasks

- [x] Task 1: Create useBandMembers Hook (AC: #1)
  - [x] Create `src/hooks/useBandMembers.ts`
  - [x] Import useState, useEffect from react
  - [x] Import sanityClient from `@/lib/sanity/client`
  - [x] Import bandMembersQuery from `@/lib/sanity/queries`
  - [x] Import BandMember type from `@/types/sanity`
  - [x] Implement hook following EXACT useHero pattern:
    - [x] useState for data (BandMember[] | null)
    - [x] useState for loading (true initially)
    - [x] useState for error (Error | null)
    - [x] useEffect to fetch on mount
    - [x] Return { data, loading, error }
  - [x] Add JSDoc comment matching useHero style
  - [x] Export named function (not default)

- [x] Task 2: Update BandMember Component (AC: #2)
  - [x] Open `src/components/BandMember.tsx`
  - [x] Import urlFor from `@/lib/sanity/image`
  - [x] Import BandMember type from `@/types/sanity`
  - [x] Create new Props type accepting BandMember from Sanity:
    ```typescript
    type Props = {
      member: BandMember
      imageHeight?: number
    }
    ```
  - [x] Update image rendering to use urlFor:
    ```typescript
    {member.image && (
      <img
        src={urlFor(member.image).width(800).url()}
        alt={member.name}
        className="w-full object-cover"
        style={{ height: imageHeight }}
      />
    )}
    ```
  - [x] Handle optional fields gracefully:
    - [x] Only render alias if present and different from name
    - [x] Only render instrument if present
    - [x] Only render inspiration if present
    - [x] Only render hobby if present
    - [x] Only render food if present
  - [x] Preserve existing accessibility (aria-labelledby)
  - [x] Preserve existing styling (card-surface, rounded-2xl)

- [x] Task 3: Update Bandet Page (AC: #3)
  - [x] Open `src/pages/Bandet.tsx`
  - [x] Remove hardcoded member data array
  - [x] Remove static image imports (sondreImg, mariusImg, etc.)
  - [x] Import useBandMembers from `@/hooks/useBandMembers`
  - [x] Import LoadingSpinner from `@/components/LoadingSpinner`
  - [x] Import ErrorMessage from `@/components/ErrorMessage`
  - [x] Add hook call: `const { data, loading, error } = useBandMembers()`
  - [x] Add loading state:
    ```typescript
    if (loading) {
      return (
        <main className="container-page py-10 md:py-14">
          <LoadingSpinner size="lg" className="min-h-[200px]" />
        </main>
      )
    }
    ```
  - [x] Add error state:
    ```typescript
    if (error) {
      return (
        <main className="container-page py-10 md:py-14">
          <ErrorMessage message="Could not load band members" />
        </main>
      )
    }
    ```
  - [x] Update member mapping to use data from hook
  - [x] Preserve page layout structure (container-page, heading, grid)

- [x] Task 4: Verify Integration (AC: #4)
  - [x] Run dev server: `npm run dev`
  - [x] Verify Bandet page loads with CMS data
  - [x] Verify loading spinner appears briefly during fetch
  - [x] Verify images load from Sanity CDN
  - [x] Verify member order matches Sanity order field
  - [x] Verify build passes: `npm run build`
  - [x] Optional: Test error handling by temporarily breaking query

## Dev Notes

### Critical Context

**This is Story 4 of Epic 2 - Band Member Frontend Integration.**

This story connects the Sanity CMS schema (created in Story 2.3) to the frontend. The schema and TypeScript types already exist - this story implements the data fetching hook and updates components to use CMS data.

**Pattern Reference:** Follow the EXACT pattern established in Story 2.2 (Hero integration):
- Hook pattern: `src/hooks/useHero.ts` → replicate for `useBandMembers.ts`
- Image handling: `urlFor(image).width(800).url()`
- Loading/error states: Use existing LoadingSpinner and ErrorMessage components

### Prerequisites Completed (From Story 2.3)

**Sanity Schema:** `studio/schemaTypes/bandMember.ts`
- Fields: name, alias, instrument, inspiration, hobby, food, bio, image, order
- Preview configured with name and image
- Order field enables sorting

**GROQ Query:** `src/lib/sanity/queries.ts`
```typescript
export const bandMembersQuery = `*[_type == "bandMember"] | order(order asc) {
  _id,
  name,
  alias,
  instrument,
  inspiration,
  hobby,
  food,
  bio,
  image,
  order
}`
```

**TypeScript Type:** `src/types/sanity.ts`
```typescript
export interface BandMember {
  _id: string
  name: string
  alias?: string
  instrument?: string
  inspiration?: string
  hobby?: string
  food?: string
  bio?: string
  image?: SanityImageSource
  order?: number
}
```

### Current Implementation to Modify

**Bandet.tsx (lines 1-82):**
- Hardcoded 5 band members in `members` array
- Static image imports from `../assets/`
- Uses local `Member` type with `interest: { hobby, food }` structure

**BandMember.tsx (lines 1-62):**
- Local `Member` type with nested `interest` object
- Direct image src from local file
- All fields rendered unconditionally

### Technical Requirements

**1. useBandMembers Hook**

Location: `src/hooks/useBandMembers.ts`

```typescript
import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity/client'
import { bandMembersQuery } from '@/lib/sanity/queries'
import type { BandMember } from '@/types/sanity'

/**
 * Hook to fetch band members from Sanity CMS
 * Follows the standard data fetching pattern from architecture
 *
 * @returns { data, loading, error } - Band members state
 *
 * @example
 * const { data, loading, error } = useBandMembers()
 * if (loading) return <LoadingSpinner />
 * if (error) return <ErrorMessage message={error.message} />
 * return <BandMemberList members={data} />
 */
export function useBandMembers() {
  const [data, setData] = useState<BandMember[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<BandMember[]>(bandMembersQuery)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
```

**2. Updated BandMember Component**

Key changes to `src/components/BandMember.tsx`:

```typescript
import { urlFor } from '@/lib/sanity/image'
import type { BandMember } from '@/types/sanity'

type Props = {
  member: BandMember
  imageHeight?: number
}

const BandMemberCard: React.FC<Props> = ({ member, imageHeight = 560 }) => {
  return (
    <section className="relative overflow-hidden rounded-2xl card-surface" aria-labelledby={`${member.name}-heading`}>
      {member.image && (
        <img
          src={urlFor(member.image).width(800).url()}
          alt={member.name}
          className="w-full object-cover"
          style={{ height: imageHeight }}
        />
      )}
      <div className="p-5">
        <h2 id={`${member.name}-heading`} className="text-xl font-semibold">
          {member.name}
        </h2>
        {member.alias && member.alias !== member.name && (
          <p className="mt-2 italic">{member.alias}</p>
        )}
        <ul className="mt-3 space-y-1 text-sm leading-6">
          {member.instrument && (
            <li><strong>Instrument:</strong> {member.instrument}</li>
          )}
          {member.inspiration && (
            <li><strong>Inspiration:</strong> {member.inspiration}</li>
          )}
          {member.hobby && (
            <li><strong>Hobby:</strong> {member.hobby}</li>
          )}
          {member.food && (
            <li><strong>Favorittmat:</strong> {member.food}</li>
          )}
        </ul>
      </div>
    </section>
  )
}
```

**3. Updated Bandet Page**

Key changes to `src/pages/Bandet.tsx`:

```typescript
import { useBandMembers } from '@/hooks/useBandMembers'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorMessage } from '@/components/ErrorMessage'
import BandMember from '../components/BandMember'

const Bandet: React.FC = () => {
  const { data, loading, error } = useBandMembers()

  if (loading) {
    return (
      <main className="container-page py-10 md:py-14">
        <LoadingSpinner size="lg" className="min-h-[200px]" />
      </main>
    )
  }

  if (error) {
    return (
      <main className="container-page py-10 md:py-14">
        <ErrorMessage message="Could not load band members" />
      </main>
    )
  }

  return (
    <main className="container-page py-10 md:py-14">
      <h1 className="text-center mb-6 text-3xl md:text-5xl font-bold tracking-tight">
        BANDET
      </h1>
      <div className="align-text mb-8">
        <p>
          Vågal er bandet som garanterer fullt trøkk fra første sekund!...
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {data?.map((m) => (
          <BandMember key={m._id} member={m} imageHeight={600} />
        ))}
      </div>
    </main>
  )
}
```

### File Structure After Changes

```
src/
├── hooks/
│   ├── useHero.ts           # Existing
│   └── useBandMembers.ts    # NEW: Band members data hook
├── components/
│   └── BandMember.tsx       # MODIFIED: Accept Sanity data
├── pages/
│   └── Bandet.tsx           # MODIFIED: Use hook, remove static data
```

### Architecture Compliance

**From Architecture Document:**

> **CMS Data Fetching Hook Pattern:**
> ```typescript
> function useBandMembers() {
>   const [data, setData] = useState<BandMember[] | null>(null)
>   const [loading, setLoading] = useState(true)
>   const [error, setError] = useState<Error | null>(null)
>   // ... fetch logic
>   return { data, loading, error }
> }
> ```

> **Loading State Pattern:**
> ```typescript
> if (loading) return <LoadingSpinner />
> if (error) return <ErrorMessage message={error.message} />
> return <ActualContent data={data} />
> ```

> **CMS Data Boundary:**
> - Hooks in `src/hooks/` are the only consumers of Sanity client
> - Pages and components receive data via hooks, never import Sanity directly

### Anti-Patterns to Avoid

- **DO NOT** import sanityClient directly in page or component files
- **DO NOT** create a new loading/error component - use existing ones
- **DO NOT** change the hook return type pattern (must be `{ data, loading, error }`)
- **DO NOT** remove accessibility attributes from BandMember component
- **DO NOT** hardcode image dimensions - use urlFor with width for optimization
- **DO NOT** forget to handle null data case (use `data?.map()`)
- **DO NOT** leave unused imports (remove static image imports after migration)

### Previous Story Intelligence

**From Story 2.2 (Hero CMS Integration):**
- Hook naming: `use[ContentType]` (e.g., `useHero`, `useBandMembers`)
- Error handling wraps error in proper Error instance
- Import paths use `@/` alias consistently
- Named exports for hooks (not default)

**From Story 2.3 (Band Member Schema):**
- BandMember type uses optional fields (alias?, instrument?, etc.)
- Image field is optional - must handle null gracefully
- Order field used for sorting in GROQ query

**Build Pattern:**
- Main app: `npm run dev` (port 5173 or 5175)
- Build verification: `npm run build`
- Sanity Studio: `cd studio && npm run dev` (port 3333)

### Git Commit Pattern

Follow established pattern:
```
feat: Integrate band members with frontend (Story 2.4)
```

### Existing Files Reference

**useHero.ts (Pattern to Follow):**
```typescript
export function useHero() {
  const [data, setData] = useState<HeroContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<HeroContent>(heroQuery)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
```

**urlFor Usage (From image.ts):**
```typescript
// Basic usage
urlFor(image).url()

// With transformations
urlFor(image).width(800).url()
urlFor(image).width(400).height(300).fit('crop').url()
```

### Data Migration Notes

**Old Format (Bandet.tsx):**
```typescript
{
  name: "Marius Presthaug",
  alias: "Marius Presthaug",
  instrument: "Vokalist",
  inspiration: "Hellbillies, Plumbo",
  interest: { hobby: "Maling", food: "Fisk" },
  image: mariusImg, // static import
}
```

**New Format (Sanity CMS):**
```typescript
{
  _id: "abc123",
  name: "Marius Presthaug",
  alias: "Marius Presthaug",
  instrument: "Vokalist",
  inspiration: "Hellbillies, Plumbo",
  hobby: "Maling",          // flat, not nested
  food: "Fisk",             // flat, not nested
  image: { _type: 'image', asset: { _ref: '...' } },
  order: 1
}
```

Key difference: `hobby` and `food` are flat fields in Sanity, not nested under `interest`.

### Testing Checklist

1. [x] useBandMembers hook created with correct signature
2. [x] Hook returns data, loading, error state
3. [x] BandMember component accepts Sanity BandMember type
4. [x] Images render from Sanity CDN (not local assets)
5. [x] Missing fields handled gracefully (no render errors)
6. [x] Loading spinner displays during fetch
7. [x] Error message displays on fetch failure
8. [x] Members sorted by order field
9. [x] Build passes: `npm run build`
10. [x] No TypeScript errors
11. [x] No unused imports remaining

### Dependencies

**No new package installations required.** Uses existing:
- `@sanity/client` (installed in Story 2.1)
- `@sanity/image-url` (installed in Story 2.1)
- LoadingSpinner, ErrorMessage (created in Story 1.4)

### References

- [Source: docs/architecture.md#Implementation Patterns] - Hook and loading patterns
- [Source: docs/architecture.md#Data Architecture] - CMS data boundary rules
- [Source: docs/epics.md#Story 2.4] - Acceptance criteria
- [Source: docs/prd.md#Content Management] - FR7, FR17, FR18 requirements
- [Source: src/hooks/useHero.ts] - Hook implementation pattern
- [Source: src/lib/sanity/image.ts] - Image URL builder usage
- [Source: src/types/sanity.ts] - BandMember type definition

## Dev Agent Record

### Context Reference

<!-- Story context verified against: docs/prd.md, docs/architecture.md, docs/epics.md, src/hooks/useHero.ts, src/lib/sanity/queries.ts, src/types/sanity.ts, src/pages/Bandet.tsx, src/components/BandMember.tsx -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build successful: `npm run build` completed in 4.40s
- TypeScript compilation passed with no errors (`npx tsc --noEmit`)
- All 1988 modules transformed successfully

### Completion Notes List

- **Task 1:** Created `src/hooks/useBandMembers.ts` following exact useHero pattern - fetches band members from Sanity with loading/error/data states, JSDoc documentation, named export
- **Task 2:** Updated `src/components/BandMember.tsx` to accept Sanity BandMember type, use urlFor for CDN images, handle optional fields gracefully with conditional rendering, preserved accessibility attributes
- **Task 3:** Updated `src/pages/Bandet.tsx` to use useBandMembers hook, removed hardcoded data and static image imports, added loading spinner and error message states, preserved page layout structure
- **Task 4:** Verified integration - build passes in 4.40s, TypeScript check passes, all acceptance criteria satisfied

### Change Log

- 2025-12-12: Implemented band member frontend CMS integration (Story 2.4)
  - Created useBandMembers hook
  - Updated BandMember component for CMS data
  - Updated Bandet page to use hook with loading/error states
  - Removed hardcoded data and static image imports

### File List

**New Files:**
- src/hooks/useBandMembers.ts

**Modified Files:**
- src/components/BandMember.tsx
- src/pages/Bandet.tsx
