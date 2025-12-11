# Vågal Band Website - Documentation

**Generated:** 2025-12-11
**Scan Mode:** Initial Scan (Quick)
**Project Type:** Web (Single-part Frontend)

---

## Quick Reference

| Item | Value |
|------|-------|
| **Project Name** | vaagal-band |
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS |
| **Routing** | React Router DOM 7 |
| **Status** | In Development |

### Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Run ESLint
```

---

## Documentation Index

### Core Documentation

| Document | Description |
|----------|-------------|
| [Project Overview](./project-overview.md) | Business context, features, technology decisions |
| [Architecture](./architecture.md) | Technical architecture, stack, integrations |
| [Source Tree](./source-tree-analysis.md) | Directory structure, file organization |
| [Component Inventory](./component-inventory.md) | All components with props and usage |
| [Development Guide](./development-guide.md) | Setup, workflows, deployment |

---

## Project Summary

Vågal Band Website is a promotional SPA for the Norwegian band "Vågal". It features:

- **6 Pages:** Home, Band, Concerts, Merch, Contact, 404
- **9 Components:** Navigation, Footer, Hero, embeds (Spotify, YouTube, Bandsintown), forms
- **External Services:** Bandsintown (concerts), Spotify (music), YouTube (video), Web3Forms (contact)

### What's Complete

- Core navigation and layout
- Band member profiles
- Music and video embeds
- Concert widget integration
- Contact form

### What's Incomplete

- Merch store (placeholder only)
- No actual e-commerce functionality
- Missing test coverage
- Environment variable configuration

---

## AI-Assisted Development Notes

### Code Patterns

- **Components:** Functional components with TypeScript
- **Styling:** Tailwind utility classes + CSS custom properties
- **Routing:** React Router with nested layout pattern
- **State:** Minimal local state (useState only)

### Key Files for Modification

| Task | File(s) |
|------|---------|
| Add new page | `src/pages/*.tsx`, `src/routes.tsx`, `src/components/NavBar.tsx` |
| Modify styling | `src/styles/global.css`, `tailwind.config.ts` |
| Update band info | `src/pages/Bandet.tsx` (members array) |
| Update products | `src/components/Products.tsx` (products array) |
| Change contact form | `src/components/ContactForm.tsx` |

### Important Constraints

1. No backend - all data is static/hardcoded
2. No database - content changes require code changes
3. No authentication - public-facing only
4. Contact form uses Web3Forms API (key in source)

---

## Next Steps

This documentation provides the foundation for:

1. **Creating a PRD** - Define remaining features and requirements
2. **Planning Epics & Stories** - Break down work into actionable items
3. **Implementation** - Complete the merch store, add tests, etc.

To continue with BMAD workflow, run:
```
/bmad:bmm:agents:pm
```

Then select **Create PRD** to define what needs to be built.
