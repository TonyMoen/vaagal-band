# Story 1.2: Remove Merch Page and Related Code

Status: Done

## Story

As a **visitor**,
I want **the placeholder Merch page removed**,
so that **I don't encounter incomplete functionality**.

## Acceptance Criteria

1. **Given** the Merch page exists as a placeholder
   **When** I remove the Merch functionality
   **Then** `src/pages/Merch.tsx` is deleted

2. **Given** the Products component exists for the Merch page
   **When** I remove the Merch functionality
   **Then** `src/components/Products.tsx` is deleted

3. **Given** the routes file imports and routes to Merch
   **When** I remove the Merch route
   **Then** the Merch route is removed from `src/routes.tsx`
   **And** the Merch import statement is removed

4. **Given** the NavBar contains a Merch link
   **When** I remove the Merch link
   **Then** the Merch entry is removed from the `items` array in `src/components/NavBar.tsx`

5. **Given** the Footer contains a Merch link
   **When** I remove the Merch link
   **Then** the Merch NavLink is removed from `src/components/Footer.tsx`

6. **Given** the Merch assets are only used by Products.tsx
   **When** I remove the Merch functionality
   **Then** the unused assets are deleted:
   - `src/assets/t-skjorte.jpg`
   - `src/assets/genser.jpg`
   - `src/assets/caps.jpg`

7. **Given** all Merch-related code is removed
   **When** I navigate the site
   **Then** no console errors occur
   **And** visiting `/merch` shows the NotFoundPage (404)

## Tasks / Subtasks

