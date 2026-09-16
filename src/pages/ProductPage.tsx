import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { ProductIcon } from '../components/ProductIcon'
import { contactEmail, findProduct } from '../data/site'

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

  return (
    <article className="product-page">
      <header className="product-hero">
        <Link className="back-link" to="/#products">
          <Icon name="arrowLeft" className="btn-icon" />
          {t('productPages.back')}
        </Link>

        <div className="product-hero-main">
          <ProductIcon product={product} size="large" />
          <div>
            <p className="kicker">{t(`products.items.${product.key}.category`)}</p>
            <h1>{t(`products.items.${product.key}.name`)}</h1>
            <p className="product-hero-tagline">
              {t(`products.items.${product.key}.tagline`)}
            </p>
          </div>
          <span className={`badge badge-${product.status}`}>
            {product.status === 'live' ? t('common.live') : t('common.comingSoon')}
          </span>
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

      <section className="product-cta">
        <div>
          <h2>{t('productPages.ctaTitle')}</h2>
          <p>{t('productPages.ctaText')}</p>
        </div>
        <a className="btn btn-dark" href={`mailto:${contactEmail}`}>
          {contactEmail}
          <Icon name="arrow" className="btn-icon" />
        </a>
      </section>
    </article>
  )
}
