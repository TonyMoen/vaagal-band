# Story 7.1: Social Media Icon Buttons in Navigation

Status: Ready for Review

## Story

As a **visitor**,
I want **social media icons in the navigation bar**,
so that **I can quickly access Vågal's social profiles from any page**.

## Acceptance Criteria

1. Social media icons are displayed in the navbar (Spotify, YouTube, Instagram, Facebook, TikTok)
2. Icons use a consistent size (24x24px desktop, 20x20px mobile)
3. Icons have hover state with orange accent color (#E65C00 / var(--color-accent))
4. Icons open links in new tab with `rel="noopener noreferrer"`
5. Icons have appropriate `aria-label` for accessibility
6. Icons are visible on both desktop and mobile navigation

## Tasks / Subtasks

- [x] Task 1: Create SocialIcons component (AC: 1, 2, 5)
  - [x] Create `src/components/SocialIcons.tsx` with SVG icons for Spotify, YouTube, Instagram, Facebook, TikTok
  - [x] Export component with configurable size prop (default 24px, mobile 20px)
  - [x] Add proper aria-labels for each platform

- [x] Task 2: Add social icons to desktop navigation (AC: 1, 3, 4, 6)
  - [x] Import SocialIcons into NavBar.tsx
  - [x] Add icons after NavigationMenuList, before Sheet trigger
  - [x] Apply hover color transition using CSS variables
  - [x] Ensure icons use target="_blank" rel="noopener noreferrer"

- [x] Task 3: Add social icons to mobile navigation drawer (AC: 1, 3, 4, 6)
  - [x] Add SocialIcons component inside SheetContent
  - [x] Position at bottom of mobile nav or after nav links
  - [x] Use smaller icon size (20px) for mobile
  - [x] Apply same hover styling as desktop

- [x] Task 4: Verify accessibility and responsiveness (AC: 2, 5)
  - [x] Test keyboard navigation (Tab through icons)
  - [x] Test screen reader announces aria-labels
  - [x] Verify icons scale correctly at breakpoints

## Dev Notes

### Social Media URLs (from Footer.tsx)

```typescript
const socialLinks = [
  { platform: "Spotify", url: "https://open.spotify.com/artist/4aFADqsMf5HWZhfBrZzM3L", label: "Spotify - Vågal" },
  { platform: "YouTube", url: "https://www.youtube.com/@vaagalband", label: "YouTube - Vågal" },
  { platform: "Instagram", url: "https://www.instagram.com/vaagal_band/", label: "Instagram - Vågal" },
  { platform: "Facebook", url: "https://www.facebook.com/vaagal.band.no/?locale=nb_NO", label: "Facebook - Vågal" },
  { platform: "TikTok", url: "https://www.tiktok.com/@vaagalband", label: "TikTok - Vågal" },
]
```

### Architecture Patterns to Follow

**File Location:** `src/components/SocialIcons.tsx`

**Styling Pattern:** Use CSS variables from the design system:
- `var(--color-muted)` - Default icon color
- `var(--color-accent)` - Hover color (#E65C00)
- `var(--color-text)` - Alternative if needed

**Component Pattern:** Follow existing NavBar patterns:
```typescript
import { cn } from "@/lib/utils"

interface SocialIconsProps {
  className?: string
  iconSize?: number
}

export default function SocialIcons({ className, iconSize = 24 }: SocialIconsProps) {
  // ...
}
```

**Icon Approach Options:**
1. **Inline SVGs** (recommended) - Full control, no extra dependencies
2. **lucide-react** - Already may be in project via shadcn/ui
3. **react-icons** - Would need to install

**Recommend inline SVGs** to match existing pattern in NavBar (hamburger menu is inline SVG).

### NavBar.tsx Modification Points

**Desktop (line ~78-79):** Add after `</NavigationMenuList>` before closing `</NavigationMenu>`:
```tsx
<div className="ml-4 flex items-center gap-2">
  <SocialIcons iconSize={24} />
</div>
```

**Mobile (line ~138):** Add inside SheetContent after nav links:
```tsx
<div className="mt-auto px-4 pb-6">
  <SocialIcons iconSize={20} className="justify-center" />
</div>
```

### SVG Icons Reference

Use simple, recognizable brand icons. Each should be:
- viewBox="0 0 24 24"
- fill="currentColor" (inherits text color)
- No hardcoded colors

### Project Structure Notes

- **Component location:** `src/components/SocialIcons.tsx` (follows existing pattern)
- **No new dependencies needed** - use inline SVGs
- **Reusable component** - can be used in Footer refactor (Story 7.2)

### Color System Reference

From UX Design Specification:
- Text Secondary: #A3A3A3 (muted icons)
- Accent Primary: #E65C00 (hover)
- Accent Hover: #FF6B00 (optional brighter hover)

### References

- [Source: docs/epics.md#Story 7.1: Social Media Icon Buttons in Navigation]
- [Source: docs/architecture.md#Naming Patterns]
- [Source: docs/architecture.md#Structure Patterns]
- [Source: src/components/NavBar.tsx] - Current navbar implementation
- [Source: src/components/Footer.tsx] - Social media URLs

## Dev Agent Record

### Context Reference

Story created by create-story workflow

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build verified: `npm run build` completed successfully
- TypeScript check: `tsc --noEmit` passed with no errors
- IDE diagnostics: No errors in SocialIcons.tsx or NavBar.tsx

### Completion Notes List

- Created reusable SocialIcons component with inline SVGs for 5 platforms (Spotify, YouTube, Instagram, Facebook, TikTok)
- Component accepts iconSize prop (default 24px) and className for flexible positioning
- All icons use `fill="currentColor"` to inherit text color from CSS variables
- Hover states transition to accent color (#E65C00) using CSS variables
- All links open in new tab with `rel="noopener noreferrer"` for security
- Proper aria-labels on each link for screen reader accessibility
- Desktop: Icons placed after nav links with border separator
- Mobile: Icons placed at bottom of sheet with centered layout and smaller size (20px)
- Focus states include visible ring for keyboard navigation

### File List

**Files Created:**
- `src/components/SocialIcons.tsx`

**Files Modified:**
- `src/components/NavBar.tsx`
