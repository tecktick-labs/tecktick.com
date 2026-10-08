import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { onConsentOpen, readConsent, saveConsent, type ConsentChoice } from '../lib/consent'
import { legalPath } from '../lib/routes'

/**
 * Köşede duran küçük onay kartı. Sayfayı kapatmaz, kaydırmayı engellemez.
 * Seçimden sonra gizlenir; alt bilgideki "Çerez tercihleri" ile geri gelir.
 */
export function CookieConsent() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(() => readConsent() === null)

  useEffect(() => onConsentOpen(() => setIsOpen(true)), [])

  if (!isOpen) return null

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice)
    setIsOpen(false)
  }

  return (
    <section className="consent" aria-label={t('consent.label')}>
      <p className="consent-text">
        {t('consent.text')}{' '}
        <Link to={legalPath('cookies')}>{t('consent.policy')}</Link>
      </p>
      <div className="consent-actions">
        <button type="button" className="consent-btn" onClick={() => choose('denied')}>
          {t('consent.reject')}
        </button>
        <button
          type="button"
          className="consent-btn consent-btn-accept"
          onClick={() => choose('granted')}
        >
          {t('consent.accept')}
        </button>
      </div>
    </section>
  )
}
