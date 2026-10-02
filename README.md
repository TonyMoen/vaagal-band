# Vågal – [vaagalband.no](https://vaagalband.no)

**→ The band's website is [vaagalband.no](https://vaagalband.no).** This repository is only its source code.

**Vågal** is a bygdeband from Notodden in Telemark, Norway, playing bygderock and norsk country (their own songs, made for singing along). The site shows the band's music, concerts, booking information and merch.

## Tech Stack

| Layer        | Technology                                             |
| ------------ | ------------------------------------------------------ |
| Framework    | React 19 + TypeScript                                  |
| Build Tool   | Vite 7                                                 |
| Styling      | Tailwind CSS 3 + Radix UI primitives                   |
| CMS          | Sanity (headless)                                      |
| SEO          | Every page rendered to HTML at build time, JSON-LD, sitemap, llms.txt ([docs/seo.md](docs/seo.md)) |
| Routing      | React Router v7                                        |
| UI Components| shadcn/ui (Button, Carousel, Sheet, Toast, etc.)       |
| Embeds       | Spotify and YouTube (load when tapped), Bandsintown API |

## Folder Structure

```
src/
├── assets/              # Static images and media
├── components/
│   ├── ui/              # Reusable UI primitives (shadcn/ui)
│   ├── NavBar.tsx        # Main navigation
│   ├── Footer.tsx        # Site footer
│   ├── Hero.tsx          # Landing hero section
│   ├── PageHero.tsx      # Reusable page hero banner
│   ├── BandMember.tsx    # Band member card
│   ├── ConcertList.tsx   # Concert listing
│   ├── ContactForm.tsx   # Contact form
│   ├── ReleaseCard.tsx   # Discography release card
│   ├── SEO.tsx           # SEO meta tag component
│   ├── JsonLd.tsx        # JSON-LD structured data (built in lib/schema.ts)
│   ├── FaqList.tsx       # Questions and answers
│   ├── PastConcerts.tsx  # Earlier concerts, by year
│   ├── SocialIcons.tsx   # Social media links
│   ├── SpotifyWidget.tsx # Embedded Spotify player
│   ├── YoutubeWidget.tsx # Embedded YouTube player
│   └── BandsintownWidget.tsx # Bandsintown concert feed
├── hooks/               # Custom React hooks (useBandMembers, useReleases, etc.)
├── lib/
│   ├── band.ts          # Facts about the band: the one place to change them
│   ├── schema.ts        # JSON-LD for the band, concerts, songs and FAQs
│   ├── seoFiles.ts      # sitemap.xml and llms.txt
│   ├── concerts.ts      # Bandsintown feed and date formatting
│   └── sanity/          # Sanity client & queries
├── pages/
│   ├── Hjem.tsx         # Home page
│   ├── Bandet.tsx       # About the band
│   ├── Diskografi.tsx   # Discography
│   ├── Sang.tsx         # One song: vaagalband.no/<slug>
│   ├── Konserter.tsx    # Concerts
│   ├── Booking.tsx      # For organisers looking to book the band
│   ├── Merch.tsx        # Merchandise (manual ordering via contact form)
│   ├── KontaktOss.tsx   # Contact
│   ├── Arrangoerer.tsx  # Riders and press material (/arrangor)
│   └── NotFoundPage.tsx # 404 page
├── styles/              # Global CSS
├── types/               # TypeScript type definitions (Sanity)
├── routes.tsx           # Route definitions
├── App.tsx              # App root
├── entry-server.tsx     # Renders pages to HTML during the build
└── main.tsx             # Entry point
scripts/prerender.mjs    # Writes the rendered pages, 404.html, sitemap.xml, llms.txt
api/cron.js              # Daily rebuild and IndexNow ping (Vercel cron)
```

## Features

- **Fully Norwegian** — all UI text and meta tags in Norwegian
- **Headless CMS** — band members, releases, and concerts managed via Sanity
- **Merch** — ordered manually via the contact form (webshop coming later)
- **Concert listings** — upcoming and earlier shows from Bandsintown
- **Embedded media** — Spotify and YouTube players that load when tapped (no third-party cookies before that)
- **Readable without JavaScript** — every public page is real HTML for search engines, link previews and AI crawlers, with JSON-LD, a sitemap and llms.txt (see [docs/seo.md](docs/seo.md))
- **Booking page** — facts, earlier venues and answers for organisers at /booking
- **Responsive design** — mobile-first layout with Tailwind CSS
- **Promoter page** — dedicated section for event organizers

---

Copyright &copy; 2025 Vågal. All rights reserved.
