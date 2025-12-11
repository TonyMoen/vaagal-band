---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments:
  - docs/prd.md
workflowType: 'ux-design'
lastStep: 14
project_name: 'vaagal-app'
user_name: 'Tony-'
date: '2025-12-11'
status: complete
---

# UX Design Specification vaagal-app

**Author:** Tony-
**Date:** 2025-12-11

---

## Executive Summary

### Project Vision

Vågal Band Website is a promotional SPA for the Norwegian band "Vågal" that transforms their current static site into a polished, CMS-driven, and SEO-optimized web presence. The goal is to enable self-service content management while presenting a professional, authentic brand experience that serves both fans discovering the band and industry professionals evaluating them for bookings.

### Target Users

**Primary: Fans**
- Curious listeners discovering Vågal through Shazam, radio, or word-of-mouth
- Goals: Find music (Spotify), watch videos (YouTube), check concert dates, learn about band members
- Context: Often on mobile, potentially at venues or social settings
- Success: Can quickly access content and confidently share the site with friends

**Secondary: Industry Professionals**
- Festival bookers, venue managers, promoters evaluating the band
- Goals: Assess professionalism, find contact info, submit booking inquiries
- Context: Desktop or mobile, task-oriented research mode
- Success: Contact info within 2 clicks, professional impression that builds confidence

**Tertiary: Band Members (Content Editors)**
- Vågal members managing their own content
- Goals: Update hero images, band profiles, and site content without developer help
- Context: Desktop CMS access, occasional updates
- Success: Changes published in under 5 minutes with preview capability

### Key Design Challenges

1. **Dual Audience Navigation** - Balancing emotional fan discovery with task-oriented industry professional needs requires clear information architecture that serves both mental models without compromise.

2. **Mobile-First Performance** - Fans often discover bands in live music contexts with variable connectivity. The design must prioritize fast loading (<3s), touch-friendly interactions (44x44px targets), and graceful degradation.

3. **Widget Integration UX** - Third-party embeds (Bandsintown, Spotify, YouTube) must feel native to the design while loading non-blocking and handling failures gracefully through error boundaries.

4. **CMS Content Flexibility** - The design system must accommodate variable content from CMS (different text lengths, image aspect ratios, empty states) without breaking visual consistency.

### Design Opportunities

1. **Hero Impact** - The hero section is the band's digital first impression. A powerful, on-brand hero can immediately communicate Vågal's energy and differentiate from generic band sites.

2. **Streamlined Industry Path** - Clear, fast access to contact/booking (within 2 clicks) can increase booking inquiries by reducing friction for busy industry professionals.

3. **Social Sharing Excellence** - Proper Open Graph implementation transforms every fan share into a compelling marketing moment with professional previews that encourage click-through.

## Core User Experience

### Defining Experience

The Vågal website experience centers on **immediate impact and effortless discovery**. Within seconds of landing, visitors should feel the band's energy and know exactly where to go next. The site serves as a digital stage - professional enough for industry evaluation, authentic enough for fan connection.

**Core User Actions by Audience:**
- **Fans:** Discover → Engage → Share (hero impression leads to Spotify follow or concert attendance)
- **Industry:** Evaluate → Contact (professional impression leads to booking inquiry)
- **Band Members:** Update content (self-service empowers ongoing management)

The primary user flow is the hero-to-engagement path: visitors land on a compelling hero, immediately understand who Vågal is, and within one tap access music, concerts, or contact information.

### Platform Strategy

**Primary Platform:** Web (Single Page Application)
- React 19 + Vite architecture
- Mobile-first responsive design (320px minimum)
- Touch-optimized for fan discovery contexts
- Desktop-capable for industry research and CMS management

**Platform Priorities:**
1. Mobile web (fans discovering at venues, social contexts)
2. Desktop web (industry professionals, band content management)
3. No native app required - web meets all use cases

**Technical Constraints:**
- SPA architecture (client-side rendering)
- Third-party widget integration (Spotify, YouTube, Bandsintown)
- Headless CMS for content management
- Static hosting deployment

### Effortless Interactions

