import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { Wordmark } from '../components/Logo'
import { approachSteps, statKeys } from '../data/site'

const VALUE_KEYS = ['clarity', 'ownership', 'craft'] as const

export function AboutPage() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t('aboutPage.kicker')} — ${t('meta.title')}`
    return () => {
      document.title = t('meta.title')
    }
  }, [t])

  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">{t('aboutPage.kicker')}</p>
        <h1 className="multiline">{t('aboutPage.title')}</h1>
        <p className="page-lead">{t('aboutPage.lead')}</p>
      </header>

      <section className="page-section about-intro">
        <div>
          <h2 className="section-label">{t('aboutPage.storyTitle')}</h2>
          <div className="product-overview">
            <p>{t('aboutPage.story.p1')}</p>
            <p>{t('aboutPage.story.p2')}</p>
          </div>
        </div>

        <article className="about-card">
          <div className="mock-image mock-office" />
          <div className="office-overlay">
            <div className="office-brand">
              <Wordmark variant="light" />
            </div>
            <p className="multiline">{t('approach.office')}</p>
            <i className="rule" />
          </div>
        </article>
      </section>

      <section className="page-section">
        <h2 className="section-label">{t('aboutPage.factsTitle')}</h2>
        <div className="product-stats">
          {statKeys.map((key) => (
            <div className="stat" key={key}>
              <strong>{t(`stats.${key}.value`)}</strong>
              <span>{t(`stats.${key}.label`)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-label">{t('aboutPage.valuesTitle')}</h2>
        <div className="highlight-grid">
          {VALUE_KEYS.map((key) => (
            <article className="highlight-card" key={key}>
              <h3>{t(`aboutPage.values.${key}.title`)}</h3>
              <p>{t(`aboutPage.values.${key}.description`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-label">{t('approach.kicker')}</h2>
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
