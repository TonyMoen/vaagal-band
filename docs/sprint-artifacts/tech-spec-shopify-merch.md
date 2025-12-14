# Tech-Spec: Shopify Merch Integration

**Created:** 2025-12-14
**Status:** Ready for Development

## Overview

### Problem Statement
The band needs to showcase and sell merchandise (t-shirts, caps, vinyls) to fans. Currently there's no merch presence on the website, missing an opportunity to drive traffic to the existing Shopify store.

### Solution
Integrate the Shopify Storefront API to:
1. Display a dedicated `/merch` page with full product grid
2. Add a featured merch carousel on the home page (below Spotify/Bandsintown widgets)
3. All product clicks drive traffic to Shopify for checkout

### Scope

**In Scope:**
- Shopify Storefront API integration (GraphQL)
- `/merch` page with responsive product grid
- Home page merch carousel with responsive breakpoints
- Product cards (image, title, price, link)
- Loading and error states
- Environment variable for API token

**Out of Scope:**
- On-site checkout/cart functionality
- Inventory management
- Product variants selection on-site
- Wishlist/favorites

## Context for Development

### Codebase Patterns

**Data Fetching Pattern (follow existing hooks):**
```typescript
// src/hooks/useShopifyProducts.ts
export function useShopifyProducts() {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchShopifyProducts()
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, error }
}
```

