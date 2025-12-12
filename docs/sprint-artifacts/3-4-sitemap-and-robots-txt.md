# Story 3.4: Sitemap and Robots.txt

Status: in-progress

## Story

As a **search engine crawler**,
I want **a sitemap and robots.txt file**,
so that **I can efficiently discover and index all pages**.

## Acceptance Criteria

1. **Given** the site needs search engine optimization
   **When** I create sitemap.xml
   **Then** `public/sitemap.xml` exists with (FR29):
   - All public pages listed (/, /bandet, /konserter, /kontakt)
   - Correct lastmod dates
   - Priority values set appropriately

2. **Given** the sitemap is created
   **When** I create robots.txt
   **Then** `public/robots.txt` exists with (FR30):
   - `User-agent: *`
   - `Allow: /`
   - `Sitemap:` pointing to sitemap.xml URL

3. **Given** both files are deployed
   **When** I access them at their standard URLs
   **Then** `https://vaagal.no/sitemap.xml` returns valid XML
   **And** `https://vaagal.no/robots.txt` returns valid text

4. **Given** the files are created
   **When** I review their contents
   **Then** no sensitive routes are accidentally exposed

## Tasks / Subtasks

- [x] Task 1: Create sitemap.xml (AC: #1, #3)
  - [x] Create `public/sitemap.xml` file
  - [x] Add XML declaration and urlset namespace
  - [x] Add homepage URL with priority 1.0
  - [x] Add /bandet with priority 0.8
  - [x] Add /konserter with priority 0.8
  - [x] Add /kontakt with priority 0.6
  - [x] Set lastmod to current date (2025-12-12)
  - [x] Set changefreq appropriately (weekly for most pages)

- [x] Task 2: Create robots.txt (AC: #2, #4)
  - [x] Create `public/robots.txt` file
  - [x] Add `User-agent: *` directive
  - [x] Add `Allow: /` directive
  - [x] Add `Sitemap: https://vaagal.no/sitemap.xml` directive
  - [x] Ensure no sensitive paths are exposed (none exist in this SPA)

- [x] Task 3: Verify file accessibility (AC: #3)
  - [x] Build the project (`npm run build`)
  - [x] Verify files exist in `dist/` output
  - [x] Test local access via dev server
  - [x] Validate sitemap.xml syntax

- [x] Task 4: Validate sitemap (AC: #1)
  - [x] Validate XML structure is well-formed
  - [x] Verify all URLs are absolute with https://vaagal.no prefix
  - [x] Verify no duplicate URLs
  - [x] Verify no 404 pages included

## Dev Notes

### Critical Context

**This is Story 4 of Epic 3 - SEO & Discoverability (FINAL STORY IN EPIC).**

This story completes the SEO epic by implementing static sitemap.xml and robots.txt files. These are placed in the `public/` directory and served as static files by Vite.

**Functional Requirements Covered:**
- FR29: System generates a sitemap.xml file
- FR30: System provides a robots.txt file

### Previous Story Intelligence (Story 3.3)

**From Story 3.3 (JSON-LD Structured Data):**
- Successfully implemented StructuredData component with MusicGroup schema
- Uses `react-helmet-async` pattern for head injection
- Site constants: `BASE_URL = "https://vaagal.no"`, `SITE_NAME = "Vågal"`
- All social URLs verified from Footer.tsx

**Key Learnings from Epic 3 Stories:**
- No semicolons in TypeScript files (project convention)
- Default exports for components
- Norwegian locale: `nb_NO`
- Static files go in `public/` directory
- Build output goes to `dist/`

### Architecture Requirements

**From Architecture Document (docs/architecture.md):**

> **SEO Implementation:**
> - react-helmet-async for dynamic meta tags ← Story 3.1 ✅
> - Open Graph tags for social sharing ← Story 3.2 ✅
> - JSON-LD structured data (MusicGroup schema) ← Story 3.3 ✅
> - **Static sitemap.xml and robots.txt in public folder** ← THIS STORY

**Project Structure:**
```
public/
├── sitemap.xml              # NEW: Static sitemap
├── robots.txt               # NEW: Search engine directives
└── vite.svg
```

### Site URL Structure

**Production Base URL:** `https://vaagal.no`

**Public Pages to Include:**
| Page | Path | Priority | Description |
|------|------|----------|-------------|
| Hjem (Home) | `/` | 1.0 | Homepage with hero, widgets |
| Bandet (Band) | `/bandet` | 0.8 | Band member profiles |
| Konserter (Concerts) | `/konserter` | 0.8 | Concert listings |
| Kontakt (Contact) | `/kontakt` | 0.6 | Contact/booking form |

**Pages NOT to Include:**
- `/merch` - Removed (Story 1.2)
- Any `/admin`, `/studio`, or internal routes

### Sitemap.xml Implementation

**Required XML Structure:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vaagal.no/</loc>
    <lastmod>2025-12-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vaagal.no/bandet</loc>
    <lastmod>2025-12-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vaagal.no/konserter</loc>
    <lastmod>2025-12-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vaagal.no/kontakt</loc>
    <lastmod>2025-12-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

**Priority Guidelines:**
- `1.0` - Homepage (most important)
- `0.8` - Core content pages (Band, Concerts)
- `0.6` - Utility pages (Contact)
- `0.5` - Default for unlisted pages

**Change Frequency Guidelines:**
- `weekly` - Pages with frequently updated content (Home with concerts, Concerts page)
- `monthly` - Mostly static content (Band profiles, Contact info)

### Robots.txt Implementation

**Required Content:**
```
User-agent: *
Allow: /

Sitemap: https://vaagal.no/sitemap.xml
```

**Directive Explanations:**
- `User-agent: *` - Applies to all web crawlers
- `Allow: /` - Allow crawling of all public paths
- `Sitemap:` - Points crawlers to sitemap for efficient indexing

**Security Note:** This SPA has no admin routes or sensitive paths exposed via the public web. The Sanity Studio runs on a separate subdomain/project.

### Git Intelligence

**Recent Commits (Epic 3):**
- `a95880f` feat: Add JSON-LD structured data for SEO (Story 3.3)
- `e5b36bc` feat: Add Open Graph and Twitter Card meta tags (Story 3.2)
- `95105b9` feat: Add SEO component with Norwegian meta tags (Story 3.1)

**Code Patterns Established:**
- Static files in `public/` directory (served as-is by Vite)
- Norwegian language throughout (page names: Hjem, Bandet, Konserter, Kontakt)
- URLs use lowercase Norwegian paths

### Vite Static File Handling

**How Vite Handles Public Directory:**
- Files in `public/` are copied directly to build output
- No processing or bundling applied
- Accessed via root path (e.g., `/robots.txt`)
- Build output location: `dist/`

**Verification After Build:**
```bash
npm run build
# Check output:
# dist/sitemap.xml
# dist/robots.txt
```

### Anti-Patterns to Avoid

- **DO NOT** use dynamic sitemap generation (static is sufficient for 4 pages)
- **DO NOT** include query parameters in sitemap URLs
- **DO NOT** include hash fragments (#) in URLs
- **DO NOT** use relative URLs in sitemap (must be absolute)
- **DO NOT** include localhost URLs
- **DO NOT** forget to update lastmod when pages are significantly modified
- **DO NOT** create robots.txt that blocks important crawlers

### Validation Tools

**After Implementation:**
1. **XML Validator:** https://www.xmlvalidation.com/
2. **Google Search Console:** Upload sitemap after deployment
3. **Robots.txt Tester:** Available in Google Search Console
4. **Visual inspection:** `curl https://vaagal.no/sitemap.xml`

### Dependencies

**No new packages required.** This story only creates static files.

### File Structure Context

**Current public/ directory:**
```
public/
└── vite.svg
```

**After this story:**
```
public/
├── sitemap.xml    # NEW
├── robots.txt     # NEW
└── vite.svg
```

### Testing Approach

**Local Testing:**
1. Create files in `public/`
2. Run `npm run dev`
3. Access `http://localhost:5173/sitemap.xml` - should show XML
4. Access `http://localhost:5173/robots.txt` - should show text

**Build Testing:**
1. Run `npm run build`
2. Verify `dist/sitemap.xml` exists
3. Verify `dist/robots.txt` exists
4. Optionally preview: `npm run preview`

**Production Testing (Post-Deploy):**
1. Access `https://vaagal.no/sitemap.xml`
2. Access `https://vaagal.no/robots.txt`
3. Submit sitemap to Google Search Console

### Epic 3 Completion Summary

After this story, Epic 3 (SEO & Discoverability) will be complete:

| Story | Status | FR Coverage |
|-------|--------|-------------|
| 3.1 SEO Component with Meta Tags | done | FR24, FR25 |
| 3.2 Open Graph and Twitter Card Tags | review | FR26, FR27 |
| 3.3 Structured Data (JSON-LD) | review | FR28 |
| 3.4 Sitemap and Robots.txt | **this story** | FR29, FR30 |

**All FR24-FR30 covered after this story.**

### References

- [Source: docs/epics.md#Story 3.4] - Acceptance criteria and user story
- [Source: docs/prd.md#FR29] - Sitemap generation requirement
- [Source: docs/prd.md#FR30] - Robots.txt requirement
- [Source: docs/architecture.md#Project Structure] - File locations
- [Source: docs/architecture.md#SEO Implementation] - SEO strategy
- [Sitemaps.org Protocol](https://www.sitemaps.org/protocol.html) - Sitemap XML format
- [Google Robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) - Robots.txt guidelines

## Review Follow-ups (AI)

- [ ] [AI-Review][HIGH] Files `public/sitemap.xml` and `public/robots.txt` are untracked in git - must commit to repository for deployment.

## Dev Agent Record

### Context Reference

<!-- Story context verified against: docs/prd.md (FR29, FR30), docs/architecture.md (SEO Implementation, Project Structure), docs/epics.md#Story 3.4, docs/sprint-artifacts/3-3-structured-data-json-ld.md (previous story), src/routes.tsx (page routes) -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build: Successful in 3.83s (pre-existing chunk size warning unrelated to this story)
- Files copied to dist/: sitemap.xml (761 bytes), robots.txt (67 bytes)
- XML validation: Well-formed structure with proper namespace

### Completion Notes List

- **Task 1:** Created `public/sitemap.xml` with proper XML declaration, urlset namespace, and 4 URL entries for all public pages (/, /bandet, /konserter, /kontakt) with appropriate priority and changefreq values
- **Task 2:** Created `public/robots.txt` with User-agent, Allow, and Sitemap directives pointing to production URL
- **Task 3:** Verified build successful, both files present in dist/ output
- **Task 4:** Validated XML structure well-formed, all URLs absolute with https://vaagal.no prefix, no duplicates, no 404 pages included

### Change Log

- 2025-12-12: Implemented sitemap.xml and robots.txt (Story 3.4) - Completes Epic 3 SEO requirements FR29 and FR30

### File List

**New Files:**
- public/sitemap.xml
- public/robots.txt
