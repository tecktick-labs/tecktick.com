import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { ProductIcon } from '../components/ProductIcon'
import { products, smallWorks } from '../data/site'

export function ProductsPage() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t('productsPage.title')} — ${t('meta.title')}`
    return () => {
      document.title = t('meta.title')
    }
  }, [t])

  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">{t('productsPage.kicker')}</p>
        <h1>{t('productsPage.title')}</h1>
        <p className="page-lead">{t('productsPage.text')}</p>
      </header>

      <section className="page-section">
        <h2 className="section-label">{t('productsPage.ownTitle')}</h2>
        <div className="product-grid">
          {products.map((product) => (
            <article className={`product-card tone-${product.tone}`} key={product.id}>
              <div className="product-top">
                <ProductIcon product={product} />
                <span className={`badge badge-${product.status}`}>
                  {product.status === 'live'
                    ? t('common.live')
                    : t('common.comingSoon')}
                </span>
              </div>

              <div className="product-body">
                <p className="product-category">
                  {t(`products.items.${product.key}.category`)}
                </p>
                <h3>
                  <Link to={`/products/${product.id}`}>
                    {t(`products.items.${product.key}.name`)}
                  </Link>
                </h3>
                <p className="product-tagline">
                  {t(`products.items.${product.key}.tagline`)}
                </p>
                <p className="product-description">
                  {t(`products.items.${product.key}.description`)}
                </p>
              </div>

              <ul className="meta-row">
                {product.metaKeys.map((metaKey) => (
                  <li key={metaKey}>{t(`products.meta.${metaKey}`)}</li>
                ))}
              </ul>

              <div className="product-links">
                <Link className="text-link" to={`/products/${product.id}`}>
                  {t('common.viewDetails')}
                  <Icon name="arrow" className="btn-icon" />
                </Link>
                {product.links.map((link) => (
                  <a
                    className="text-link is-quiet"
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
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-label">{t('productsPage.clientTitle')}</h2>
        <p className="small-works-slogan standalone-slogan">
          {t('products.smallWorks.slogan')}
        </p>
        <ul className="small-works-list">
          {smallWorks.map((work) => (
            <li key={work.id}>
              <a href={work.url} target="_blank" rel="noreferrer">
                <span className="small-works-name">
                  {t(`products.smallWorks.items.${work.key}.name`)}
                </span>
                <span className="small-works-category">
                  {t(`products.smallWorks.items.${work.key}.category`)}
                </span>
                <span className="small-works-description">
                  {t(`products.smallWorks.items.${work.key}.description`)}
                </span>
                <Icon name="arrow" className="btn-icon" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
