# Story 2.1: Initialize Sanity CMS Project

Status: done

## Story

As a **band member**,
I want **a content management system set up for the website**,
so that **I have a dashboard where I can manage content**.

## Acceptance Criteria

1. **Given** the project needs CMS capabilities
   **When** I initialize Sanity CMS
   **Then** a Sanity project is created and configured with project ID and dataset

2. **Given** Sanity project is created
   **When** I install the required packages
   **Then** `@sanity/client` and `@sanity/image-url` packages are installed

3. **Given** packages are installed
   **When** I create the Sanity client
   **Then** `src/lib/sanity/client.ts` exists with:
   - Sanity client configured using environment variables
   - `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` used
   - API version set to current date format (2025-02-06 or later)
   - TypeScript types for configuration

4. **Given** Sanity client is created
   **When** I create the image URL utility
   **Then** `src/lib/sanity/image.ts` exists with image URL builder utility

5. **Given** all Sanity utilities are created
   **When** I run `npm run build`
   **Then** the project builds without errors

6. **Given** Sanity is configured
   **When** I verify the Sanity Studio is accessible
   **Then** the Sanity Studio can be accessed for content management (FR1)

## Tasks / Subtasks

- [x] Task 1: Create Sanity project via CLI (AC: #1)
  - [x] Run `npx sanity@latest init --env` in project root
  - [x] Select "Create new project" option
  - [x] Name project: "vaagal-app" or similar
  - [x] Create production dataset
  - [x] Note the project ID generated
  - [x] Verify `.env` file is created/updated with Sanity credentials

- [x] Task 2: Update environment variables (AC: #1, #2)
  - [x] Update `.env.example` with Sanity variables documentation
  - [x] Ensure `.env` has: `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`
  - [x] Verify `.env` is in `.gitignore`

- [x] Task 3: Install Sanity packages (AC: #2)
  - [x] Run `npm install @sanity/client @sanity/image-url`
  - [x] Verify packages appear in package.json dependencies

- [x] Task 4: Create Sanity client (AC: #3, #5)
  - [x] Create directory `src/lib/sanity/`
  - [x] Create `src/lib/sanity/client.ts` with typed Sanity client
  - [x] Use `import.meta.env.VITE_SANITY_PROJECT_ID`
  - [x] Use `import.meta.env.VITE_SANITY_DATASET`
  - [x] Set `useCdn: true` for production reads
  - [x] Set `apiVersion: '2025-02-06'` (use current date format)

- [x] Task 5: Create image URL builder (AC: #4, #5)
  - [x] Create `src/lib/sanity/image.ts`
  - [x] Export image URL builder function
  - [x] Handle image transformations (width, height, quality)

- [x] Task 6: Create placeholder queries file (AC: #5)
  - [x] Create `src/lib/sanity/queries.ts` with empty placeholder
  - [x] Add comment noting queries will be added in subsequent stories

- [x] Task 7: Add CORS origin in Sanity (AC: #6)
  - [x] Navigate to sanity.io/manage → project → API settings
  - [x] Add `http://localhost:5173` as allowed CORS origin
  - [x] Note: Production URL will be added during deployment

- [x] Task 8: Verify build and Sanity Studio access (AC: #5, #6)
  - [x] Run `npm run build` - must complete without errors
  - [x] Run `npm run dev` - verify dev server starts
  - [x] Verify Sanity Studio is accessible at sanity.io/studio or via deployed studio URL

## Dev Notes

### Critical Context

**This is Story 1 of Epic 2 - the CMS foundation story.**

This story establishes the Sanity CMS infrastructure that ALL subsequent Epic 2 stories depend on:
- **Story 2.2** (Hero Schema): Will create schemas using this client
- **Story 2.3** (Band Member Schema): Will create schemas using this client
- **Story 2.4** (Band Members Frontend): Will fetch data using this client
- **Story 2.5** (Content Preview): Will configure preview using this setup

**DO NOT create content schemas in this story.** Schemas are created in Stories 2.2 and 2.3.

### Prerequisites Completed

**Epic 1 - Project Foundation (DONE)**
- Story 1.1: Environment variables setup - `.env.example` exists, `.gitignore` updated
- Story 1.2: Merch page removed - clean codebase
- Story 1.3: shadcn/ui initialized - design system ready
- Story 1.4: Shared utility components - LoadingSpinner, ErrorMessage, WidgetErrorBoundary created

### Current Project State

**Tech Stack (verified in Epic 1):**
- React 19.1.1
- Vite 7.1.7
- TypeScript 5.8.3
- Tailwind CSS 3.4.17
- shadcn/ui initialized (New York style)

**Existing Directory Structure:**
```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── LoadingSpinner.tsx     # From Story 1.4
│   ├── ErrorMessage.tsx       # From Story 1.4
│   └── WidgetErrorBoundary.tsx # From Story 1.4
├── lib/
│   └── utils.ts               # cn() utility from shadcn
├── pages/
└── ...
```

### Architecture Compliance

**From Architecture Document (docs/architecture.md):**

> **Project Structure:**
> ```
> src/
> ├── lib/
> │   └── sanity/
> │       ├── client.ts    # Sanity client config
> │       ├── queries.ts   # GROQ queries
> │       └── image.ts     # Image URL builder
> └── types/
>     └── sanity.ts        # CMS content types
> ```

> **CMS Data Boundary:**
> - All Sanity interactions isolated to `src/lib/sanity/`
> - Hooks in `src/hooks/` are the only consumers of Sanity client
> - Pages and components receive data via hooks, never import Sanity directly

> **Environment Variables:**
> - `VITE_SANITY_PROJECT_ID` - Sanity project identifier
> - `VITE_SANITY_DATASET` - Dataset name (production)

### Technical Requirements

**1. Sanity Client Configuration**

Location: `src/lib/sanity/client.ts`

```typescript
import { createClient, type ClientConfig } from '@sanity/client'

const config: ClientConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true, // `false` if you want fresh data
  apiVersion: '2025-02-06' // Use current date format YYYY-MM-DD
}

export const sanityClient = createClient(config)
```

**CRITICAL:**
- `apiVersion` must be a hardcoded date string (e.g., `'2025-02-06'`)
- **NEVER** use dynamic dates like `new Date().toISOString()` - this can break your app randomly
- Set `useCdn: true` for client-side reads (faster, cached)

**2. Image URL Builder**

Location: `src/lib/sanity/image.ts`

```typescript
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Usage example:
// urlFor(image).width(800).url()
// urlFor(image).width(400).height(300).fit('crop').url()
```

**3. GROQ Queries Placeholder**

Location: `src/lib/sanity/queries.ts`

```typescript
// GROQ queries will be added in subsequent stories:
// - Story 2.2: Hero content query
// - Story 2.3: Band members query

export {} // Placeholder to ensure file is valid module
```

**4. Environment Variables Update**

Add to `.env.example`:
```bash
# Sanity CMS
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
```

### Sanity CLI Setup Process

**Step 1: Initialize Sanity Project**
```bash
npx sanity@latest init --env
```

This command will:
- Prompt for Sanity account login (creates if needed)
- Ask to create new project or use existing
- Create a new dataset
- Generate project ID
- Create/update `.env` file with credentials

**Expected prompts and recommended answers:**
- "Create new project or use existing?" → **Create new project**
- "Project name:" → **vaagal-app** (or similar)
- "Use the default dataset configuration?" → **Yes**
- "Dataset name:" → **production**
- "Would you like to add configuration files for a Sanity project?" → **No** (we're manually creating client)

**Step 2: Note the Project ID**
After init completes, note the project ID from terminal output or `.env` file.

**Step 3: Configure CORS**
1. Go to https://www.sanity.io/manage
2. Select your project
3. Navigate to API → CORS Origins
4. Add: `http://localhost:5173` (Vite dev server)
5. Allow credentials: Yes

### Library/Framework Requirements

**Packages to Install:**

| Package | Version | Purpose |
|---------|---------|---------|
| `@sanity/client` | latest | Sanity API client |
| `@sanity/image-url` | latest | Image URL builder |

**Installation Command:**
```bash
npm install @sanity/client @sanity/image-url
```

### File Structure After Changes

```
src/
├── lib/
│   ├── sanity/           # NEW directory
│   │   ├── client.ts     # NEW: Sanity client config
│   │   ├── image.ts      # NEW: Image URL builder
│   │   └── queries.ts    # NEW: GROQ queries placeholder
│   └── utils.ts          # Existing: cn() utility
└── ...

.env                      # UPDATED: Sanity credentials (gitignored)
.env.example              # UPDATED: Sanity variable documentation
```

### Previous Story Intelligence

**From Story 1.4 (Shared Utility Components):**
- Build process: `npm run build` runs `tsc -b && vite build`
- Dev server: `npm run dev` starts at http://localhost:5173/
- TypeScript path alias `@/` configured and working
- Pattern: Group related utilities in subdirectories (e.g., `lib/sanity/`)

**Patterns Established:**
- Import paths: `import { sanityClient } from '@/lib/sanity/client'`
- Utility files in `src/lib/` use camelCase
- TypeScript types defined inline or in separate type files

### Testing Requirements

**Manual Testing:**
1. Run `npm run build` - must complete without TypeScript errors
2. Import client in a test component to verify it loads
3. Log `sanityClient` configuration to verify env vars are read correctly

**Verification Steps:**
```typescript
// Temporary test in any component:
import { sanityClient } from '@/lib/sanity/client'
console.log('Sanity client config:', sanityClient.config())
// Should output projectId and dataset values
```

**Build Verification:**
```bash
npm run build
# Should complete without TypeScript errors
```

### Security Considerations

**Environment Variables:**
- `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` are safe to expose (read-only public access)
- These are NOT secrets - Sanity uses CORS + token-based auth for writes
- `.env` must be in `.gitignore` to prevent accidental commit

**API Key Security:**
- This story does NOT require write tokens
- Read operations use `useCdn: true` for public cached access
- Write operations (if needed later) would require server-side tokens

### Anti-Patterns to Avoid

- **DO NOT** create content schemas in this story - schemas are Stories 2.2 and 2.3
- **DO NOT** use dynamic API versions - hardcode the date string
- **DO NOT** set `useCdn: false` unless you need real-time data (slower)
- **DO NOT** import sanityClient directly in components - use hooks (future stories)
- **DO NOT** store write tokens in client-side code
- **DO NOT** skip CORS configuration - API calls will fail without it

### UX Design Impact

This story has **no direct UX impact** - it's infrastructure setup.

CMS-driven UX improvements will come in:
- Story 2.2: Hero section powered by CMS
- Story 2.4: Band members powered by CMS

### External Documentation

- [Sanity Client GitHub](https://github.com/sanity-io/client) - Official client documentation
- [Sanity Image URL](https://www.sanity.io/docs/image-url) - Image transformation docs
- [GROQ Query Language](https://www.sanity.io/docs/groq) - Query syntax reference
- [Sanity Management Console](https://www.sanity.io/manage) - Project settings and CORS

### References

- [Source: docs/architecture.md#Core Architectural Decisions] - Sanity integration pattern
- [Source: docs/architecture.md#Project Structure & Boundaries] - File organization
- [Source: docs/architecture.md#Implementation Patterns] - Naming conventions
- [Source: docs/epics.md#Story 2.1] - Acceptance criteria
- [Source: docs/prd.md#Content Management] - FR1-FR7 requirements
- [Source: docs/sprint-artifacts/1-4-create-shared-utility-components.md] - Previous story patterns

## Dev Agent Record

### Context Reference

<!-- Story context verified against: docs/prd.md, docs/architecture.md, docs/epics.md, docs/ux-design-specification.md, docs/sprint-artifacts/1-4-create-shared-utility-components.md -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Initial TypeScript error with `@sanity/image-url/lib/types/types` import path - resolved by defining SanityImageSource interface locally
- Build successful after type fix: `npm run build` completed in 6.13s

### Completion Notes List

- **Task 1:** User ran `npx sanity@latest init --env` to create Sanity project (project ID: h4lkrp1v, dataset: production)
- **Task 2:** Updated `.env.example` with Sanity variable documentation and helpful URL comments
- **Task 3:** Installed `@sanity/client` and `@sanity/image-url` packages (24 packages added)
- **Task 4:** Created `src/lib/sanity/client.ts` with createClient, typed config, hardcoded apiVersion '2025-02-06', useCdn: true
- **Task 5:** Created `src/lib/sanity/image.ts` with urlFor() helper function, custom SanityImageSource interface, JSDoc examples
- **Task 6:** Created `src/lib/sanity/queries.ts` as placeholder with comments for future stories
- **Task 7:** User configured CORS in Sanity dashboard (http://localhost:5173)
- **Task 8:** Build verification passed - TypeScript compiles without errors, production build completes successfully

### Change Log

- 2025-12-11: Implemented Sanity CMS infrastructure - Story 2.1 complete

### File List

**New Files:**
- src/lib/sanity/client.ts
- src/lib/sanity/image.ts
- src/lib/sanity/queries.ts

**Modified Files:**
- .env (Sanity credentials added)
- .env.example (Sanity variables documented)
- package.json (Sanity dependencies added)
- package-lock.json (updated)
