# Story 1.1: Environment Variables Setup

Status: ready-for-dev

## Story

As a **developer**,
I want **API keys and configuration stored in environment variables**,
so that **secrets are not committed to the repository and configuration can differ between environments**.

## Acceptance Criteria

1. **Given** the project has hardcoded API keys
   **When** I create the environment variable structure
   **Then** a `.env.example` file exists with documented placeholders for:
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET`
   - `VITE_WEB3FORMS_KEY`

2. **Given** the `.gitignore` file exists
   **When** I check for environment file exclusion
   **Then** `.env` is added to `.gitignore` if not already present

3. **Given** the ContactForm.tsx has a hardcoded Web3Forms API key
   **When** I update the component
   **Then** the existing key `"9615cac2-5462-4fed-a770-50e99b97b5bd"` is replaced with `import.meta.env.VITE_WEB3FORMS_KEY`

## Tasks / Subtasks

- [ ] Task 1: Create `.env.example` file (AC: #1)
  - [ ] Create file at project root
  - [ ] Add `VITE_SANITY_PROJECT_ID=your-project-id` with comment
  - [ ] Add `VITE_SANITY_DATASET=production` with comment
  - [ ] Add `VITE_WEB3FORMS_KEY=your-access-key` with comment
  - [ ] Add header comment explaining purpose

- [ ] Task 2: Update `.gitignore` (AC: #2)
  - [ ] Add `.env` entry under a new "Environment" section
  - [ ] Add `.env.local` entry (Vite convention)
  - [ ] Add `.env.*.local` entry (for development overrides)

- [ ] Task 3: Update ContactForm.tsx (AC: #3)
  - [ ] Replace hardcoded key at line 14 with `import.meta.env.VITE_WEB3FORMS_KEY`
  - [ ] Verify TypeScript types are satisfied (Vite provides `ImportMetaEnv`)

- [ ] Task 4: Create local `.env` file for development (not committed)
  - [ ] Copy `.env.example` to `.env`
  - [ ] Fill in actual Web3Forms key: `9615cac2-5462-4fed-a770-50e99b97b5bd`
  - [ ] Leave Sanity values as placeholders (set up in Epic 2)

- [ ] Task 5: Verify implementation
  - [ ] Run `npm run dev` and test contact form submission
  - [ ] Confirm form still sends successfully
  - [ ] Verify `.env` is NOT tracked by git (`git status`)

## Dev Notes

### Critical Context

**This is Story 1 of Epic 1 - the foundation for all subsequent work.**

The environment variables being set up here will be used by:
- **Story 2.1** (Epic 2): Sanity CMS initialization requires `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET`
- **Story 6.3** (Epic 6): Contact form already uses Web3Forms, needs the env var

### Current State Analysis

**File: `src/components/ContactForm.tsx` (Line 14)**
```typescript
formData.append("access_key", "9615cac2-5462-4fed-a770-50e99b97b5bd");
```
This hardcoded API key MUST be replaced with:
```typescript
formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
```

**File: `.gitignore`**
Currently does NOT include `.env` - must be added to prevent secrets from being committed.

### Architecture Compliance

**From Architecture Document (`docs/architecture.md`):**

> **Environment Variables:**
> - `VITE_SANITY_PROJECT_ID` - Sanity project identifier
> - `VITE_SANITY_DATASET` - Dataset name (production)
> - `VITE_WEB3FORMS_KEY` - Contact form API key (move from hardcoded)

> **Environment Variable Access Pattern:**
> ```typescript
> // Always use import.meta.env for Vite
> const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
> const dataset = import.meta.env.VITE_SANITY_DATASET
> ```

### Technical Requirements

**Vite Environment Variable Rules:**
1. All client-exposed env vars MUST be prefixed with `VITE_`
2. Access via `import.meta.env.VITE_*`
3. Types are available via `ImportMetaEnv` interface
4. `.env` files are loaded automatically by Vite

**File Locations:**
| File | Location | Purpose |
|------|----------|---------|
| `.env.example` | Project root | Template for other developers |
| `.env` | Project root (gitignored) | Local development values |
| `.gitignore` | Project root | Exclude `.env` files |

### Library/Framework Requirements

**Vite (v7.1.7)** - Already installed, no additional packages needed
- Built-in env variable support via `import.meta.env`
- Automatic `.env` file loading
- Type definitions available

### File Structure Requirements

```
vaagal-app/
├── .env                    # LOCAL ONLY (gitignored) - actual values
├── .env.example            # NEW - template with placeholders
├── .gitignore              # MODIFY - add .env entries
└── src/
    └── components/
        └── ContactForm.tsx # MODIFY - use env var
```

### Testing Requirements

**Manual Testing:**
1. After implementation, run `npm run dev`
2. Navigate to Contact page (`/kontakt`)
3. Submit a test message
4. Verify success toast appears ("Takk! Meldingen er sendt!")
5. Check email delivery (optional)

**Git Verification:**
```bash
git status
# .env should NOT appear in untracked files
# .env.example SHOULD appear
```

### Project Structure Notes

- All new files follow existing project conventions
- `.env.example` uses standard Vite naming conventions
- No new directories created for this story

### Security Considerations

**IMPORTANT:** The Web3Forms key (`9615cac2-5462-4fed-a770-50e99b97b5bd`) is being moved from code to environment variable. This key:
- Is exposed to the client (necessary for form submission)
- Should still not be in version control for security best practices
- Web3Forms provides spam protection, so key exposure risk is acceptable

### References

- [Source: docs/architecture.md#Environment Variables] - Specifies required env vars
- [Source: docs/architecture.md#Implementation Patterns] - Access pattern
- [Source: docs/prd.md#Site Administration] - FR31: Environment variables requirement
- [Source: docs/epics.md#Story 1.1] - Full acceptance criteria

## Dev Agent Record

### Context Reference

<!-- Story context verified against: docs/prd.md, docs/architecture.md, docs/epics.md, src/components/ContactForm.tsx, .gitignore -->

### Agent Model Used

<!-- To be filled by dev agent -->

### Debug Log References

<!-- To be filled during implementation -->

### Completion Notes List

<!-- To be filled after implementation -->

### File List

**Files to Create:**
- `.env.example`
- `.env` (local only, not committed)

**Files to Modify:**
- `.gitignore`
- `src/components/ContactForm.tsx`

---

**Story Status:** ready-for-dev
**Ultimate context engine analysis completed - comprehensive developer guide created**
