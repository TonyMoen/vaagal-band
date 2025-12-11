---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - docs/prd.md
  - docs/architecture.md
  - docs/ux-design-specification.md
status: complete
completedAt: '2025-12-11'
project_name: vaagal-app
user_name: Tony-
---

# vaagal-app - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for vaagal-app, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: Band members can log into a CMS dashboard to manage site content
- FR2: Band members can edit hero section content (image, title, subtitle)
- FR3: Band members can edit individual band member profiles (photo, name, alias, instrument, bio)
- FR4: Band members can upload and manage images in a media library
- FR5: Band members can preview content changes before publishing
- FR6: Band members can publish content changes to the live site
- FR7: System displays CMS-managed content on the public website
- FR8: Visitors can navigate between all site pages via header navigation
- FR9: Visitors can navigate between all site pages via footer navigation
- FR10: Visitors can access the site on mobile devices with a responsive layout
- FR11: Visitors can use a mobile-friendly navigation menu on small screens
- FR12: System displays the band logo in navigation areas
- FR13: Visitors can view a hero section with band imagery
- FR14: Visitors can listen to music via an embedded Spotify player
- FR15: Visitors can watch videos via an embedded YouTube player
- FR16: Visitors can view upcoming concerts via a Bandsintown widget
- FR17: Visitors can view profiles of all band members
- FR18: Visitors can see each member's photo, name, instrument, and details
- FR19: Visitors can view a list of upcoming concerts
- FR20: Visitors can access concert details and ticket information via Bandsintown
- FR21: Visitors can submit a contact/booking inquiry via a form
- FR22: System sends form submissions to the band's email via Web3Forms
- FR23: Visitors receive confirmation after successful form submission
- FR24: System generates unique meta title tags for each page
- FR25: System generates unique meta description tags for each page
- FR26: System generates Open Graph tags for social media sharing
- FR27: System generates Twitter Card tags for Twitter sharing
- FR28: System provides structured data (JSON-LD) for the band as an organization
- FR29: System generates a sitemap.xml file
- FR30: System provides a robots.txt file
- FR31: Developers can configure API keys via environment variables
- FR32: System hides or removes the Merch page from navigation

### Non-Functional Requirements

- NFR1: Page Load Time < 3 seconds (Time to First Contentful Paint on 3G mobile)
- NFR2: Largest Contentful Paint < 2.5 seconds (Core Web Vital)
- NFR3: First Input Delay < 100ms (Core Web Vital)
- NFR4: Cumulative Layout Shift < 0.1 (Core Web Vital)
- NFR5: Total Bundle Size < 500KB gzipped
- NFR6: Image Optimization - WebP with fallback for all hero and band member images
- NFR7: WCAG Compliance Level AA (WCAG 2.1)
- NFR8: Keyboard Navigation - Full site navigable via keyboard
- NFR9: Color Contrast 4.5:1 minimum for text on backgrounds
- NFR10: Screen Reader Support - All content readable with semantic HTML + ARIA
- NFR11: Focus Indicators visible on all interactive elements
- NFR12: Alt Text for all images (band photos, hero images)
- NFR13: CMS Availability 99.9% uptime (Sanity SLA)
- NFR14: CMS Response Time < 500ms for API calls
- NFR15: Widget Loading - Non-blocking for Spotify, YouTube, Bandsintown
- NFR16: Form Submission confirmation < 2 seconds (Web3Forms response)
- NFR17: Graceful Degradation - Site usable if widgets fail (error boundaries)
- NFR18: Modern Browsers - Last 2 versions of Chrome, Firefox, Safari, Edge
- NFR19: Mobile Browsers - iOS Safari 14+, Chrome Android 10+
- NFR20: No IE Support - Internet Explorer explicitly unsupported
- NFR21: Uptime 99.9% availability
- NFR22: SSL Certificate - All traffic over HTTPS
- NFR23: CDN Distribution - Static assets served via CDN
- NFR24: Deploy Time < 5 minutes from push to live

### Additional Requirements

**From Architecture:**

