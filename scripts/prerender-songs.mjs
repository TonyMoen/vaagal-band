// Runs after `vite build`. Writes dist/<slug>/index.html for every release in Sanity.
//
// Why: the site is a single page app, and the apps people share links in
// (Messenger, Snapchat, Facebook, iMessage, Discord) do not run JavaScript.
// Without this they would all show the generic front page preview. Each file is
// the built index.html with the song's own title, description, canonical, Open
// Graph and Twitter tags, JSON-LD, a plain HTML fallback and the release data
// inlined so the page renders at once. Vercel serves real files before the
// catch-all rewrite in vercel.json, so /<slug> gets this file and the app boots
// from it as usual.
//
// It also adds the song pages to dist/sitemap.xml.
//
// A release added in Sanity after the last deploy still works (the app fetches
// it), it only lacks its own share preview until the next deploy.
//
// Mirrors slugify / songSlug / services in src/lib/songs.ts. Keep them in step.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const BASE_URL = 'https://vaagalband.no'
const BAND_NAME = 'Vågal'
const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/artist/5M9ZQMR3vvDdLgv1D43MO9'
const RESERVED_SLUGS = new Set(['konserter', 'bandet', 'diskografi', 'kontakt-oss', 'arrangor', 'merch', 'ai', 'assets'])

// ---------- config ----------
function fromDotEnv(key) {
  for (const file of ['.env.local', '.env']) {
    const full = path.join(root, file)
    if (!existsSync(full)) continue
    const match = readFileSync(full, 'utf8').match(new RegExp(`^${key}=(.*)$`, 'm'))
    if (match) return match[1].trim().replace(/^["']|["']$/g, '')
  }
  return undefined
}
const projectId = process.env.VITE_SANITY_PROJECT_ID || fromDotEnv('VITE_SANITY_PROJECT_ID') || 'h4lkrp1v'
const dataset = process.env.VITE_SANITY_DATASET || fromDotEnv('VITE_SANITY_DATASET') || 'production'

// ---------- helpers (mirrors of src/lib/songs.ts) ----------
const slugify = (input) =>
  input
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' og ')
    .replace(/['’`´]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

const songSlug = (release) => {
  const slug = release.slug?.current?.trim() || slugify(release.title)
  return RESERVED_SLUGS.has(slug) ? `${slug}-sang` : slug
}

const youtubeId = (url) => {
  if (!url) return null
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1) || null
    const fromQuery = parsed.searchParams.get('v')
    if (fromQuery) return fromQuery
    const match = parsed.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]{6,})/)
    return match ? match[1] : null
  } catch {
    return null
  }
}

const services = (release) => {
  const videoId = youtubeId(release.youtubeUrl)
  return [
    ['Spotify', release.spotifyUrl],
    ['Apple Music', release.appleMusicUrl],
    ['YouTube', videoId ? `https://www.youtube.com/watch?v=${videoId}` : release.youtubeUrl],
    ['YouTube Music', videoId ? `https://music.youtube.com/watch?v=${videoId}` : undefined],
    ['Tidal', release.tidalUrl],
    ['Deezer', release.deezerUrl],
    ['Amazon Music', release.amazonMusicUrl],
  ].filter(([, url]) => Boolean(url))
}

const artistNames = (release) => {
  const names = (release.artistLine ?? '')
    .split(/,|·|&| og /)
    .map((name) => name.trim())
    .filter(Boolean)
  return names.length > 0 ? names : [BAND_NAME]
}

const joinNames = (names) =>
  names.length <= 1 ? names.join('') : `${names.slice(0, -1).join(', ')} og ${names[names.length - 1]}`

const osloToday = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Oslo' }).format(new Date())

const formatDato = (iso) =>
  new Intl.DateTimeFormat('nb-NO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Oslo' }).format(
    new Date(`${iso}T12:00:00Z`),
  )

// Worded so the text stays true after the release date too: this file is only rebuilt on deploy.
const summaryFor = (release) => {
  const description = release.description?.trim()
  if (description) return description
  const who = joinNames(artistNames(release))
  const what = release.releaseType === 'EP' ? 'en EP' : release.releaseType === 'album' ? 'et album' : 'en singel'
  if (release.releaseDate > osloToday()) {
    return `«${release.title}» er ${what} fra ${who}. Slippdato ${formatDato(release.releaseDate)}.`
  }
  return `«${release.title}» er ${what} fra ${who}, utgitt ${release.releaseDate.slice(0, 4)}.`
}

