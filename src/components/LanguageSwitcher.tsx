import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, type Language } from '../i18n'
import { useLocation } from 'react-router-dom'
import { localizedPath } from '../lib/routes'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const active = (i18n.resolvedLanguage ?? i18n.language) as Language
  const location = useLocation()

  const changeLanguage = (language: Language) => {
    localStorage.setItem('tecktick.lang', language)
    const query = new URLSearchParams(location.search)
    query.delete('lng')
    const search = query.size ? `?${query}` : ''
    window.location.assign(`${localizedPath(location.pathname, language)}${search}`)
  }

  return (
    <div className="lang-switch" role="group" aria-label={t('language.label')}>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          className={active === lang ? 'is-active' : undefined}
          aria-pressed={active === lang}
          lang={lang}
          onClick={() => changeLanguage(lang)}
        >
          {t(`language.${lang}Short`)}
        </button>
      ))}
    </div>
  )
}
