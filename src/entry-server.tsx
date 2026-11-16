import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import i18n from './i18n'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CookieConsent } from './components/CookieConsent'
import { Home } from './pages/Home'
import { ProductsPage } from './pages/ProductsPage'
import { ProductPage } from './pages/ProductPage'
import { ServicesPage } from './pages/ServicesPage'
import { ServiceTopicPage } from './pages/ServiceTopicPage'
import { AboutPage } from './pages/AboutPage'
import { InsightsPage } from './pages/InsightsPage'
import { InsightPage } from './pages/InsightPage'
import { ContactPage } from './pages/ContactPage'
import { LegalPage } from './pages/LegalPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PanelPage } from './pages/PanelPage'
import { beginPrerenderMeta, consumePrerenderMeta } from './hooks/useDocumentMeta'
import { insights, legalPages, products, serviceTopics } from './data/site'
import { insightPath, legalPath, localizedPath, productPath, routes, serviceTopicPath, stripLanguagePath } from './lib/routes'

const SITE_ORIGIN = 'https://tecktick.com'

export type PrerenderRouteInfo = {
  path: string
  lastmod?: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
  priority: string
  hasHreflang?: boolean
}

export function getPrerenderRoutes(): PrerenderRouteInfo[] {
  const mainRoutes: PrerenderRouteInfo[] = routes.filter((r) => r.key !== 'panel' && r.key !== 'serviceTopic').map((r) => ({
    path: r.path,
    changefreq: r.key === 'home' || r.key === 'products' || r.key === 'insights' ? 'weekly' : 'monthly',
    priority: r.key === 'home' ? '1.0' : r.key === 'services' || r.key === 'products' ? '0.9' : '0.8',
    hasHreflang: true,
  }))

  const productRoutes: PrerenderRouteInfo[] = products.map((p) => ({
    path: productPath(p.id),
    changefreq: 'monthly',
    priority: p.featured || p.id === 'ai-asistan-platformu' ? '0.8' : '0.7',
  }))

  const insightRoutes: PrerenderRouteInfo[] = insights.map((item) => ({
    path: insightPath(item.id),
    lastmod: item.date,
    changefreq: 'monthly',
    priority: item.featured ? '0.7' : '0.6',
  }))

  const legalRoutes: PrerenderRouteInfo[] = legalPages.map((page) => ({
    path: legalPath(page.id),
    lastmod: page.updated,
    changefreq: 'yearly',
    priority: '0.3',
  }))

  const topicRoutes: PrerenderRouteInfo[] = serviceTopics.map((topic) => ({
    path: serviceTopicPath(topic.id),
    changefreq: 'monthly',
    priority: '0.8',
  }))

  const contentRoutes = [...mainRoutes, ...productRoutes, ...insightRoutes, ...legalRoutes, ...topicRoutes]
  return [...contentRoutes, ...contentRoutes.map((route) => ({
    ...route,
    path: localizedPath(route.path, 'en'),
  })), {
    path: '/panel',
    changefreq: 'yearly',
    priority: '0',
  }]
}

export function renderRoute(url: string) {
  const language = url.startsWith('/en/') ? 'en' : 'tr'
  void i18n.changeLanguage(language)
  beginPrerenderMeta()

  const appHtml = renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={[stripLanguagePath(url)]}>
        {url === '/panel' ? <PanelPage /> : (
        <div className="site">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:productId" element={<ProductPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:topicId" element={<ServiceTopicPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/:insightId" element={<InsightPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/legal/:legalId" element={<LegalPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <CookieConsent />
        </div>
        )}
      </MemoryRouter>
    </StrictMode>,
  )

  const meta = consumePrerenderMeta()
  const siteName = i18n.t('meta.title')
  const fullTitle = meta.title ? `${meta.title} — ${siteName}` : siteName
  const description = meta.description ?? i18n.t('meta.description')
  const canonicalUrl = `${SITE_ORIGIN}${url}`

  const articleSchema = meta.article
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: meta.article.title,
        description: meta.article.description,
        datePublished: meta.article.date,
        author: { '@type': 'Organization', name: 'Tecktick Labs' },
        publisher: { '@type': 'Organization', name: 'Tecktick Labs' },
        mainEntityOfPage: canonicalUrl,
      })
    : null

  return {
    appHtml,
    fullTitle,
    description,
    canonicalUrl,
    articleSchema,
  }
}