- Brownfield project - no starter template needed, extending existing React 19 + Vite 7 + Tailwind CSS stack
- Sanity CMS integration with runtime client-side fetching pattern
- Install packages: @sanity/client, @sanity/image-url, react-helmet-async
- shadcn/ui component library initialization (Button, Card, NavigationMenu, Sheet, Input, Textarea)
- react-helmet-async for dynamic meta tags per route
- Per-widget error boundaries to isolate third-party widget failures
- Environment variables: VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, VITE_WEB3FORMS_KEY
- Vercel hosting with SPA fallback configuration
- Static sitemap.xml and robots.txt in public folder
- JSON-LD structured data (MusicGroup schema)
- New directory structure: src/hooks/, src/lib/sanity/, src/components/ui/, src/types/
- Files to create: .env.example, vercel.json, src/lib/sanity/client.ts, src/lib/sanity/queries.ts, src/lib/sanity/image.ts, src/types/sanity.ts, src/hooks/useHero.ts, src/hooks/useBandMembers.ts, src/components/LoadingSpinner.tsx, src/components/ErrorMessage.tsx, src/components/SEO.tsx, src/components/WidgetErrorBoundary.tsx
- Files to modify: src/pages/Hjem.tsx, src/pages/Bandet.tsx, src/pages/Konserter.tsx, src/pages/KontaktOss.tsx, src/components/Hero.tsx, src/components/BandMember.tsx, src/components/ContactForm.tsx, src/routes.tsx, src/components/NavBar.tsx, src/components/Footer.tsx
- Files to delete: src/pages/Merch.tsx, src/components/Products.tsx

**From UX Design:**

- Dark-only theme (no light/dark toggle needed)
- Barlow font family from Google Fonts (Condensed for impact headings, Regular for body/UI)
- Color palette: Background #0A0A0A, Secondary #1A1A1A, Tertiary #2A2A2A, Text Primary #F5F5F5, Text Secondary #A3A3A3, Accent Primary #E65C00, Accent Hover #FF6B00
- Full-bleed hero with massive typography (48-72px on mobile, up to 200px on desktop)
- Minimal design direction for Homepage, Concerts, Contact pages
- Split layout design for Band page (photo on one side, bio on other)
- Touch targets minimum 44x44px for mobile
- Mobile-first responsive design with breakpoints: 640px, 768px, 1024px, 1280px
- Skeleton loading states for widgets
- Toast notifications for form submission feedback
- Sheet component for mobile navigation drawer
- Rounded border-radius: sm (4px), md (8px), lg (12px)
- Spacing scale based on 4px unit: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 2 | CMS dashboard login (Sanity Studio) |
| FR2 | Epic 2 | Edit hero section content |
| FR3 | Epic 2 | Edit band member profiles |
| FR4 | Epic 2 | Upload and manage images |
| FR5 | Epic 2 | Preview content changes |
| FR6 | Epic 2 | Publish content changes |
| FR7 | Epic 2 | Display CMS-managed content |
| FR8 | Epic 4 | Header navigation |
| FR9 | Epic 4 | Footer navigation |
| FR10 | Epic 4 | Responsive mobile layout |
| FR11 | Epic 4 | Mobile navigation menu |
| FR12 | Epic 4 | Band logo in navigation |
| FR13 | Epic 2 | Hero section with CMS content |
| FR14 | Epic 5 | Spotify embed |
| FR15 | Epic 5 | YouTube embed |
| FR16 | Epic 5 | Bandsintown widget (homepage) |
| FR17 | Epic 2 | Band member profiles |
| FR18 | Epic 2 | Member details display |
| FR19 | Epic 5 | Concert listing |
| FR20 | Epic 5 | Concert details via Bandsintown |
| FR21 | Epic 6 | Contact form submission |
| FR22 | Epic 6 | Web3Forms email delivery |
| FR23 | Epic 6 | Submission confirmation |
| FR24 | Epic 3 | Meta title tags |
| FR25 | Epic 3 | Meta description tags |
| FR26 | Epic 3 | Open Graph tags |
| FR27 | Epic 3 | Twitter Card tags |
| FR28 | Epic 3 | JSON-LD structured data |
| FR29 | Epic 3 | Sitemap generation |
| FR30 | Epic 3 | robots.txt |
| FR31 | Epic 1 | Environment variables |
| FR32 | Epic 1 | Remove Merch page |

