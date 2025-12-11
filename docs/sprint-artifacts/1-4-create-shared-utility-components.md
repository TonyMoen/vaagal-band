# Story 1.4: Create Shared Utility Components

Status: done

## Story

As a **developer**,
I want **reusable loading, error, and error boundary components**,
so that **all pages have consistent loading and error states**.

## Acceptance Criteria

1. **Given** shadcn/ui is initialized
   **When** I create the LoadingSpinner component
   **Then** `src/components/LoadingSpinner.tsx` exists with:
   - A centered spinner animation
   - Optional size prop (sm, md, lg)
   - Proper accessibility attributes (aria-label, role="status")

2. **Given** shadcn/ui is initialized
   **When** I create the ErrorMessage component
   **Then** `src/components/ErrorMessage.tsx` exists with:
   - Error message display with icon
   - Optional retry callback prop
   - Styled consistently with dark theme (#F5F5F5 text, #E65C00 accent)

3. **Given** shadcn/ui is initialized
   **When** I create the WidgetErrorBoundary component
   **Then** `src/components/WidgetErrorBoundary.tsx` exists with:
   - React error boundary implementation (class component with componentDidCatch)
   - Fallback UI showing widget name and "unavailable" message
   - Link to the original platform as alternative
   - Proper error logging

4. **Given** all components are created
   **When** I import them in other files
   **Then** all components are properly exported and usable

5. **Given** all components are created
   **When** I run `npm run build`
   **Then** the project builds without errors

## Tasks / Subtasks

- [x] Task 1: Create LoadingSpinner component (AC: #1, #4, #5)
  - [x] Create `src/components/LoadingSpinner.tsx`
  - [x] Implement size variants (sm: 16px, md: 24px, lg: 32px)
  - [x] Add spinning animation using Tailwind CSS animate-spin
  - [x] Add aria-label="Loading" and role="status" for accessibility
  - [x] Style with orange accent color (#E65C00)

- [x] Task 2: Create ErrorMessage component (AC: #2, #4, #5)
  - [x] Create `src/components/ErrorMessage.tsx`
  - [x] Accept `message: string` prop (required)
  - [x] Accept `retry?: () => void` prop (optional)
  - [x] Display error icon (use lucide-react AlertCircle)
  - [x] Show retry button only when retry prop provided
  - [x] Style with dark theme (muted background, primary text, accent retry button)

- [x] Task 3: Create WidgetErrorBoundary component (AC: #3, #4, #5)
  - [x] Create `src/components/WidgetErrorBoundary.tsx`
  - [x] Implement as React class component (error boundaries require class components)
  - [x] Accept `name: string` prop for widget identification
  - [x] Accept `fallbackUrl: string` prop for external platform link
  - [x] Implement componentDidCatch for error logging
  - [x] Display friendly fallback UI with link to platform

- [x] Task 4: Verify build and exports (AC: #4, #5)
  - [x] Run `npm run build`
  - [x] Verify no TypeScript errors
  - [x] Run `npm run dev` and verify components can be imported

## Dev Notes

### Critical Context

**This is Story 4 of Epic 1 - the final foundation story.**

This story completes the Epic 1 foundation by creating shared utility components that will be used extensively in:
- **Epic 2 (CMS):** Loading states for Sanity data fetching, error handling for failed API calls
- **Epic 5 (Widgets):** WidgetErrorBoundary wrapping Spotify, YouTube, Bandsintown widgets
- **All pages:** Consistent loading/error UX throughout the application

### Prerequisites Completed

**Story 1.3 (Initialize shadcn/ui Design System) - DONE**
Key deliverables from 1.3:
- `components.json` - shadcn/ui configuration
- `src/lib/utils.ts` - `cn()` utility function for className merging
- `src/components/ui/` - directory ready for shadcn components
- Dark theme CSS variables configured in `src/index.css`
- Barlow font configured in `tailwind.config.ts`
- TypeScript path alias `@/*` configured

### Current Project State

**Tech Stack (verified in 1.3):**
- React 19.1.1
- Vite 7.1.7
- Tailwind CSS 3.4.17
- TypeScript 5.8.3
- shadcn/ui initialized (New York style)
- lucide-react available (installed with shadcn)

**Available Dependencies (already installed):**
- `lucide-react` - Icon library (use AlertCircle, Loader2 icons)
- `clsx` + `tailwind-merge` - via `cn()` utility
- `class-variance-authority` - for component variants

### Architecture Compliance

**From Architecture Document (docs/architecture.md):**

> **Project Structure:**
> ```
> src/
> ├── components/
> │   ├── LoadingSpinner.tsx   # NEW: Shared loading component
> │   ├── ErrorMessage.tsx     # NEW: Shared error component
> │   └── WidgetErrorBoundary.tsx # NEW: Error boundary for widgets
> ```

> **Loading State Pattern:**
> ```typescript
> if (loading) return <LoadingSpinner />
> if (error) return <ErrorMessage message={error.message} />
> return <ActualContent data={data} />
> ```

> **Widget Error Boundaries:**
> ```typescript
> <WidgetErrorBoundary fallback={<WidgetUnavailable name="Spotify" />}>
>   <SpotifyEmbed />
> </WidgetErrorBoundary>
> ```

### Technical Requirements

**1. LoadingSpinner Component**

Location: `src/components/LoadingSpinner.tsx`

```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// Size mapping
const sizeMap = {
  sm: 'h-4 w-4',   // 16px
  md: 'h-6 w-6',   // 24px
  lg: 'h-8 w-8'    // 32px
}
```

Implementation Notes:
- Use `Loader2` icon from lucide-react (built-in spinner design)
- Apply `animate-spin` Tailwind class
- Use accent color `text-primary` (#E65C00)
- Wrap in centered container with `flex items-center justify-center`
- Default size: `md`

**2. ErrorMessage Component**

Location: `src/components/ErrorMessage.tsx`

```typescript
interface ErrorMessageProps {
  message: string
  retry?: () => void
  className?: string
}
```

Implementation Notes:
- Use `AlertCircle` icon from lucide-react
- Icon color: `text-destructive` (red from theme)
- Message color: `text-foreground` (#F5F5F5)
- Retry button: Use shadcn/ui Button component with `variant="outline"`
- Container: `bg-card` (#1A1A1A) with `rounded-lg` border
- Padding: `p-4` for comfortable spacing

**3. WidgetErrorBoundary Component**

Location: `src/components/WidgetErrorBoundary.tsx`

```typescript
interface WidgetErrorBoundaryProps {
  name: string           // "Spotify", "YouTube", "Bandsintown"
  fallbackUrl: string    // External platform URL
  children: React.ReactNode
}

interface WidgetErrorBoundaryState {
  hasError: boolean
  error?: Error
}
```

Implementation Notes:
- **MUST be a class component** (React error boundaries don't work with hooks)
- Implement `static getDerivedStateFromError()` and `componentDidCatch()`
- Log errors to console with widget name for debugging
- Fallback UI displays: "{name} is currently unavailable"
- Include link: "Visit {name} directly" pointing to fallbackUrl
- Link opens in new tab with `rel="noopener noreferrer"`

### Previous Story Intelligence

**From Story 1.3 (shadcn/ui initialization):**
- Build process: `npm run build` runs `tsc -b && vite build`
- Dev server: `npm run dev` starts at http://localhost:5173/
- TypeScript path alias `@/` works correctly
- `cn()` utility available at `@/lib/utils`

**Patterns Established:**
- Import path: `import { cn } from "@/lib/utils"`
- Component files in `src/components/` use PascalCase
- TypeScript interfaces defined inline or in component file
- Props destructured with defaults

### Library/Framework Requirements

**Already Available (no installation needed):**

| Package | Purpose | Import |
|---------|---------|--------|
| `lucide-react` | Icons | `import { Loader2, AlertCircle } from 'lucide-react'` |
| `@/lib/utils` | cn utility | `import { cn } from '@/lib/utils'` |
| `class-variance-authority` | Variants | Only if needed for complex variants |

**shadcn/ui Button (may need to add):**

If Button component not yet added, run:
```bash
npx shadcn@latest add button
```

This creates `src/components/ui/button.tsx` with:
- Multiple variants (default, destructive, outline, secondary, ghost, link)
- Multiple sizes (default, sm, lg, icon)
- Proper accessibility attributes

### File Structure After Changes

```
src/
├── components/
│   ├── ui/                        # shadcn/ui components
│   │   └── button.tsx             # May need to add
│   ├── LoadingSpinner.tsx         # NEW
│   ├── ErrorMessage.tsx           # NEW
│   ├── WidgetErrorBoundary.tsx    # NEW
│   ├── BandMember.tsx             # Existing
│   ├── BandsintownWidget.tsx      # Existing - will use WidgetErrorBoundary later
│   ├── Hero.tsx                   # Existing
│   ├── SpotifyWidget.tsx          # Existing - will use WidgetErrorBoundary later
│   ├── YoutubeWidget.tsx          # Existing - will use WidgetErrorBoundary later
│   ├── NavBar.tsx                 # Existing
│   ├── Footer.tsx                 # Existing
│   └── ContactForm.tsx            # Existing
└── lib/
    └── utils.ts                   # cn() utility (exists from 1.3)
```

### Testing Requirements

**Manual Testing:**
1. Import each component in a test file or console
2. Render LoadingSpinner with each size variant
3. Render ErrorMessage with and without retry prop
4. Wrap a component with WidgetErrorBoundary

**Build Verification:**
```bash
npm run build
# Should complete without TypeScript errors
```

### Security Considerations

**No security impact** - these are UI-only components with no external data handling.

### Anti-Patterns to Avoid

- **DO NOT** use React hooks in WidgetErrorBoundary (error boundaries require class components)
- **DO NOT** suppress errors silently - always log to console
- **DO NOT** make retry button the default - only show when retry prop provided
- **DO NOT** use inline styles - use Tailwind CSS classes
- **DO NOT** forget accessibility attributes (aria-label, role)

### UX Design Compliance

**From UX Design Specification:**

| Requirement | Implementation |
|-------------|----------------|
| Dark theme only | Use theme CSS variables |
| Accent color #E65C00 | Spinner color, retry button hover |
| Border radius md (8px) | `rounded-lg` on containers |
| Touch targets 44x44px | Ensure retry button meets minimum |
| Spacing 4px unit | Use Tailwind spacing scale |

### Component API Reference

**LoadingSpinner:**
```tsx
<LoadingSpinner />                    // Default md size
<LoadingSpinner size="sm" />          // 16px
<LoadingSpinner size="lg" />          // 32px
<LoadingSpinner className="mt-4" />   // With custom classes
```

**ErrorMessage:**
```tsx
<ErrorMessage message="Failed to load data" />
<ErrorMessage
  message="Network error"
  retry={() => refetch()}
/>
```

**WidgetErrorBoundary:**
```tsx
<WidgetErrorBoundary
  name="Spotify"
  fallbackUrl="https://open.spotify.com/artist/xxx"
>
  <SpotifyWidget />
</WidgetErrorBoundary>
```

### Project Structure Notes

- All three components go directly in `src/components/` (not in `ui/` subfolder)
- These are application components, not shadcn/ui primitives
- Follow existing naming convention: PascalCase filenames matching component names

### References

- [Source: docs/architecture.md#Structure Patterns] - Component file locations
- [Source: docs/architecture.md#Communication Patterns] - Loading/error patterns
- [Source: docs/architecture.md#Process Patterns] - Widget error boundaries
- [Source: docs/epics.md#Story 1.4] - Acceptance criteria
- [Source: docs/ux-design-specification.md#Color System] - Theme colors
- [Source: docs/sprint-artifacts/1-3-initialize-shadcn-ui-design-system.md] - shadcn/ui setup details
- [lucide-react Icons](https://lucide.dev/icons/) - Icon reference
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) - Official docs

## Dev Agent Record

### Context Reference

<!-- Story context verified against: docs/prd.md, docs/architecture.md, docs/epics.md, docs/ux-design-specification.md, docs/sprint-artifacts/1-3-initialize-shadcn-ui-design-system.md -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build successful on first attempt: `npm run build` completed in 1.56s with no TypeScript errors

### Completion Notes List

- **Task 1:** Created `LoadingSpinner.tsx` with Loader2 icon from lucide-react, size variants (sm/md/lg), animate-spin animation, text-primary color (#E65C00), role="status" and aria-label="Loading" for accessibility, sr-only text for screen readers
- **Task 2:** Created `ErrorMessage.tsx` with AlertCircle icon (text-destructive), message prop, optional retry callback with shadcn/ui Button (variant="outline"), bg-card container, role="alert", min-h/w-[44px] touch targets on retry button
- **Task 3:** Created `WidgetErrorBoundary.tsx` as React class component with getDerivedStateFromError and componentDidCatch for error logging, name and fallbackUrl props, fallback UI with ExternalLink icon and link to platform (rel="noopener noreferrer", target="_blank"), 44px touch targets
- **Task 4:** Build verification passed - all components compile without errors, exports work correctly

### Change Log

- 2025-12-11: Implemented all three shared utility components (LoadingSpinner, ErrorMessage, WidgetErrorBoundary) - Story 1.4 complete

### File List

**New Files:**
- src/components/LoadingSpinner.tsx
- src/components/ErrorMessage.tsx
- src/components/WidgetErrorBoundary.tsx
- src/components/ui/button.tsx (added via shadcn/ui CLI)
