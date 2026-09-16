import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { LogoMark } from './Logo'
import { statKeys } from '../data/site'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="kicker">{t('hero.kicker')}</p>
          <h1>
            <strong>{t('hero.titleStrong')}</strong>
            <span>{t('hero.titleSoft')}</span>
          </h1>
          <p className="lead">{t('hero.lead')}</p>
          <div className="hero-actions">
            <Link className="btn btn-dark" to="/#contact">
              {t('hero.ctaPrimary')}
              <Icon name="arrow" className="btn-icon" />
            </Link>
            <Link className="btn btn-ghost" to="/#products">
              <span className="play-dot">
                <Icon name="play" />
              </span>
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="device-laptop">
            <div className="device-screen">
              <div className="screen-top">
                <LogoMark variant="light" className="screen-mark" />
                <ul className="screen-menu">
                  <li>{t('hero.mock.menu.ideas')}</li>
                  <li>{t('hero.mock.menu.products')}</li>
                  <li>{t('hero.mock.menu.people')}</li>
                  <li>{t('hero.mock.menu.tomorrow')}</li>
                </ul>
              </div>
              <div className="screen-body">
                <div className="screen-copy">
                  <h3 className="multiline">{t('hero.mock.title')}</h3>
                  <p>{t('hero.mock.text')}</p>
                  <span className="screen-btn">{t('hero.mock.button')}</span>
                </div>
                <div className="screen-art mock-image" />
              </div>
            </div>
            <div className="device-base" />
          </div>

          <div className="device-phone">
            <div className="phone-screen">
              <div className="phone-head">
                <LogoMark className="phone-mark" />
                <span className="phone-avatar" />
              </div>
              <p className="phone-greeting">
                {t('hero.mock.greeting')}
                <em>{t('hero.mock.greetingLine')}</em>
                <strong>{t('hero.mock.greetingStrong')}</strong>
              </p>
              <div className="phone-card">
                <span className="phone-card-label">{t('hero.mock.growthLabel')}</span>
                <strong className="phone-card-value">{t('hero.mock.growthValue')}</strong>
                <div className="phone-chart">
                  {[28, 34, 44, 40, 58, 66, 78, 92].map((height, index) => (
                    <span key={index} style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
              <ul className="phone-list">
                <li>
                  <strong>12</strong>
                  <span>{t('hero.mock.activeProjects')}</span>
                </li>
                <li>
                  <strong>8</strong>
                  <span>{t('hero.mock.teamMembers')}</span>
                </li>
                <li>
                  <strong>24</strong>
                  <span>{t('hero.mock.weeksToLaunch')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stats-grid">
          {statKeys.map((key) => (
            <div className="stat" key={key}>
              <strong>{t(`stats.${key}.value`)}</strong>
              <span>{t(`stats.${key}.label`)}</span>
            </div>
          ))}
        </div>
        <p className="stats-motto">
          <i />
          {t('stats.motto')}
        </p>
      </div>
    </section>
  )
}
