// Renders every public page to static HTML after `vite build`.
//
// The site is a React app, but search engines' first pass, link previews in
// Facebook/Messenger/Slack and most AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
// do not run JavaScript. So the build renders each page with the real components
// (dist-ssr/entry-server.js, from `vite build --ssr`) and writes the finished HTML:
//
//   dist/index.html, dist/<page>/index.html, dist/<song>/index.html
//   dist/404.html     real 404s for unknown addresses (Vercel serves it with status 404)
//   dist/app.html     the empty app shell for browser-only pages (/ai, /arrangor)
//   dist/sitemap.xml, dist/llms.txt
//
// Each page also carries the data it was rendered from (window.__VAAGAL_DATA__),
// so the app takes over the HTML instead of redrawing it.
//
// Content changes in Sanity or new dates on Bandsintown show up after the next
// build: api/cron.js asks Vercel for one every morning (see docs/seo.md).

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

if (!existsSync(path.join(dist, 'index.html')) || !existsSync(ssrEntry)) {
  console.error('prerender: run `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr` first')
  process.exit(1)
}

const { render, loadInitialData, pagesToBuild, buildSitemap, buildLlmsTxt } = await import(pathToFileURL(ssrEntry).href)

const template = readFileSync(path.join(dist, 'index.html'), 'utf8')

// The shell for pages that only run in the browser, before index.html becomes the rendered homepage
// (its default tags are marked so the app's own tags replace them instead of being added next to them)
writeFileSync(
  path.join(dist, 'app.html'),
  template.replace(/<!--seo-->([\s\S]*?)<!--\/seo-->/, (_, tags) => tags.replace(/<meta /g, '<meta data-rh="true" '))
)

const jsonForScript = (value) => JSON.stringify(value).replace(/</g, '\\u003c')

// Preload the two fonts every page shows above the fold
const fontFiles = readdirSync(path.join(dist, 'assets'))
const preloadFonts = ['barlow-latin-400-normal', 'barlow-condensed-latin-700-normal']
  .map((name) => fontFiles.find((file) => file.startsWith(name) && file.endsWith('.woff2')))
  .filter(Boolean)
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`)
  .join('\n    ')

function pageHtml({ html, head, htmlAttributes }, data) {
  return template
    .replace(/<html[^>]*>/, `<html ${htmlAttributes || 'lang="nb"'}>`)
    // The page's own head tags (title, description, canonical, Open Graph, JSON-LD) replace the defaults
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, `${head}\n    ${preloadFonts}`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('</head>', `  <script>window.__VAAGAL_DATA__=${jsonForScript(data)}</script>\n  </head>`)
}

function outputFile(page) {
  return page === '/' ? path.join(dist, 'index.html') : path.join(dist, page.replace(/^\//, ''), 'index.html')
}

const data = await loadInitialData()
const pages = pagesToBuild(data)

for (const page of pages) {
  const rendered = await render(page, data)
  const file = outputFile(page)
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, pageHtml(rendered, data))
}

// Any unknown address: the app's 404 view, served by Vercel with status 404
writeFileSync(path.join(dist, '404.html'), pageHtml(await render('/__finnes-ikke__', data), data))

writeFileSync(path.join(dist, 'sitemap.xml'), buildSitemap(data, pages))
writeFileSync(path.join(dist, 'llms.txt'), buildLlmsTxt(data))

// The server bundle is only needed during the build
rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })

console.log(
  `prerender: ${pages.length} pages + 404 (${data.releases.length} releases, ${data.concerts.length} upcoming and ${data.pastConcerts.length} past concerts)`
)
