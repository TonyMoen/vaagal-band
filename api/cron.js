// Daily job (vercel.json "crons"): rebuild the site so the static pages pick up
// new concerts from Bandsintown and new content from Sanity, then tell Bing and
// the other IndexNow engines which pages exist.
//
// Needs two environment variables in the Vercel project (see docs/seo.md):
//   CRON_SECRET      any long random string; Vercel sends it with each cron call
//   DEPLOY_HOOK_URL  the project's deploy hook (Settings → Git → Deploy Hooks)

const SITE = 'https://vaagalband.no'
const INDEXNOW_KEY = 'aacdc681a1e84b217103dc7b528d51b2'

export async function GET(request) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const result = { rebuild: 'skipped: DEPLOY_HOOK_URL is not set', indexnow: 'skipped' }

  const hook = process.env.DEPLOY_HOOK_URL
  if (hook) {
    const response = await fetch(hook, { method: 'POST' })
    result.rebuild = `deploy hook answered ${response.status}`
  }

  // IndexNow: one ping with every URL in the sitemap
  try {
    const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text()
    const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'vaagalband.no',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    })
    result.indexnow = `${urlList.length} URLs, IndexNow answered ${response.status}`
  } catch (error) {
    result.indexnow = `failed: ${error.message}`
  }

  return Response.json(result)
}
