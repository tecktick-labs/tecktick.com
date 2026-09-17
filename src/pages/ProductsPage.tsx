import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { ProductIcon } from '../components/ProductIcon'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { FeaturedRail } from '../components/FeaturedRail'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { productPath, routePath } from '../lib/routes'
import {
  featuredProducts,
  filterProducts,
  productFilters,
  smallWorks,
} from '../data/site'

export function ProductsPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  useDocumentMeta(t('productsPage.title'))

  const active = searchParams.get('filter') ?? 'all'
  const listed = filterProducts(active)

  const setFilter = (key: string) => {
    if (key === 'all') {
      setSearchParams({}, { replace: true })
      return
    }
    setSearchParams({ filter: key }, { replace: true })
  }

  return (
    <div className="page">
      <Breadcrumbs
        items={[
          { label: t('nav.breadcrumbHome'), to: routePath('home') },
          { label: t('nav.products') },
        ]}
      />

      <header className="page-head is-compact">
        <h1>{t('productsPage.title')}</h1>
      </header>

      <FeaturedRail items={featuredProducts} />

      <section className="page-section">
        <div className="filter-bar">
          <div className="filter-chips" role="group">
            {productFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                className={`chip${active === filter.key ? ' is-active' : ''}`}
                aria-pressed={active === filter.key}
                onClick={() => setFilter(filter.key)}
              >
                {t(`productsPage.filters.${filter.key}`)}
              </button>
            ))}
          </div>
          <p className="filter-count">
            {t('productsPage.count', { count: listed.length })}
          </p>
        </div>

        {listed.length === 0 ? (
          <div className="empty-state">
            <h2>{t('productsPage.emptyTitle')}</h2>
            <p>{t('productsPage.emptyText')}</p>
            <button type="button" className="btn btn-dark" onClick={() => setFilter('all')}>
              {t('productsPage.emptyAction')}
              <Icon name="arrow" className="btn-icon" />
            </button>
          </div>
        ) : (
          <ul className="work-list">
            {listed.map((product) => (
              <li key={product.id}>
                <Link className="work-row" to={productPath(product.id)}>
                  <ProductIcon product={product} />
                  <span className="work-main">
                    <span className="work-title">
                      {t(`products.items.${product.key}.name`)}
                      <span className={`badge badge-${product.status}`}>
                        {product.status === 'live'
                          ? t('common.live')
                          : t('common.comingSoon')}
                      </span>
                    </span>
                    <span className="work-category">
                      {t(`products.items.${product.key}.category`)}
                    </span>
                  </span>
                  <span className="work-tagline">
                    {t(`products.items.${product.key}.tagline`)}
                  </span>
                  <span className="work-meta">
                    {product.metaKeys.slice(0, 2).map((metaKey) => (
                      <span key={metaKey}>{t(`products.meta.${metaKey}`)}</span>
                    ))}
                  </span>
                  <Icon name="arrow" className="btn-icon" />
                </Link>
              </li>
            ))}
          </ul>
        )}
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
