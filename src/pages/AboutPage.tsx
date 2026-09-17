import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ProductIcon } from '../components/ProductIcon'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { productPath, routePath } from '../lib/routes'
import {
  approachSteps,
  homeProducts,
  motto,
  siteStats,
  statKeys,
  valueKeys,
} from '../data/site'

export function AboutPage() {
  const { t } = useTranslation()
  useDocumentMeta(t('aboutPage.kicker'), t('aboutPage.lead'))

  return (
    <div className="page about-page">
      <Breadcrumbs
        items={[
          { label: t('nav.breadcrumbHome'), to: routePath('home') },
          { label: t('nav.about') },
        ]}
      />

      <header className="page-head">
        <h1 className="multiline">{t('aboutPage.title')}</h1>
        <p className="page-lead">{t('aboutPage.lead')}</p>
      </header>

      {/* 1. Geçmiş */}
      <section className="page-section">
        <article className="origin-card">
          <h2 className="multiline">{t('aboutPage.journeyTitle')}</h2>
          <p>{t('aboutPage.journeyText')}</p>
        </article>
      </section>

      {/* 2. Bakış açısı */}
      <section className="page-section">
        <h2 className="section-label">{t('aboutPage.approachTitle')}</h2>
        <div className="product-overview">
          <p>{t('aboutPage.approachText')}</p>
        </div>
      </section>

      {/* 3. Değerler */}
      <section className="page-section">
        <h2 className="section-label">{t('aboutPage.valuesTitle')}</h2>
        <div className="highlight-grid">
          {valueKeys.map((key) => (
            <article className="highlight-card" key={key}>
              <h3>{t(`aboutPage.values.${key}.title`)}</h3>
              <p>{t(`aboutPage.values.${key}.description`)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Kendi ürünlerimiz: metin + ürün kısayolları */}
      <section className="page-section own-work">
        <div className="own-copy">
          <h2 className="section-label">{t('aboutPage.ownTitle')}</h2>
          <p>{t('aboutPage.ownText')}</p>
          <Link className="text-link" to={routePath('products')}>
            {t('aboutPage.ownLink')}
            <Icon name="arrow" className="btn-icon" />
          </Link>
        </div>

        <ul className="own-list">
          {homeProducts.map((product) => (
            <li key={product.id}>
              <Link to={productPath(product.id)}>
                <ProductIcon product={product} />
                <span>
                  <strong>{t(`products.items.${product.key}.name`)}</strong>
                  <span>{t(`products.items.${product.key}.category`)}</span>
                </span>
                <Icon name="arrow" className="btn-icon" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Çalışma şekli: dikey akış */}
      <section className="page-section process">
        <div className="process-main">
          <h2 className="section-label">{t('aboutPage.workTitle')}</h2>
          <p className="process-intro">{t('aboutPage.workText')}</p>
          <ol className="process-steps">
            {approachSteps.map((item) => (
              <li key={item.key}>
                <span className="process-marker">{item.step}</span>
                <div className="process-body">
                  <strong>{t(`approach.steps.${item.key}.title`)}</strong>
                  <p>{t(`approach.steps.${item.key}.description`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="facts">
          <span className="section-label">{t('aboutPage.factsTitle')}</span>
          <div className="facts-grid">
            {statKeys.map((key) => (
              <div className="stat" key={key}>
                <strong>{siteStats[key]}</strong>
                <span>{t(`stats.${key}.label`)}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* 6. Kapanış mottosu */}
      <section className="motto-band">
        <i className="rule" />
        <p>{motto}</p>
      </section>

      <section className="product-cta">
        <div>
          <h2>{t('servicesPage.ctaTitle')}</h2>
          <p>{t('servicesPage.ctaText')}</p>
        </div>
        <Link className="btn btn-dark" to={routePath('contact')}>
          {t('productPages.ctaButton')}
          <Icon name="arrow" className="btn-icon" />
        </Link>
      </section>
    </div>
  )
}
