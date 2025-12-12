# Story 7.4: Discography Content Schema in Sanity

Status: review

## Story

As a **band member**,
I want **to manage music releases in the CMS**,
so that **I can add new singles/albums and feature them on the site**.

## Acceptance Criteria

1. A `release` document type exists in Sanity with fields:
   - `title` (string, required) - Song/album name
   - `releaseType` (string: "single", "EP", "album")
   - `coverImage` (image with hotspot, required)
   - `releaseDate` (date, required)
   - `spotifyUrl` (url, optional)
   - `appleMusicUrl` (url, optional)
   - `youtubeUrl` (url, optional)
   - `isLatest` (boolean) - Flag for homepage feature
2. Releases are sortable by release date
3. `src/lib/sanity/queries.ts` includes GROQ query for releases
4. `src/types/sanity.ts` includes `Release` TypeScript interface

## Tasks / Subtasks

- [x] Task 1: Create release schema in Sanity Studio (AC: 1, 2)
  - [x] Create `studio/schemaTypes/release.ts` with all fields
  - [x] Use `defineType` and `defineField` from sanity (established pattern)
  - [x] Add validation: title, coverImage, releaseDate are required
  - [x] Add `releaseType` as string list with options: single, EP, album
  - [x] Configure `isLatest` boolean with description for homepage feature
  - [x] Add preview config showing title, release type, and cover image
  - [x] Add ordering by releaseDate descending (newest first)

- [x] Task 2: Register release schema (AC: 1)
  - [x] Import release schema in `studio/schemaTypes/index.ts`
  - [x] Add to `schemaTypes` array

- [x] Task 3: Add GROQ query for releases (AC: 3)
  - [x] Add `releasesQuery` to `src/lib/sanity/queries.ts`
  - [x] Query all releases sorted by releaseDate descending
  - [x] Add `latestReleaseQuery` for fetching the single release with isLatest=true

- [x] Task 4: Add TypeScript interface (AC: 4)
  - [x] Add `Release` interface to `src/types/sanity.ts`
  - [x] Include all fields with proper optional markers
  - [x] Follow established pattern from `BandMember` interface

- [x] Task 5: Create useReleases hook (follows architecture pattern)
  - [x] Create `src/hooks/useReleases.ts`
  - [x] Follow exact pattern from `useBandMembers.ts`
  - [x] Return `{ data, loading, error }` state

- [x] Task 6: Create useLatestRelease hook (for homepage feature)
  - [x] Create `src/hooks/useLatestRelease.ts`
  - [x] Fetch single release where isLatest=true
  - [x] Return `{ data, loading, error }` state

- [x] Task 7: Verify Sanity Studio and build
  - [x] Restart Sanity Studio dev server
  - [x] Verify release document type appears in Studio
  - [x] Create a test release to verify schema
  - [x] Run `npm run build` to verify no TypeScript errors

## Dev Notes

### CRITICAL: Follow Established Patterns

This project has well-established patterns for Sanity schemas, queries, types, and hooks. **DO NOT deviate from these patterns.**

### Sanity Schema Pattern (from hero.ts and bandMember.ts)

```typescript
// studio/schemaTypes/release.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'release',
  title: 'Release',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Song or album name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'releaseType',
      title: 'Release Type',
      type: 'string',
      options: {
        list: [
          {title: 'Single', value: 'single'},
          {title: 'EP', value: 'EP'},
          {title: 'Album', value: 'album'},
        ],
        layout: 'radio',
      },
      initialValue: 'single',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Album/single cover art',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
      description: 'Link to release on Spotify',
    }),
    defineField({
      name: 'appleMusicUrl',
      title: 'Apple Music URL',
      type: 'url',
      description: 'Link to release on Apple Music',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Link to music video or audio on YouTube',
    }),
    defineField({
      name: 'isLatest',
      title: 'Feature as Latest Release',
      type: 'boolean',
      description: 'Enable to feature this release on the homepage hero. Only one release should be marked as latest.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'releaseType',
      media: 'coverImage',
    },
  },
  orderings: [
    {
      title: 'Release Date (Newest)',
      name: 'releaseDateDesc',
      by: [{field: 'releaseDate', direction: 'desc'}],
    },
    {
      title: 'Release Date (Oldest)',
      name: 'releaseDateAsc',
      by: [{field: 'releaseDate', direction: 'asc'}],
    },
  ],
})
```

