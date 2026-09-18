import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from './Icons'
import { Wordmark } from './Logo'
import { contactEmail, legalPages } from '../data/site'
import { footerRoutes, legalPath, routePath } from '../lib/routes'

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
            <Link className="btn btn-mint" to={routePath('contact')}>
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
        <Link className="brand" to={routePath('home')}>
          <Wordmark variant="light" />
        </Link>
        <nav className="footer-nav" aria-label={t('nav.footer')}>
          {footerRoutes.map((item) => (
            <Link key={item.key} to={item.path}>
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>
        <p className="copyright">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
      </div>

      <div className="footer-legal">
        <nav aria-label={t('legal.updated')}>
          {legalPages.map((page) => (
            <Link key={page.id} to={legalPath(page.id)}>
              {t(`legal.pages.${page.key}.title`)}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
