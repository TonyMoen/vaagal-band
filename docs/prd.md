---
stepsCompleted: [1, 2, 3, 4, 7, 8, 9, 10, 11]
inputDocuments:
  - docs/index.md
  - docs/project-overview.md
  - docs/architecture.md
  - docs/source-tree-analysis.md
  - docs/component-inventory.md
  - docs/development-guide.md
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 6
workflowType: 'prd'
lastStep: 11
project_name: 'vaagal-band'
user_name: 'Tony-'
date: '2025-12-11'
---

# Product Requirements Document - vaagal-band

**Author:** Tony-
**Date:** 2025-12-11

## Executive Summary

Vågal Band Website is an existing React-based promotional site for the Norwegian band "Vågal". This PRD defines improvements to transform the current static site into a polished, maintainable, and discoverable web presence.

**Current State:** Working SPA with pages for Home, Band, Concerts, Contact, and placeholder Merch. Content is hardcoded, requiring developer intervention for updates.

**Target State:** A professionally polished site with CMS-driven content, improved SEO for discoverability, and a consistent design system using shadcn/ui - enabling the band to manage their own content while presenting a cohesive brand experience to fans and industry professionals.

**Core Objectives:**
1. Enable self-service content updates via headless CMS
2. Establish professional visual polish with shadcn/ui components
3. Improve search engine visibility and social sharing appearance
4. Remove placeholder functionality (Merch page)

### What Makes This Special

This isn't about adding features - it's about **finishing what exists**. The site should:
- Let the band update content without touching code
- Look professional enough to impress promoters and venues
- Help fans find Vågal easily through search
- Authentically represent who Vågal is as a band

The measure of success is simple: a site the band is proud to share.

## Project Classification

**Technical Type:** web_app (SPA with CMS integration)
**Domain:** General (Entertainment/Band website)
**Complexity:** Low-medium
**Project Context:** Brownfield - improving existing React/Vite/Tailwind system

**Key Technical Decisions:**
- Headless CMS integration for content management
- shadcn/ui component library for design consistency
- SEO enhancements (meta tags, Open Graph, structured data)
- Retain existing widget integrations (Bandsintown, Spotify, YouTube)

## Success Criteria

### User Success

**Fans:**
- Can find Vågal via search engines (Google "Vågal band" returns the site)
- Can quickly access music (Spotify), videos (YouTube), and concert dates (Bandsintown)
- Site loads fast and looks good on mobile
- Social sharing shows proper previews (Open Graph)

**Industry (Promoters/Bookers):**
- Can find contact information within 2 clicks
- See professional presentation that builds confidence
- Access to band info, photos, and press materials
- Clear call-to-action for booking inquiries

**Band (Content Editors):**
- Can update hero images, band member info, and site content without developer help
- CMS is intuitive enough to use without documentation
- Changes reflect on site within minutes

### Business Success

- Site represents Vågal's brand authentically
- Increased booking inquiries through contact form
- Band members can confidently share the site with industry contacts
- Reduced developer dependency for content updates

### Technical Success

- Lighthouse SEO score > 90
- Core Web Vitals pass (LCP, FID, CLS)
- All pages have proper meta tags and Open Graph
- CMS integrated with minimal performance impact
- shadcn/ui components consistent across all pages
- Responsive design works on all device sizes

### Measurable Outcomes

| Metric | Target |
|--------|--------|
| Google search visibility | "Vågal band" returns site in top 5 |
| Page load time | < 3 seconds on mobile |
| CMS update time | < 5 minutes for content change |
| Mobile usability | 100% Google Mobile-Friendly |

## Product Scope

### MVP - Minimum Viable Product

**Must have for launch:**
1. CMS integration for editable content (hero, band members, general info)
2. SEO fundamentals (meta tags, Open Graph, sitemap)
3. shadcn/ui migration for core components (buttons, cards, navigation)
4. Remove/hide Merch page
5. Environment variables for API keys

### Growth Features (Post-MVP)

- Press kit / EPK (Electronic Press Kit) page
- Photo gallery with CMS-managed images
- News/updates section
- Enhanced animations and micro-interactions

### Vision (Future)

- Shopify integration for merchandise
- Multi-language support (Norwegian/English)
- Fan newsletter signup
- Integration with more platforms (Apple Music, etc.)

## User Journeys

### Journey 1: Emma - The Curious Fan

Emma is at a house party in Bergen when she hears "Øst til Vest" playing. She Shazams the song and discovers it's by a band called Vågal. Intrigued, she searches "Vågal band" on her phone.