## Epic List

| Epic | Title | FRs | User Value |
|------|-------|-----|------------|
| 1 | Project Foundation & Cleanup | FR31, FR32 | Clean, configured foundation |
| 2 | Content Management System | FR1-FR7, FR13, FR17, FR18 | Self-service content updates |
| 3 | SEO & Discoverability | FR24-FR30 | Search visibility, social sharing |
| 4 | Navigation & Mobile Experience | FR8-FR12 | Professional responsive navigation |
| 5 | Widgets & External Integrations | FR14-FR16, FR19, FR20 | Reliable music/video/concert access |
| 6 | Contact & Booking Flow | FR21-FR23 | Easy booking inquiries |

---

## Epic 1: Project Foundation & Cleanup

**Goal:** Establish a clean, properly configured foundation by removing placeholder content, setting up environment variables, and initializing the design system components needed for all subsequent work.

**User Value:** Site is clean without placeholder content, properly configured for development, with shared components ready for use.

**FRs Covered:** FR31, FR32

### Story 1.1: Environment Variables Setup

As a **developer**,
I want **API keys and configuration stored in environment variables**,
So that **secrets are not committed to the repository and configuration can differ between environments**.

**Acceptance Criteria:**

**Given** the project has hardcoded API keys
**When** I create the environment variable structure
**Then** a `.env.example` file exists with documented placeholders for:
- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_WEB3FORMS_KEY`
**And** `.env` is added to `.gitignore` if not already present
**And** the existing Web3Forms key in ContactForm.tsx is replaced with `import.meta.env.VITE_WEB3FORMS_KEY`

---

### Story 1.2: Remove Merch Page and Related Code

As a **visitor**,
I want **the placeholder Merch page removed**,
So that **I don't encounter incomplete functionality**.

**Acceptance Criteria:**

**Given** the Merch page exists as a placeholder
**When** I remove the Merch functionality
**Then** `src/pages/Merch.tsx` is deleted
**And** `src/components/Products.tsx` is deleted (if it exists)
**And** the Merch route is removed from `src/routes.tsx`
**And** the Merch link is removed from `src/components/NavBar.tsx`
**And** the Merch link is removed from `src/components/Footer.tsx`
**And** no console errors occur when navigating the site
**And** visiting `/merch` redirects to 404 or home page

---

### Story 1.3: Initialize shadcn/ui Design System

As a **developer**,
I want **shadcn/ui initialized with the project's dark theme and brand colors**,
So that **consistent, accessible UI components are available for all subsequent work**.

**Acceptance Criteria:**

**Given** the project uses Tailwind CSS
**When** I initialize shadcn/ui
**Then** `components.json` is created with correct configuration
**And** `src/lib/utils.ts` is created with the `cn` utility function
**And** `src/components/ui/` directory is created
**And** CSS variables are configured for dark theme:
- Background: #0A0A0A
- Secondary: #1A1A1A
- Text Primary: #F5F5F5
- Accent: #E65C00
**And** Barlow font is configured in the project (if not already)
**And** the project builds without errors

---

### Story 1.4: Create Shared Utility Components

As a **developer**,
I want **reusable loading, error, and error boundary components**,
So that **all pages have consistent loading and error states**.

**Acceptance Criteria:**

**Given** shadcn/ui is initialized
**When** I create the shared utility components
**Then** `src/components/LoadingSpinner.tsx` exists with:
- A centered spinner animation
- Optional size prop (sm, md, lg)
- Proper accessibility attributes
**And** `src/components/ErrorMessage.tsx` exists with:
- Error message display
- Optional retry callback prop
- Styled consistently with dark theme
**And** `src/components/WidgetErrorBoundary.tsx` exists with:
- React error boundary implementation
- Fallback UI showing widget name and "unavailable" message
- Link to the original platform as alternative
**And** all components are exported and usable

---

## Epic 2: Content Management System

**Goal:** Enable band members to manage hero images and band member profiles through a CMS dashboard, eliminating developer dependency for routine content updates.

**User Value:** Band members can update hero section and band profiles without developer help. Changes go live within minutes with preview capability.

**FRs Covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR13, FR17, FR18

### Story 2.1: Initialize Sanity CMS Project

As a **band member**,
I want **a content management system set up for the website**,
So that **I have a dashboard where I can manage content**.

**Acceptance Criteria:**

**Given** the project needs CMS capabilities
**When** I initialize Sanity CMS
**Then** a Sanity project is created and configured
**And** `@sanity/client` and `@sanity/image-url` packages are installed
**And** `src/lib/sanity/client.ts` exists with:
- Sanity client configured using environment variables
- `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` used
**And** `src/lib/sanity/image.ts` exists with image URL builder utility
**And** the Sanity Studio is accessible for content management (FR1)

---

### Story 2.2: Create Hero Content Schema and Integration

As a **band member**,
I want **to edit the homepage hero section content**,
So that **I can update the hero image and text without developer help**.

**Acceptance Criteria:**

**Given** Sanity CMS is initialized
**When** I create the hero content schema and integration
**Then** a `hero` document type exists in Sanity with fields:
- `image` (image with hotspot)
- `title` (string)
- `subtitle` (string)
**And** `src/lib/sanity/queries.ts` includes a GROQ query for hero content
**And** `src/types/sanity.ts` includes `HeroContent` TypeScript interface
**And** `src/hooks/useHero.ts` exists with:
- Fetch hero content from Sanity
- Loading, error, and data states
- Standard hook pattern from Architecture
**And** `src/components/Hero.tsx` is modified to:
- Accept props from CMS OR use hook directly
- Display loading state while fetching
- Display error state if fetch fails
- Render CMS content when available (FR7, FR13)
**And** band members can edit hero content in Sanity Studio (FR2)
**And** changes are visible on the site after publishing (FR6)

---

### Story 2.3: Create Band Member Content Schema

As a **band member**,
I want **to manage band member profiles in the CMS**,
So that **I can update photos, bios, and details without developer help**.

**Acceptance Criteria:**

**Given** Sanity CMS is initialized
**When** I create the band member schema
**Then** a `bandMember` document type exists in Sanity with fields:
- `name` (string, required)
- `alias` (string)
- `instrument` (string)
- `bio` (text/block content)
- `image` (image with hotspot)
- `order` (number for sorting)
**And** `src/lib/sanity/queries.ts` includes a GROQ query for band members (sorted by order)
**And** `src/types/sanity.ts` includes `BandMember` TypeScript interface
**And** band members can create/edit profiles in Sanity Studio (FR3)
**And** band members can upload profile photos (FR4)

---

### Story 2.4: Integrate Band Members with Frontend

As a **visitor**,
I want **to see band member profiles powered by the CMS**,
So that **I always see the latest information about each member**.

**Acceptance Criteria:**

**Given** the band member schema exists in Sanity
**When** I integrate band members with the frontend
**Then** `src/hooks/useBandMembers.ts` exists with:
- Fetch all band members from Sanity
- Loading, error, and data states
- Standard hook pattern from Architecture
**And** `src/components/BandMember.tsx` is modified to:
- Accept band member data as props
- Display Sanity image using image URL builder
- Handle missing optional fields gracefully
**And** `src/pages/Bandet.tsx` is modified to:
- Use `useBandMembers` hook
- Display loading spinner while fetching
- Display error message if fetch fails
- Render all band members when data loads (FR17, FR18)
**And** CMS changes reflect on the site after publishing (FR7)

---

### Story 2.5: Content Preview Capability

As a **band member**,
I want **to preview content changes before publishing**,
So that **I can verify changes look correct on the site**.

**Acceptance Criteria:**

**Given** Sanity CMS is integrated with the frontend
**When** I configure preview capability
**Then** Sanity Studio has a preview pane or link configured
**And** draft content can be previewed before publishing (FR5)
**And** the preview shows how content will appear on the live site
**And** published content appears on the live site within 2 minutes (FR6)

---

## Epic 3: SEO & Discoverability

**Goal:** Make Vågal discoverable through search engines and ensure social shares display professional previews with proper metadata.

**User Value:** Fans find Vågal via Google search. Social media shares show compelling previews that encourage click-through.

**FRs Covered:** FR24, FR25, FR26, FR27, FR28, FR29, FR30

### Story 3.1: SEO Component with Meta Tags

As a **fan searching for Vågal**,
I want **the website to have proper meta tags**,
So that **I can find the band through search engines**.

**Acceptance Criteria:**

**Given** the site needs SEO optimization
**When** I implement the SEO component
**Then** `react-helmet-async` package is installed
**And** `HelmetProvider` wraps the app in the root component
**And** `src/components/SEO.tsx` exists with props for:
- `title` (string)
- `description` (string)
- `image` (optional string for OG image)
- `url` (optional string for canonical)
**And** the component renders:
- `<title>` tag with page title and site name (FR24)
- `<meta name="description">` tag (FR25)
- Canonical URL link tag
**And** each page uses the SEO component with unique title/description

---

### Story 3.2: Open Graph and Twitter Card Tags

As a **fan sharing the website on social media**,
I want **links to display professional previews**,
So that **my friends see compelling images and descriptions when I share**.

**Acceptance Criteria:**

**Given** the SEO component exists
**When** I add social sharing meta tags
**Then** the SEO component renders Open Graph tags (FR26):
- `og:title`
- `og:description`
- `og:image`
- `og:url`
- `og:type` (website)
- `og:site_name` (Vågal)
**And** the SEO component renders Twitter Card tags (FR27):
- `twitter:card` (summary_large_image)
- `twitter:title`
- `twitter:description`
- `twitter:image`
**And** social media preview tools show correct preview for each page
**And** default OG image is set for pages without specific images

---

### Story 3.3: Structured Data (JSON-LD)

As a **search engine**,
I want **structured data about the band**,
So that **I can display rich results and understand the content**.

**Acceptance Criteria:**

**Given** the site represents a music band
**When** I implement structured data
**Then** JSON-LD script is added to the homepage with MusicGroup schema (FR28):
- `@type`: "MusicGroup"
- `name`: "Vågal"
- `description`: Band description
- `url`: Website URL
- `genre`: "Bygderock"
- `sameAs`: Links to Spotify, YouTube, social profiles
**And** the JSON-LD is valid according to Google's Rich Results Test
**And** the structured data is rendered in the page source

---

### Story 3.4: Sitemap and Robots.txt

As a **search engine crawler**,
I want **a sitemap and robots.txt file**,
So that **I can efficiently discover and index all pages**.

**Acceptance Criteria:**

**Given** the site needs search engine optimization
**When** I create sitemap and robots.txt
**Then** `public/sitemap.xml` exists with (FR29):
- All public pages listed (/, /bandet, /konserter, /kontakt)
- Correct lastmod dates
- Priority values set appropriately
**And** `public/robots.txt` exists with (FR30):
- `User-agent: *`
- `Allow: /`
- `Sitemap:` pointing to sitemap.xml URL
**And** both files are accessible at their standard URLs
**And** no sensitive routes are accidentally exposed

---

## Epic 4: Navigation & Mobile Experience

**Goal:** Deliver a professional, responsive navigation experience that works seamlessly across all devices with mobile-first design.

**User Value:** Visitors can navigate the site effortlessly on any device. Mobile users get a native-feeling experience.

**FRs Covered:** FR8, FR9, FR10, FR11, FR12

### Story 4.1: Desktop Navigation with shadcn/ui

As a **visitor on desktop**,
I want **clear, professional header navigation**,
So that **I can easily access all sections of the site**.

**Acceptance Criteria:**

**Given** shadcn/ui is initialized
**When** I implement desktop navigation
**Then** shadcn/ui NavigationMenu component is added to the project
**And** `src/components/NavBar.tsx` is updated to use NavigationMenu
**And** navigation includes links to: Hjem, Bandet, Konserter, Kontakt (FR8)
**And** the band logo is displayed in the navigation area (FR12)
**And** logo links to homepage
**And** navigation is styled with dark theme and orange accent on hover
**And** navigation is visible on screens >= 768px
**And** keyboard navigation works correctly (tab through links)

---

### Story 4.2: Mobile Navigation Drawer

As a **visitor on mobile**,
I want **a mobile-friendly navigation menu**,
So that **I can navigate the site easily on my phone**.

**Acceptance Criteria:**

**Given** desktop navigation exists
**When** I implement mobile navigation
**Then** shadcn/ui Sheet component is added to the project
**And** a hamburger menu button appears on screens < 768px
**And** tapping the hamburger opens a Sheet drawer from the right (FR11)
**And** the drawer contains all navigation links (FR8)
**And** each link has touch targets >= 44x44px
**And** tapping a link closes the drawer and navigates
**And** the drawer can be closed by tapping outside or X button
**And** the band logo remains visible in mobile header (FR12)

---

### Story 4.3: Footer Navigation

As a **visitor**,
I want **navigation links in the footer**,
So that **I can navigate from the bottom of any page**.

**Acceptance Criteria:**

**Given** header navigation is complete
**When** I implement footer navigation
**Then** `src/components/Footer.tsx` includes navigation links (FR9):
- Links to: Hjem, Bandet, Konserter, Kontakt
**And** footer includes social media links (Spotify, YouTube, etc.)
**And** footer displays copyright information
**And** footer is styled consistently with dark theme
**And** links have visible hover states (orange accent)
**And** footer is responsive across all breakpoints

---

### Story 4.4: Responsive Layout Polish

As a **visitor on any device**,
I want **the site to look great and work well**,
So that **I have a professional experience regardless of screen size**.

**Acceptance Criteria:**

**Given** navigation is implemented
**When** I polish responsive layouts
**Then** all pages respond correctly at breakpoints: 640px, 768px, 1024px, 1280px (FR10)
**And** no horizontal scrolling occurs on any viewport
**And** content is readable on minimum 320px width
**And** all interactive elements have >= 44x44px touch targets on mobile
**And** spacing adjusts appropriately between mobile and desktop
**And** images scale properly without distortion
**And** the site passes Google Mobile-Friendly Test

---

## Epic 5: Widgets & External Integrations

**Goal:** Ensure third-party integrations (Spotify, YouTube, Bandsintown) work reliably with graceful fallbacks when services are unavailable.

**User Value:** Fans can reliably access music, videos, and concert information. Widget failures don't break the page experience.

**FRs Covered:** FR14, FR15, FR16, FR19, FR20

### Story 5.1: Spotify Widget with Error Handling

As a **fan**,
I want **to listen to Vågal's music via an embedded Spotify player**,
So that **I can preview their songs without leaving the site**.

**Acceptance Criteria:**

**Given** the homepage has a music section
**When** I implement the Spotify widget with error handling
**Then** `src/components/SpotifyWidget.tsx` is wrapped in WidgetErrorBoundary
**And** a skeleton loading state displays while the embed loads
**And** the Spotify embed loads non-blocking (doesn't delay page render) (FR14)
**And** if Spotify fails to load, a fallback displays:
- Message: "Spotify unavailable"
- Direct link to Vågal's Spotify profile
**And** the widget is responsive across all breakpoints
**And** the widget has appropriate ARIA labels for accessibility

---

### Story 5.2: YouTube Widget with Error Handling

As a **fan**,
I want **to watch Vågal's videos via an embedded YouTube player**,
So that **I can see their music videos and live performances**.

**Acceptance Criteria:**

**Given** the homepage has a video section
**When** I implement the YouTube widget with error handling
**Then** `src/components/YoutubeWidget.tsx` is wrapped in WidgetErrorBoundary
**And** a skeleton loading state displays while the embed loads
**And** the YouTube embed loads non-blocking (doesn't delay page render) (FR15)
**And** if YouTube fails to load, a fallback displays:
- Message: "YouTube unavailable"
- Direct link to Vågal's YouTube channel
**And** the widget maintains 16:9 aspect ratio responsively
**And** the widget has appropriate ARIA labels for accessibility

---

### Story 5.3: Bandsintown Homepage Widget

As a **fan on the homepage**,
I want **to see upcoming concert dates**,
So that **I can quickly check if Vågal is playing near me**.

**Acceptance Criteria:**

**Given** the homepage has a concerts section
**When** I implement the Bandsintown homepage widget
**Then** `src/components/BandsintownWidget.tsx` is wrapped in WidgetErrorBoundary
**And** a skeleton loading state displays while the widget loads
**And** the widget loads non-blocking (doesn't delay page render) (FR16)
**And** upcoming concerts display with date, venue, and location
**And** if Bandsintown fails to load, a fallback displays:
- Message: "Concert listings unavailable"
- Direct link to Vågal's Bandsintown page
**And** the widget is styled consistently with dark theme

---

### Story 5.4: Concerts Page with Full Listing

As a **fan**,
I want **a dedicated page showing all upcoming concerts**,
So that **I can see the full tour schedule and get tickets**.

**Acceptance Criteria:**

**Given** the Bandsintown widget exists
**When** I implement the concerts page
**Then** `src/pages/Konserter.tsx` displays a full concert listing (FR19)
**And** each concert shows: date, venue, city, and ticket link (FR20)
**And** the page uses SEO component with appropriate meta tags
**And** if no upcoming concerts exist, a friendly message displays:
- "Ingen kommende konserter akkurat nå"
- "Følg oss for oppdateringer" with social links
**And** ticket links open in new tab with proper rel attributes
**And** the listing is responsive and readable on mobile

---

## Epic 6: Contact & Booking Flow

**Goal:** Provide industry professionals with a polished, reliable way to submit booking inquiries with clear feedback.

**User Value:** Promoters and bookers can easily contact the band. Clear confirmation builds confidence that the message was received.

**FRs Covered:** FR21, FR22, FR23

### Story 6.1: Contact Form with shadcn/ui Components

As a **promoter or booker**,
I want **a professional contact form**,
So that **I can submit booking inquiries easily**.

**Acceptance Criteria:**

**Given** the contact page exists
**When** I implement the contact form with shadcn/ui
**Then** shadcn/ui Input, Textarea, and Button components are added to the project
**And** `src/components/ContactForm.tsx` is updated to use shadcn/ui components
**And** the form includes fields (FR21):
- Name (required)
- Email (required, validated)
- Subject dropdown (Booking, Press, General)
- Message (required, textarea)
**And** the form is styled with dark theme and orange accent
**And** all form fields have visible focus states
**And** the form is fully keyboard accessible
**And** touch targets are >= 44x44px on mobile

---

### Story 6.2: Form Validation and Error Handling

As a **user filling out the contact form**,
I want **clear validation feedback**,
So that **I know what needs to be corrected before submitting**.

**Acceptance Criteria:**

**Given** the contact form exists
**When** I implement form validation
**Then** inline validation occurs on field blur
**And** required fields show error if empty: "Dette feltet er påkrevd"
**And** email field validates format: "Ugyldig e-postadresse"
**And** error messages appear below the field in red
**And** invalid fields have orange/red border highlight
**And** submit button is disabled until form is valid
**And** validation errors are announced to screen readers

---

### Story 6.3: Form Submission with Feedback

As a **user submitting a booking inquiry**,
I want **clear confirmation that my message was sent**,
So that **I know my inquiry was received**.

**Acceptance Criteria:**

**Given** the contact form is valid
**When** I submit the form
**Then** form submits to Web3Forms using environment variable key (FR22)
**And** submit button shows loading state during submission
**And** on success (FR23):
- Toast notification displays: "Melding sendt!"
- Form fields are cleared
- Success message persists for 5 seconds
**And** on error:
- Toast notification displays: "Noe gikk galt. Prøv igjen."
- Form data is preserved
- User can retry submission
**And** submission completes within 2 seconds (NFR16)