**Must Be Effortless:**
- Finding concert dates (visible on homepage or 1 click)
- Playing music (Spotify widget immediately accessible)
- Contacting for bookings (clear path, simple form)
- Sharing the site (beautiful Open Graph previews)
- Navigating on mobile (thumb-friendly, no hunting)

**Automatic Behaviors:**
- Responsive layout adaptation
- Image optimization and lazy loading
- Widget graceful degradation if services fail
- SEO meta tag generation per page

**Friction Elimination:**
- No pagination for concert lists (scroll-based)
- No modal interruptions for primary content
- No required sign-up or account creation
- Minimal form fields for contact

### Critical Success Moments

| Moment | Success Criteria |
|--------|-----------------|
| **First 5 seconds** | Visitor feels "this band looks professional and interesting" |
| **Music discovery** | Spotify player visible, one tap to play |
| **Concert check** | Dates visible on homepage or 1 click away |
| **Industry contact** | Contact page within 2 clicks, clear booking form |
| **Social share** | Beautiful Open Graph preview with band imagery |
| **Content update** | Band member changes live in under 5 minutes |

**Make-or-Break Flows:**
1. Hero → Engagement (fan retention)
2. Landing → Contact (industry conversion)
3. CMS → Live site (content management confidence)

### Experience Principles

1. **Impact in Seconds** - The hero must immediately communicate Vågal's energy and professionalism. No slow reveals, no generic stock imagery. First impression is everything.

2. **One-Tap Access** - Core actions (play music, check concerts, contact) should never be more than one tap/click away from any page. Navigation should feel instant.

3. **Mobile-Native Feel** - Touch targets (44x44px minimum), fast loading (<3s), and layout must feel native to mobile even as a web application.

4. **Graceful Integration** - Third-party widgets (Spotify, YouTube, Bandsintown) should feel like part of the design, not bolted-on embeds. Failures degrade gracefully.

5. **Self-Service Empowerment** - Band members should feel confident updating content without fear of breaking the site. Preview before publish, clear feedback on changes.

## Desired Emotional Response

### Primary Emotional Goals

**For Fans:**
- **Primary:** Intrigued and Excited - "These guys seem cool, I want to know more"
- **Supporting:** Connected, entertained, eager to share

**For Industry Professionals:**
- **Primary:** Confident and Impressed - "This is a professional act I can work with"
- **Supporting:** Efficient, informed, trusting

**For Band Members:**
- **Primary:** Proud - "This represents who we are"
- **Supporting:** Empowered, in control of their brand

**Universal Emotional Goals:**
- **Authenticity** - The site feels like the real Vågal, not a generic band template
- **Energy** - The design captures the band's vibe and personality
- **Trust** - Professional enough to take seriously

### Emotional Journey Mapping

| Stage | Fan Emotion | Industry Emotion | Design Implication |
|-------|-------------|------------------|-------------------|
| **First Landing** | Curious → Intrigued | Evaluating → Impressed | Hero must captivate instantly |
| **Exploring** | Engaged → Connected | Informed → Confident | Clear navigation, quality content |
| **Core Action** | Excited (play music) | Efficient (find contact) | One-tap access to key actions |
| **Completion** | Satisfied → Want more | Trusting → Ready to reach out | Clear next steps, easy sharing |
| **If Error Occurs** | Patient → Understanding | Reassured | Graceful fallbacks, friendly messaging |

### Micro-Emotions

**Emotions to Cultivate:**

| Desired State | How to Achieve |
|---------------|----------------|
| **Confidence** | Clear hierarchy, obvious CTAs, consistent patterns |
| **Trust** | Professional polish, working widgets, no broken elements |
| **Excitement** | Dynamic imagery, band energy, music accessible |
| **Accomplishment** | Fast load times, instant feedback, easy tasks |
| **Belonging** | Authentic band personality, genuine voice |

**Emotions to Avoid:**

| Negative State | Prevention Strategy |
|----------------|---------------------|
| Confusion | Clear navigation, obvious information architecture |
| Skepticism | Professional design, quality imagery, working integrations |
| Boredom | Dynamic visuals, band personality, engaging content |
| Frustration | Fast performance, graceful error handling, minimal friction |
| Isolation | Authentic voice, band personality visible throughout |

### Design Implications

**Emotion-Design Connections:**

