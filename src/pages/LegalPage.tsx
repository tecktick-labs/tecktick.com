import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatDate } from '../lib/format'
import { routePath } from '../lib/routes'
import { findLegalPage } from '../data/site'

type LegalSection = {
  heading: string
  body: string[]
  items?: string[]
}

export function LegalPage() {
  const { t, i18n } = useTranslation()
  const { legalId } = useParams()
  const page = findLegalPage(legalId)

  const base = page ? `legal.pages.${page.key}` : ''
  const title = page ? t(`${base}.title`) : ''
  const intro = page ? t(`${base}.intro`) : undefined
  useDocumentMeta(title || undefined, intro)

  if (!page) {
    return <Navigate to={routePath('home')} replace />
  }

  const language = i18n.resolvedLanguage ?? i18n.language
  const sections = t(`${base}.sections`, { returnObjects: true }) as LegalSection[]

  return (
    <article className="page legal-page">
      <Breadcrumbs
        items={[
          { label: t('nav.breadcrumbHome'), to: routePath('home') },
          { label: title },
        ]}
      />

      <header className="legal-head">
        <h1>{title}</h1>
        <p className="legal-intro">{intro}</p>
        <p className="legal-updated">
          {t('legal.updated')}{' '}
          <time dateTime={page.updated}>
            {formatDate(page.updated, language)}
          </time>
        </p>
      </header>

      <div className="legal-body">
        {sections.map((section, index) => (
          <section key={section.heading}>
            <h2>
              <span className="legal-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              {section.heading}
            </h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items && (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <footer className="legal-foot">
        <p>{t('legal.contactNote')}</p>
        <Link className="back-link" to={routePath('home')}>
          <Icon name="arrowLeft" className="btn-icon" />
          {t('legal.backToHome')}
        </Link>
      </footer>
    </article>
  )
}
