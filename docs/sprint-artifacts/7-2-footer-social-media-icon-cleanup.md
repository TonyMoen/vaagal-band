# Story 7.2: Footer Social Media Icon Cleanup

Status: ready-for-dev

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

- [ ] Task 1: Import and use existing SocialIcons component (AC: 2, 3)
  - [ ] Import SocialIcons from `@/components/SocialIcons`
  - [ ] Replace text-based social links with SocialIcons component
  - [ ] Pass appropriate props (iconSize, className)

- [ ] Task 2: Update footer social section layout (AC: 1, 6, 7)
  - [ ] Remove or visually de-emphasize "Følg oss" heading
  - [ ] Adjust grid/flex layout for icon-only display
  - [ ] Set gap between icons to 8-12px (use `gap-2` or `gap-3`)
  - [ ] Maintain center alignment on mobile, left-align on desktop (md:justify-start)

- [ ] Task 3: Verify accessibility (AC: 4, 5)
  - [ ] Confirm hover states work with accent color
  - [ ] Test keyboard navigation (Tab through icons)
  - [ ] Verify aria-labels are announced by screen readers

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

<!-- To be filled by dev agent -->

### Debug Log References

<!-- To be filled during implementation -->

### Completion Notes List

<!-- To be filled after implementation -->

### File List

**Files to Modify:**
- `src/components/Footer.tsx`

**Files to Use (from Story 7.1):**
- `src/components/SocialIcons.tsx`
