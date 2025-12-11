# Story 1.3: Initialize shadcn/ui Design System

Status: done

## Story

As a **developer**,
I want **shadcn/ui initialized with the project's dark theme and brand colors**,
so that **consistent, accessible UI components are available for all subsequent work**.

## Acceptance Criteria

1. **Given** the project uses Tailwind CSS
   **When** I initialize shadcn/ui
   **Then** `components.json` is created with correct configuration

2. **Given** shadcn/ui is initialized
   **When** I check the project structure
   **Then** `src/lib/utils.ts` is created with the `cn` utility function

3. **Given** shadcn/ui is initialized
   **When** I check the project structure
   **Then** `src/components/ui/` directory is created

4. **Given** the UX design specification
   **When** I configure CSS variables
   **Then** dark theme CSS variables are set:
   - Background: #0A0A0A
   - Secondary: #1A1A1A
   - Text Primary: #F5F5F5
   - Accent: #E65C00

5. **Given** the UX design specification requires Barlow font
   **When** I configure the project
   **Then** Barlow font is loaded from Google Fonts

6. **Given** all configuration is complete
   **When** I run `npm run build`
   **Then** the project builds without errors

## Tasks / Subtasks

- [x] Task 1: Configure TypeScript path aliases (AC: #1, #2)
  - [x] Add `baseUrl` and `paths` to `tsconfig.json`
  - [x] Add `baseUrl` and `paths` to `tsconfig.app.json`
  - [x] Install `@types/node` for path resolution
  - [x] Update `vite.config.ts` with path alias resolution

- [x] Task 2: Run shadcn/ui init command (AC: #1, #2, #3)
  - [x] Run `npx shadcn@latest init`
  - [x] Select "New York" style (default for 2025)
  - [x] Select "Neutral" base color (will customize)
  - [x] Verify `components.json` created
  - [x] Verify `src/lib/utils.ts` created with `cn` function
  - [x] Verify `src/components/ui/` directory created

- [x] Task 3: Configure Vågal dark theme CSS variables (AC: #4)
  - [x] Update CSS variables in `src/index.css` or `src/styles/global.css`
  - [x] Map shadcn/ui CSS variables to Vågal brand colors
  - [x] Configure dark-only mode (no light theme toggle)

- [x] Task 4: Configure Barlow font (AC: #5)
  - [x] Add Google Fonts link to `index.html`
  - [x] Update Tailwind config with Barlow font family
  - [x] Configure both Barlow and Barlow Condensed variants

- [x] Task 5: Verify build (AC: #6)
  - [x] Run `npm run build`
  - [x] Verify no TypeScript errors
  - [x] Verify no Tailwind errors
  - [x] Run `npm run dev` and verify dev server starts

## Dev Notes

### Critical Context

**This is Story 3 of Epic 1 - initializing the design system foundation.**

This story is a prerequisite for:
- Story 1.4: Create Shared Utility Components (LoadingSpinner, ErrorMessage, WidgetErrorBoundary)
- All Epic 2-6 stories that use shadcn/ui components
- Navigation components (Epic 4) using NavigationMenu and Sheet
- Contact form (Epic 6) using Input, Textarea, Button

### Current Project State Analysis

**Tech Stack (from package.json):**
- React 19.1.1
- Vite 7.1.7
- Tailwind CSS 3.4.17 (v3, not v4)
- TypeScript 5.8.3

**Existing CSS Variables (src/styles/global.css):**
```css
:root {
  --color-bg: #0b0c0d;
  --color-surface: #111214;
  --color-text: #e7e7ea;
  --color-accent: #ff6100;
  --color-border: #26282b;
}
```

**Required Alignment with UX Design:**
| UX Spec | Current | Action |
|---------|---------|--------|
| Background #0A0A0A | #0b0c0d | Update |
| Secondary #1A1A1A | #111214 | Update |
| Text Primary #F5F5F5 | #e7e7ea | Update |
| Accent #E65C00 | #ff6100 | Update |

### Architecture Compliance

**From Architecture Document (docs/architecture.md):**

> **UI Components:** shadcn/ui (Tailwind-native, copy-paste ownership, accessible by default)

> **Project Structure:**
> ```
> src/
> ├── components/
> │   └── ui/              # shadcn/ui components (auto-generated)
> ├── lib/
> │   └── utils.ts         # shadcn/ui utils (auto-generated)
> ```

> **Installation:**
> ```bash
> npx shadcn@latest init
> npx shadcn@latest add button card navigation-menu
> ```

### Technical Requirements

**1. TypeScript Path Aliases (REQUIRED for shadcn/ui)**

Current `tsconfig.json` is MISSING path aliases. Add to BOTH files:

**tsconfig.json:**
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**tsconfig.app.json:**
```json
{
  "compilerOptions": {
    // ... existing options ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**vite.config.ts:**
```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

**2. shadcn/ui CSS Variables Configuration**

shadcn/ui uses a specific CSS variable naming convention. Map Vågal brand to shadcn variables:

```css
@layer base {
  :root {
    --background: 0 0% 4%;           /* #0A0A0A */
    --foreground: 0 0% 96%;          /* #F5F5F5 */

    --card: 0 0% 10%;                /* #1A1A1A */
    --card-foreground: 0 0% 96%;    /* #F5F5F5 */

    --popover: 0 0% 10%;             /* #1A1A1A */
    --popover-foreground: 0 0% 96%; /* #F5F5F5 */

    --primary: 24 100% 45%;          /* #E65C00 (orange accent) */
    --primary-foreground: 0 0% 100%; /* White on orange */

    --secondary: 0 0% 16%;           /* #2A2A2A */
    --secondary-foreground: 0 0% 96%;

    --muted: 0 0% 16%;               /* #2A2A2A */
    --muted-foreground: 0 0% 64%;   /* #A3A3A3 */

    --accent: 24 100% 45%;           /* #E65C00 */
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;        /* Red for errors */
    --destructive-foreground: 0 0% 100%;

    --border: 0 0% 15%;              /* #26282b approx */
    --input: 0 0% 15%;
    --ring: 24 100% 45%;             /* Orange focus ring */

    --radius: 0.5rem;                /* 8px default border radius */
  }
}
```

**3. Barlow Font Configuration**

**index.html - Add Google Fonts:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700&display=swap" rel="stylesheet">
```

**tailwind.config.ts - Add font family:**
```typescript
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### Previous Story Intelligence

**From Story 1.2 (Remove Merch Page):**
- Dev server runs on `npm run dev` at http://localhost:5173/
- Build process: `npm run build` runs `tsc -b && vite build`
- Pre-existing TypeScript errors exist (TS6133, TS7006 in ContactForm.tsx) - UNRELATED to this story
- Files successfully deleted and modified without issues

**Patterns Established:**
- Tailwind CSS is working correctly
- Vite dev server is functional
- TypeScript compilation is working

### Library/Framework Requirements

**New Dependencies to Install:**

| Package | Purpose | Command |
|---------|---------|---------|
| `@types/node` | Node.js types for path resolution | `npm install -D @types/node` |
| `clsx` | Auto-installed by shadcn/ui | (via init) |
| `tailwind-merge` | Auto-installed by shadcn/ui | (via init) |
| `class-variance-authority` | Auto-installed by shadcn/ui | (via init) |

**shadcn/ui CLI Commands:**

```bash
# Initialize shadcn/ui (interactive)
npx shadcn@latest init

# During init, select:
# - Style: New York (default)
# - Base color: Neutral (will customize)
# - CSS variables: Yes
```

### File Structure After Changes

```
vaagal-app/
├── components.json           # NEW: shadcn/ui configuration
├── tsconfig.json            # MODIFIED: add paths
├── tsconfig.app.json        # MODIFIED: add paths
├── vite.config.ts           # MODIFIED: add path alias
├── tailwind.config.ts       # MODIFIED: add fontFamily
├── index.html               # MODIFIED: add Google Fonts
├── src/
│   ├── components/
│   │   └── ui/              # NEW: shadcn/ui components directory
│   ├── lib/
│   │   └── utils.ts         # NEW: cn utility function
│   ├── styles/
│   │   └── global.css       # MODIFIED: shadcn CSS variables
│   └── index.css            # MODIFIED: import layer adjustments
```

### Testing Requirements

**Manual Testing:**
1. After implementation, run `npm run dev`
2. Verify dev server starts without errors
3. Run `npm run build`
4. Verify build completes without errors
5. Check browser console for any CSS/font loading errors

**Build Verification:**
```bash
npm run build
# Should complete without errors
# Output should be in dist/ folder
```

### Security Considerations

**No security impact** - this is design system initialization only. No API keys, secrets, or user data involved.

### Anti-Patterns to Avoid

- **DO NOT** create a light theme - project is dark-only per UX spec
- **DO NOT** modify existing component styles that work - only add shadcn/ui foundation
- **DO NOT** install shadcn/ui components yet - only initialize the system (components come in later stories)
- **DO NOT** change the existing `--color-*` variables yet - shadcn/ui uses its own naming convention

### Project Structure Notes

- shadcn/ui components go in `src/components/ui/` (lowercase)
- The `cn` utility goes in `src/lib/utils.ts`
- `components.json` goes in project root
- CSS variables should be in `src/index.css` after Tailwind imports

### References

- [Source: docs/architecture.md#UI Components] - shadcn/ui selection rationale
- [Source: docs/architecture.md#Project Structure] - File organization
- [Source: docs/ux-design-specification.md#Color System] - Brand colors
- [Source: docs/ux-design-specification.md#Typography System] - Barlow font
- [Source: docs/epics.md#Story 1.3] - Acceptance criteria
- [shadcn/ui Vite Installation](https://ui.shadcn.com/docs/installation/vite) - Official docs

## Dev Agent Record

### Context Reference

<!-- Story context verified against: docs/prd.md, docs/architecture.md, docs/epics.md, docs/ux-design-specification.md, docs/sprint-artifacts/1-2-remove-merch-page-and-related-code.md -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build initially failed due to pre-existing TypeScript errors in ContactForm.tsx (TS6133, TS7006) - fixed as part of build verification

### Completion Notes List

- **Task 1:** Configured TypeScript path aliases with `@/*` pattern in tsconfig.json, tsconfig.app.json, and vite.config.ts. Installed @types/node.
- **Task 2:** Initialized shadcn/ui v3.5.2 with New York style and Neutral base color. Created components.json, src/lib/utils.ts with cn() function, and src/components/ui/ directory.
- **Task 3:** Configured Vågal dark theme CSS variables in src/index.css with brand colors: Background #0A0A0A, Secondary #1A1A1A, Text #F5F5F5, Accent #E65C00. Dark-only mode (no light theme toggle).
- **Task 4:** Added Google Fonts preconnect and Barlow font (400-700 weights + Condensed 600-700) to index.html. Configured tailwind.config.ts with font-sans (Barlow) and font-condensed (Barlow Condensed).
- **Task 5:** Build successful after fixing pre-existing TypeScript errors in ContactForm.tsx (unused variable, missing type annotation). Dev server starts successfully.
- **Additional:** Fixed ContactForm.tsx TypeScript errors (changed `result` to `_` unused variable pattern, added React.FormEvent<HTMLFormElement> type, changed event.target to event.currentTarget for type safety)

### File List

**New Files:**
- components.json - shadcn/ui configuration
- src/lib/utils.ts - cn() utility function
- src/components/ui/ - shadcn/ui components directory (empty, ready for components)

**Modified Files:**
- tsconfig.json - Added compilerOptions with baseUrl and paths
- tsconfig.app.json - Added baseUrl and paths for @/* alias
- vite.config.ts - Added path alias resolution for @
- tailwind.config.ts - Added fontFamily (sans: Barlow, condensed: Barlow Condensed), borderRadius, colors from shadcn/ui
- index.html - Added Google Fonts preconnect and Barlow font link
- src/index.css - Replaced shadcn/ui default CSS variables with Vågal dark theme brand colors
- src/components/ContactForm.tsx - Fixed TypeScript errors (unused variable, event type)
- package.json / package-lock.json - Added @types/node, clsx, tailwind-merge, class-variance-authority, tailwindcss-animate, lucide-react

