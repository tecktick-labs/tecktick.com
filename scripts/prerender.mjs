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
      `<link rel="alternate" hreflang="tr" href="${canonicalUrl}" />`,
    )
    .replace(
      /<link\s+rel="alternate"\s+hreflang="en"\s+href="[^"]*"\s*\/>/,
      `<link rel="alternate" hreflang="en" href="${canonicalUrl}?lng=en" />`,
    )
    .replace(
      /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/>/,
      `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`,
    )

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
const sitemapEntries = routes
  .map((route) => {
    const loc = `https://tecktick.com${route.path === '/' ? '/' : route.path}`
    const hreflangLinks = route.hasHreflang
      ? [
          `    <xhtml:link rel="alternate" hreflang="tr" href="${loc}" />`,
          `    <xhtml:link rel="alternate" hreflang="en" href="${loc}?lng=en" />`,
          ...(route.path === '/'
            ? [`    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />`]
            : []),
        ].join('\n') + '\n'
      : ''
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${route.lastmod}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n${hreflangLinks}  </url>`
  })
  .join('\n')

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset\n  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n  xmlns:xhtml="http://www.w3.org/1999/xhtml"\n>\n${sitemapEntries}\n</urlset>\n`

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8')
fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapXml, 'utf-8')

// Geçici SSR paketini temizle
fs.rmSync(ssrDir, { recursive: true, force: true })

console.log(`✓ Prerendered ${routes.length} static HTML pages and updated sitemap.xml`)