### Schema Registration Pattern (from index.ts)

```typescript
// studio/schemaTypes/index.ts
import hero from './hero'
import bandMember from './bandMember'
import release from './release'

export const schemaTypes = [hero, bandMember, release]
```

### GROQ Query Pattern (from queries.ts)

```typescript
// Add to src/lib/sanity/queries.ts

/**
 * All releases query - fetches all releases sorted by date (newest first)
 * Returns: Array of { _id, title, releaseType, coverImage, releaseDate, spotifyUrl, appleMusicUrl, youtubeUrl, isLatest }
 */
export const releasesQuery = `*[_type == "release"] | order(releaseDate desc) {
  _id,
  title,
  releaseType,
  coverImage,
  releaseDate,
  spotifyUrl,
  appleMusicUrl,
  youtubeUrl,
  isLatest
}`

/**
 * Latest release query - fetches the release marked as featured for homepage
 * Returns: Single release object or null
 */
export const latestReleaseQuery = `*[_type == "release" && isLatest == true][0] {
  _id,
  title,
  releaseType,
  coverImage,
  releaseDate,
  spotifyUrl,
  appleMusicUrl,
  youtubeUrl
}`
```

### TypeScript Interface Pattern (from sanity.ts)

```typescript
// Add to src/types/sanity.ts

/**
 * Music release content from Sanity CMS
 * Used by useReleases hook and Discography components
 */
export interface Release {
  _id: string
  title: string
  releaseType?: 'single' | 'EP' | 'album'
  coverImage: SanityImageSource
  releaseDate: string
  spotifyUrl?: string
  appleMusicUrl?: string
  youtubeUrl?: string
  isLatest?: boolean
}
```

### Hook Pattern (from useHero.ts and useBandMembers.ts)

```typescript
// src/hooks/useReleases.ts
import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity/client'
import { releasesQuery } from '@/lib/sanity/queries'
import type { Release } from '@/types/sanity'

/**
 * Hook to fetch all releases from Sanity CMS
 * Follows the standard data fetching pattern from architecture
 *
 * @returns { data, loading, error } - Releases state
 */
export function useReleases() {
  const [data, setData] = useState<Release[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<Release[]>(releasesQuery)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
```

```typescript
// src/hooks/useLatestRelease.ts
import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity/client'
import { latestReleaseQuery } from '@/lib/sanity/queries'
import type { Release } from '@/types/sanity'

/**
 * Hook to fetch the latest featured release from Sanity CMS
 * Used for homepage hero feature
 *
 * @returns { data, loading, error } - Latest release state
 */
export function useLatestRelease() {
  const [data, setData] = useState<Release | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<Release | null>(latestReleaseQuery)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
```

### Project Structure Notes

**Files to Create:**
| File | Purpose |
|------|---------|
| `studio/schemaTypes/release.ts` | Sanity schema for releases |
| `src/hooks/useReleases.ts` | Hook for fetching all releases |
| `src/hooks/useLatestRelease.ts` | Hook for fetching homepage featured release |

**Files to Modify:**
| File | Changes |
|------|---------|
| `studio/schemaTypes/index.ts` | Import and register release schema |
| `src/lib/sanity/queries.ts` | Add releasesQuery and latestReleaseQuery |
| `src/types/sanity.ts` | Add Release interface |

### Architecture Compliance

From `docs/architecture.md`:

**Sanity Schema Naming (MUST follow):**
- Document types: camelCase (`release`)
- Field names: camelCase (`coverImage`, `releaseDate`, `isLatest`)

**Code Naming (MUST follow):**
- React hooks: camelCase with `use` prefix (`useReleases.ts`, `useLatestRelease.ts`)
- Types/Interfaces: PascalCase (`Release`)

**File Organization (MUST follow):**
- Sanity schemas: `studio/schemaTypes/`
- Hooks: `src/hooks/`
- Types: `src/types/`
- Queries: `src/lib/sanity/`

### Previous Story Intelligence (Story 7.3)

