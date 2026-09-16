import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { services } from '../data/site'

export function Services() {
  const { t } = useTranslation()

  return (
    <section className="section services" id="services">
      <div className="services-intro">
        <div>
          <p className="kicker">{t('services.kicker')}</p>
          <h2 className="multiline">{t('services.title')}</h2>
        </div>
        <p className="intro-text">{t('services.text')}</p>
        <Link className="text-link" to="/#products">
          {t('common.discoverServices')}
          <Icon name="arrow" className="btn-icon" />
        </Link>
      </div>

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
              <span className="card-arrow">
                <Icon name="arrow" />
              </span>
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
  )
}
