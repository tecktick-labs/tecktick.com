import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const ssrDir = path.join(rootDir, 'dist-ssr')

const escapeAttr = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
const { getPrerenderRoutes, renderRoute } = await import(
  new URL('../dist-ssr/entry-server.js', import.meta.url).href
)

const routes = getPrerenderRoutes()

for (const route of routes) {
  const { appHtml, fullTitle, description, canonicalUrl, articleSchema } = renderRoute(
    route.path,
  )

  const escapedTitle = escapeHtml(fullTitle)
  const escapedTitleAttr = escapeAttr(fullTitle)
  const escapedDescAttr = escapeAttr(description)
  const basePath = route.path === '/en/' ? '/' : route.path.startsWith('/en/') ? route.path.slice(3) : route.path
  const trUrl = `https://tecktick.com${basePath}`
  const enUrl = `https://tecktick.com/en${basePath}`
  const isEnglish = route.path.startsWith('/en/')

  let html = template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapedTitle}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapedDescAttr}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${escapedTitleAttr}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${escapedDescAttr}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${escapedTitleAttr}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${escapedDescAttr}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`,
    )
    .replace(
      /<link\s+rel="alternate"\s+hreflang="tr"\s+href="[^"]*"\s*\/>/,
      `<link rel="alternate" hreflang="tr" href="${trUrl}" />`,
    )
    .replace(
      /<link\s+rel="alternate"\s+hreflang="en"\s+href="[^"]*"\s*\/>/,
      `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
    )
    .replace(
      /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/>/,
      `<link rel="alternate" hreflang="x-default" href="${trUrl}" />`,
    )

  if (isEnglish) {
    html = html.replace('<html lang="tr">', '<html lang="en">')
      .replace('<meta property="og:locale" content="tr_TR" />', '<meta property="og:locale" content="en_US" />')
      .replace('<meta property="og:locale:alternate" content="en_US" />', '<meta property="og:locale:alternate" content="tr_TR" />')
  }

  if (route.path === '/panel') {
    html = html.replace('<meta name="robots" content="index, follow" />', '<meta name="robots" content="noindex, nofollow" />')
  }

  if (articleSchema) {
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${articleSchema}</script>\n  </head>`,
    )
  }

  const outPath =
    route.path === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.path.slice(1), 'index.html')

  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, html, 'utf-8')
}

// Otomatik sitemap.xml üretimi (dist/sitemap.xml ve public/sitemap.xml)
const sitemapEntries = routes.filter((route) => route.path !== '/panel')
  .map((route) => {
    const loc = `https://tecktick.com${route.path}`
    const basePath = route.path === '/en/' ? '/' : route.path.startsWith('/en/') ? route.path.slice(3) : route.path
    const trUrl = `https://tecktick.com${basePath}`
    const enUrl = `https://tecktick.com/en${basePath}`
    const hreflangLinks = route.path !== '/panel'
      ? [
          `    <xhtml:link rel="alternate" hreflang="tr" href="${trUrl}" />`,
          `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />`,
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${trUrl}" />`,
        ].join('\n') + '\n'
      : ''
    const lastmod = route.lastmod ? `    <lastmod>${route.lastmod}</lastmod>\n` : ''
    return `  <url>\n    <loc>${loc}</loc>\n${lastmod}    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n${hreflangLinks}  </url>`
  })
  .join('\n')

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset\n  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n  xmlns:xhtml="http://www.w3.org/1999/xhtml"\n>\n${sitemapEntries}\n</urlset>\n`

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8')
fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapXml, 'utf-8')

// Geçici SSR paketini temizle
fs.rmSync(ssrDir, { recursive: true, force: true })

console.log(`✓ Prerendered ${routes.length} static HTML pages and updated sitemap.xml`)
