# Component Inventory

**Generated:** 2025-12-11

---

## Overview

| Category | Count |
|----------|-------|
| Layout Components | 3 |
| Page Components | 6 |
| UI Components | 6 |
| **Total** | **15** |

---

## Layout Components

### App

**File:** `src/App.tsx`

Root layout component that wraps all pages.

```tsx
export default function App()
```

| Prop | Type | Description |
|------|------|-------------|
| N/A | - | No props, uses Outlet for children |

**Dependencies:** `NavBar`, `Footer`, `react-router-dom`

---

### NavBar

**File:** `src/components/NavBar.tsx`

Responsive navigation bar with mobile hamburger menu.

```tsx
export default function NavBar()
```

| State | Type | Purpose |
|-------|------|---------|
| `open` | `boolean` | Mobile menu visibility |

**Features:**
- Sticky header with backdrop blur
- Desktop: Horizontal nav links
- Mobile: Collapsible drawer menu
- Active route highlighting with underline

**Dependencies:** `react-router-dom`, `vaagal-logo.svg`

---

### Footer

**File:** `src/components/Footer.tsx`

Site footer with navigation and social links.

```tsx
export default function Footer()
```

**Features:**
- Band logo
- Navigation links (mirrors NavBar)
- Social media links (Instagram, Facebook, TikTok)
- Dynamic copyright year

**Dependencies:** `react-router-dom`, `vaagal-logo.svg`

---

## Page Components

### Hjem (Home)

**File:** `src/pages/Hjem.tsx`
**Route:** `/`

Homepage featuring hero image, music embeds, and concert widget.

```tsx
export default function Hjem()
```

**Composed of:** `Hero`, `BandsintownWidget`, `SpotifyEmbed`, `YouTubeEmbed`

---

### Bandet (Band)

**File:** `src/pages/Bandet.tsx`
**Route:** `/bandet`

Band member profiles page.

```tsx
const Bandet: React.FC = ()
```

**Data:** Hardcoded `members` array with 5 band members

**Composed of:** `BandMember` (x5)

---

### Konserter (Concerts)

**File:** `src/pages/Konserter.tsx`
**Route:** `/konserter`

Concert listings page with info sidebar.

```tsx
export default function Konserter()
```

**Composed of:** `BandsintownWidget`

---

### Merch (Merchandise)

**File:** `src/pages/Merch.tsx`
**Route:** `/merch`

Merchandise catalog page (placeholder).

```tsx
export default function Merch()
```

**Composed of:** `Products`

---

### KontaktOss (Contact)

**File:** `src/pages/KontaktOss.tsx`
**Route:** `/kontakt-oss`

Contact and booking form page.

```tsx
export default function KontaktOss()
```

**Composed of:** `ContactForm`

---

### NotFoundPage

**File:** `src/pages/NotFoundPage.tsx`
**Route:** `/*` (catch-all)

404 error page with navigation options.

```tsx
export default function NotFoundPage()
```

**Features:**
- Sets document title
- Focus management for accessibility
- "Go back" and "Home" buttons

**Dependencies:** `react-router-dom`

---

## UI Components

### Hero

**File:** `src/components/Hero.tsx`

Full-bleed hero image section with optional overlay.

```tsx
export default function Hero({ src, alt, overlay }: Props)
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `heroImg` | Image source |
| `alt` | `string` | `""` | Alt text |
| `overlay` | `boolean` | `true` | Dark overlay |

---

### BandMember

**File:** `src/components/BandMember.tsx`

Band member profile card.

```tsx
const BandMember: React.FC<Props> = ({ member, imageHeight })
```

| Prop | Type | Description |
|------|------|-------------|
| `member` | `Member` | Member data object |
| `imageHeight` | `number` | Image height in pixels |

**Member Type:**
```tsx
type Member = {
  name: string;
  alias: string;
  instrument: string;
  inspiration: string;
  interest: { hobby: string; food: string };
  image: string;
};
```

---

### ContactForm

**File:** `src/components/ContactForm.tsx`

Contact form with Web3Forms integration.

```tsx
const Contact = ()
```

| State | Type | Purpose |
|-------|------|---------|
| `result` | `string` | Submission status |

**Form Fields:** Name, Email, Message

**Integration:** Web3Forms API

**Note:** TypeScript issue - `event` parameter is untyped

---

### Products

**File:** `src/components/Products.tsx`

Merchandise product grid.

```tsx
export default function Products()
```

**Exports:**
```tsx
export type Product = {
  id: number;
  name: string;
  img: string;
  price: number;
};
```

**Contains:** `ProductCard` (internal component)

**Data:** Hardcoded `products` array with 6 items

**Features:** NOK currency formatting

---

### SpotifyWidget

**File:** `src/components/SpotifyWidget.tsx`

Spotify player embed component.

```tsx
export default function SpotifyEmbed({ url, title, height, theme }: Spotify)
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | required | Spotify URL |
| `title` | `string` | `"Spotify player"` | iframe title |
| `height` | `number` | `352` | Player height |
| `theme` | `"dark" \| "light"` | `"dark"` | Color theme |

---

### BandsintownWidget

**File:** `src/components/BandsintownWidget.tsx`

Bandsintown concert widget.

```tsx
export default function BandsintownWidget()
```

**Integration Method:**
- Creates anchor element with data attributes
- Injects Bandsintown script
- Cleanup on unmount

**Artist ID:** `id_15561560`

---

### YoutubeWidget

**File:** `src/components/YoutubeWidget.tsx`

YouTube video embed component.

```tsx
export default function YouTubeEmbed({ url, title, start, controls, autoplay }: Youtube)
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | required | YouTube URL |
| `title` | `string` | `"YouTube video"` | iframe title |
| `start` | `number` | `0` | Start time (seconds) |
| `controls` | `boolean` | `true` | Show controls |
| `autoplay` | `boolean` | `false` | Autoplay video |

**Features:**
- Parses multiple YouTube URL formats
- Uses privacy-enhanced domain (`youtube-nocookie.com`)
- Responsive 16:9 aspect ratio

**Helper Function:** `getYouTubeId(rawUrl: string): string | null`

---

## Component Dependency Graph

```
App
├── NavBar
│   └── (vaagal-logo.svg)
├── [Page]
│   ├── Hjem
│   │   ├── Hero
│   │   │   └── (hero-1920.jpg)
│   │   ├── BandsintownWidget
│   │   ├── SpotifyWidget
│   │   └── YoutubeWidget
│   ├── Bandet
│   │   └── BandMember
│   │       └── (member photos)
│   ├── Konserter
│   │   └── BandsintownWidget
│   ├── Merch
│   │   └── Products
│   │       └── (merch images)
│   ├── KontaktOss
│   │   └── ContactForm
│   └── NotFoundPage
└── Footer
    └── (vaagal-logo.svg)
```

---

## Reusability Assessment

| Component | Reusable | Notes |
|-----------|----------|-------|
| Hero | Yes | Generic image hero |
| BandMember | Partially | Tied to Member type |
| ContactForm | No | Hardcoded API key, specific fields |
| Products | No | Hardcoded products |
| SpotifyWidget | Yes | Generic Spotify embed |
| BandsintownWidget | Partially | Hardcoded artist ID |
| YoutubeWidget | Yes | Generic YouTube embed |
| NavBar | No | Hardcoded routes |
| Footer | No | Hardcoded links |
