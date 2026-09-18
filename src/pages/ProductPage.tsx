import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { linkLabelKey } from '../lib/labels'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { productPath, routePath } from '../lib/routes'
import { ProductIcon } from '../components/ProductIcon'
import { findProduct, products } from '../data/site'

export function ProductPage() {
  const { t } = useTranslation()
  const { productId } = useParams()
  const product = findProduct(productId)
  const productName = product ? t(`products.items.${product.key}.name`) : ''
  const productSummary = product
    ? t(`products.items.${product.key}.tagline`)
    : undefined
  useDocumentMeta(productName || undefined, productSummary)

  if (!product) {
    return <Navigate to="/products" replace />
  }

  const base = `productPages.items.${product.key}`
  const detail = product.detail ?? {}
  const related = products.filter((item) => item.id !== product.id).slice(0, 4)

  return (
    <article className="product-page">
      <Breadcrumbs
        items={[
          { label: t('nav.breadcrumbHome'), to: routePath('home') },
          { label: t('nav.products'), to: routePath('products') },
          { label: productName },
        ]}
      />

      <header className="product-hero">
        <Link className="back-link" to={routePath('products')}>
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
                  {t(linkLabelKey[link.kind])}
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

      {product.screenshots && product.screenshots.length > 0 && (
        <section className="product-section">
          <h2 className="section-label">{t('productPages.screenshotsTitle')}</h2>
          <div className="shot-rail">
            {product.screenshots.map((shot, index) => (
              <img
                key={shot}
                className="shot"
                src={shot}
                alt={`${productName} ${index + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        </section>
      )}

      {detail.platforms && (
        <section className="product-section">
          <h2 className="section-label">{t('productPages.platformsTitle')}</h2>
          <div className="platform-grid">
            {detail.platforms.map((platform) => (
              <article className="platform-card" key={platform.key}>
                <span className="platform-icon">
                  <Icon name={platform.icon} />
                </span>
                <div className="platform-body">
                  <h3>{t(`${base}.platforms.${platform.key}.title`)}</h3>
                  <p>{t(`${base}.platforms.${platform.key}.text`)}</p>
                </div>
                {platform.url && (
                  <a
                    className="platform-link"
                    href={platform.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t(`${base}.platforms.${platform.key}.title`)}
                  >
                    <Icon name="arrow" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {detail.featureKeys && (
        <section className="product-section">
          <h2 className="section-label">{t('productPages.featuresTitle')}</h2>
          <ul className="feature-grid">
            {detail.featureKeys.map((key) => (
              <li className="feature" key={key}>
                <Icon name="check" className="feature-check" />
                <span>
                  <strong>{t(`${base}.features.${key}.title`)}</strong>
                  <span>{t(`${base}.features.${key}.text`)}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
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
                to={productPath(item.id)}
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
        <Link className="btn btn-dark" to={routePath('contact')}>
          {t('productPages.ctaButton')}
          <Icon name="arrow" className="btn-icon" />
        </Link>
      </section>
    </article>
  )
}
