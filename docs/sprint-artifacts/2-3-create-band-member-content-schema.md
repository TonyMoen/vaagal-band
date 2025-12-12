# Story 2.3: Create Band Member Content Schema

Status: Ready for Review

## Story

As a **band member**,
I want **to manage band member profiles in the CMS**,
so that **I can update photos, bios, and details without developer help**.

## Acceptance Criteria

1. **Given** Sanity CMS is initialized
   **When** I create the band member schema
   **Then** a `bandMember` document type exists in Sanity with fields:
   - `name` (string, required)
   - `alias` (string)
   - `instrument` (string)
   - `bio` (text/block content)
   - `image` (image with hotspot)
   - `order` (number for sorting)

2. **Given** the band member schema exists
   **When** I create the GROQ query
   **Then** `src/lib/sanity/queries.ts` includes a GROQ query for band members (sorted by order)

3. **Given** the query exists
   **When** I create TypeScript types
   **Then** `src/types/sanity.ts` includes `BandMember` TypeScript interface

4. **Given** all schema work is complete
   **When** band members use Sanity Studio
   **Then** they can create/edit profiles (FR3) and upload profile photos (FR4)

## Tasks / Subtasks

- [x] Task 1: Create Band Member Schema in Sanity Studio (AC: #1)
  - [x] Create `studio/schemaTypes/bandMember.ts` with defineType/defineField
  - [x] Add `name` field: type `string`, required via validation rule
  - [x] Add `alias` field: type `string`, description "e.g. stage name or nickname"
  - [x] Add `instrument` field: type `string`
  - [x] Add `inspiration` field: type `string` (for musical inspiration)
  - [x] Add `hobby` field: type `string`
  - [x] Add `food` field: type `string` (favorite food)
  - [x] Add `bio` field: type `text` (multiline text for extended bio - optional)
  - [x] Add `image` field: type `image` with hotspot enabled
  - [x] Add `order` field: type `number` for sorting, description "Lower numbers appear first"
  - [x] Add preview configuration showing name and image
  - [x] Register schema in `studio/schemaTypes/index.ts`
  - [x] Test by creating a band member document in Sanity Studio

- [x] Task 2: Create GROQ Query (AC: #2)
  - [x] Open `src/lib/sanity/queries.ts`
  - [x] Add `bandMembersQuery` GROQ query
  - [x] Query should select all BandMember fields
  - [x] Sort by `order asc` to respect ordering
  - [x] Export the query for use in hooks

- [x] Task 3: Create TypeScript Types (AC: #3)
  - [x] Open `src/types/sanity.ts`
  - [x] Add `BandMember` interface with all required fields
  - [x] Ensure type matches existing `Member` type pattern in BandMember.tsx

- [x] Task 4: Verify Schema Works (AC: #4)
  - [x] Run Sanity Studio: `cd studio && npm run dev`
  - [x] Create test band member documents for all 5 members
  - [x] Verify image upload and hotspot work
  - [x] Verify ordering field sorts correctly
  - [x] Build main app: `npm run build` (must complete without errors)

## Dev Notes

### Critical Context

**This is Story 3 of Epic 2 - Band Member CMS Schema (Backend Only).**

This story creates the Sanity schema and types ONLY. The frontend integration (useBandMembers hook, component modifications) is handled in **Story 2.4**.

**Pattern Reference:** Follow the exact pattern established in Story 2.2 (Hero schema):
- Schema file pattern: `studio/schemaTypes/bandMember.ts`
- Query file: `src/lib/sanity/queries.ts`
- Type file: `src/types/sanity.ts`

### Prerequisites Completed

**Story 2.2 - Hero CMS Integration (DONE)**
- Hero schema pattern established at `studio/schemaTypes/hero.ts`
- GROQ query pattern in `src/lib/sanity/queries.ts`
- Type definition pattern in `src/types/sanity.ts`
- Sanity Studio running at `studio/` folder
- CORS configured for localhost:5173 and localhost:5175

**Story 2.1 - Sanity CMS Init (DONE)**
- Sanity project: `h4lkrp1v`, dataset: `production`
- Packages installed: `@sanity/client`, `@sanity/image-url`
- Client configured at `src/lib/sanity/client.ts`
- Image helper at `src/lib/sanity/image.ts`

### Current Band Member Data Structure

**Existing hardcoded data in `src/pages/Bandet.tsx`:**
```typescript
type Member = {
  name: string;
  alias: string;
  instrument: string;
  inspiration: string;
  interest: { hobby: string; food: string };
  image: string;
};

// Example data:
{
  name: "Marius Presthaug",
  alias: "Marius Presthaug",
  instrument: "Vokalist",
  inspiration: "Hellbillies, Plumbo",
  interest: { hobby: "Maling", food: "Fisk" },
  image: mariusImg,
}
```

**The Sanity schema MUST support all these fields** to enable seamless migration in Story 2.4.

### Technical Requirements

**1. Sanity Band Member Schema**

Location: `studio/schemaTypes/bandMember.ts`

```typescript
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'bandMember',
  title: 'Band Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full name of the band member',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alias',
      title: 'Alias / Stage Name',
      type: 'string',
      description: 'Stage name or nickname (e.g., "Mr Caravan")',
    }),
    defineField({
      name: 'instrument',
      title: 'Instrument',
      type: 'string',
      description: 'Primary instrument or role (e.g., "Vokalist", "Gitarist")',
    }),
    defineField({
      name: 'inspiration',
      title: 'Musical Inspiration',
      type: 'string',
      description: 'Musical influences and inspirations',
    }),
    defineField({
      name: 'hobby',
      title: 'Hobby',
      type: 'string',
      description: 'Favorite hobby or interest',
    }),
    defineField({
      name: 'food',
      title: 'Favorite Food',
      type: 'string',
      description: 'Favorite food',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      description: 'Extended biography (optional)',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Band member photo',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g., 1, 2, 3...)',
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'instrument',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
```

**2. Register Schema**

Location: `studio/schemaTypes/index.ts`

```typescript
import hero from './hero'
import bandMember from './bandMember'

export const schemaTypes = [hero, bandMember]
```

**3. GROQ Query**

Location: `src/lib/sanity/queries.ts` (add to existing file)

```typescript
/**
 * Band members query - fetches all band members sorted by order
 * Returns: Array of { _id, name, alias, instrument, inspiration, hobby, food, bio, image, order }
 */
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

**4. TypeScript Types**

Location: `src/types/sanity.ts` (add to existing file)

```typescript
/**
 * Band member content from Sanity CMS
 * Used by useBandMembers hook and BandMember component
 */
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

### File Structure After Changes

```
studio/
├── schemaTypes/
│   ├── index.ts          # MODIFIED: Add bandMember import
│   ├── hero.ts           # Existing
│   └── bandMember.ts     # NEW: Band member schema

src/
├── lib/
│   └── sanity/
│       └── queries.ts    # MODIFIED: Add bandMembersQuery
└── types/
    └── sanity.ts         # MODIFIED: Add BandMember interface
```

### Architecture Compliance

**From Architecture Document:**

> **Sanity Schema Naming:**
> - Document types: camelCase (`hero`, `bandMember`)
> - Field names: camelCase

> **Type Definitions:**
> ```typescript
> interface BandMember {
>   _id: string
>   name: string
>   // ...
> }
> ```

### Anti-Patterns to Avoid

- **DO NOT** use PascalCase for schema name (use `bandMember`, not `BandMember`)
- **DO NOT** forget to register schema in `index.ts`
- **DO NOT** skip the `order` field - it's needed for consistent sorting
- **DO NOT** make image field required - some members may not have photos initially
- **DO NOT** modify frontend components - that's Story 2.4
- **DO NOT** create the useBandMembers hook - that's Story 2.4

### Current Band Members (For Test Data)

When testing, create documents for these 5 members in this order:

1. **Marius Presthaug** - Vokalist, Inspiration: Hellbillies/Plumbo, Hobby: Maling, Food: Fisk
2. **Sondre Gautefald** (alias: Mr Caravan) - Multiinstrument, Inspiration: Iron Maiden, Hobby: Ski, Food: Taco
3. **Truls Venmann** - Trommeslager, Inspiration: Vågal, Hobby: Musikk, Food: Pizza
4. **Torstein Vala** - Gitarist, Inspiration: Vågal, Hobby: Musikk, Food: Pizza
5. **Tony Portås Moen** - Bassist, Inspiration: Beyoncé, Hobby: Musikk, Food: Pizza

### Previous Story Intelligence

**From Story 2.2 (Hero CMS Integration):**

- Schema file pattern uses `defineType` and `defineField` from `sanity` package
- Image field with `hotspot: true` works correctly
- Preview configuration helps identify documents in studio
- GROQ queries use `*[_type == "typename"]` pattern
- Types in `sanity.ts` import `SanityImageSource` from `@/lib/sanity/image`

**Build Pattern:**
- Sanity Studio: `cd studio && npm run dev` (port 3333 by default)
- Main app: `npm run dev` (port 5173 or 5175)
- Build verification: `npm run build`

### Git Commit Pattern

Follow established pattern:
```
feat: Add band member content schema (Story 2.3)
```

### Testing Checklist

1. [x] Sanity Studio shows "Band Member" document type
2. [x] Can create new band member with all fields
3. [x] Name field shows validation error when empty
4. [x] Image upload and hotspot work
5. [x] Order field affects document sorting in studio
6. [x] Main app builds without errors: `npm run build`
7. [x] TypeScript types compile without errors

### Dependencies

**No new package installations required.** Uses existing:
- `@sanity/client`
- `@sanity/image-url`
- `sanity` (in studio folder)

### References

- [Source: docs/architecture.md#Implementation Patterns] - Naming conventions
- [Source: docs/architecture.md#Data Architecture] - Content schema strategy
- [Source: docs/epics.md#Story 2.3] - Acceptance criteria
- [Source: docs/prd.md#Content Management] - FR3, FR4 requirements
- [Source: docs/sprint-artifacts/2-2-create-hero-content-schema-and-integration.md] - Pattern reference

## Dev Agent Record

### Context Reference

<!-- Story context verified against: docs/prd.md, docs/architecture.md, docs/epics.md, docs/sprint-artifacts/2-2-create-hero-content-schema-and-integration.md -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build successful: `npm run build` completed in 4.66s, all modules transformed
- Sanity Studio hot-reloaded schema successfully
- TypeScript compilation passed with no errors

### Completion Notes List

- **Task 1:** Created `studio/schemaTypes/bandMember.ts` with complete schema including all required fields: name (required), alias, instrument, inspiration, hobby, food, bio (text), image (with hotspot), order (with default 99). Added preview config and orderings.
- **Task 2:** Added `bandMembersQuery` GROQ query to `src/lib/sanity/queries.ts` - fetches all band members sorted by order ascending.
- **Task 3:** Added `BandMember` interface to `src/types/sanity.ts` with all fields matching the schema and existing Member type pattern.
- **Task 4:** Verified all components work - Sanity Studio loaded schema (page reload confirmed), main app builds without errors (4.66s build time), TypeScript compiles cleanly.

### Change Log

- 2025-12-12: Implemented band member CMS schema (all tasks complete)

### File List

**New Files:**
- studio/schemaTypes/bandMember.ts

**Modified Files:**
- studio/schemaTypes/index.ts
- src/lib/sanity/queries.ts
- src/types/sanity.ts
