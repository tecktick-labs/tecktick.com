import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import tr from './locales/tr.json'
import en from './locales/en.json'

export const SUPPORTED_LANGUAGES = ['tr', 'en'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: Language = 'tr'
export const LANGUAGE_STORAGE_KEY = 'tecktick.lang'

/**
 * Tek çeviri kaynağı: src/locales/*.json
 * Arayüzde görünen hiçbir metin bileşenlerin içine yazılmaz.
 */
export const resources = {
  tr: { translation: tr },
  en: { translation: en },
} as const

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    detection: {
      // Varsayılan her zaman Türkçe; tarayıcı dili bilerek kullanılmaz.
      order: ['querystring', 'localStorage', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ['localStorage'],
    },
  })

export default i18n
