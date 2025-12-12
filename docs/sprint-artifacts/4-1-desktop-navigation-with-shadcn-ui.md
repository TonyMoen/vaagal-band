# Story 4.1: Desktop Navigation with shadcn/ui

Status: in-progress

## Story

As a **visitor on desktop**,
I want **clear, professional header navigation**,
so that **I can easily access all sections of the site**.

## Acceptance Criteria

1. **Given** shadcn/ui is initialized
   **When** I implement desktop navigation
   **Then** shadcn/ui NavigationMenu component is added to the project

2. **Given** the NavigationMenu is installed
   **When** I update NavBar.tsx
   **Then** `src/components/NavBar.tsx` is updated to use NavigationMenu

3. **Given** the navigation is implemented
   **When** I view the header
   **Then** navigation includes links to: Hjem, Bandet, Konserter, Kontakt (FR8)

4. **Given** the navigation includes links
   **When** I view the logo area
   **Then** the band logo is displayed in the navigation area (FR12)
   **And** logo links to homepage

5. **Given** the navigation is styled
   **When** I hover over navigation items
   **Then** navigation is styled with dark theme and orange accent on hover

6. **Given** the navigation is on desktop
   **When** I resize to screens >= 768px
   **Then** navigation is visible and properly displayed

7. **Given** the navigation needs accessibility
   **When** I tab through navigation
   **Then** keyboard navigation works correctly (tab through links)
   **And** focus indicators are visible

## Tasks / Subtasks

