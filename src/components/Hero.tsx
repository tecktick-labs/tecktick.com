import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { LogoMark } from './Logo'
import { ProductIcon } from './ProductIcon'
import { heroPhoneProducts, motto, siteStats, statKeys } from '../data/site'
import { routePath } from '../lib/routes'

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
            <Link className="btn btn-glow" to={routePath('contact')}>
              {t('hero.ctaPrimary')}
              <Icon name="arrow" className="btn-icon" />
            </Link>
            <Link className="btn btn-ghost" to={routePath('services')}>
              <span className="icon-dot">
                <Icon name="grid" />
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
            {/* Telefon gerçek veriyi gösterir: yayındaki iş sayısı ve ürünler */}
            <div className="phone-screen">
              <div className="phone-head">
                <LogoMark className="phone-mark" />
                <span className="phone-avatar" />
              </div>
              <div className="phone-card">
                <span className="phone-card-label">{t('stats.shipped.label')}</span>
                <strong className="phone-card-value">{siteStats.shipped}</strong>
              </div>
              <p className="phone-title">{t('nav.products')}</p>
              <ul className="phone-products">
                {heroPhoneProducts.map((product) => (
                  <li key={product.id}>
                    <ProductIcon product={product} />
                    <span>
                      <strong>{t(`products.items.${product.key}.name`)}</strong>
                      <em className={`is-${product.status}`}>
                        {product.status === 'live' ? t('common.live') : t('common.comingSoon')}
                      </em>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stats-grid">
          {statKeys.map((key) => (
            <div className="stat" key={key}>
              <strong>{siteStats[key]}</strong>
              <span>{t(`stats.${key}.label`)}</span>
            </div>
          ))}
        </div>
        <p className="stats-motto">
          <i />
          {motto}
        </p>
      </div>
    </section>
  )
}
