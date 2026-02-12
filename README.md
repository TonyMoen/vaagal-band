# Vågal - Official Band Website

**Vågal** is a Norwegian folk/country band ("Norsk Bygdeband"). This is the official website — a modern, responsive single-page application showcasing the band's music, concerts, merchandise, and more.

**Live site:** [vaagalband.no](https://vaagalband.no)

## Tech Stack

| Layer        | Technology                                             |
| ------------ | ------------------------------------------------------ |
| Framework    | React 19 + TypeScript                                  |
| Build Tool   | Vite 7                                                 |
| Styling      | Tailwind CSS 3 + Radix UI primitives                   |
| CMS          | Sanity (headless)                                      |
| E-commerce   | Shopify (merch store)                                  |
| SEO          | react-helmet-async, Open Graph & Twitter Card meta     |
| Routing      | React Router v7                                        |
| UI Components| shadcn/ui (Button, Carousel, Sheet, Toast, etc.)       |
| Embeds       | Spotify widget, YouTube widget, Bandsintown widget      |

## Folder Structure

```
src/
├── assets/              # Static images and media
├── components/
│   ├── ui/              # Reusable UI primitives (shadcn/ui)
│   ├── features/        # Feature-specific components (MerchCarousel, ProductCard)
│   ├── NavBar.tsx        # Main navigation
│   ├── Footer.tsx        # Site footer
│   ├── Hero.tsx          # Landing hero section
│   ├── PageHero.tsx      # Reusable page hero banner
│   ├── BandMember.tsx    # Band member card
│   ├── ConcertList.tsx   # Concert listing
│   ├── ContactForm.tsx   # Contact form
│   ├── ReleaseCard.tsx   # Discography release card
│   ├── SEO.tsx           # SEO meta tag component
│   ├── StructuredData.tsx # JSON-LD structured data
│   ├── SocialIcons.tsx   # Social media links
│   ├── SpotifyWidget.tsx # Embedded Spotify player
│   ├── YoutubeWidget.tsx # Embedded YouTube player
│   └── BandsintownWidget.tsx # Bandsintown concert feed
├── hooks/               # Custom React hooks (useBandMembers, useReleases, etc.)
├── lib/
│   ├── sanity/          # Sanity client & queries
│   └── shopify/         # Shopify client & queries
├── pages/
│   ├── Hjem.tsx         # Home page
│   ├── Bandet.tsx       # About the band
│   ├── Diskografi.tsx   # Discography
│   ├── Konserter.tsx    # Concerts
│   ├── Merch.tsx        # Merchandise store
│   ├── KontaktOss.tsx   # Contact
│   ├── Arrangoerer.tsx  # For event organizers / promoters
│   └── NotFoundPage.tsx # 404 page
├── styles/              # Global CSS
├── types/               # TypeScript type definitions (Sanity, Shopify)
├── routes.tsx           # Route definitions
├── App.tsx              # App root
└── main.tsx             # Entry point
```

## Features

- **Fully Norwegian** — all UI text and meta tags in Norwegian
- **Headless CMS** — band members, releases, and concerts managed via Sanity
- **Merch store** — products pulled from Shopify with carousel display
- **Concert listings** — upcoming shows with Bandsintown integration
- **Embedded media** — Spotify and YouTube players for music/videos
- **SEO optimized** — Open Graph, Twitter Cards, and JSON-LD structured data
- **Responsive design** — mobile-first layout with Tailwind CSS
- **Promoter page** — dedicated section for event organizers

---

Copyright &copy; 2025 Vågal. All rights reserved.
