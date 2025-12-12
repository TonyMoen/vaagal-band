# Story 7.2: Footer Social Media Icon Cleanup

Status: Ready for Review

## Story

As a **visitor**,
I want **clean social media icons in the footer without redundant text**,
so that **the footer looks modern and uncluttered**.

## Acceptance Criteria

1. "Følg oss" text heading is removed (or made visually secondary)
2. Social media links are displayed as icon-only buttons (not text links)
3. Icons match the navbar social icons (same set and style from SocialIcons component)
4. Icons have hover state with orange accent color (#E65C00)
5. Icons have appropriate `aria-label` for screen readers
6. Icon row is centered or right-aligned based on footer layout
7. Spacing between icons is consistent (8-12px gap)

## Tasks / Subtasks

- [x] Task 1: Import and use existing SocialIcons component (AC: 2, 3)
  - [x] Import SocialIcons from `@/components/SocialIcons`
  - [x] Replace text-based social links with SocialIcons component
  - [x] Pass appropriate props (iconSize, className)

- [x] Task 2: Update footer social section layout (AC: 1, 6, 7)
  - [x] Remove or visually de-emphasize "Følg oss" heading
  - [x] Adjust grid/flex layout for icon-only display
  - [x] Set gap between icons to 8-12px (use `gap-2` or `gap-3`)
  - [x] Maintain center alignment on mobile, left-align on desktop (md:justify-start)

- [x] Task 3: Verify accessibility (AC: 4, 5)
  - [x] Confirm hover states work with accent color
  - [x] Test keyboard navigation (Tab through icons)
  - [x] Verify aria-labels are announced by screen readers

## Dev Notes

### CRITICAL: REUSE EXISTING COMPONENT

**DO NOT create new social icons!** Story 7.1 creates `SocialIcons.tsx` with all platforms (Spotify, YouTube, Instagram, Facebook, TikTok). This story ONLY refactors Footer.tsx to use that component.

### Current Footer Implementation (to replace)

The current Footer.tsx (lines 78-127) has:
- "Følg oss" heading text
- Individual `<a>` tags with TEXT labels (not icons)
- All social URLs already defined

```tsx
// CURRENT (to be replaced):
<div className="font-medium text-[var(--color-text)]">Følg oss</div>
<div className="flex flex-wrap justify-center gap-4 md:justify-start">
  <a ... >Spotify</a>
  <a ... >YouTube</a>
  ...
</div>
```

### Target Implementation

```tsx
// REPLACE WITH:
import SocialIcons from "@/components/SocialIcons"

// Inside the footer grid (third column):
<div className="flex flex-col gap-4 text-center md:text-left">
  <SocialIcons
    iconSize={24}
    className="justify-center md:justify-start"
  />
  <div className="text-sm text-[var(--color-muted)]">© {year} Vågal</div>
</div>
```

### Social URLs Reference (from Footer.tsx)

Already defined in SocialIcons component (Story 7.1):
- Spotify: `https://open.spotify.com/artist/4aFADqsMf5HWZhfBrZzM3L`
- YouTube: `https://www.youtube.com/@vaagalband`
- Instagram: `https://www.instagram.com/vaagal_band/`
- Facebook: `https://www.facebook.com/vaagal.band.no/?locale=nb_NO`
- TikTok: `https://www.tiktok.com/@vaagalband`

### Styling Requirements

**Icon Container:**
- `flex items-center gap-2` or `gap-3` (8-12px spacing)
- `justify-center md:justify-start` (responsive alignment)

**Individual Icons (handled by SocialIcons component):**
- Size: 24x24px (matching navbar)
- Default color: `var(--color-muted)` (#A3A3A3)
- Hover color: `var(--color-accent)` (#E65C00)
- Transition: `transition-colors`

### Files to Modify

**Primary:**
- `src/components/Footer.tsx` - Replace text links with SocialIcons

**Dependencies (must exist from Story 7.1):**
- `src/components/SocialIcons.tsx` - Reusable icon component

### Project Structure Notes

- SocialIcons component is shared between NavBar and Footer
- No new files needed for this story
- Pattern matches existing component reuse in codebase

### Anti-Patterns to AVOID

- ❌ Creating duplicate social icon code
- ❌ Defining social URLs again (use SocialIcons component)
- ❌ Using text labels alongside icons (icon-only)
- ❌ Different icon sizes than NavBar (use 24px to match)
- ❌ Adding lucide-react or react-icons (inline SVGs are already in SocialIcons)

### References

- [Source: docs/epics.md#Story 7.2: Footer Social Media Icon Cleanup]
- [Source: docs/sprint-artifacts/7-1-social-media-icon-buttons-in-navigation.md] - Previous story with SocialIcons component
- [Source: src/components/Footer.tsx] - Current implementation (lines 78-127)
- [Source: docs/architecture.md#Structure Patterns] - Component reuse patterns

## Dev Agent Record

### Context Reference

<!-- Story created by create-story workflow -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build verified: `npm run build` passed successfully (built in 12.73s)
- TypeScript compilation: No errors

### Completion Notes List

- Imported SocialIcons component from Story 7.1
- Removed "Følg oss" heading and all individual text-based social links
- Replaced with single SocialIcons component call with iconSize={24} and responsive justify classes
- All 5 social platforms rendered as icon-only buttons (Spotify, YouTube, Instagram, Facebook, TikTok)
- Footer now matches navbar styling with consistent icons
- Accessibility verified: aria-labels present, keyboard navigation works via Tab, hover states use accent color

### File List

**Files Modified:**
- `src/components/Footer.tsx` - Replaced text-based social links with SocialIcons component

**Files Used (from Story 7.1):**
- `src/components/SocialIcons.tsx` - Reusable icon component (no changes)

## Change Log

- 2025-12-12: Implemented footer social media icon cleanup - replaced text links with icon-only SocialIcons component
