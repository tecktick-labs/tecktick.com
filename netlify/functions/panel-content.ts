import { getUser, verifyRequestOrigin } from '@netlify/identity'
import type { Context } from '@netlify/functions'

const REPO = 'tecktick-labs/tecktick.com'
const BRANCH = 'main'
const EDITABLE_ROOTS = new Set([
  'meta', 'hero', 'services', 'servicesPage', 'products', 'productsPage',
  'productPages', 'insights', 'insightsPage', 'aboutPage', 'contact',
  'approach', 'stats', 'footer', 'nav', 'common', 'serviceTopicsPage',
])

type Change = { path: string[]; expected: string; value: string }
type GitHubFile = { content: string; sha: string; encoding: string }

const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } })

function decodeBase64(encoded: string) {
  return Buffer.from(encoded.replace(/\s/g, ''), 'base64').toString('utf8')
}

function fieldAt(data: Record<string, unknown>, path: string[]) {
  let node: unknown = data
  for (const key of path) {
    if (!node || typeof node !== 'object' || Array.isArray(node) ||
      !Object.prototype.hasOwnProperty.call(node, key)) return undefined
    node = (node as Record<string, unknown>)[key]
  }
  return node
}

function setField(data: Record<string, unknown>, path: string[], value: string) {
  let node: Record<string, unknown> = data
  for (const key of path.slice(0, -1)) node = node[key] as Record<string, unknown>
  node[path.at(-1)!] = value
}

export default async (request: Request, _context: Context) => {
  const user = await getUser()
  if (!user) return json({ error: 'unauthorized' }, 401)
  if (!user.roles?.includes('editor')) return json({ error: 'forbidden' }, 403)

  const token = process.env.PANEL_GITHUB_TOKEN
  if (!token) return json({ error: 'not_configured' }, 503)

  const url = new URL(request.url)
  const lang = url.searchParams.get('lang')
  if (lang !== 'tr' && lang !== 'en') return json({ error: 'invalid_language' }, 400)
  if (request.method !== 'GET' && request.method !== 'PUT') return json({ error: 'method_not_allowed' }, 405)

  const githubUrl = `https://api.github.com/repos/${REPO}/contents/src/locales/${lang}.json`
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  }

  try {
    const response = await fetch(`${githubUrl}?ref=${BRANCH}`, { headers, cache: 'no-store' })
    if (!response.ok) return json({ error: 'source_unavailable' }, 502)
    const file = await response.json() as GitHubFile
    if (file.encoding !== 'base64') return json({ error: 'unexpected_encoding' }, 502)
    const data = JSON.parse(decodeBase64(file.content)) as Record<string, unknown>

    if (request.method === 'GET') return json({ data, sha: file.sha })

    verifyRequestOrigin(request)
    const body = await request.json() as { changes?: Change[]; sha?: string }
    if (body.sha !== file.sha) return json({ error: 'content_changed' }, 409)
    if (!Array.isArray(body.changes) || body.changes.length < 1 || body.changes.length > 50) {
      return json({ error: 'invalid_changes' }, 400)
    }
    const seen = new Set<string>()
    for (const change of body.changes) {
      if (!change || !Array.isArray(change.path) || change.path.length < 2 ||
        !change.path.every((part) => typeof part === 'string' && /^[a-zA-Z0-9]+$/.test(part)) ||
        !EDITABLE_ROOTS.has(change.path[0]) ||
        typeof change.expected !== 'string' || typeof change.value !== 'string' ||
        change.value.length > 10000 || !change.value.trim()) {
        return json({ error: 'invalid_changes' }, 400)
      }
      const key = change.path.join('.')
      if (seen.has(key)) return json({ error: 'invalid_changes' }, 400)
      seen.add(key)
      if (fieldAt(data, change.path) !== change.expected) {
        return json({ error: 'content_changed' }, 409)
      }
      setField(data, change.path, change.value)
    }

    const content = Buffer.from(`${JSON.stringify(data, null, 2)}\n`, 'utf8').toString('base64')
    const saved = await fetch(githubUrl, {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `content: update ${lang} translations from panel`,
        content,
        sha: file.sha,
        branch: BRANCH,
      }),
    })
    if (saved.status === 409) return json({ error: 'content_changed' }, 409)
    if (!saved.ok) return json({ error: 'publish_failed' }, 502)
    const result = await saved.json() as { content?: { sha?: string } }
    return json({ saved: true, sha: result.content?.sha })
  } catch {
    return json({ error: 'request_failed' }, 500)
  }
}
