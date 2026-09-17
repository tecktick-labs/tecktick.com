import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function setMeta(selector: string, attribute: string, value: string) {
  const element = document.querySelector(selector)
  element?.setAttribute(attribute, value)
}

function setLink(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

/**
 * Sekme başlığı, açıklama, paylaşım etiketleri ve canonical adres.
 * Her sayfa yalnızca başlığını ve özetini verir; geri kalanı burada kurulur.
 */
export function useDocumentMeta(title?: string, description?: string) {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage ?? i18n.language

  useEffect(() => {
    const siteName = t('meta.title')
    const fullTitle = title ? `${title} — ${siteName}` : siteName
    const text = description ?? t('meta.description')

    document.title = fullTitle
    document.documentElement.lang = language
    setMeta('meta[name="description"]', 'content', text)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', text)
    setLink('canonical', window.location.origin + window.location.pathname)

    return () => {
      document.title = siteName
      setMeta('meta[name="description"]', 'content', t('meta.description'))
    }
  }, [title, description, language, t])
}

/**
 * Haber sayfaları için Article yapısal verisi.
 * Arama motorlarının yazıyı tarih ve yazarıyla tanımasını sağlar.
 */
export function useArticleSchema(article?: {
  title: string
  description: string
  date: string
}) {
  useEffect(() => {
    if (!article) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      author: { '@type': 'Organization', name: 'Tecktick Labs' },
      publisher: { '@type': 'Organization', name: 'Tecktick Labs' },
      mainEntityOfPage: window.location.href,
    })
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [article?.title, article?.description, article?.date])
}
