// One-time setup for the daily rebuild (api/cron.js, see docs/seo.md).
//
// Run it yourself from the project folder, logged in to the Vercel CLI:
//
//   node scripts/setup-daily-rebuild.mjs
//
// It creates a deploy hook for main (or reuses it), stores its URL and a fresh
// random CRON_SECRET as production secrets, and starts one rebuild so the cron
// job picks them up. Neither value is printed: they go straight to Vercel.
// Running it again replaces the secret and keeps the same hook.

import { spawnSync } from 'node:child_process'
import { randomBytes } from 'node:crypto'

const HOOK_NAME = 'daily-rebuild'

function vercel(args, input) {
  const result = spawnSync('npx', ['-y', 'vercel@latest', ...args], {
    shell: true,
    input,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  })
  if (result.status !== 0) {
    console.error(`vercel ${args.join(' ')} failed:\n${(result.stderr || result.stdout || '').trim()}`)
    process.exit(1)
  }
  return result.stdout
}

/** The URL of the deploy hook with our name, from `deploy-hooks ls --json`, or null */
function findHookUrl() {
  const found = []
  const walk = (value) => {
    if (Array.isArray(value)) value.forEach(walk)
    else if (value && typeof value === 'object') {
      if (value.name === HOOK_NAME && typeof value.url === 'string') found.push(value.url)
      Object.values(value).forEach(walk)
    }
  }
  const out = vercel(['deploy-hooks', 'ls', '--json'])
  try {
    // The JSON starts at the first bracket; anything before it is CLI chatter
    walk(JSON.parse(out.slice(out.search(/[[{]/))))
  } catch {
    // Older CLI output: fall back to the first hook URL in the text
    const match = out.match(/https:\/\/api\.vercel\.com\/v1\/integrations\/deploy\/\S+/)
    if (match) found.push(match[0])
  }
  return found[0] ?? null
}

console.log('1/4 Deploy hook …')
let hookUrl = findHookUrl()
if (!hookUrl) {
  const created = vercel(['deploy-hooks', 'create', HOOK_NAME, '--ref', 'main'])
  hookUrl = created.match(/https:\/\/api\.vercel\.com\/v1\/integrations\/deploy\/\S+/)?.[0] ?? findHookUrl()
}
if (!hookUrl) {
  console.error('Could not find the deploy hook URL. Create it in Vercel → Settings → Git → Deploy Hooks and run again.')
  process.exit(1)
}

console.log('2/4 DEPLOY_HOOK_URL …')
vercel(['env', 'add', 'DEPLOY_HOOK_URL', 'production', '--sensitive', '--force', '--yes'], hookUrl)

console.log('3/4 CRON_SECRET …')
vercel(['env', 'add', 'CRON_SECRET', 'production', '--sensitive', '--force', '--yes'], randomBytes(32).toString('hex'))

console.log('4/4 Rebuilding production so the cron job sees them …')
const response = await fetch(hookUrl, { method: 'POST' })
if (!response.ok) {
  console.error(`The deploy hook answered ${response.status}. Redeploy from the Vercel dashboard instead.`)
  process.exit(1)
}

console.log('Done. vaagalband.no now rebuilds every morning (04:15 UTC) and pings IndexNow.')
console.log('Test it any time with: npx vercel crons run /api/cron')
