import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from './Icons'
import { Wordmark } from './Logo'
import { contactEmail, footerNavigation } from '../data/site'

export function Footer() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  // İletişim sayfasında aynı çağrı iki kez görünmesin
  const showCta = pathname !== '/contact'

  return (
    <footer className="footer" id="contact">
      {showCta && (
      <div className="cta">
        <div>
          <p className="kicker kicker-light">{t('footer.kicker')}</p>
          <h2 className="multiline">{t('footer.title')}</h2>
        </div>
        <div className="cta-side">
          <p>{t('footer.text')}</p>
          <div className="cta-actions">
            <Link className="btn btn-mint" to="/contact">
              {t('productPages.ctaButton')}
              <Icon name="arrow" className="btn-icon" />
            </Link>
            <a className="cta-email" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </div>
        </div>
      </div>
      )}

      <div className="footer-bottom">
        <Link className="brand" to="/">
          <Wordmark variant="light" />
        </Link>
        <nav className="footer-nav" aria-label={t('nav.footer')}>
          {footerNavigation.map((item) => (
            <Link key={item.to} to={item.to}>
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>
        <p className="copyright">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  )
}
