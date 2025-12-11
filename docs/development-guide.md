# Development Guide

**Generated:** 2025-12-11

---

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | 18+ | LTS recommended |
| npm | 9+ | Comes with Node.js |
| Git | Latest | For version control |

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vaagal-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or next available port).

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on all files |

---

## Project Structure

```
src/
├── assets/          # Static images (bundled by Vite)
├── components/      # Reusable UI components
├── pages/           # Route page components
├── styles/          # Global CSS
├── App.tsx          # Layout wrapper
├── routes.tsx       # Route definitions
├── main.tsx         # Entry point
└── index.css        # Tailwind imports
```

---

## Development Workflow

### Adding a New Page

1. Create component in `src/pages/`:
   ```tsx
   // src/pages/NewPage.tsx
   export default function NewPage() {
     return (
       <section className="container-page py-10 md:py-14">
         <h1 className="text-center mb-6 text-3xl md:text-5xl font-bold">
           NEW PAGE
         </h1>
       </section>
     );
   }
   ```

2. Add route in `src/routes.tsx`:
   ```tsx
   import NewPage from "./pages/NewPage";

   // In children array:
   { path: "new-page", element: <NewPage /> },
   ```

3. Add navigation link in `src/components/NavBar.tsx`:
   ```tsx
   const items = [
     // ...existing items
     { to: "/new-page", label: "New Page" },
   ];
   ```

4. Update Footer links if needed

### Adding a New Component

1. Create component in `src/components/`:
   ```tsx
   // src/components/MyComponent.tsx
   type Props = {
     title: string;
   };

   export default function MyComponent({ title }: Props) {
     return <div className="card-surface p-5">{title}</div>;
   }
   ```

2. Import and use in pages:
   ```tsx
   import MyComponent from "../components/MyComponent";

   <MyComponent title="Hello" />
   ```

### Adding Static Assets

1. Place images in `src/assets/`
2. Import in component:
   ```tsx
   import myImage from "../assets/my-image.jpg";

   <img src={myImage} alt="Description" />
   ```

---

## Styling Guide

### Using CSS Variables

The design system uses CSS custom properties:

```tsx
// Use in className
<div className="bg-[var(--color-surface)] text-[var(--color-text)]">

// Available variables:
// --color-bg: #0b0c0d
// --color-surface: #111214
// --color-text: #e7e7ea
// --color-accent: #ff6100
// --color-border: #26282b
```

### Using Utility Classes

```tsx
// Card styling
<div className="card-surface">...</div>

// Button styling
<button className="btn">Click me</button>

// Page container
<section className="container-page py-10 md:py-14">

// Full-bleed section
<section className="full-bleed">
```

### Responsive Design

Tailwind breakpoints:
- Default: Mobile first
- `md:` - 768px and up
- `lg:` - 1024px and up

```tsx
<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
```

---

## External Service Integration

### Bandsintown Widget

The widget is loaded dynamically in `BandsintownWidget.tsx`. To change the artist:

```tsx
a.setAttribute("data-artist-name", "id_YOUR_ARTIST_ID");
```

### Spotify Embed

Pass any Spotify artist/album/playlist URL:

```tsx
<SpotifyEmbed
  url="https://open.spotify.com/artist/..."
  title="Artist Name"
  height={520}
  theme="dark"
/>
```

### YouTube Embed

Supports multiple URL formats:

```tsx
<YouTubeEmbed
  url="https://youtu.be/VIDEO_ID"
  // or "https://youtube.com/watch?v=VIDEO_ID"
  title="Video Title"
/>
```

### Web3Forms Contact

Current setup uses Web3Forms. To change the recipient:
1. Create account at web3forms.com
2. Get new access key
3. Update `ContactForm.tsx`:
   ```tsx
   formData.append("access_key", "YOUR_NEW_KEY");
   ```

**Recommendation:** Move to environment variable.

---

## Build & Deployment

### Production Build

```bash
npm run build
```

Output is in `dist/` directory.

### Preview Build Locally

```bash
npm run preview
```

### Deployment

This is a static SPA. Deploy to any static host:

**Vercel:**
```bash
npx vercel
```

**Netlify:**
```bash
npx netlify deploy --prod --dir=dist
```

**GitHub Pages:**
- Configure base URL in `vite.config.ts` if not serving from root

### SPA Routing Configuration

For client-side routing to work, configure redirects:

**Netlify (`public/_redirects`):**
```
/*    /index.html   200
```

**Vercel (`vercel.json`):**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Code Quality

### Linting

```bash
npm run lint
```

ESLint is configured with:
- TypeScript support
- React Hooks rules
- React Refresh rules

### Formatting

Prettier is installed. Format files:

```bash
npx prettier --write .
```

### Type Checking

TypeScript is configured strictly. Check types:

```bash
npx tsc --noEmit
```

---

## Known Issues

| Issue | File | Description |
|-------|------|-------------|
| Untyped event | `ContactForm.tsx:9` | `event` parameter needs type annotation |
| Hardcoded API key | `ContactForm.tsx:14` | Should use environment variable |
| Unused React import | `Bandet.tsx:1` | Can be removed (JSX transform) |

---

## Environment Variables (Recommended Setup)

Create `.env` file:

```env
VITE_WEB3FORMS_KEY=your-access-key
```

Update `ContactForm.tsx`:

```tsx
formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
```

Add to `.gitignore`:
```
.env
.env.local
```
