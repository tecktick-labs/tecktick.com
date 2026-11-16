import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { localizedPath, stripLanguagePath } from '../lib/routes'

export type PrerenderMeta = {
  title?: string
  description?: string
  article?: {
    title: string
    description: string
    date: string
  }
}

let activePrerenderMeta: PrerenderMeta | null = null

export function beginPrerenderMeta() {
  activePrerenderMeta = {}
}

export function consumePrerenderMeta(): PrerenderMeta {
  const result = activePrerenderMeta ?? {}
  activePrerenderMeta = null
  return result
}

function setMeta(selector: string, attribute: string, value: string) {
  const element = document.querySelector(selector)
  element?.setAttribute(attribute, value)
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang]):not([type])`
  let link = document.querySelector(selector)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    if (hreflang) link.setAttribute('hreflang', hreflang)
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

  if (activePrerenderMeta) {
    activePrerenderMeta.title = title
    activePrerenderMeta.description = description
  }

  useEffect(() => {
    const siteName = t('meta.title')
    const fullTitle = title ? `${title} — ${siteName}` : siteName
    const text = description ?? t('meta.description')
    const canonicalUrl = window.location.origin + window.location.pathname
    const basePath = stripLanguagePath(window.location.pathname)
    const turkishUrl = window.location.origin + localizedPath(basePath, 'tr')
    const englishUrl = window.location.origin + localizedPath(basePath, 'en')

    document.title = fullTitle
    document.documentElement.lang = language
    setMeta('meta[name="description"]', 'content', text)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', text)
    setMeta('meta[property="og:url"]', 'content', canonicalUrl)
    setMeta('meta[property="og:locale"]', 'content', language === 'en' ? 'en_US' : 'tr_TR')
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', text)
    setLink('canonical', canonicalUrl)
    setLink('alternate', turkishUrl, 'tr')
    setLink('alternate', englishUrl, 'en')
    setLink('alternate', turkishUrl, 'x-default')

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
  if (activePrerenderMeta && article) {
    activePrerenderMeta.article = article
  }

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
