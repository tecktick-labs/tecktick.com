import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { routePath } from '../lib/routes'
import {
  approachSteps,
  capabilities,
  promiseKeys,
  services,
  stackBrand,
  toolGroups,
} from '../data/site'

/** Açılır satırda gösterilen toplam araç sayısı */
const toolCount = toolGroups.reduce((total, group) => total + group.items.length, 0)

export function ServicesPage() {
  const { t } = useTranslation()
  useDocumentMeta(t('servicesPage.title'))

  return (
    <div className="page services-page">
      <Breadcrumbs
        items={[
          { label: t('nav.breadcrumbHome'), to: routePath('home') },
          { label: t('nav.services') },
        ]}
      />

      <header className="page-head is-compact">
        <h1>{t('servicesPage.title')}</h1>
      </header>

      {/* 1. Başlıca alanlar: dört kart ve koyu panel */}
      <section className="page-section">
        <h2 className="section-label">{t('servicesPage.offerTitle')}</h2>
        <div className="services-layout">
          <div className="service-grid">
            {services.map((service) => (
              <article
                className={`service-card${service.featured ? ' is-featured' : ''}`}
                key={service.id}
              >
                <Icon name={service.icon} className="service-icon" />
                <h3>{t(`services.items.${service.id}.title`)}</h3>
                <p>{t(`services.items.${service.id}.description`)}</p>
              </article>
            ))}
          </div>

          <article className="panel panel-dark panel-globe">
            <div className="mock-image mock-globe" />
            <div className="panel-body">
              <p className="kicker kicker-light">{t('services.panel.kicker')}</p>
              <h3 className="multiline">{t('services.panel.title')}</h3>
              <i className="rule" />
              <p>{t('services.panel.text')}</p>
            </div>
          </article>
        </div>
      </section>

      {/* 2. Slogan bandı */}
      <SloganBand text={t('servicesPage.slogan1')} />

      {/* 3. Yapabildiklerimiz: yoğun iki sütunlu liste */}
      <section className="page-section">
        <h2 className="section-label">{t('servicesPage.capabilityTitle')}</h2>
        <ul className="capability-grid">
          {capabilities.map((item) => (
            <li className="capability" key={item.key}>
              <span className="capability-icon">
                <Icon name={item.icon} />
              </span>
              <span className="capability-text">
                <strong>{t(`servicesPage.capabilities.${item.key}.title`)}</strong>
                <span>{t(`servicesPage.capabilities.${item.key}.text`)}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Süreç: dar dikey akış, yanında sabit duran not */}
      <section className="page-section process">
        <div className="process-main">
          <h2 className="section-label">{t('servicesPage.howTitle')}</h2>
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

        <aside className="promise">
          <p className="promise-slogan">{t('servicesPage.slogan2')}</p>
          <span className="promise-label">{t('servicesPage.promise.title')}</span>
          <ul>
            {promiseKeys.map((key) => (
              <li key={key}>
                <Icon name="check" />
                {t(`servicesPage.promise.${key}`)}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* 5. Araçlar: kapalı gelen, tıklanınca açılan satır */}
      <section className="page-section">
        <details className="tools-disclosure">
          <summary>
            <span className="tools-summary">
              <span className="tools-label">{t('servicesPage.toolsTitle')}</span>
              <span className="tools-brand">
                {stackBrand.first} <em>{stackBrand.second}</em>
              </span>
              <span className="tools-hint">{t('servicesPage.toolsHint')}</span>
            </span>
            <span className="tools-actions">
              <span className="tools-count">
                {t('servicesPage.toolsCount', { count: toolCount })}
              </span>
              <span className="tools-toggle" aria-hidden="true">
                <Icon name="plus" />
              </span>
            </span>
          </summary>

          <div className="tools-content">
            <p className="tools-note">{t('servicesPage.toolsNote')}</p>
            <div className="tool-groups">
              {toolGroups.map((group) => (
                <div className="tool-group" key={group.key}>
                  <span className="tool-group-label">
                    {t(`servicesPage.tools.${group.key}`)}
                  </span>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </details>
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

/** Bölümleri ayıran tam genişlikte slogan bandı */
function SloganBand({ text }: { text: string }) {
  return (
    <section className="slogan-band">
      <i className="rule" />
      <p>{text}</p>
    </section>
  )
}
