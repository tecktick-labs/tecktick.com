import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, type Language } from '../i18n'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const active = (i18n.resolvedLanguage ?? i18n.language) as Language

  return (
    <div className="lang-switch" role="group" aria-label={t('language.label')}>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          className={active === lang ? 'is-active' : undefined}
          aria-pressed={active === lang}
          lang={lang}
          onClick={() => void i18n.changeLanguage(lang)}
        >
          {t(`language.${lang}Short`)}
        </button>
      ))}
    </div>
  )
}