- [x] Task 1: Install shadcn/ui NavigationMenu component (AC: #1)
  - [x] Run `npx shadcn@latest add navigation-menu`
  - [x] Verify component files created in `src/components/ui/`
  - [x] Verify dependencies installed (if any)

- [x] Task 2: Update NavBar.tsx to use NavigationMenu (AC: #2, #3, #4)
  - [x] Import NavigationMenu components from `@/components/ui/navigation-menu`
  - [x] Replace custom desktop nav with NavigationMenu
  - [x] Keep existing logo implementation (already links to homepage)
  - [x] Maintain all 4 navigation links: Hjem, Bandet, Konserter, Kontakt oss

- [x] Task 3: Style navigation with dark theme (AC: #5)
  - [x] Apply dark theme colors using shadcn/ui CSS variables
  - [x] Configure orange accent (#E65C00 / hsl(24, 100%, 45%)) for hover states
  - [x] Ensure active link indication (orange underline or highlight)
  - [x] Match existing design language

- [x] Task 4: Ensure desktop visibility (AC: #6)
  - [x] Navigation visible on screens >= 768px (md: breakpoint)
  - [x] Mobile hamburger menu still hidden on desktop
  - [x] Responsive layout maintained

- [x] Task 5: Verify keyboard navigation (AC: #7)
  - [x] Tab key navigates through all links
  - [x] Focus indicators visible (use `ring` utility)
  - [x] Enter/Space activates links
  - [x] Escape closes any open menus (if applicable)

- [x] Task 6: Testing and verification
  - [x] Build passes without errors
  - [x] Visual inspection on desktop viewport
  - [x] Test all navigation links work correctly
  - [x] Verify no regressions to mobile navigation

### Review Follow-ups (AI)

- [ ] [AI-Review][MEDIUM] Use NavigationMenuLink with asChild pattern as documented in Dev Notes [src/components/NavBar.tsx:47-70]
- [ ] [AI-Review][MEDIUM] Fix conflicting .border class that overrides Tailwind utility [src/styles/global.css:46-49]
- [ ] [AI-Review][MEDIUM] Remove unused ChevronDown import from lucide-react [src/components/ui/navigation-menu.tsx:4]
- [ ] [AI-Review][LOW] Remove unnecessary type assertion on end prop [src/components/NavBar.tsx:50]
- [ ] [AI-Review][LOW] Add automated tests for navigation component [no file]

## Dev Notes

### Critical Context

**This is Story 1 of Epic 4 - Navigation & Mobile Experience (FIRST STORY IN EPIC).**

This story focuses on upgrading the desktop navigation to use shadcn/ui NavigationMenu. The existing NavBar.tsx already has a working implementation - we're replacing the custom desktop nav with the shadcn/ui component for consistency with the design system.

**Functional Requirements Covered:**
- FR8: Visitors can navigate between all site pages via header navigation
- FR12: System displays the band logo in navigation areas

**CRITICAL:** This story ONLY touches desktop navigation. Mobile navigation (hamburger menu, drawer) will be addressed in Story 4.2.

### Previous Story Intelligence (Epic 3)

**From Epic 3 SEO Stories (3.1-3.4):**
- Project uses no semicolons in TypeScript (project convention)
- Default exports for components
- shadcn/ui is already initialized (`components.json` exists)
- Only `button.tsx` component currently installed
- Uses both old CSS variables (`--color-*`) and new shadcn variables (`--background`, etc.)

**Key Code Patterns Established:**
- Components in `src/components/`
- UI components in `src/components/ui/`
- Utilities in `src/lib/utils.ts` (cn function)
- Import aliases: `@/components`, `@/lib/utils`

### Architecture Requirements

**From Architecture Document (docs/architecture.md):**

> **shadcn/ui Migration:**
> - Install shadcn/ui CLI and initialize ✅ (already done)
> - Migrate components incrementally:
>   1. Button → shadcn Button ✅ (Story 1.3)
>   2. Card surfaces → shadcn Card
>   3. **Navigation → shadcn NavigationMenu** ← THIS STORY
>   4. Form inputs → shadcn Input, Textarea

**Project Structure:**
```
src/
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx       # Already exists
│   │   └── navigation-menu.tsx  # TO BE ADDED
│   ├── NavBar.tsx           # TO BE MODIFIED
│   └── ...
├── lib/
│   └── utils.ts             # cn() utility (already exists)
```

### Current NavBar.tsx Analysis

**Existing Implementation (src/components/NavBar.tsx):**
```typescript
// Current structure:
- Uses useState for mobile menu toggle
- Desktop nav: custom <ul> with styled <NavLink> elements
- Mobile nav: collapsible drawer with same links
- Logo: SVG import, links to homepage
- Styling: CSS custom properties (--color-*)
```

**Navigation Items:**
```typescript
const items = [
  { to: "/", label: "Hjem", end: true },
  { to: "/bandet", label: "Bandet" },
  { to: "/konserter", label: "Konserter" },
  { to: "/kontakt-oss", label: "Kontakt oss" },
]
```

**Current Active Link Styling:**
- Orange underline bar on active link
- Background highlight: `bg-[var(--color-bg)]/30`
- Text color change on active

### shadcn/ui NavigationMenu Integration Strategy

**Installation Command:**
```bash
npx shadcn@latest add navigation-menu
```

**Key NavigationMenu Components:**
- `NavigationMenu` - Root container
- `NavigationMenuList` - List of items
- `NavigationMenuItem` - Individual item wrapper
- `NavigationMenuLink` - Link component (integrates with React Router)
- `navigationMenuTriggerStyle()` - Utility for consistent styling

**Integration Pattern with React Router:**
```typescript
import { NavigationMenuLink } from "@/components/ui/navigation-menu"
import { NavLink } from "react-router-dom"

// Use asChild pattern to wrap React Router's NavLink
<NavigationMenuLink asChild>
  <NavLink to="/bandet" className={navigationMenuTriggerStyle()}>
    Bandet
  </NavLink>
</NavigationMenuLink>
```

### Styling Requirements

**Color Palette (from UX Design / Architecture):**
- Background: #0A0A0A / hsl(0, 0%, 4%)
- Surface: #1A1A1A / hsl(0, 0%, 10%)
- Text Primary: #F5F5F5 / hsl(0, 0%, 96%)
- Accent (Orange): #E65C00 / hsl(24, 100%, 45%)
- Border: hsl(0, 0%, 15%)

**shadcn/ui CSS Variables Already Configured:**
```css
:root {
  --background: 0 0% 4%;
  --foreground: 0 0% 96%;
  --primary: 24 100% 45%;  /* Orange accent */
  --accent: 24 100% 45%;   /* Orange accent */
  --border: 0 0% 15%;
}
```

**Active Link Indication:**
- Keep current orange underline bar approach
- Or use background highlight consistent with shadcn patterns

### Responsive Behavior

**Desktop (>= 768px / md:):**
- Full horizontal navigation visible
- Logo on left, nav links on right
- No hamburger menu visible

**Mobile (< 768px):**
- Navigation hidden (handled in Story 4.2)
- Hamburger menu button visible
- Mobile drawer functionality unchanged

**IMPORTANT:** Do NOT break existing mobile navigation. Only modify the desktop nav section.

### Accessibility Requirements (NFR7-NFR11)

**Keyboard Navigation:**
- All nav links reachable via Tab
- Enter/Space activates links
- Visible focus indicators (`focus-visible:ring-2 focus-visible:ring-ring`)

**ARIA:**
- `<nav aria-label="Hovednavigasjon">` - Already present
- Links should indicate current page (aria-current)
- NavigationMenu component provides built-in ARIA attributes

**Color Contrast:**
- Text on dark background: 4.5:1 minimum ✅
- Orange accent on dark: Sufficient contrast ✅

### Git Intelligence

**Recent Commits:**
- `a95880f` feat: Add JSON-LD structured data for SEO (Story 3.3)
- `e5b36bc` feat: Add Open Graph and Twitter Card meta tags (Story 3.2)
- `95105b9` feat: Add SEO component with Norwegian meta tags (Story 3.1)
- `68d9276` feat: Add Hero CMS integration with Sanity Studio (Story 2.2)

**Commit Pattern:** `feat: <description> (Story X.Y)`

### Anti-Patterns to Avoid

- **DO NOT** remove or break mobile navigation (Story 4.2 handles that)
- **DO NOT** use inline styles - use Tailwind classes
- **DO NOT** add semicolons (project convention)
- **DO NOT** create new CSS files - use existing CSS variables
- **DO NOT** change the navigation items array (paths are correct)
- **DO NOT** remove the `aria-label` from the nav element
- **DO NOT** remove logo link to homepage functionality

### Dependencies

**To Install:**
```bash
npx shadcn@latest add navigation-menu
```

This will add:
- `src/components/ui/navigation-menu.tsx`
- Any required dependencies (Radix UI primitives)

**Already Available:**
- `clsx` and `tailwind-merge` (for cn utility)
- `tailwindcss-animate` plugin
- React Router DOM (NavLink)

### Implementation Approach

**Recommended Strategy:**

1. **Install NavigationMenu component first**
   - Run shadcn CLI
   - Verify files created

2. **Create hybrid implementation**
   - Keep existing header structure
   - Replace only the desktop `<ul>` section
   - Use NavigationMenu with React Router integration

3. **Preserve mobile functionality**
   - Keep `useState` for mobile menu toggle
   - Keep mobile drawer implementation unchanged
   - Only hide/show based on breakpoint

4. **Style to match existing design**
   - Use CSS variables for colors
   - Maintain orange accent on hover/active
   - Keep current active link indicator style

### Testing Checklist

- [ ] NavigationMenu component renders on desktop
- [ ] All 4 links navigate correctly
- [ ] Active link styling works (current page highlighted)
- [ ] Logo links to homepage
- [ ] Hover states show orange accent
- [ ] Keyboard navigation works (Tab through links)
- [ ] Focus indicators visible
- [ ] Mobile hamburger still works (unchanged)
- [ ] Mobile drawer still opens/closes
- [ ] Build passes without errors
- [ ] No TypeScript errors
- [ ] No console warnings

### Project Structure Context

**Files to Modify:**
- `src/components/NavBar.tsx` - Main navigation component

**Files to Add:**
- `src/components/ui/navigation-menu.tsx` - shadcn component (via CLI)

**Files Unchanged:**
- `src/components/Footer.tsx` - Separate story (4.3)
- `src/lib/utils.ts` - Already has cn utility
- `components.json` - Already configured
- `tailwind.config.ts` - Already has shadcn setup

### References

- [Source: docs/epics.md#Story 4.1] - Acceptance criteria and user story
- [Source: docs/prd.md#FR8] - Header navigation requirement
- [Source: docs/prd.md#FR12] - Band logo in navigation requirement
- [Source: docs/architecture.md#shadcn/ui Migration] - Migration strategy
- [Source: docs/architecture.md#Accessibility Level] - WCAG 2.1 AA requirements
- [shadcn/ui NavigationMenu](https://ui.shadcn.com/docs/components/navigation-menu) - Component documentation

## Dev Agent Record

### Context Reference

<!-- Story context verified against: docs/prd.md (FR8, FR12), docs/architecture.md (shadcn/ui Migration, Project Structure), docs/epics.md#Story 4.1, src/components/NavBar.tsx (current implementation), src/index.css (CSS variables), tailwind.config.ts (theme configuration) -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- TypeScript type check: Passed (no errors)
- Build: Successful in 4.83s
- IDE diagnostics: No errors in NavBar.tsx or navigation-menu.tsx

### Completion Notes List

- **Task 1:** Installed @radix-ui/react-navigation-menu dependency and created navigation-menu.tsx component manually (shadcn CLI failed due to peer dependency conflict with react-helmet-async and React 19, resolved using --legacy-peer-deps)
- **Task 2:** Updated NavBar.tsx to use NavigationMenu component with NavLink directly inside NavigationMenuItem. Kept mobile navigation unchanged.
- **Task 3:** Applied dark theme styling using project CSS variables (--color-text, --color-muted, --color-accent, --color-bg). Orange accent underline for active links positioned at bottom-0 inside element. Added --color-muted to global.css.
- **Task 4:** Desktop navigation visible on md: breakpoint (>= 768px). Mobile hamburger hidden on desktop.
- **Task 5:** Keyboard navigation enabled via NavigationMenu primitives. Focus indicators using focus-visible:ring-2.
- **Task 6:** Build passes, no TypeScript errors, no IDE diagnostics. Mobile navigation unchanged and functional.
- **User feedback fix:** Removed NavigationMenuViewport (caused unwanted orange line below navbar). Simplified active link styling to use positioned span inside element boundary.

### Change Log

- 2025-12-12: Implemented desktop navigation with shadcn/ui NavigationMenu (Story 4.1) - Covers FR8, FR12
- 2025-12-12: Code review completed - 5 action items created (3 MEDIUM, 2 LOW), status → in-progress

### File List

**New Files:**
- src/components/ui/navigation-menu.tsx

**Modified Files:**
- src/components/NavBar.tsx
- src/styles/global.css (added --color-muted variable)
- package.json (added @radix-ui/react-navigation-menu)
- package-lock.json
