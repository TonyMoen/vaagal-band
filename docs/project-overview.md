# Project Overview: Vågal Band Website

**Generated:** 2025-12-11
**Project Type:** Web (Single-part Frontend Application)
**Status:** In Development

---

## Summary

Vågal Band Website is a promotional web application for the Norwegian band "Vågal". The site showcases the band, their music, upcoming concerts, merchandise, and provides a contact form for booking inquiries.

## Business Context

- **Purpose:** Promote the band Vågal and provide fans with information about concerts, music, and merchandise
- **Target Audience:** Fans, event organizers, potential bookers
- **Language:** Norwegian (nb-NO)

## Key Features

| Feature | Status | Description |
|---------|--------|-------------|
| Homepage | Complete | Hero image, Spotify embed, YouTube video, concert widget |
| Band Page | Complete | Member profiles with photos and details |
| Concerts | Complete | Bandsintown integration for event listings |
| Merch Store | Placeholder | Product grid exists, purchasing disabled ("coming soon") |
| Contact Form | Complete | Web3Forms integration for booking inquiries |
| Navigation | Complete | Responsive desktop/mobile navigation |

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | React 19 | Modern React with latest features |
| Build Tool | Vite 7 | Fast HMR, modern bundling |
| Styling | Tailwind CSS | Utility-first, rapid development |
| Routing | React Router DOM 7 | Client-side SPA navigation |
| Language | TypeScript | Type safety, better DX |
| Form Handling | Web3Forms | No-backend form submission |
| Alerts | SweetAlert2 | Styled modal confirmations |

## External Dependencies

| Service | Purpose | Integration Point |
|---------|---------|-------------------|
| Bandsintown | Concert/event listings | Widget script injection |
| Spotify | Music streaming embed | iframe embed |
| YouTube | Video content | iframe embed (privacy mode) |
| Web3Forms | Form submissions | REST API |

## Project Constraints

- **No Backend:** Pure frontend application, no server-side logic
- **No Database:** All content is static/hardcoded
- **No Authentication:** Public-facing only
- **No E-commerce:** Merch page is placeholder only

## Known Issues / Technical Debt

1. **Hardcoded API Key:** Web3Forms access key is committed in source (`ContactForm.tsx:14`)
2. **No Environment Variables:** No `.env` setup for configuration
3. **No Tests:** No unit or integration tests
4. **Unused React import:** `Bandet.tsx` imports React but uses JSX transform
5. **Missing TypeScript types:** `ContactForm.tsx:9` - `event` parameter is untyped

## Future Considerations

- Implement actual merch store with payment processing
- Add environment variable configuration
- Set up testing infrastructure
- Consider CMS integration for content management
- Add SEO metadata and Open Graph tags