const esc = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const escapeRe = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const jsonForScript = (value) => JSON.stringify(value).replace(/</g, '\\u003c')

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\s+${attr}="${escapeRe(key)}"\\s+content="[^"]*"\\s*/?>`, 'i')
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n  </head>`)
}

// ---------- run ----------
const indexPath = path.join(dist, 'index.html')
if (!existsSync(indexPath)) {
  console.error('prerender-songs: dist/index.html is missing. Run vite build first.')
  process.exit(1)
}
const template = readFileSync(indexPath, 'utf8')

// Same projection as releasesQuery in src/lib/sanity/queries.ts, plus the cover URL for the share image
const query = `*[_type == "release"] | order(releaseDate desc) {
  _id, title, slug, artistLine, releaseType, coverImage, releaseDate, description, presaveUrl,
  spotifyUrl, appleMusicUrl, youtubeUrl, tidalUrl, deezerUrl, amazonMusicUrl, isLatest,
  "coverUrl": coverImage.asset->url
}`

let releases
try {
  const endpoint = `https://${projectId}.apicdn.sanity.io/v2025-02-06/data/query/${dataset}?query=${encodeURIComponent(query)}`
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Sanity answered ${response.status}`)
  releases = (await response.json()).result ?? []
} catch (error) {
  // Never fail the deploy over this: the app still renders every song page on its own
  console.warn(`prerender-songs: skipped, could not reach Sanity (${error.message})`)
  process.exit(0)
}

const inlineReleases = releases.map(({ coverUrl: _coverUrl, ...release }) => release)
const written = []
const seen = new Set()

for (const release of releases) {
  if (!release.title || !release.releaseDate) continue
  const slug = songSlug(release)
  if (!slug || seen.has(slug)) continue
  seen.add(slug)

  const url = `${BASE_URL}/${slug}`
  const artists = artistNames(release)
  const links = services(release)
  const summary = summaryFor(release)
  const description = links.length
    ? `${summary} Hør «${release.title}» på ${links.map(([label]) => label).join(', ')}.`
    : summary
  const title = `${artists.length > 1 ? `${release.title} (${artists.join(', ')})` : release.title} | ${BAND_NAME}`
  const image = release.coverUrl
    ? `${release.coverUrl}?w=1200&h=630&fit=fill&bg=0a0a0a&fm=jpg&q=85`
    : `${BASE_URL}/og-image.jpg`

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': release.releaseType === 'album' || release.releaseType === 'EP' ? 'MusicAlbum' : 'MusicRecording',
        '@id': `${url}#recording`,
        url,
        name: release.title,
        byArtist: artists.map((name) =>
          name === BAND_NAME
            ? { '@type': 'MusicGroup', name, url: BASE_URL, sameAs: SPOTIFY_ARTIST_URL }
            : { '@type': 'MusicGroup', name },
        ),
        datePublished: release.releaseDate,
        inLanguage: 'nb-NO',
        ...(release.coverUrl ? { image: `${release.coverUrl}?w=1200&h=1200&fit=crop` } : {}),
        sameAs: links.map(([, link]) => link),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Hjem', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Diskografi', item: `${BASE_URL}/diskografi` },
          { '@type': 'ListItem', position: 3, name: release.title, item: url },
        ],
      },
    ],
  }

  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`)
  html = setMeta(html, 'name', 'description', description)
  html = setMeta(html, 'property', 'og:type', 'music.song')
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', description)
  html = setMeta(html, 'property', 'og:image', image)
  html = setMeta(html, 'property', 'og:image:width', '1200')
  html = setMeta(html, 'property', 'og:image:height', '630')
  html = setMeta(html, 'name', 'twitter:url', url)
  html = setMeta(html, 'name', 'twitter:title', title)
  html = setMeta(html, 'name', 'twitter:description', description)
  html = setMeta(html, 'name', 'twitter:image', image)

  const head = [
    `<link rel="canonical" href="${esc(url)}" />`,
    `<script type="application/ld+json">${jsonForScript(structuredData)}</script>`,
    `<script>window.__VAAGAL_RELEASES__=${jsonForScript(inlineReleases)}</script>`,
  ].join('\n    ')
  html = html.replace('</head>', `  ${head}\n  </head>`)

  // Plain HTML for readers that never run the app. React replaces it on start.
  const fallback = [
    '<main class="container-page py-16 text-center">',
    `<h1 class="font-condensed text-5xl font-bold uppercase">${esc(release.title)}</h1>`,
    `<p class="mt-4 text-lg font-semibold">${esc(artists.join(' · '))}</p>`,
    `<p class="mt-3">${esc(summary)}</p>`,
    links.length
      ? `<ul class="mt-6">${links.map(([label, link]) => `<li><a href="${esc(link)}">${esc(label)}</a></li>`).join('')}</ul>`
      : '',
    '</main>',
  ].join('')
  html = html.replace('<div id="root"></div>', `<div id="root">${fallback}</div>`)

  const dir = path.join(dist, slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(path.join(dir, 'index.html'), html)
  written.push({ slug, lastmod: release.releaseDate > osloToday() ? osloToday() : release.releaseDate })
}

// ---------- sitemap ----------
const sitemapPath = path.join(dist, 'sitemap.xml')
if (existsSync(sitemapPath) && written.length > 0) {
  const entries = written
    .map(
      ({ slug, lastmod }) =>
        `  <url>\n    <loc>${BASE_URL}/${slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`,
    )
    .join('\n')
  const sitemap = readFileSync(sitemapPath, 'utf8')
  writeFileSync(sitemapPath, sitemap.replace('</urlset>', `${entries}\n</urlset>`))
}

console.log(`prerender-songs: ${written.length} song pages (${written.map(({ slug }) => slug).join(', ')})`)