- [x] Task 1: Delete Merch page component (AC: #1)
  - [x] Delete `src/pages/Merch.tsx`

- [x] Task 2: Delete Products component (AC: #2)
  - [x] Delete `src/components/Products.tsx`

- [x] Task 3: Delete unused Merch assets (AC: #6)
  - [x] Delete `src/assets/t-skjorte.jpg`
  - [x] Delete `src/assets/genser.jpg`
  - [x] Delete `src/assets/caps.jpg`

- [x] Task 4: Update routes.tsx (AC: #3)
  - [x] Remove line 5: `import Merch from "./pages/Merch";`
  - [x] Remove line 17: `{ path: "merch", element: <Merch /> },`

- [x] Task 5: Update NavBar.tsx (AC: #4)
  - [x] Remove `{ to: "/merch", label: "Merch" },` from items array (line 10)

- [x] Task 6: Update Footer.tsx (AC: #5)
  - [x] Remove the Merch NavLink element (lines 32-34)

- [x] Task 7: Verify implementation (AC: #7)
  - [x] Run `npm run dev` and verify no console errors
  - [x] Navigate to all pages (/, /bandet, /konserter, /kontakt-oss)
  - [x] Visit `/merch` and confirm 404 page displays
  - [x] Verify navigation menu no longer shows "Merch"
  - [x] Verify footer no longer shows "Merch" link

## Dev Notes

### Critical Context

**This is Story 2 of Epic 1 - removing placeholder content before adding new features.**

This cleanup story is a prerequisite for:
- Clean navigation that only shows functional pages
- Avoiding confusion for visitors
- Professional site appearance

### Current State Analysis

**Files to DELETE:**
```
src/pages/Merch.tsx (13 lines)
├── Imports Products component
├── Displays "MERCH KOMMER SNART" heading
└── Renders Products component

src/components/Products.tsx (63 lines)
├── Imports 3 merch images (t-skjorte, genser, caps)
├── Defines Product type
├── Contains 6 placeholder products
└── Renders product grid

src/assets/t-skjorte.jpg
src/assets/genser.jpg
src/assets/caps.jpg
```

**Files to MODIFY:**

**`src/routes.tsx` (current state):**
```typescript
// Line 5 - DELETE THIS:
import Merch from "./pages/Merch";

// Line 17 - DELETE THIS:
{ path: "merch", element: <Merch /> },
```

**`src/components/NavBar.tsx` (current state):**
```typescript
// Line 10 - DELETE THIS from items array:
{ to: "/merch", label: "Merch" },
```

**`src/components/Footer.tsx` (current state):**
```typescript
// Lines 32-34 - DELETE THIS NavLink:
<NavLink className="hover:underline" to="/merch">
  Merch
</NavLink>
```

### Architecture Compliance

**From Architecture Document (`docs/architecture.md`):**

> **Files to Delete:**
> | File | Reason |
> |------|--------|
> | `src/pages/Merch.tsx` | Removing placeholder page |
> | `src/components/Products.tsx` | No longer needed |

The architecture document specifies these files should be deleted as part of the cleanup phase. This story also removes the associated navigation links and unused image assets.

### Technical Requirements

**Deletion Order (to avoid import errors during development):**
1. Delete page and component files first (Merch.tsx, Products.tsx)
2. Delete asset files (jpg images)
3. Update routes.tsx (remove import and route)
4. Update NavBar.tsx (remove menu item)
5. Update Footer.tsx (remove footer link)

**React Router Behavior:**
- After removing `/merch` route, visiting `/merch` will match the wildcard `"*"` route
- This will render `NotFoundPage` component automatically
- No additional redirect configuration needed

### Previous Story Intelligence

**From Story 1.1 (Environment Variables Setup):**
- Dev server runs on `npm run dev` at http://localhost:5173/
- Contact form successfully uses environment variables
- Pre-existing TypeScript errors exist (TS6133, TS7006 in ContactForm.tsx) - unrelated to this story
- Build process: `npm run build` runs `tsc -b && vite build`

**Patterns Established:**
- Files are deleted via standard file system operations
- Navigation changes require updating both NavBar.tsx and Footer.tsx
- Verification includes visual inspection + console check

### Library/Framework Requirements

**No new packages needed** - this is a deletion/cleanup story.

**React Router DOM (v7.9.1)** - Already installed
- Route removal is straightforward
- 404 handling via wildcard route already configured

### File Structure After Changes

```
vaagal-app/
├── src/
│   ├── assets/
│   │   ├── hero-1920.jpg     # KEEP
│   │   ├── vaagal-logo.svg   # KEEP
│   │   ├── marius.jpg        # KEEP (band member)
│   │   ├── sondre.jpg        # KEEP (band member)
│   │   ├── tony.jpg          # KEEP (band member)
│   │   ├── torstein.jpg      # KEEP (band member)
│   │   └── truls.jpg         # KEEP (band member)
│   │   # DELETED: t-skjorte.jpg, genser.jpg, caps.jpg
│   │
│   ├── components/
│   │   ├── NavBar.tsx        # MODIFY - remove Merch from items
│   │   ├── Footer.tsx        # MODIFY - remove Merch NavLink
│   │   └── ...other components
│   │   # DELETED: Products.tsx
│   │
│   ├── pages/
│   │   ├── Hjem.tsx
│   │   ├── Bandet.tsx
│   │   ├── Konserter.tsx
│   │   ├── KontaktOss.tsx
│   │   └── NotFoundPage.tsx
│   │   # DELETED: Merch.tsx
│   │
│   └── routes.tsx            # MODIFY - remove Merch route
```

### Testing Requirements

**Manual Testing:**
1. After implementation, run `npm run dev`
2. Open browser to http://localhost:5173/
3. Check navigation:
   - "Merch" should NOT appear in header menu
   - "Merch" should NOT appear in footer menu
4. Navigate to each page:
   - `/` - Home page loads
   - `/bandet` - Band page loads
   - `/konserter` - Concerts page loads
   - `/kontakt-oss` - Contact page loads
5. Visit `/merch` directly:
   - Should display 404/NotFoundPage
6. Check browser console:
   - No errors related to missing imports
   - No broken asset references

**Build Verification:**
```bash
npm run build
# Should complete without errors related to removed files
```

### Project Structure Notes

- Navigation is defined in two places: NavBar.tsx (header) and Footer.tsx (footer)
- Both must be updated to maintain consistency
- Routes use React Router DOM v7 with createBrowserRouter pattern
- 404 page is already configured via wildcard route

### Security Considerations

**No security impact** - this is a deletion of placeholder content only.

### References

- [Source: docs/architecture.md#Files to Delete] - Lists Merch.tsx and Products.tsx for deletion
- [Source: docs/epics.md#Story 1.2] - Full acceptance criteria
- [Source: docs/prd.md#FR32] - FR32: System hides or removes the Merch page from navigation

## Dev Agent Record

### Context Reference

<!-- Story context verified against: docs/prd.md, docs/architecture.md, docs/epics.md, src/pages/Merch.tsx, src/components/Products.tsx, src/routes.tsx, src/components/NavBar.tsx, src/components/Footer.tsx -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Dev server started successfully on http://localhost:5175/ (Vite v7.1.7)
- Git status confirmed all 5 files deleted and 3 files modified correctly
- No console errors or broken imports

### Completion Notes List

- Deleted `src/pages/Merch.tsx` - removed placeholder page component
- Deleted `src/components/Products.tsx` - removed Products component with 6 placeholder items
- Deleted 3 unused image assets: `t-skjorte.jpg`, `genser.jpg`, `caps.jpg`
- Updated `src/routes.tsx` - removed Merch import and route definition
- Updated `src/components/NavBar.tsx` - removed Merch from navigation items array
- Updated `src/components/Footer.tsx` - removed Merch NavLink from footer navigation
- All acceptance criteria satisfied
- Navigation now shows: Hjem, Bandet, Konserter, Kontakt oss (no Merch)

### File List

**Files Deleted:**
- `src/pages/Merch.tsx`
- `src/components/Products.tsx`
- `src/assets/t-skjorte.jpg`
- `src/assets/genser.jpg`
- `src/assets/caps.jpg`

**Files Modified:**
- `src/routes.tsx` - removed Merch import and route
- `src/components/NavBar.tsx` - removed Merch from items array
- `src/components/Footer.tsx` - removed Merch NavLink

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-12-11 | Initial implementation - all tasks completed | Claude Opus 4.5 |

---

**Story Status:** Done
**Implementation completed and verified - all acceptance criteria satisfied**
