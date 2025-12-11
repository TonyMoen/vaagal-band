---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - docs/prd.md
  - docs/index.md
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2025-12-11'
project_name: 'vaagal-app'
user_name: 'Tony-'
date: '2025-12-11'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
32 requirements across 6 categories:
- Content Management (7): CMS dashboard, content editing, media library, preview/publish workflow
- Navigation & Layout (5): Header/footer navigation, responsive design, mobile menu
- Page Features (11): Hero section, embeds (Spotify, YouTube, Bandsintown), band profiles, contact form
- SEO & Discoverability (7): Meta tags, Open Graph, Twitter Cards, structured data, sitemap
- Administration (2): Environment variables, Merch page removal

**Non-Functional Requirements:**
24 requirements focused on:
- Performance: Core Web Vitals compliance (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Accessibility: WCAG 2.1 Level AA
- Integration: CMS uptime, graceful widget degradation
- Compatibility: Modern browsers (last 2 versions), mobile-first

**Scale & Complexity:**

- Primary domain: Web SPA (client-side rendered)
- Complexity level: Low-medium
- Estimated architectural components: 4-5 major systems (CMS, SEO, UI components, routing, external integrations)

### Technical Constraints & Dependencies

| Constraint | Impact |
|------------|--------|
| Existing React 19 + Vite stack | Must integrate CMS without major restructuring |
| Static hosting target | No server-side rendering without migration to SSG/SSR |
| Existing Tailwind CSS variables | shadcn/ui must adopt current brand colors |
| Third-party widgets | Bandsintown script injection pattern must coexist |
| Web3Forms integration | Contact form approach already established |

### Cross-Cutting Concerns Identified

1. **SEO Strategy** - Affects all pages; SPA limitations require careful meta tag management
2. **CMS Data Layer** - Content fetching pattern impacts performance and build process
3. **Design System** - shadcn/ui migration touches all UI components
4. **Image Optimization** - Hero and band member images need CDN/optimization strategy
5. **Error Boundaries** - Widget failures shouldn't break page rendering

## Starter Template Evaluation

### Primary Technology Domain

**Brownfield Web SPA** - Extending existing React 19 + Vite 7 + Tailwind CSS stack

### Existing Foundation (No Starter Needed)

This is an existing project with established architecture:
- React 19.1.1 with TypeScript 5.8.3
- Vite 7.1.7 build tooling
- Tailwind CSS 3.4.17 styling
- React Router DOM 7.9.1 routing

### Integrations to Add

#### 1. Sanity CMS (Content Management)

**Selection Rationale:**
- Excellent developer experience with React
- Free tier covers project needs (10k docs, 20 users)
- Real-time preview capabilities
- Built-in image CDN with transformations
- GROQ query language for flexible content fetching

**Integration Approach:**
```bash
npm install @sanity/client @sanity/image-url
npx sanity@latest init --env
```

#### 2. shadcn/ui (Component Library)

**Selection Rationale:**
- Tailwind-native (matches existing stack)
- Copy-paste ownership (no package lock-in)
- Accessible by default (WCAG compliance)
- Customizable to brand colors via CSS variables

**Integration Approach:**
```bash
npx shadcn@latest init
npx shadcn@latest add button card navigation-menu
```

#### 3. Vercel (Deployment Platform)

**Selection Rationale:**
- Excellent Vite support
- Free hobby tier sufficient for promotional site
- Automatic preview deployments
- Built-in analytics (optional)
- Edge network for fast global delivery

**Deployment Configuration:**
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- SPA fallback: Enable for client-side routing

### Architectural Decisions Established

| Decision | Choice | Rationale |
|----------|--------|-----------|
| CMS | Sanity | Free tier, great DX, image CDN |
| UI Components | shadcn/ui | Tailwind-native, accessible |
| Hosting | Vercel | Free tier, Vite support, previews |
| Content Fetching | Client-side | Keep SPA architecture simple |
| Image Optimization | Sanity CDN | Built-in transformations |

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- CMS Integration: Sanity with runtime client-side fetching
- SEO Approach: react-helmet-async for basic meta tag management

**Important Decisions (Shape Architecture):**
- UI Components: shadcn/ui migration (incremental)
- Error Handling: Per-widget error boundaries

**Deferred Decisions (Post-MVP):**
- SSG/SSR migration (only if SEO proves insufficient)
- Advanced caching (TanStack Query - add if performance issues arise)
- Analytics integration

### Data Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| CMS | Sanity | Free tier, great DX, image CDN |
| Content Fetching | Runtime (client-side) | Simple, always fresh, Sanity CDN is fast |
| Data Fetching | Plain fetch + useState | No extra dependencies, sufficient for low-traffic site |
| Image Handling | Sanity CDN | Built-in optimization and transformations |

**Content Schema Strategy:**
- Hero content (image, title, subtitle)
- Band members (photo, name, alias, instrument, bio)
- Site settings (meta descriptions, social links)

### Authentication & Security

| Decision | Choice | Rationale |
|----------|--------|-----------|
| User Auth | None required | Public-facing promotional site |
| CMS Auth | Sanity built-in | Band members log into Sanity Studio |
| API Keys | Environment variables | VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET |
| Form Security | Web3Forms (existing) | Already configured, handles spam |

### Frontend Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| SEO | react-helmet-async | Basic meta tags per route, minimal setup |
| State Management | Local useState | No global state needed |
| Component Library | shadcn/ui (incremental) | Migrate core components first |
| Error Handling | Per-widget Error Boundaries | Isolate third-party widget failures |
| Routing | React Router DOM (existing) | Already configured |

**SEO Implementation:**
- react-helmet-async for dynamic meta tags
- Open Graph tags for social sharing
- JSON-LD structured data (MusicGroup schema)
- Static sitemap.xml and robots.txt

### Infrastructure & Deployment

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Hosting | Vercel Hobby | Free tier, excellent Vite support |
| CI/CD | Vercel Git Integration | Auto-deploy on push |
| Preview | Vercel Preview Deployments | Test CMS changes before publish |
| CDN | Vercel Edge + Sanity CDN | Static assets + CMS images |

**Environment Variables:**
- `VITE_SANITY_PROJECT_ID` - Sanity project identifier
- `VITE_SANITY_DATASET` - Dataset name (production)
- `VITE_WEB3FORMS_KEY` - Contact form API key (move from hardcoded)

### Decision Impact Analysis

**Implementation Sequence:**
1. Environment variables setup (security foundation)
2. Sanity project + schema creation
3. shadcn/ui initialization + brand colors
4. SEO setup (react-helmet-async)
5. CMS integration per page
6. Error boundaries for widgets
7. Vercel deployment configuration

**Cross-Component Dependencies:**
- Sanity schema must be defined before frontend integration
- shadcn/ui theme must adopt existing CSS variables
- Error boundaries wrap existing widget components

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
4 areas where AI agents could make different choices - all addressed below.

### Naming Patterns

**Sanity Schema Naming:**
- Document types: camelCase (`hero`, `bandMember`, `siteSettings`)
- Field names: camelCase (`heroImage`, `memberName`, `spotifyUrl`)
- Reference fields: suffixed with `Ref` (`bandMemberRef`)

```typescript
// Good
defineType({ name: 'bandMember', type: 'document', ... })

// Bad
defineType({ name: 'BandMember', type: 'document', ... })
defineType({ name: 'band_member', type: 'document', ... })
```

**Code Naming:**
- React components: PascalCase (`BandMemberCard.tsx`)
- Hooks: camelCase with `use` prefix (`useBandMembers.ts`)
- Utilities: camelCase (`sanityClient.ts`, `imageUrl.ts`)
- Types/Interfaces: PascalCase with descriptive suffix (`BandMemberType`, `HeroContent`)

**File Naming:**
- Components: PascalCase matching component name (`BandMemberCard.tsx`)
- Hooks: camelCase (`useBandMembers.ts`)
- Utilities: camelCase (`sanityClient.ts`)

### Structure Patterns

**Project Organization:**
```
src/
├── components/
│   ├── ui/              # shadcn/ui components (auto-generated)
│   ├── BandMemberCard.tsx
│   ├── ErrorMessage.tsx
│   ├── LoadingSpinner.tsx
│   └── ...existing components
├── hooks/
│   ├── useBandMembers.ts
│   ├── useHero.ts
│   └── useSiteSettings.ts
├── lib/
│   ├── sanity/
│   │   ├── client.ts    # Sanity client config
│   │   ├── queries.ts   # GROQ queries
│   │   └── image.ts     # Image URL builder
│   └── utils.ts         # shadcn/ui utils (auto-generated)
├── pages/               # Existing page components
├── styles/              # Existing styles
└── types/
    └── sanity.ts        # CMS content types
```

**New Directory Conventions:**
- `src/hooks/` - Custom React hooks for CMS data
- `src/lib/sanity/` - All Sanity-related utilities
- `src/components/ui/` - shadcn/ui components only

### Format Patterns

**CMS Data Fetching Hook Pattern:**
```typescript
// Standard hook structure for CMS data
function useBandMembers() {
  const [data, setData] = useState<BandMember[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient.fetch(bandMembersQuery)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
```

**Type Definitions:**
```typescript
// src/types/sanity.ts
interface BandMember {
  _id: string
  name: string
  alias: string
  instrument: string
  bio: string
  image: SanityImage
}

interface HeroContent {
  _id: string
  title: string
  subtitle: string
  image: SanityImage
}
```

### Communication Patterns

**Error Handling Pattern:**
```typescript
// Consistent error display
<ErrorMessage
  message="Could not load band members"
  retry={() => refetch()}
/>
```

**Loading State Pattern:**
```typescript
// Consistent loading display
if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage message={error.message} />
return <ActualContent data={data} />
```

### Process Patterns

**Widget Error Boundaries:**
```typescript
// Wrap third-party widgets to isolate failures
<WidgetErrorBoundary fallback={<WidgetUnavailable name="Spotify" />}>
  <SpotifyEmbed />
</WidgetErrorBoundary>
```

**Environment Variable Access:**
```typescript
// Always use import.meta.env for Vite
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET
```

### Enforcement Guidelines

**All AI Agents MUST:**
1. Follow existing file naming conventions in each directory
2. Place Sanity-related code in `src/lib/sanity/`
3. Create hooks in `src/hooks/` for CMS data fetching
4. Use the standard loading/error/data pattern for async operations
5. Wrap third-party widgets in error boundaries

**Anti-Patterns to Avoid:**
- ❌ Inline Sanity queries in components
- ❌ Mixing shadcn/ui components outside `src/components/ui/`
- ❌ Creating new state management solutions
- ❌ Hardcoding API keys or project IDs

## Project Structure & Boundaries

### Complete Project Directory Structure

```
vaagal-app/
├── .env                          # Local environment variables (gitignored)
├── .env.example                  # Environment variable template
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── eslint.config.js
├── components.json               # NEW: shadcn/ui configuration
├── vercel.json                   # NEW: Vercel deployment config
│
├── public/
│   ├── sitemap.xml              # NEW: Static sitemap
│   ├── robots.txt               # NEW: Search engine directives
│   └── vite.svg
│
├── src/
│   ├── main.tsx                 # App entry point
│   ├── App.tsx                  # Root layout with Router
│   ├── routes.tsx               # Route definitions
│   ├── index.css                # Tailwind imports
│   │
│   ├── assets/                  # EXISTING: Static images (to migrate to CMS)
│   │   ├── hero-1920.jpg
│   │   ├── vaagal-logo.svg
│   │   ├── marius.jpg
│   │   ├── sondre.jpg
│   │   ├── tony.jpg
│   │   ├── torstein.jpg
│   │   └── truls.jpg
│   │
│   ├── components/
│   │   ├── ui/                  # NEW: shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── navigation-menu.tsx
│   │   │
│   │   ├── NavBar.tsx           # EXISTING
│   │   ├── Footer.tsx           # EXISTING
│   │   ├── Hero.tsx             # EXISTING → CMS integration
│   │   ├── BandMember.tsx       # EXISTING → CMS integration
│   │   ├── ContactForm.tsx      # EXISTING
│   │   ├── BandsintownWidget.tsx # EXISTING
│   │   ├── SpotifyWidget.tsx    # EXISTING
│   │   ├── YoutubeWidget.tsx    # EXISTING
│   │   │
│   │   ├── SEO.tsx              # NEW: react-helmet-async wrapper
│   │   ├── LoadingSpinner.tsx   # NEW: Shared loading component
│   │   ├── ErrorMessage.tsx     # NEW: Shared error component
│   │   └── WidgetErrorBoundary.tsx # NEW: Error boundary for widgets
│   │
│   ├── hooks/                   # NEW: Custom React hooks
│   │   ├── useHero.ts           # Fetch hero content from Sanity
│   │   ├── useBandMembers.ts    # Fetch band members from Sanity
│   │   └── useSiteSettings.ts   # Fetch site metadata from Sanity
│   │
│   ├── lib/                     # NEW: Utilities and clients
│   │   ├── utils.ts             # shadcn/ui utility (cn function)
│   │   └── sanity/
│   │       ├── client.ts        # Sanity client configuration
│   │       ├── queries.ts       # GROQ queries
│   │       └── image.ts         # Image URL builder
│   │
│   ├── types/                   # NEW: TypeScript types
│   │   └── sanity.ts            # CMS content type definitions
│   │
│   ├── pages/
│   │   ├── Hjem.tsx             # EXISTING → SEO + CMS hero
│   │   ├── Bandet.tsx           # EXISTING → SEO + CMS members
│   │   ├── Konserter.tsx        # EXISTING → SEO
│   │   ├── KontaktOss.tsx       # EXISTING → SEO
│   │   └── NotFoundPage.tsx     # EXISTING
│   │
│   └── styles/
│       └── global.css           # EXISTING: CSS custom properties
│
└── docs/                        # Project documentation
    ├── index.md
    ├── prd.md
    └── architecture.md
```

### Architectural Boundaries

**CMS Data Boundary:**
- All Sanity interactions isolated to `src/lib/sanity/`
- Hooks in `src/hooks/` are the only consumers of Sanity client
- Pages and components receive data via hooks, never import Sanity directly

**UI Component Boundary:**
- `src/components/ui/` - shadcn/ui components only (managed by CLI)
- `src/components/` - Application-specific components
- Pages compose components, never contain complex UI logic

**External Widget Boundary:**
- Third-party widgets wrapped in `WidgetErrorBoundary`
- Widget failures isolated, don't crash page
- Widgets: BandsintownWidget, SpotifyWidget, YoutubeWidget

### Integration Points

**Internal Communication:**
```
Pages → Hooks → Sanity Client → Sanity CDN
  ↓
Components (receive data as props)
```

**External Integrations:**

| Service | Integration Point | Error Handling |
|---------|-------------------|----------------|
| Sanity CMS | `src/lib/sanity/client.ts` | Hook-level try/catch |
| Bandsintown | `src/components/BandsintownWidget.tsx` | Error boundary |
| Spotify | `src/components/SpotifyWidget.tsx` | Error boundary |
| YouTube | `src/components/YoutubeWidget.tsx` | Error boundary |
| Web3Forms | `src/components/ContactForm.tsx` | Form-level handling |

**Data Flow:**
```
Sanity Studio (CMS)
    ↓ (publish)
Sanity CDN
    ↓ (GROQ query)
src/lib/sanity/client.ts
    ↓ (fetch)
src/hooks/use*.ts
    ↓ (state)
src/pages/*.tsx
    ↓ (props)
src/components/*.tsx
    ↓ (render)
Browser
```

### File Organization Patterns

**Configuration Files (root):**
- `vite.config.ts` - Build configuration
- `tailwind.config.ts` - Design system tokens
- `components.json` - shadcn/ui configuration
- `vercel.json` - Deployment configuration
- `.env.example` - Environment variable documentation

**Environment Variables:**
```bash
# .env.example
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_WEB3FORMS_KEY=your-access-key
```

### Files to Create (Implementation Order)

| Priority | File | Purpose |
|----------|------|---------|
| 1 | `.env.example` | Document required env vars |
| 2 | `src/lib/sanity/client.ts` | Sanity client setup |
| 3 | `src/lib/sanity/queries.ts` | GROQ queries |
| 4 | `src/lib/sanity/image.ts` | Image URL helper |
| 5 | `src/types/sanity.ts` | TypeScript types |
| 6 | `src/hooks/useHero.ts` | Hero data hook |
| 7 | `src/hooks/useBandMembers.ts` | Band members hook |
| 8 | `src/components/LoadingSpinner.tsx` | Loading UI |
| 9 | `src/components/ErrorMessage.tsx` | Error UI |
| 10 | `src/components/SEO.tsx` | Meta tag component |
| 11 | `components.json` | shadcn/ui init |
| 12 | `src/lib/utils.ts` | shadcn/ui utils |
| 13 | `vercel.json` | Deployment config |
| 14 | `public/robots.txt` | Search directives |
| 15 | `public/sitemap.xml` | Site map |

### Files to Modify (CMS Integration)

| File | Changes |
|------|---------|
| `src/pages/Hjem.tsx` | Add SEO, use `useHero` hook |
| `src/pages/Bandet.tsx` | Add SEO, use `useBandMembers` hook |
| `src/pages/Konserter.tsx` | Add SEO component |
| `src/pages/KontaktOss.tsx` | Add SEO component |
| `src/components/Hero.tsx` | Accept props from CMS |
| `src/components/BandMember.tsx` | Accept props from CMS |
| `src/components/ContactForm.tsx` | Use env var for API key |
| `src/routes.tsx` | Remove Merch route |
| `src/components/NavBar.tsx` | Remove Merch link |
| `src/components/Footer.tsx` | Remove Merch link |

### Files to Delete

| File | Reason |
|------|--------|
| `src/pages/Merch.tsx` | Removing placeholder page |
| `src/components/Products.tsx` | No longer needed |

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:** All technology choices verified compatible
- React 19 + Sanity Client: Official integration
- Vite 7 + shadcn/ui: Official setup supported
- Tailwind CSS + shadcn/ui: Native integration
- Vercel + Vite SPA: Excellent support

**Pattern Consistency:** All patterns align with technology choices
**Structure Alignment:** Project structure supports all decisions

### Requirements Coverage Validation ✅

**Functional Requirements:** 32/32 covered (100%)
- Content Management: Sanity CMS
- Navigation & Layout: Existing + shadcn/ui
- Page Features: Existing widgets + CMS integration
- SEO: react-helmet-async + static files
- Administration: Environment variables

**Non-Functional Requirements:** All addressed
- Performance: Sanity CDN + Vite optimization
- Accessibility: shadcn/ui WCAG compliance
- Compatibility: Modern browsers via Vite

### Implementation Readiness Validation ✅

**Decision Completeness:** All critical decisions documented
**Structure Completeness:** Full directory tree with file list
**Pattern Completeness:** Code examples for all major patterns

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (low-medium)
- [x] Technical constraints identified (5 constraints)
- [x] Cross-cutting concerns mapped (5 concerns)

**✅ Architectural Decisions**
- [x] Critical decisions documented (CMS, SEO, Components)
- [x] Technology stack fully specified
- [x] Integration patterns defined (Sanity, widgets)
- [x] Performance considerations addressed

**✅ Implementation Patterns**
- [x] Naming conventions established (Sanity, code, files)
- [x] Structure patterns defined (hooks, lib, components)
- [x] Communication patterns specified (data flow)
- [x] Process patterns documented (error handling, loading)

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** ✅ READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
- Builds on proven existing stack
- Minimal new dependencies
- Clear separation of concerns
- Well-defined patterns for AI consistency

**Areas for Future Enhancement:**
- Testing strategy (post-MVP)
- SSG migration if SEO insufficient
- Analytics integration

### Implementation Handoff

**AI Agent Guidelines:**
1. Follow all architectural decisions exactly as documented
2. Use implementation patterns consistently across all components
3. Respect project structure and boundaries
4. Refer to this document for all architectural questions

**First Implementation Steps:**
1. Create `.env.example` with required variables
2. Initialize Sanity project: `npx sanity@latest init --env`
3. Initialize shadcn/ui: `npx shadcn@latest init`
4. Install dependencies: `npm install @sanity/client @sanity/image-url react-helmet-async`

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2025-12-11
**Document Location:** docs/architecture.md

### Final Architecture Deliverables

**Complete Architecture Document**
- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Requirements to architecture mapping
- Validation confirming coherence and completeness

**Implementation Ready Foundation**
- 15+ architectural decisions made
- 4 implementation pattern categories defined
- 5 architectural components specified
- 32 functional requirements fully supported

**AI Agent Implementation Guide**
- Technology stack with verified versions
- Consistency rules that prevent implementation conflicts
- Project structure with clear boundaries
- Integration patterns and communication standards

### Development Sequence

1. Initialize project environment (`.env.example`, env vars)
2. Set up Sanity CMS (`npx sanity@latest init --env`)
3. Initialize shadcn/ui (`npx shadcn@latest init`)
4. Install dependencies
5. Create Sanity schemas (hero, bandMember, siteSettings)
6. Build data hooks (useHero, useBandMembers)
7. Integrate CMS with pages
8. Add SEO components
9. Configure Vercel deployment
10. Remove Merch page and related code

### Quality Assurance Checklist

**✅ Architecture Coherence**
- [x] All decisions work together without conflicts
- [x] Technology choices are compatible
- [x] Patterns support the architectural decisions
- [x] Structure aligns with all choices

**✅ Requirements Coverage**
- [x] All functional requirements are supported
- [x] All non-functional requirements are addressed
- [x] Cross-cutting concerns are handled
- [x] Integration points are defined

**✅ Implementation Readiness**
- [x] Decisions are specific and actionable
- [x] Patterns prevent agent conflicts
- [x] Structure is complete and unambiguous
- [x] Examples are provided for clarity

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅

**Next Phase:** Begin implementation using the architectural decisions and patterns documented herein.

