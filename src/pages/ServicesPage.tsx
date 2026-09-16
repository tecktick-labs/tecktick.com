import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { approachSteps, services } from '../data/site'

export function ServicesPage() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t('servicesPage.title')} — ${t('meta.title')}`
    return () => {
      document.title = t('meta.title')
    }
  }, [t])

  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">{t('servicesPage.kicker')}</p>
        <h1>{t('servicesPage.title')}</h1>
        <p className="page-lead">{t('servicesPage.text')}</p>
      </header>

      <section className="page-section">
        <div className="services-layout">
          <div className="service-grid">
            {services.map((service) => (
              <article
                className={`service-card${service.featured ? ' is-featured' : ''}`}
                key={service.id}
              >
                <Icon name={service.icon} className="service-icon" />
                <h2>{t(`services.items.${service.id}.title`)}</h2>
                <p>{t(`services.items.${service.id}.description`)}</p>
              </article>
            ))}
          </div>

          <article className="panel panel-dark panel-globe">
            <div className="mock-image mock-globe" />
            <div className="panel-body">
              <p className="kicker kicker-light">{t('services.panel.kicker')}</p>
              <h2 className="multiline">{t('services.panel.title')}</h2>
              <i className="rule" />
              <p>{t('services.panel.text')}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-label">{t('servicesPage.howTitle')}</h2>
        <ol className="step-list step-list-wide">
          {approachSteps.map((item) => (
            <li key={item.key}>
              <span className="step-number">{item.step}</span>
              <div>
                <strong>{t(`approach.steps.${item.key}.title`)}</strong>
                <p>{t(`approach.steps.${item.key}.description`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="product-cta">
        <div>
          <h2>{t('servicesPage.ctaTitle')}</h2>
          <p>{t('servicesPage.ctaText')}</p>
        </div>
        <Link className="btn btn-dark" to="/contact">
          {t('productPages.ctaButton')}
          <Icon name="arrow" className="btn-icon" />
        </Link>
      </section>
    </div>
  )
}