**Component Pattern (follow shadcn/ui style):**
- Use `cn()` utility for class merging
- Dark theme with CSS variables
- Zero border-radius (rounded-none)
- Orange accent color (#E65C00)

**Error Handling Pattern:**
- Use `WidgetErrorBoundary` for widget-level errors
- Internal error state with fallback UI

### Files to Reference

| Purpose | File Path |
|---------|-----------|
| Existing widget pattern | `src/components/SpotifyWidget.tsx` |
| Data hook pattern | `src/hooks/useReleases.ts` |
| Page layout pattern | `src/pages/Diskografi.tsx` |
| Home page structure | `src/pages/Hjem.tsx` |
| Routing config | `src/routes.tsx` |
| Type definitions | `src/types/sanity.ts` |
| Utils (cn function) | `src/lib/utils.ts` |

### Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| API | Shopify Storefront GraphQL | Only option for Storefront API |
| Carousel Library | Embla Carousel | Lightweight (3kb), React-native, great touch support, Tailwind-friendly |
| Token Storage | Environment variable | `VITE_SHOPIFY_STOREFRONT_TOKEN` |
| Best Sellers | Sort by `BEST_SELLING` in GraphQL | Native Shopify sorting |
| Caching | Simple useState | Sufficient for 20-30 products, no React Query needed |

## Implementation Plan

### Tasks

- [ ] **Task 1: Environment Setup**
  - Add `VITE_SHOPIFY_STOREFRONT_TOKEN` to `.env`
  - Add to `.env.example` with placeholder
  - Update Vercel environment variables

- [ ] **Task 2: Shopify API Client**
  - Create `src/lib/shopify/client.ts` with GraphQL fetch function
  - Create `src/lib/shopify/queries.ts` with product queries
  - Store URL: `merchforbands.myshopify.com`
  - API Version: `2024-01` (or latest stable)

- [ ] **Task 3: TypeScript Types**
  - Create `src/types/shopify.ts` with product interfaces
  - Types: `ShopifyProduct`, `ShopifyImage`, `ShopifyPrice`

- [ ] **Task 4: Data Hook**
  - Create `src/hooks/useShopifyProducts.ts`
  - Fetch all products sorted by best-selling
  - Return `{ products, loading, error }`

- [ ] **Task 5: Install Embla Carousel**
  - Run `npm install embla-carousel-react`
  - Create `src/components/ui/carousel.tsx` wrapper component

- [ ] **Task 6: Product Card Component**
  - Create `src/components/features/ProductCard.tsx`
  - Display: image, title, price
  - Link to Shopify product page
  - Hover effects matching site style

- [ ] **Task 7: Merch Carousel Component**
  - Create `src/components/features/MerchCarousel.tsx`
  - Responsive slides: 4 (desktop) / 2 (tablet) / 1 (mobile)
  - Navigation dots or arrows
  - Touch/swipe enabled

- [ ] **Task 8: Merch Page**
  - Create `src/pages/Merch.tsx`
  - Full responsive grid layout
  - SEO component with proper meta tags
  - Loading skeleton and error states

- [ ] **Task 9: Add Route**
  - Add `/merch` route to `src/routes.tsx`
  - Add navigation link to NavBar

- [ ] **Task 10: Home Page Integration**
  - Add MerchCarousel to `src/pages/Hjem.tsx`
  - Position: below Bandsintown widget
  - Section heading: "Merch" or "Fra Butikken"

- [ ] **Task 11: Testing & Polish**
  - Test responsive breakpoints
  - Verify Shopify links work correctly
  - Check loading/error states
  - Performance check (image optimization)

### Acceptance Criteria

- [ ] **AC1:** Given I visit `/merch`, When the page loads, Then I see all products from Shopify in a responsive grid
- [ ] **AC2:** Given I'm on any page, When I click a product, Then I'm redirected to the Shopify product page in a new tab
- [ ] **AC3:** Given I'm on the home page on desktop, When I view the merch section, Then I see 4 products with horizontal swipe for more
- [ ] **AC4:** Given I'm on the home page on tablet, When I view the merch section, Then I see 2 products with horizontal swipe
- [ ] **AC5:** Given I'm on the home page on mobile, When I view the merch section, Then I see 1 product with horizontal swipe
- [ ] **AC6:** Given the Shopify API is slow/down, When the page loads, Then I see a loading skeleton, then error message with retry option
- [ ] **AC7:** Given the products are displayed, When I view them, Then they match the site's dark theme and zero-radius style

## Additional Context

### Dependencies

**New npm packages:**
```bash
npm install embla-carousel-react
```

**Environment Variables:**
```env
VITE_SHOPIFY_STOREFRONT_TOKEN=e0366dffa5c655a92271d902f357863e
VITE_SHOPIFY_STORE_DOMAIN=merchforbands.myshopify.com
```

### Shopify GraphQL Query Reference

```graphql
query GetProducts($first: Int!, $sortKey: ProductSortKeys) {
  products(first: $first, sortKey: $sortKey) {
    edges {
      node {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
        onlineStoreUrl
      }
    }
  }
}
```

**API Endpoint:**
```
POST https://merchforbands.myshopify.com/api/2024-01/graphql.json
Headers:
  X-Shopify-Storefront-Access-Token: {token}
  Content-Type: application/json
```

### Testing Strategy

1. **Manual Testing:**
   - All breakpoints (mobile, tablet, desktop)
   - Touch gestures on real device
   - Shopify link navigation
   - Loading/error states

2. **Edge Cases:**
   - Empty product catalog
   - Single product
   - Product without image
   - Long product titles

### File Structure (New Files)

```
src/
├── lib/
│   └── shopify/
│       ├── client.ts          # GraphQL client
│       └── queries.ts         # Product queries
├── types/
│   └── shopify.ts             # TypeScript interfaces
├── hooks/
│   └── useShopifyProducts.ts  # Data fetching hook
├── components/
│   ├── ui/
│   │   └── carousel.tsx       # Embla wrapper
│   └── features/
│       ├── ProductCard.tsx    # Product display card
│       └── MerchCarousel.tsx  # Home page carousel
└── pages/
    └── Merch.tsx              # Full merch page
```

### Notes

- Products link to `onlineStoreUrl` from Shopify (opens in new tab)
- Best-sellers sort uses Shopify's native `BEST_SELLING` sort key
- Norwegian Krone (NOK) currency formatting with `Intl.NumberFormat`
- Images should use Shopify's built-in CDN resizing (append `_400x` etc.)
- Consider adding "Se alle" (View all) link from home carousel to `/merch` page
