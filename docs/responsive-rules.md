# Responsive rules (mobile-first redesign, September 2026)

The public site is designed at 320–430 px first and grows up. These are the rules the
redesign follows; keep new pages and components inside them.

## Breakpoints

- Design for a phone first. Layout changes only at **768 px (`md`)** and **1024 px (`lg`)**.
- Check every change at 320, 375, 390, 430, 768, 1024 and 1440 px.

## Layout

- `.container-page`: max 1200 px, 16 px gutters on phones, 32 px from `md`. Header and footer use the same width.
- No sideways scroll, ever. Every grid declares its columns (`grid-cols-1` is `minmax(0, 1fr)`),
  grid/flex children that hold text get `min-w-0`, and titles wrap (`[overflow-wrap:anywhere]`)
  instead of `truncate`. An implicit `auto` track plus a `truncate` title is what made
  `/konserter` 395 px wide on a 390 px phone.
- Heights use `svh` with a cap, e.g. `h-[clamp(430px,76svh,660px)]`. Never `100svh` under the sticky header.
- The header is 56 px below `lg` (72 px from `lg`) and slides away while scrolling down (`useHideOnScroll`).
  Keyboard focus inside it always brings it back.

## Touch

- Every link and button is at least **44 × 44 px**; primary actions are 48 px (`.btn`, `.btn-outline`,
  `<Button size="touch">`). Links inside a sentence are exempt.
- Form fields are 48 px tall with 16 px text, so iOS does not zoom the page on focus.
- Bottom-anchored UI pads with `env(safe-area-inset-bottom)`; `viewport-fit=cover` is set in `index.html`.
  Pinch-zoom stays enabled.

## Images

- Sanity images go through `imageUrl()` / `imageSrcSet()` in `src/lib/sanity/image.ts`:
  `auto('format')`, quality 70, a real `srcSet` + `sizes`, and `ratio` for a hotspot-aware crop.
  (The hero was a 3.1 MB PNG on phones; the same photo is now a 40 KB portrait crop.)
- Always set `width` and `height`, and `loading="lazy"` below the fold.
- The logo is `src/assets/vaagal-logo.webp` (17 KB). `public/vaagal-logo.svg` wraps a bitmap and weighs 608 KB: do not load it in the UI.

## Embeds

- **Spotify**: `SpotifyWidget` is 152 px (compact player, nothing to scroll inside) below `lg` and 352 px
  from `lg`. Always pair it with an "Åpne i Spotify" button.
- **YouTube**: `YouTubeWidget` shows the thumbnail and loads the `youtube-nocookie` player on tap
  (the player is about 1 MB of script).
- **Concerts**: `useConcerts()` (react-query) reads the Bandsintown feed once; `ConcertList` and
  `NextGigStrip` draw their own markup from it. `venueLabel()` turns "Vågal til Banken Pub // Lillesand" into "Banken Pub".

## Homepage hero

- Shows the newest release whose date has passed (`latestReleaseQuery`). Turning on
  **Pin to Homepage Hero** (`pinToHero`) on a release overrides that, also before its date, which is
  how an upcoming release gets its pre-save button on the front page. The old `isLatest` flag is unused.

## Bundle

- Everything under `/ai` is loaded on demand (`routes.tsx`), so visitors do not download the dashboard.