The first result takes her to the Vågal website. The hero image immediately captures the band's energy, and she can see upcoming concert dates without scrolling. She taps through to the band page and reads about each member - their instruments, inspirations, and personalities. "These guys seem fun," she thinks.

She finds their Spotify widget and follows the band, then shares the website link to her friend group chat. The link preview shows a proper image and description: "Vågal - Bygderock fra Norge". Her friends click through and one notices there's a concert in their town next month.

Emma bookmarks the site and checks back occasionally for new concert dates. When she finally sees them live, she already feels like she knows the band.

### Journey 2: Lars - The Festival Booker

Lars runs bookings for a medium-sized summer festival in Trøndelag. He's heard Vågal on the radio and wants to evaluate them for next year's lineup. He searches for the band and lands on their website.

Within seconds, Lars can see the band looks professional - clean design, quality photos, clear branding. He navigates to the band page for member info and press photos. The contact page is easy to find, and the booking form is straightforward.

He fills out the contact form with festival details, dates, and budget range. The form confirms his submission with a professional thank-you message. Within 48 hours, he receives a response from the band's management with availability and pricing.

Lars adds Vågal to his shortlist, confident they're a professional act that won't be a headache to work with.

### Journey 3: Marius - The Band Member Updating Content

Marius (Vågal's vocalist) just got professional photos from a recent concert and wants to update the website. Previously, this meant texting Tony and waiting for a code change.

Now, Marius logs into the CMS dashboard on his laptop. He navigates to "Band Members" and finds his profile. He uploads the new photo, adjusts the crop, and updates his "inspiration" field to include a new artist. He hits save.

He then goes to the homepage section and swaps out the hero image for a fresh concert shot. The preview shows exactly how it'll look. He publishes the changes.

Two minutes later, he refreshes the live site on his phone. The new photos are there. He screenshots and sends to the group chat: "Oppdatert nettsiden selv! 🔥"

### Journey 4: Tony - Managing Site Content

Tony is the band's bassist and unofficial tech person. A promoter emails asking for high-res band photos and a bio for a festival poster.

Tony logs into the CMS and navigates to the media library. He can see all uploaded band photos organized by date. He downloads a few high-res versions and copies the band bio from the "About" content block.

He replies to the promoter with the assets within 10 minutes - no digging through folders or asking bandmates for files.

Later, Tony notices the contact form has a new submission. The CMS shows all inquiries in a simple list with status tracking. He marks one as "responded" and forwards another to the band's manager.

### Journey Requirements Summary

| Journey | Capabilities Required |
|---------|----------------------|
| Fan (Emma) | SEO visibility, fast mobile load, social sharing previews, easy navigation, Spotify/concert widgets |
| Booker (Lars) | Professional design, band info access, clear contact flow, booking form |
| Band Member (Marius) | CMS login, image upload, content editing, preview, publish |
| Tech Lead (Tony) | Media library, content export, form submission management |

**Core Requirements Revealed:**
1. **Public Site:** SEO, responsive design, professional appearance, widget integrations
2. **CMS Admin:** Content editing, image management, form submissions
3. **Content Types:** Hero images, band member profiles, general site content

## Web Application Specific Requirements

### Project-Type Overview

This is a Single Page Application (SPA) built with React 19 and Vite, serving as a promotional website for the band Vågal. The architecture prioritizes SEO (critical for discoverability), fast loading times, and responsive design across all devices.

### Technical Architecture Considerations

**Application Type:** Single Page Application (SPA)
- Client-side rendering with React Router
- Static hosting deployment (Vercel, Netlify, or similar)
- No server-side rendering initially (consider SSG for SEO if needed)

**CMS Integration Pattern:**
- Headless CMS (Sanity, Contentful, or Strapi recommended)
- Content fetched at build time or client-side
- Image optimization through CMS CDN

### Browser Support Matrix

| Browser | Minimum Version | Priority |
|---------|-----------------|----------|
| Chrome | Last 2 versions | High |
| Firefox | Last 2 versions | High |
| Safari | Last 2 versions | High |
| Edge | Last 2 versions | Medium |
| Mobile Safari | iOS 14+ | High |
| Chrome Mobile | Android 10+ | High |

**Not Supported:** Internet Explorer (EOL)

### Responsive Design Requirements

| Breakpoint | Target Devices | Priority |
|------------|----------------|----------|
| < 640px | Mobile phones | High |
| 640-1024px | Tablets | Medium |
| > 1024px | Desktop | High |

**Mobile-First Approach:**
- All layouts must work on 320px minimum width
- Touch targets minimum 44x44px
- No horizontal scrolling on any viewport

### Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Largest Contentful Paint (LCP) | < 2.5s | Core Web Vital |
| First Input Delay (FID) | < 100ms | Core Web Vital |
| Cumulative Layout Shift (CLS) | < 0.1 | Core Web Vital |
| Time to Interactive | < 3.5s | Lighthouse |
| Total Bundle Size | < 500KB | Build output |

**Image Optimization:**
- WebP format with JPEG fallback
- Lazy loading for below-fold images
- Responsive images with srcset

### SEO Strategy

**Technical SEO Requirements:**
- Unique meta title and description per page
- Open Graph tags for social sharing
- Twitter Card meta tags
- Canonical URLs
- XML sitemap generation
- robots.txt configuration
- Structured data (JSON-LD) for:
  - Organization (band)
  - MusicGroup schema
  - Event schema (concerts via Bandsintown)

**Target Keywords:**
- "Vågal band"
- "Vågal musikk"
- "Bygderock Norge"

### Accessibility Level

**Target:** WCAG 2.1 Level AA

**Key Requirements:**
- Semantic HTML structure
- Keyboard navigation support
- Focus indicators visible
- Color contrast ratios (4.5:1 minimum)
- Alt text for all images
- ARIA labels where needed
- Skip navigation link

### Implementation Considerations

**shadcn/ui Migration:**
- Install shadcn/ui CLI and initialize
- Migrate components incrementally:
  1. Button → shadcn Button
  2. Card surfaces → shadcn Card
  3. Navigation → shadcn NavigationMenu
  4. Form inputs → shadcn Input, Textarea
- Maintain existing Tailwind CSS variables for brand colors

**Environment Variables:**
- `VITE_WEB3FORMS_KEY` - Contact form API key
- `VITE_CMS_API_URL` - Headless CMS endpoint
- `VITE_CMS_API_TOKEN` - CMS read token (if needed)

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP
- Deliver the core user experience with professional polish
- Focus on self-service content management
- Prioritize discoverability (SEO) over new features

**Resource Requirements:**
- 1 developer (Tony - you!)
- Estimated effort: 2-4 focused work sessions
- No additional team members needed

**Complexity Assessment:** Simple MVP (lean scope, solo developer)

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Fan discovery journey (Emma) - SEO, fast loading, social sharing
- Industry evaluation journey (Lars) - Professional appearance, contact access
- Content editor journey (Marius/Tony) - CMS content updates

**Must-Have Capabilities:**

| Feature | Priority | Rationale |
|---------|----------|-----------|
| Headless CMS integration | Critical | Enables self-service content updates |
| SEO meta tags per page | Critical | Search discoverability |
| Open Graph tags | Critical | Social sharing appearance |
| shadcn/ui Button component | High | Visual consistency |
| shadcn/ui Card component | High | Band member cards, content cards |
| Environment variables | High | Security best practice |
| Remove Merch page | High | Clean up placeholder content |

**Explicitly Out of MVP Scope:**
- Press kit / EPK page
- Photo gallery
- News/updates section
- Form submission management in CMS
- Newsletter signup
- Multi-language support

### Post-MVP Features

**Phase 2 - Growth (After Launch):**
- Press kit / EPK page for industry contacts
- Photo gallery with CMS-managed images
- Enhanced contact form with CMS tracking
- Additional shadcn/ui components (NavigationMenu, Sheet for mobile)
- Micro-interactions and animations

**Phase 3 - Expansion (Future):**
- Shopify integration for merchandise
- Multi-language support (Norwegian/English)
- Fan newsletter signup with email provider
- News/blog section
- Analytics dashboard

### Risk Mitigation Strategy

**Technical Risks:**

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| CMS learning curve | Medium | Medium | Choose Sanity (good DX, free tier) |
| SEO impact of SPA | Medium | High | Implement proper meta tags, consider SSG later |
| shadcn/ui conflicts with existing styles | Low | Low | Migrate incrementally, keep CSS variables |

**Market Risks:**
- None significant - this is a promotional site, not a product

**Resource Risks:**

| Risk | Mitigation |
|------|------------|
| Limited time | Prioritize CMS + SEO first, shadcn/ui can be incremental |
| Scope creep | Stick to MVP list, defer "nice to haves" |

### Launch Criteria

**Ready to launch when:**
- [ ] CMS connected and content editable
- [ ] All pages have unique meta titles/descriptions
- [ ] Open Graph tags render correctly in social previews
- [ ] Core shadcn/ui components migrated
- [ ] Merch page removed/hidden
- [ ] Environment variables configured
- [ ] Deployed to production hosting

## Functional Requirements

The following capabilities define the complete feature set for the Vågal website MVP. Any capability not listed here will not exist in the final product.

### Content Management

- FR1: Band members can log into a CMS dashboard to manage site content
- FR2: Band members can edit hero section content (image, title, subtitle)
- FR3: Band members can edit individual band member profiles (photo, name, alias, instrument, bio)
- FR4: Band members can upload and manage images in a media library
- FR5: Band members can preview content changes before publishing
- FR6: Band members can publish content changes to the live site
- FR7: System displays CMS-managed content on the public website

### Public Website - Navigation & Layout

- FR8: Visitors can navigate between all site pages via header navigation
- FR9: Visitors can navigate between all site pages via footer navigation
- FR10: Visitors can access the site on mobile devices with a responsive layout
- FR11: Visitors can use a mobile-friendly navigation menu on small screens
- FR12: System displays the band logo in navigation areas

### Public Website - Home Page

- FR13: Visitors can view a hero section with band imagery
- FR14: Visitors can listen to music via an embedded Spotify player
- FR15: Visitors can watch videos via an embedded YouTube player
- FR16: Visitors can view upcoming concerts via a Bandsintown widget

### Public Website - Band Page

- FR17: Visitors can view profiles of all band members
- FR18: Visitors can see each member's photo, name, instrument, and details

### Public Website - Concerts Page

- FR19: Visitors can view a list of upcoming concerts
- FR20: Visitors can access concert details and ticket information via Bandsintown

### Public Website - Contact Page

- FR21: Visitors can submit a contact/booking inquiry via a form
- FR22: System sends form submissions to the band's email via Web3Forms
- FR23: Visitors receive confirmation after successful form submission

### SEO & Discoverability

- FR24: System generates unique meta title tags for each page
- FR25: System generates unique meta description tags for each page
- FR26: System generates Open Graph tags for social media sharing
- FR27: System generates Twitter Card tags for Twitter sharing
- FR28: System provides structured data (JSON-LD) for the band as an organization
- FR29: System generates a sitemap.xml file
- FR30: System provides a robots.txt file

### Site Administration

- FR31: Developers can configure API keys via environment variables
- FR32: System hides or removes the Merch page from navigation

## Non-Functional Requirements

### Performance

| Requirement | Target | Measurement |
|-------------|--------|-------------|
| NFR1: Page Load Time | < 3 seconds | Time to First Contentful Paint on 3G mobile |
| NFR2: Largest Contentful Paint | < 2.5 seconds | Core Web Vital |
| NFR3: First Input Delay | < 100ms | Core Web Vital |
| NFR4: Cumulative Layout Shift | < 0.1 | Core Web Vital |
| NFR5: Total Bundle Size | < 500KB gzipped | Build output |
| NFR6: Image Optimization | WebP with fallback | All hero and band member images |

### Accessibility

| Requirement | Target | Standard |
|-------------|--------|----------|
| NFR7: WCAG Compliance | Level AA | WCAG 2.1 |
| NFR8: Keyboard Navigation | Full site navigable | All interactive elements |
| NFR9: Color Contrast | 4.5:1 minimum | Text on backgrounds |
| NFR10: Screen Reader Support | All content readable | Semantic HTML + ARIA |
| NFR11: Focus Indicators | Visible on all elements | Interactive components |
| NFR12: Alt Text | All images described | Band photos, hero images |

### Integration

| Requirement | Target | Notes |
|-------------|--------|-------|
| NFR13: CMS Availability | 99.9% uptime | Sanity/Contentful SLA |
| NFR14: CMS Response Time | < 500ms API calls | Content fetch latency |
| NFR15: Widget Loading | Non-blocking | Spotify, YouTube, Bandsintown |
| NFR16: Form Submission | < 2 second confirmation | Web3Forms response |
| NFR17: Graceful Degradation | Site usable if widgets fail | Error boundaries |

### Browser Compatibility

| Requirement | Target |
|-------------|--------|
| NFR18: Modern Browsers | Last 2 versions of Chrome, Firefox, Safari, Edge |
| NFR19: Mobile Browsers | iOS Safari 14+, Chrome Android 10+ |
| NFR20: No IE Support | Internet Explorer explicitly unsupported |

### Hosting & Deployment

| Requirement | Target |
|-------------|--------|
| NFR21: Uptime | 99.9% availability |
| NFR22: SSL Certificate | All traffic over HTTPS |
| NFR23: CDN Distribution | Static assets served via CDN |
| NFR24: Deploy Time | < 5 minutes from push to live |