From Story 7.3 implementation learnings:
- Use `cn()` utility from `@/lib/utils` for conditional class names
- Prefer CSS variables for colors (`var(--color-text)`) over hardcoded hex values
- Follow established component patterns

### Git Intelligence (Recent Commits)

```
4900e0b feat: Simplify footer with icon-only social links and booking CTA (Story 7.2)
15fa4ea feat: Add social media icon buttons to navigation (Story 7.1)
8a6b8a1 feat: Add form validation with Norwegian error messages (Story 6.2)
```

**Commit message format to follow:**
`feat: Add discography content schema in Sanity (Story 7.4)`

### Important Considerations

**Release Type Field:**
- Use string with options list (not enum) for CMS flexibility
- Options: single, EP, album
- Radio layout for easy selection in Studio

**isLatest Boolean:**
- Only ONE release should be marked as latest at a time
- Add description in Studio UI to make this clear
- Homepage will use `latestReleaseQuery` to get featured release
- If no release is marked as latest, homepage shows default hero (handled in Story 7.6)

**Image Requirements:**
- Cover images should support hotspot for cropping flexibility
- Use `urlFor()` helper from `@/lib/sanity/image` for image URLs
- Images will be displayed at various sizes (grid view, featured view)

**Date Handling:**
- Sanity `date` type returns ISO string (YYYY-MM-DD)
- Format dates in components using JavaScript Date methods or library
- Norwegian locale may be needed for display (future story consideration)

### Testing Verification

After implementation:
1. Run Sanity Studio: `cd studio && npm run dev`
2. Verify "Release" document type appears in Studio sidebar
3. Create test release with all fields
4. Verify sorting by release date works
5. Run frontend build: `npm run build`
6. No TypeScript errors should occur

### Anti-Patterns to AVOID

- ❌ Creating separate files for each streaming URL field (keep in single schema)
- ❌ Using `defineArrayMember` for streaming URLs (simple string fields are sufficient)
- ❌ Adding validation for URL format (Sanity `url` type handles this)
- ❌ Creating components in this story (schema and data layer only)
- ❌ Modifying existing schemas (hero, bandMember) - only add new release schema
- ❌ Using different naming conventions than established patterns

### References

- [Source: docs/epics.md#Story 7.4: Discography Content Schema in Sanity]
- [Source: docs/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: docs/architecture.md#Project Structure & Boundaries]
- [Source: studio/schemaTypes/hero.ts] - Schema pattern reference
- [Source: studio/schemaTypes/bandMember.ts] - Schema pattern reference
- [Source: src/lib/sanity/queries.ts] - Query pattern reference
- [Source: src/types/sanity.ts] - Type pattern reference
- [Source: src/hooks/useBandMembers.ts] - Hook pattern reference

## Dev Agent Record

### Context Reference

<!-- Story created by create-story workflow - 2025-12-12 -->

### Agent Model Used

claude-opus-4-5-20251101

### Debug Log References

- Build successful with no TypeScript errors
- All IDE diagnostics clean (0 errors related to this story)

### Completion Notes List

- Created release schema with all required fields: title, releaseType, coverImage, releaseDate, streaming URLs, isLatest
- Used defineType/defineField pattern consistent with existing schemas (hero.ts, bandMember.ts)
- Added validation for required fields (title, coverImage, releaseDate)
- releaseType uses radio layout with options: single, EP, album (initialValue: single)
- isLatest boolean includes descriptive text for CMS users
- Preview config shows title, releaseType as subtitle, and coverImage
- Added two orderings: Release Date (Newest) and Release Date (Oldest)
- GROQ queries follow existing pattern from bandMembersQuery
- Release interface follows BandMember pattern with proper optional markers
- Both hooks (useReleases, useLatestRelease) follow exact useBandMembers pattern
- Build passes with no TypeScript errors

### Change Log

- 2025-12-12: Implemented Story 7.4 - Added discography content schema in Sanity

### File List

**Files Created:**
- `studio/schemaTypes/release.ts`
- `src/hooks/useReleases.ts`
- `src/hooks/useLatestRelease.ts`

**Files Modified:**
- `studio/schemaTypes/index.ts`
- `src/lib/sanity/queries.ts`
- `src/types/sanity.ts`
