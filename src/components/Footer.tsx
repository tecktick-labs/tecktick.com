import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { Wordmark } from './Logo'
import { contactEmail, navigation } from '../data/site'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer" id="contact">
      <div className="cta">
        <div>
          <p className="kicker kicker-light">{t('footer.kicker')}</p>
          <h2 className="multiline">{t('footer.title')}</h2>
        </div>
        <div className="cta-side">
          <p>{t('footer.text')}</p>
          <a className="btn btn-mint" href={`mailto:${contactEmail}`}>
            {contactEmail}
            <Icon name="arrow" className="btn-icon" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <Link className="brand" to="/">
          <Wordmark variant="light" />
        </Link>
        <nav className="footer-nav" aria-label={t('nav.footer')}>
          {navigation.map((item) => (
            <Link key={item.href} to={`/${item.href}`}>
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