1. **Intrigued** → Bold hero imagery with band personality visible immediately. No generic stock photos.

2. **Confident** → Consistent design system (shadcn/ui), no broken elements, clear typography hierarchy.

3. **Excited** → Music accessible instantly via Spotify widget, concert dates prominent and easy to find.

4. **Impressed** → Professional polish throughout, fast performance (<3s load), smooth interactions.

5. **Authentic** → Real band photos, genuine voice in copy, Norwegian character reflected in design.

### Emotional Design Principles

1. **Personality Over Polish** - Better to feel authentically Vågal than generically professional. The band's energy should come through even if it means breaking conventional "safe" design choices.

2. **Confidence Through Consistency** - Every interaction should feel predictable and reliable. Users should never wonder "did that work?" or "where am I?"

3. **Excitement Without Overwhelm** - Create energy through imagery and content, not through animations, popups, or attention-grabbing gimmicks.

4. **Trust Through Performance** - Nothing builds trust like a fast, working website. Every millisecond of load time and every broken widget erodes confidence.

5. **Pride of Ownership** - The band should feel excited to share this site. If they're not proud of it, the emotional design has failed.

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**1. Spotify Artist Pages**
- **What works:** Hero image dominates, music playable instantly, clear visual hierarchy
- **Key pattern:** Content-first approach - the music IS the navigation
- **Transferable:** Prominent audio access, artist imagery as hero

**2. Bandsintown**
- **What works:** Concert dates scannable at a glance, location-aware, easy ticket access
- **Key pattern:** Date + Venue + Action in a single scannable row
- **Transferable:** Concert widget integration, clear event formatting

**3. Successful Indie Band Sites (Kaleo, Aurora, Sigrid)**
- **What works:** Full-bleed hero imagery, minimal navigation, strong visual identity
- **Key pattern:** Let the imagery tell the story, navigation doesn't compete
- **Transferable:** Bold hero, simplified nav, authentic photography

**4. Linktree / Bio Link Pages**
- **What works:** Mobile-first, one-tap access to everything, no friction
- **Key pattern:** Everything important visible without scrolling
- **Transferable:** Key actions (music, concerts, contact) immediately accessible

### Transferable UX Patterns

| Pattern | Source | Application for Vågal |
|---------|--------|----------------------|
| **Full-bleed hero** | Artist sites | Hero section with band energy, no margins |
| **Floating nav** | Modern SPAs | Navigation doesn't compete with content |
| **Card-based profiles** | Social/portfolio sites | Band member cards with consistent layout |
| **Embedded players** | Spotify/YouTube | Native-feeling music and video widgets |
| **Scannable event lists** | Bandsintown | Date + Venue + CTA in single row |
| **Sticky contact CTA** | Portfolio sites | Contact always accessible for industry |

### Anti-Patterns to Avoid

| Anti-Pattern | Why It Fails | Prevention |
|--------------|--------------|------------|
| **Auto-playing audio** | Jarring, causes immediate bounce | User-initiated playback only |
| **Cluttered homepage** | Overwhelms, dilutes impact | Focused hero, clear hierarchy |
| **Hidden contact info** | Industry users leave frustrated | Contact in nav, footer, dedicated page |
| **Slow-loading images** | Kills mobile experience | Optimized images, lazy loading |
| **Generic stock imagery** | Feels inauthentic, forgettable | Real band photos only |
| **Broken widget fallbacks** | Erodes trust | Graceful degradation with messaging |

### Design Inspiration Strategy

**What to Adopt:**
- Full-bleed hero imagery (captures energy immediately)
- One-tap access to music (Spotify widget prominent)
- Scannable concert list format (Bandsintown pattern)
- Card-based band member profiles (consistent, CMS-friendly)

**What to Adapt:**
- Floating navigation (simplified for 4-5 pages max)
- Social proof patterns (adapt for band context - press quotes, venue logos)
- Mobile-first layout (optimize for fan discovery context)

