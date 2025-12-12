# Story 7.3: Consistent Page Hero Sections

Status: ready-for-dev

## Story

As a **visitor**,
I want **a hero section on every page**,
so that **each page has a clear visual identity and consistent experience**.

## Acceptance Criteria

1. Each page (Bandet, Konserter, Kontakt Oss) has a hero section with:
   - Page-specific title (e.g., "Bandet", "Konserter", "Kontakt Oss")
   - Optional subtitle or tagline
   - Consistent styling with dark background
   - Responsive typography (scaled for mobile/desktop)
2. Hero sections use a shared reusable component with configurable props
3. Hero sections are shorter than homepage hero (200-300px height)
4. Pages affected: Bandet, Konserter, Kontakt Oss
5. Hero typography uses Barlow Condensed font family

## Tasks / Subtasks

- [ ] Task 1: Create PageHero component (AC: 1, 2, 3, 5)
  - [ ] Create `src/components/PageHero.tsx` as a simpler, shorter hero variant
  - [ ] Props: `title` (required), `subtitle` (optional), `className` (optional)
  - [ ] Use Barlow Condensed font for title (matching main Hero typography)
  - [ ] Set height to 200-300px range (NOT full viewport like homepage)
  - [ ] Dark background (#0A0A0A) with consistent styling
  - [ ] Center text vertically and horizontally
  - [ ] Responsive typography: smaller on mobile, larger on desktop

- [ ] Task 2: Add PageHero to Bandet page (AC: 1, 4)
  - [ ] Import PageHero component
  - [ ] Add `<PageHero title="BANDET" />` at top of page (before content)
  - [ ] Remove existing `<h1>` from page content to avoid duplication
  - [ ] Adjust page padding/spacing to account for hero

- [ ] Task 3: Add PageHero to Konserter page (AC: 1, 4)
  - [ ] Import PageHero component
  - [ ] Add `<PageHero title="KONSERTER" subtitle="Kommende konserter og festivaler" />` at top
  - [ ] Remove existing `<h1>` and subtitle from page content
  - [ ] Adjust spacing for smooth transition from hero to content

- [ ] Task 4: Add PageHero to KontaktOss page (AC: 1, 4)
  - [ ] Import PageHero component
  - [ ] Add `<PageHero title="KONTAKT" subtitle="Book Vågal til ditt neste arrangement!" />` at top
  - [ ] Remove existing `<h1>` from page content
  - [ ] Adjust spacing for form section

- [ ] Task 5: Verify consistency and responsiveness (AC: 1, 2, 3)
  - [ ] Test all pages at mobile (320px, 390px)
  - [ ] Test all pages at tablet (768px)
  - [ ] Test all pages at desktop (1024px+)
  - [ ] Verify visual consistency across all pages
  - [ ] Ensure no layout shift or scrolling issues

## Dev Notes

### CRITICAL: Component Architecture

**DO NOT modify the existing Hero.tsx component!** The homepage Hero is CMS-powered and has complex logic for image loading, CMS data fetching, and full-viewport display. This story creates a SEPARATE, SIMPLER component specifically for interior pages.

### Design Requirements (from UX Specification)

From `docs/ux-design-specification.md`:

**Typography:**
- H1 (Hero): Barlow Condensed, 48-72px, weight 700, line-height 1.1
- For page heroes (shorter), scale down: 32-48px mobile, 48-64px desktop

**Colors:**
- Background: #0A0A0A (near black)
- Text Primary: #F5F5F5 (off white)
- Text Secondary: #A3A3A3 (light gray) for subtitles

**Spacing:**
- Page hero height: 200-300px (NOT full viewport)
- Vertical padding: 64px (3xl spacing)
- Text centered both vertically and horizontally

### PageHero Component Implementation

```tsx
// src/components/PageHero.tsx
interface PageHeroProps {
  title: string
  subtitle?: string
  className?: string
}

export function PageHero({ title, subtitle, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[200px] items-center justify-center bg-[#0A0A0A] py-16 md:min-h-[280px] md:py-20",
        className
      )}
    >
      <div className="text-center px-4">
        <h1 className="font-barlow-condensed text-4xl font-bold tracking-tight text-[#F5F5F5] md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-lg text-[#A3A3A3] md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
```

### Current Page Structures (to modify)

**Bandet.tsx (lines 37-46 current):**
```tsx
// CURRENT - to be replaced with PageHero
<h1 className="text-center mb-6 text-3xl md:text-5xl font-bold tracking-tight">
  BANDET
</h1>
```

**Konserter.tsx (lines 17-24 current):**
```tsx
// CURRENT - to be replaced with PageHero
<h1 className="text-center mb-6 text-3xl md:text-5xl font-bold tracking-tight">
  KONSERTER
</h1>
<p className="mt-2 text-center">
  Følg med på kommende datoer. Billetter slippes fortløpende.
</p>
```

**KontaktOss.tsx (lines 12-15 current):**
```tsx
// CURRENT - to be replaced with PageHero
<h1 className="text-center mb-6 text-3xl md:text-5xl font-bold tracking-tight">
  Book Vågal til ditt neste arrangement!
</h1>
```

### Styling Considerations

**Barlow Condensed Font:**
The project uses Barlow font family. Ensure Barlow Condensed is loaded:
- Check `index.html` or CSS for Google Fonts import
- Use `font-family: 'Barlow Condensed', sans-serif` or equivalent Tailwind class

**Existing CSS Variables (from globals.css):**
```css
--color-text: #F5F5F5;
--color-muted: #A3A3A3;
--color-bg: #0A0A0A;
```

Prefer using these CSS variables for consistency:
```tsx
text-[var(--color-text)]    // instead of text-[#F5F5F5]
text-[var(--color-muted)]   // instead of text-[#A3A3A3]
bg-[var(--color-bg)]        // instead of bg-[#0A0A0A]
```

### Layout Integration

**Page structure after implementation:**

```tsx
// Example: Bandet.tsx structure
return (
  <>
    <SEO title="Bandet" ... />
    <PageHero title="BANDET" />
    <main className="container-page py-10 md:py-14">
      {/* Content without h1 - hero has the h1 now */}
      <div className="mx-auto max-w-3xl text-center mb-8">
        <p>Band description...</p>
      </div>
      {/* Rest of content */}
    </main>
  </>
)
```

### Previous Story Intelligence (Story 7.1 and 7.2)

From Story 7.1 implementation:
- SocialIcons component uses `cn()` utility from `@/lib/utils`
- Consistent use of CSS variables for colors
- Accessibility: proper aria-labels, focus states

From Story 7.2:
- Component reuse pattern (import shared component, use with props)
- Consistent styling with existing design system

### Git Context (Recent Commits)

```
15fa4ea feat: Add social media icon buttons to navigation (Story 7.1)
8a6b8a1 feat: Add form validation with Norwegian error messages (Story 6.2)
ce0c3fa feat: Refactor contact form with shadcn/ui components (Story 6.1)
```

**Pattern to follow:**
- Create component file first
- Import and use in each page
- Commit message format: `feat: Add consistent page hero sections (Story 7.3)`

### Files to Create

| File | Purpose |
|------|---------|
| `src/components/PageHero.tsx` | Reusable page hero component |

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Bandet.tsx` | Add PageHero, remove h1 |
| `src/pages/Konserter.tsx` | Add PageHero, remove h1 and subtitle |
| `src/pages/KontaktOss.tsx` | Add PageHero, remove h1 |

### Anti-Patterns to AVOID

- ❌ Modifying the existing Hero.tsx component (it's for homepage CMS)
- ❌ Using full-viewport height (keep 200-300px)
- ❌ Adding background images (keep simple dark bg for interior pages)
- ❌ Duplicating the h1 (remove old h1 when adding PageHero)
- ❌ Hardcoding colors (use CSS variables)
- ❌ Different styling per page (consistency is the goal)

### References

- [Source: docs/epics.md#Story 7.3: Consistent Page Hero Sections]
- [Source: docs/ux-design-specification.md#Typography System] - Font specs
- [Source: docs/ux-design-specification.md#Color System] - Color values
- [Source: docs/architecture.md#Structure Patterns] - Component patterns
- [Source: src/components/Hero.tsx] - Reference for styling (do NOT modify)
- [Source: src/pages/Bandet.tsx] - Current page structure
- [Source: src/pages/Konserter.tsx] - Current page structure
- [Source: src/pages/KontaktOss.tsx] - Current page structure

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

**Files to Create:**
- `src/components/PageHero.tsx`

**Files to Modify:**
- `src/pages/Bandet.tsx`
- `src/pages/Konserter.tsx`
- `src/pages/KontaktOss.tsx`
