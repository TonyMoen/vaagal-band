# SEO and AI discoverability

How vaagalband.no gets found by search engines, link previews and AI assistants,
and the few things that have to be set up by hand in Vercel, Sanity and the
search consoles.

## How it works

The site is a React app, but most crawlers never run JavaScript: Google's first
pass, Bing, Facebook/Messenger/Slack link previews, and the AI crawlers
(GPTBot, ClaudeBot, PerplexityBot). So the build renders every public page to
finished HTML with the same components the browser uses:

```
npm run build
  1. tsc -b                                     type check
  2. vite build                                 the browser app  -> dist/
  3. vite build --ssr src/entry-server.tsx      the same app for Node -> dist-ssr/
  4. node scripts/prerender.mjs                 fetches Sanity + Bandsintown once, renders every page
```

`scripts/prerender.mjs` writes:

| File | What it is |
| --- | --- |
| `dist/index.html`, `dist/<page>/index.html` | The seven main pages (`STATIC_PAGES` in `src/routes.tsx`) |
| `dist/<slug>/index.html` | One page per release in Sanity: vaagalband.no/hjortejakt, … |
| `dist/404.html` | The 404 page. Vercel serves it with status 404 for any unknown address |
| `dist/app.html` | Empty app shell for the browser-only pages `/ai` and `/arrangor` |
| `dist/sitemap.xml` | Every page above, with last-modified dates |
| `dist/llms.txt` | Plain-text summary of the band for AI assistants: facts, concerts, songs, booking |

Each page carries its own title, description, canonical URL, Open Graph tags and
one JSON-LD block (`src/lib/schema.ts`): the band as a `MusicGroup`, concerts as
`MusicEvent`, songs as `MusicRecording` (with lyrics when they are in Sanity),
questions as `FAQPage`, and breadcrumbs.

### Where to change facts

All facts about the band (hometown, founding year, genres, set length, event
types, booking contact, official profiles) live in **`src/lib/band.ts`**. The
pages, the JSON-LD and llms.txt all read from there, so they never disagree.
Members, releases, the hero and the press kit live in Sanity.

## Keeping the pages fresh

Because the pages are built ahead of time, a new concert on Bandsintown or a new
song in Sanity appears after the next build. Visitors with JavaScript still see
live data (the app refetches in the background), but crawlers see the built
version.

- **Daily:** `api/cron.js` runs every morning at 04:15 UTC (`crons` in `vercel.json`).
  It triggers a rebuild through a deploy hook, then pings IndexNow (Bing, Yandex,
  Seznam, Naver) with every URL in the sitemap.
- **Immediately (optional):** a Sanity webhook can call the same deploy hook
  whenever content is published.

## One-time setup

### 1. Vercel environment variables

Quickest: logged in to the Vercel CLI (`npx vercel login`), run

```bash
node scripts/setup-daily-rebuild.mjs
```

It creates the deploy hook, stores `DEPLOY_HOOK_URL` and a random `CRON_SECRET`
as production secrets without printing them, and rebuilds once. Test the job
afterwards with `npx vercel crons run /api/cron`. By hand instead, in Vercel → the project → Settings:

1. **Git → Deploy Hooks:** create a hook named `daily-rebuild` for branch `main`. Copy the URL.
2. **Environment Variables** (Production):

   | Name | Value |
   | --- | --- |
   | `DEPLOY_HOOK_URL` | the deploy hook URL from step 1 |
   | `CRON_SECRET` | any long random string, for example from `node -e "console.log(crypto.randomUUID())"`. Vercel sends it with each cron call, so nobody else can trigger the job |

3. Redeploy once so the cron job picks the variables up. Settings → Cron Jobs
   shows the job, and "Run" triggers it by hand. The answer looks like
   `{"rebuild":"deploy hook answered 201","indexnow":"18 URLs, IndexNow answered 200"}`.

Without `DEPLOY_HOOK_URL` the job still pings IndexNow but does not rebuild.

### 2. Sanity webhook (optional, for instant updates)

sanity.io/manage → project `h4lkrp1v` → API → Webhooks → Create webhook:

- **URL:** the same deploy hook URL
- **Dataset:** production
- **Trigger on:** Create, Update, Delete
- **Filter:** `_type in ["release", "hero", "bandMember", "promoterMaterials"]`
- **HTTP method:** POST, no payload needed
- Leave "Trigger webhook when drafts are modified" off

### 3. Visitor statistics (optional)

Vercel Web Analytics (cookieless visitor counts) and Speed Insights (real
visitors' load times) are in the code but switched off, because their scripts
404 until the products are enabled. To switch them on:

1. Vercel → the project → Analytics → Enable, and Speed Insights → Enable.
2. Add the environment variable `VITE_ANALYTICS` = `on` (Production) and redeploy.

### 4. Google Search Console

1. https://search.google.com/search-console → Add property → **Domain** → `vaagalband.no`.
2. Add the TXT record Google shows at the domain's DNS provider, then Verify.
3. Sitemaps → submit `https://vaagalband.no/sitemap.xml`.
4. URL inspection → `https://vaagalband.no/` → Request indexing. Repeat for `/booking` and `/konserter`.

### 5. Bing Webmaster Tools

1. https://www.bing.com/webmasters → Add site → **Import from Google Search Console**
   (fastest; the sitemap comes along). Otherwise verify with the DNS record and submit the sitemap.
2. Bing's index feeds Copilot and is one of the sources behind ChatGPT search, so this one matters for AI answers.
3. IndexNow (the daily job) keeps Bing up to date after that.

## Checking that it works

| Check | Where |
| --- | --- |
| The HTML has real text (no JavaScript needed) | `curl -s https://vaagalband.no/booking` or view-source in the browser |
| Band, concerts and FAQ structured data | https://validator.schema.org/ with `https://vaagalband.no/` and `/konserter` |
| Google accepts the concerts and FAQ | https://search.google.com/test/rich-results |
| Link preview image and text | https://developers.facebook.com/tools/debug/ |
| What AI assistants read | https://vaagalband.no/llms.txt |
| Unknown address gives a real 404 | `curl -sI https://vaagalband.no/finnes-ikke` |

## Rules for code that renders on the server

Pages are rendered once in Node during the build and then taken over
("hydrated") in the browser. The HTML from both must match, so:

- Read today's date with `useToday()` (`src/hooks/useToday.ts`), never `new Date()`
  during render. It returns the build date first, then switches to the real date.
- Format dates with the helpers in `src/lib/concerts.ts`. They use fixed Norwegian
  month and weekday names, so Node and every browser print the same text.
- Do not touch `window`, `document` or `localStorage` while rendering; do it in
  `useEffect`.
- Data comes from react-query hooks seeded with the build's data
  (`seededFrom` in `src/lib/initialData.ts`); new hooks for public pages should do the same.
- Components loaded with `React.lazy` must not render on the server. Render them
  after mount instead (see the contact form in `src/pages/KontaktOss.tsx`).
- A new public page needs a route in `src/routes.tsx` and an entry in `STATIC_PAGES`,
  or it will 404.
