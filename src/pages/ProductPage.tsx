import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { ProductIcon } from '../components/ProductIcon'
import { findProduct, products } from '../data/site'

export function ProductPage() {
  const { t } = useTranslation()
  const { productId } = useParams()
  const product = findProduct(productId)
  const productName = product ? t(`products.items.${product.key}.name`) : ''

  // Sekme başlığı ürün adını gösterir, sayfadan çıkınca site adına döner.
  useEffect(() => {
    if (!productName) return
    document.title = `${productName} — ${t('meta.title')}`
    return () => {
      document.title = t('meta.title')
    }
  }, [productName, t])

  if (!product) {
    return <Navigate to="/" replace />
  }

  const base = `productPages.items.${product.key}`
  const detail = product.detail ?? {}
  const related = products.filter((item) => item.id !== product.id).slice(0, 4)

  return (
    <article className="product-page">
      <header className="product-hero">
        <Link className="back-link" to="/products">
          <Icon name="arrowLeft" className="btn-icon" />
          {t('productPages.back')}
        </Link>

        <div className="product-hero-main">
          <ProductIcon product={product} size="large" />
          <div className="product-hero-text">
            <div className="product-hero-top">
              <p className="kicker">{t(`products.items.${product.key}.category`)}</p>
              <span className={`badge badge-${product.status}`}>
                {product.status === 'live'
                  ? t('common.live')
                  : t('common.comingSoon')}
              </span>
            </div>
            <h1>{t(`products.items.${product.key}.name`)}</h1>
            <p className="product-hero-tagline">
              {t(`products.items.${product.key}.tagline`)}
            </p>
          </div>
        </div>

        <div className="product-hero-foot">
          <ul className="meta-row">
            {product.metaKeys.map((metaKey) => (
              <li key={metaKey}>{t(`products.meta.${metaKey}`)}</li>
            ))}
          </ul>
          {product.links.length > 0 && (
            <div className="product-hero-links">
              {product.links.map((link) => (
                <a
                  className="btn btn-dark btn-sm"
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.kind === 'web'
                    ? t('common.visitSite')
                    : t('common.viewOnAppStore')}
                  <Icon name="arrow" className="btn-icon" />
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      <section className="product-section">
        <h2 className="section-label">{t('productPages.overviewTitle')}</h2>
        <div className="product-overview">
          <p>{t(`${base}.overview.p1`)}</p>
          <p>{t(`${base}.overview.p2`)}</p>
        </div>
      </section>

      {detail.statKeys && (
        <div className="product-stats">
          {detail.statKeys.map((key) => (
            <div className="stat" key={key}>
              <strong>{t(`${base}.stats.${key}.value`)}</strong>
              <span>{t(`${base}.stats.${key}.label`)}</span>
            </div>
          ))}
        </div>
      )}

      {detail.highlightKeys && (
        <section className="product-section">
          <h2 className="section-label">{t('productPages.highlightsTitle')}</h2>
          <div className="highlight-grid">
            {detail.highlightKeys.map((key) => (
              <article className="highlight-card" key={key}>
                <h3>{t(`${base}.highlights.${key}.title`)}</h3>
                <p>{t(`${base}.highlights.${key}.description`)}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {detail.journeyKeys && (
        <section className="product-section">
          <h2 className="section-label">{t('productPages.journeyTitle')}</h2>
          <ol className="journey">
            {detail.journeyKeys.map((key, index) => (
              <li key={key}>
                <span className="journey-step">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="journey-title">
                  {t(`${base}.journey.${key}`)}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {(detail.hasTech || detail.hasStatus) && (
        <div className="product-notes">
          {detail.hasTech && (
            <section className="note-card">
              <h2 className="section-label">{t('productPages.techTitle')}</h2>
              <p>{t(`${base}.tech.text`)}</p>
            </section>
          )}
          {detail.hasStatus && (
            <section className="note-card note-card-dark">
              <h2 className="section-label">{t('productPages.statusTitle')}</h2>
              <p>{t(`${base}.status.text`)}</p>
            </section>
          )}
        </div>
      )}

      {related.length > 0 && (
        <section className="product-section">
          <h2 className="section-label">{t('productPages.relatedTitle')}</h2>
          <div className="related-grid">
            {related.map((item) => (
              <Link
                className="related-card"
                key={item.id}
                to={`/products/${item.id}`}
              >
                <ProductIcon product={item} />
                <span className="related-text">
                  <strong>{t(`products.items.${item.key}.name`)}</strong>
                  <span>{t(`products.items.${item.key}.category`)}</span>
                </span>
                <Icon name="arrow" className="btn-icon" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="product-cta">
        <div>
          <h2>{t('productPages.ctaTitle')}</h2>
          <p>{t('productPages.ctaText')}</p>
        </div>
        <Link className="btn btn-dark" to="/contact">
          {t('productPages.ctaButton')}
          <Icon name="arrow" className="btn-icon" />
        </Link>
      </section>
    </article>
  )
}