**What to Avoid:**
- Auto-play anything (respect user control)
- Complex navigation (this isn't a large site)
- Generic templates (authenticity is key)
- Heavy animations (performance over flash)

## Design System Foundation

### Design System Choice

**Selected:** shadcn/ui with Tailwind CSS

shadcn/ui is a collection of re-usable components built with Radix UI and Tailwind CSS. Components are copied directly into your codebase, giving you full ownership and customization control.

### Rationale for Selection

1. **Tailwind-Native** - Already using Tailwind CSS in the existing codebase. Zero additional styling systems, no runtime overhead, seamless integration.

2. **Copy-Paste Architecture** - Components are owned, not installed. Full control over every component with no version lock-in or breaking dependency updates.

3. **Accessibility Built-In** - Built on Radix UI primitives with WCAG 2.1 AA compliance, keyboard navigation, and screen reader support out of the box.

4. **Solo Developer Friendly** - Copy what you need, skip what you don't. Well-documented with active community support.

5. **High Customizability** - CSS variables enable easy brand theming. Perfect for the unique Vågal aesthetic.

### Brand Identity Direction

**Core Aesthetic:**
- **Rural "bygdeband"** - Norwegian countryside authenticity with party energy
- **Street culture influence** - Vintage cars, Mercedes, veteran vehicles
- **Dark & bold** - Dark backgrounds with high-contrast orange accents

**Visual Mood:**
- Dusty country roads at night
- Vintage Mercedes headlights cutting through darkness
- Orange sunset over rural Norway
- Garage/workshop aesthetic with warm lighting

### Implementation Approach

**Core Components to Implement:**

| Component | Use Case | Priority |
|-----------|----------|----------|
| **Button** | CTAs, form submissions, navigation actions | MVP |
| **Card** | Band member profiles, content sections | MVP |
| **NavigationMenu** | Header navigation (desktop) | MVP |
| **Sheet** | Mobile menu drawer | MVP |
| **Input/Textarea** | Contact form fields | MVP |
| **Skeleton** | Loading states for widgets | MVP |

**Custom Components (Not in shadcn/ui):**
- Hero section with full-bleed imagery
- Widget containers for Spotify/YouTube/Bandsintown embeds
- Band member profile card layout
- Concert event list item

### Customization Strategy

**1. Color Mode**
- **Dark only** - No light/dark toggle needed
- Deep dark backgrounds (near-black, dark grays)
- Orange accent color for contrast, energy, and warmth
- Ensure WCAG AA contrast ratios maintained

**2. Orange Accent Palette**
Explore spectrum from vintage to energetic:
- Burnt Orange (#CC5500) - Vintage, warm, classic car aesthetic
- Electric Orange (#FF6600) - Bold, party energy for CTAs
- Amber tones for subtle accents and highlights

**3. Border Radius & Shape Language**
- **Rounded aesthetics throughout** - Soft, approachable feel
- Consistent border-radius on cards, buttons, inputs
- Rounded imagery treatments where appropriate

**4. Responsive Design**
- Mobile-first component variants
- Touch-friendly sizing (44x44px minimum targets)
- Simplified navigation for small screens
- Images optimized for all viewport sizes

## Defining User Experience

### Defining Experience

**Core Experience Statement:**
> "Land → Feel the energy → Engage"

The moment a visitor lands on the site and within 5 seconds thinks: "These guys look interesting, I want to hear them" — then immediately can.

The hero section is the digital equivalent of the band walking on stage. If the hero captures Vågal's energy and makes visitors want to know more, everything else follows.

| User | Defining Moment | Success Looks Like |
|------|-----------------|-------------------|
| **Fan** | Hero → "Who are these guys?" → Play music | Taps Spotify within 10 seconds |
| **Industry** | Hero → "They look professional" → Find contact | Reaches contact page in 2 clicks |

### User Mental Model

**How users approach band websites:**

| User | Mental Model | Expectation |
|------|--------------|-------------|
| **Fan** | "Show me who they are" | Visual identity first, then music/content |
| **Industry** | "Are they professional?" | Quick evaluation, then contact path |

**Current solutions users know:**
- Spotify artist pages (music-first)
- Instagram profiles (visual-first)
- Linktree (action-first)

**Vågal opportunity:** Combine visual impact (Instagram) with instant music access (Spotify) in a professional wrapper.

### Success Criteria

| Criteria | Measurement |
|----------|-------------|
| **Instant Impact** | Hero loads in <2s, captures attention |
| **Clear Identity** | Visitor knows "bygderock band from Norway" within 5s |
| **Obvious Next Step** | Primary CTA visible without scrolling |
| **Energy Transfer** | Visitor feels the party/energy vibe |
| **Trust Signal** | Professional enough that industry takes them seriously |

### UX Patterns

**Established patterns adopted:**
- Full-bleed hero imagery (proven for artists)
- Floating/minimal navigation (doesn't compete with content)
- Card-based content sections (familiar, scannable)
- Embedded widgets (Spotify, YouTube - users already know these)

**Vågal's unique twist:**
- Dark + orange aesthetic (vintage car meets party energy)
- Rural authenticity (not trying to be slick city band)
- Immediate engagement options visible in hero area

### Experience Mechanics

**1. Initiation (Landing)**
- Full-bleed hero image loads instantly
- Band name/tagline visible
- Navigation subtle but accessible

**2. Interaction (First 5 seconds)**
- Eye drawn to hero imagery (band energy)
- Quick scan reveals: music, concerts, contact options
- No decisions required - just absorb

**3. Feedback (Engagement)**
- Hover states on CTAs confirm interactivity
- Spotify widget responds immediately
- Navigation feels instant (SPA)

**4. Completion (Success)**
- Fan: Playing music or checking concerts
- Industry: On contact page with form visible
- Both: Sharing the site with proper OG preview

## Visual Design Foundation

### Color System

**Color Mode:** Dark only (no light/dark toggle)

**Core Palette:**

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Background (Primary)** | Near Black | #0A0A0A | Main page background |
| **Background (Secondary)** | Dark Gray | #1A1A1A | Cards, elevated surfaces |
| **Background (Tertiary)** | Medium Gray | #2A2A2A | Hover states, borders |
| **Text (Primary)** | Off White | #F5F5F5 | Headings, primary text |
| **Text (Secondary)** | Light Gray | #A3A3A3 | Body text, descriptions |
| **Text (Muted)** | Gray | #737373 | Captions, metadata |
| **Accent (Primary)** | Burnt Orange | #E65C00 | Primary CTAs, links, highlights |
| **Accent (Hover)** | Bright Orange | #FF6B00 | Hover states |
| **Accent (Subtle)** | Amber | #FF9500 | Secondary accents, icons |

**Semantic Colors:**

| Role | Color | Usage |
|------|-------|-------|
| **Success** | Green | #22C55E | Form success, confirmations |
| **Warning** | Amber | #F59E0B | Warnings, cautions |
| **Error** | Red | #EF4444 | Form errors, destructive actions |

### Typography System

**Font Family:** Barlow (Google Fonts)
- Automotive/industrial heritage matches vintage car aesthetic
- Excellent readability across weights
- Free and performant via Google Fonts

**Type Scale:**

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| **H1 (Hero)** | Barlow Condensed | 48-72px | 700 | 1.1 |
| **H2 (Section)** | Barlow Condensed | 32-40px | 600 | 1.2 |
| **H3 (Subsection)** | Barlow | 24-28px | 600 | 1.3 |
| **H4 (Card Title)** | Barlow | 18-20px | 600 | 1.4 |
| **Body** | Barlow | 16px | 400 | 1.6 |
| **Body Small** | Barlow | 14px | 400 | 1.5 |
| **Caption** | Barlow | 12px | 400 | 1.4 |
| **Button** | Barlow | 14-16px | 600 | 1.0 |

**Typography Principles:**
- Condensed variant for impact headings (hero, section titles)
- Regular variant for body text and UI elements
- Generous line-height for readability on dark backgrounds
- All caps optional for short labels/navigation

### Spacing & Layout Foundation

**Base Unit:** 4px
**Spacing Scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px

| Token | Value | Usage |
|-------|-------|-------|
| **xs** | 4px | Tight spacing, icon gaps |
| **sm** | 8px | Inline elements, compact spacing |
| **md** | 16px | Default component padding |
| **lg** | 24px | Section padding, card gaps |
| **xl** | 32px | Major section breaks |
| **2xl** | 48px | Page section spacing |
| **3xl** | 64px | Hero padding, major divisions |

**Layout Principles:**
- **Full-bleed hero** - Edge-to-edge imagery, no margins
- **Contained content** - Max-width 1200px for text/cards
- **Generous whitespace** - Let content breathe on dark backgrounds
- **Mobile-first breakpoints** - 640px, 768px, 1024px, 1280px

**Border Radius:**
- **sm:** 4px (inputs, small elements)
- **md:** 8px (buttons, cards)
- **lg:** 12px (larger cards, modals)
- **full:** 9999px (pills, avatars)

### Accessibility Considerations

**Color Contrast:**
- All text meets WCAG AA (4.5:1 for body, 3:1 for large text)
- Orange accent (#E65C00) on dark background passes AA
- Interactive elements have visible focus states

**Typography Accessibility:**
- Minimum 16px body text
- Line height minimum 1.5 for body text
- No text smaller than 12px

**Interaction Accessibility:**
- Touch targets minimum 44x44px
- Focus indicators visible (orange outline)
- No reliance on color alone for meaning
- Reduced motion support for animations

## Design Direction Decision

### Design Directions Explored

Six distinct design directions were created and evaluated:

1. **Bold Hero** - Maximum impact with oversized typography and gradient effects
2. **Split Layout** - Content on one side, hero imagery on the other
3. **Immersive** - Full viewport takeover with integrated navigation
4. **Card-Based** - Dashboard-style with clear action cards
5. **Minimal** - Ultra-clean with typography as the primary design element
6. **Magazine** - Editorial layout with storytelling approach

Visual mockups available at: `docs/ux-design-directions.html`

### Chosen Direction

**Primary Direction: Minimal (Direction 5)**

The minimal approach was selected as the primary design direction for most sections, featuring:
- Ultra-clean layouts with generous whitespace
- Typography as the primary design element (200px hero text)
- Orange accent line as visual anchor
- Confident, premium feel that lets band imagery speak
- Footer-style navigation for secondary paths

**Band Page Variation: Split Layout (Direction 2)**

The band member page uses a split layout approach:
- Photo on one side, biographical content on the other
- Allows individual personality to come through
- Creates visual interest while maintaining readability
- Alternating layout possible (photo left/right) for variety

### Design Rationale

| Page | Direction | Rationale |
|------|-----------|-----------|
| **Homepage** | Minimal | Maximum "VÅGAL" impact, breathing room, clear navigation paths |
| **Band Page** | Split Layout | Photo + bio pairing showcases individual members effectively |
| **Concerts** | Minimal | Clean list format, dates and venues prominent |
| **Contact** | Minimal | Simple form, no distractions, clear booking path |

**Why This Combination Works:**
1. **Minimal for impact** - The oversized typography and whitespace create immediate brand recognition
2. **Split for personality** - Band members deserve space to show who they are
3. **Consistency through tokens** - Same colors, fonts, and spacing across both approaches
4. **Rural + premium** - Minimal feel elevates "bygderock" without losing authenticity

### Implementation Approach

**Minimal Pages (Homepage, Concerts, Contact):**
- Full-viewport hero sections
- Barlow Condensed at maximum scale for headings
- Orange accent lines as section dividers
- Generous padding (64px+ between sections)
- Bottom navigation pattern for secondary links

**Split Layout Pages (Band):**
- Two-column grid (50/50 or 40/60)
- Band member photo fills one column
- Bio, instrument, inspirations in opposite column
- Alternating layout per member for visual rhythm
- Rounded image treatments (matching border-radius system)

**Shared Elements:**
- Dark background (#0A0A0A) throughout
- Orange accent (#E65C00) for CTAs and highlights
- Barlow font family for all text
- Consistent 8px spacing grid
- Rounded corners (8-12px) on interactive elements

## User Journey Flows

### Fan Discovery Journey (Emma)

**Goal:** Discover Vågal → Engage with content → Share with friends

```
Search "Vågal band" → Land on Homepage → Hero Impact (5 sec)
    ↓
Engaged? → Explore Options:
    • Music → Spotify Widget → Listen → Follow → Share
    • Band → Member Profiles → Return to Music/Concerts
    • Concerts → Find Local Show → Bandsintown Link
    ↓
Share Site → OG Preview Looks Great → Friends Click Through
```

**Key Success Moments:**
- Hero captivates in <5 seconds
- Music accessible in 1 tap
- Share preview looks professional

### Industry Booking Journey (Lars)

**Goal:** Evaluate band → Find contact → Submit booking inquiry

```
Search "Vågal band" → Land on Homepage → Professional Impression?
    ↓
Yes → Evaluate Band → Band Page → Review Members/Photos
    ↓
Check Concert History → Ready to Contact?
    ↓
Yes → Contact Page → Fill Booking Form → Submit → Confirmation
    ↓
Email Sent to Band → Response within 48 hours
```

**Key Success Moments:**
- Contact accessible within 2 clicks
- Form is simple (minimal fields)
- Clear confirmation after submission

### Content Update Journey (Band Members)

**Goal:** Update website content via CMS

```
Login to CMS → Dashboard → Select Content Type:
    • Hero → Upload Image → Crop → Preview → Publish
    • Member → Edit Profile → Update Photo/Bio → Preview → Publish
    • Other → Edit Content → Preview → Publish
    ↓
Changes Live → Verify on Site (< 5 minutes total)
```

**Key Success Moments:**
- Preview before publish
- Changes live quickly
- Clear feedback on success

### Journey Patterns

**Navigation Patterns:**
- Primary nav always visible (minimal, floating)
- Contact accessible from every page
- Back to home via logo click

**Feedback Patterns:**
- Orange highlight on hover/focus
- Toast notifications for form success
- Skeleton loading for widgets

**Error Recovery:**
- Inline form validation
- Clear error messages
- Graceful widget fallbacks

## Component Strategy

### Design System Components (shadcn/ui)

**Available and Using:**

| Component | Usage | Customization |
|-----------|-------|---------------|
| **Button** | CTAs, form submit, nav links | Orange primary, dark secondary |
| **Card** | Band member profiles, content sections | Dark bg, rounded-lg |
| **Input** | Contact form fields | Dark theme, orange focus |
| **Textarea** | Message field in contact | Dark theme, orange focus |
| **Sheet** | Mobile navigation drawer | Slide from right |
| **Skeleton** | Widget loading states | Dark gray animation |
| **Toast** | Form submission feedback | Success/error variants |

### Custom Components

**1. Hero Section**
- **Purpose:** Full-viewport band showcase
- **Content:** Background image, band name (200px), tagline, accent line
- **States:** Default, loading (skeleton for CMS images)
- **Responsive:** Stack vertically on mobile, reduce text sizes

**2. Band Member Card (Split Layout)**
- **Purpose:** Showcase individual band member
- **Content:** Photo (50%), name, instrument, bio, inspirations (50%)
- **States:** Default, hover (subtle lift)
- **Variants:** Photo-left, photo-right (alternating)

**3. Concert Event Item**
- **Purpose:** Display upcoming show
- **Content:** Date, venue, location, ticket CTA
- **States:** Default, past (muted), sold out
- **Integration:** Bandsintown widget fallback

**4. Widget Container**
- **Purpose:** Wrap third-party embeds (Spotify, YouTube)
- **Content:** Embed iframe, loading skeleton, error state
- **States:** Loading, loaded, error (graceful fallback message)

**5. Footer Navigation**
- **Purpose:** Secondary navigation and social links
- **Content:** Page links, social icons, copyright
- **States:** Default link, hover (orange)

### Implementation Roadmap

**Phase 1 - MVP Core:**
- Button (primary/secondary variants)
- Hero Section (custom)
- Band Member Card (custom)
- Contact form (Input, Textarea, Button)
- Mobile navigation (Sheet)

**Phase 2 - Enhancement:**
- Widget Containers (Spotify, YouTube, Bandsintown)
- Concert Event Items
- Toast notifications
- Skeleton loading states

## UX Consistency Patterns

### Button Hierarchy

| Type | Usage | Style |
|------|-------|-------|
| **Primary** | Main CTAs (Listen, Book, Submit) | Orange bg, white text |
| **Secondary** | Alternative actions | Transparent, border, white text |
| **Ghost** | Tertiary actions | No border, text only |
| **Icon** | Social links, close buttons | Icon only, hover state |

### Feedback Patterns

**Success States:**
- Green checkmark icon
- Toast: "Message sent successfully"
- Form fields reset

**Error States:**
- Red text below field
- Orange outline on invalid field
- Toast: "Please fix the errors below"

**Loading States:**
- Skeleton animation (dark gray pulse)
- Button: disabled + spinner
- Widget: skeleton placeholder

### Form Patterns

**Contact Form Fields:**
- Name (required)
- Email (required, validated)
- Subject (dropdown: Booking, Press, General)
- Message (required, textarea)
- Submit button (primary)

**Validation:**
- Inline validation on blur
- Error messages below fields
- Disabled submit until valid

### Navigation Patterns

**Desktop:**
- Floating header (semi-transparent dark)
- Logo left, links right
- Links: Band, Concerts, Contact

**Mobile:**
- Floating header with hamburger
- Sheet drawer from right
- Full-height menu with large touch targets

### Empty & Loading States

**No Concerts:**
- Friendly message: "No upcoming shows scheduled"
- CTA: "Follow us for updates"

**Widget Loading:**
- Skeleton matching widget dimensions
- Smooth fade-in when loaded

**Widget Error:**
- Fallback message: "Couldn't load [Spotify/YouTube]"
- Direct link to platform as alternative

## Responsive Design & Accessibility

### Responsive Strategy

**Mobile First (320px - 767px):**
- Single column layouts
- Stacked hero content
- Bottom-accessible CTAs
- Sheet navigation
- Touch targets 44x44px minimum

**Tablet (768px - 1023px):**
- Two-column layouts where appropriate
- Band member cards side-by-side
- Expanded navigation
- Increased spacing

**Desktop (1024px+):**
- Full minimal layout as designed
- Multi-column content grids
- Floating navigation
- Maximum content width 1200px

### Breakpoint Strategy

| Breakpoint | Target | Layout Changes |
|------------|--------|----------------|
| **< 640px** | Mobile phones | Single column, sheet nav, stacked hero |
| **640-768px** | Large phones | Slightly wider margins |
| **768-1024px** | Tablets | 2-column layouts, expanded nav |
| **1024-1280px** | Small desktop | Full layout, max-width containers |
| **> 1280px** | Large desktop | Centered content, generous margins |

### Accessibility Strategy

**WCAG Level:** AA Compliance

**Color Contrast:**
- Text on dark: #F5F5F5 on #0A0A0A (passes AA)
- Orange accent: #E65C00 on #0A0A0A (passes AA for large text)
- All interactive elements meet 4.5:1 ratio

**Keyboard Navigation:**
- All interactive elements focusable
- Visible focus indicators (orange outline)
- Skip to main content link
- Logical tab order

**Screen Reader Support:**
- Semantic HTML structure
- ARIA labels on icons and widgets
- Alt text for all images
- Landmark regions (header, main, footer)

**Motion & Animation:**
- Respect prefers-reduced-motion
- No auto-playing videos with sound
- Smooth but subtle transitions

### Testing Checklist

**Responsive Testing:**
- [ ] iPhone SE (320px)
- [ ] iPhone 14 (390px)
- [ ] iPad (768px)
- [ ] Desktop (1024px+)

**Accessibility Testing:**
- [ ] Keyboard-only navigation
- [ ] Screen reader (VoiceOver/NVDA)
- [ ] Color contrast checker
- [ ] Focus indicator visibility

---

## Summary

This UX Design Specification for the Vågal band website establishes:

1. **Clear user journeys** for fans, industry professionals, and band members
2. **Minimal design direction** with split layout variation for band profiles
3. **Dark + orange visual identity** reflecting rural party vibes and vintage car culture
4. **shadcn/ui component foundation** with custom components for unique needs
5. **Mobile-first responsive strategy** with WCAG AA accessibility compliance

**Key Design Decisions:**
- Dark only (no light mode toggle)
- Barlow font family (automotive/industrial heritage)
- Orange accent (#E65C00) for energy and warmth
- Rounded aesthetics throughout
- Full-bleed hero with massive typography

**Ready for:** Architecture planning, epic creation, and development implementation.
