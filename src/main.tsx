import { StrictMode, Suspense, lazy, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import './i18n'
import './styles.css'

/**
 * Ana sayfa dışındaki sayfalar ayrı paketlere bölünür.
 * Sayfa sayısı arttıkça ilk yükleme boyutu sabit kalır.
 */
const ProductsPage = lazy(() =>
  import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })),
)
const ProductPage = lazy(() =>
  import('./pages/ProductPage').then((m) => ({ default: m.ProductPage })),
)
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })),
)
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const InsightsPage = lazy(() =>
  import('./pages/InsightsPage').then((m) => ({ default: m.InsightsPage })),
)
const InsightPage = lazy(() =>
  import('./pages/InsightPage').then((m) => ({ default: m.InsightPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

/** Dil değişince <html lang> ve site geneli başlık güncellenir. */
function useLanguageSync() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage ?? i18n.language

  useEffect(() => {
    document.documentElement.lang = language
  }, [language, t])
}

/** Her sayfa geçişinde içerik baştan başlar. */
function ScrollManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return null
}

function App() {
  useLanguageSync()

  return (
    <div className="site">
      <ScrollManager />
      <Header />
      <main>
        <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:insightId" element={<InsightPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
