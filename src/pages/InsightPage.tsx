import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { useArticleSchema, useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatDate } from '../lib/format'
import { insightPath, routePath } from '../lib/routes'
import { findInsight, insights } from '../data/site'

const BODY_KEYS = ['p1', 'p2', 'p3'] as const

export function InsightPage() {
  const { t, i18n } = useTranslation()
  const { insightId } = useParams()
  const item = findInsight(insightId)

  const title = item ? t(`insights.items.${item.key}.title`) : ''
  const summary = item ? t(`insights.items.${item.key}.excerpt`) : undefined
  useDocumentMeta(title || undefined, summary)
  useArticleSchema(
    item ? { title, description: summary ?? '', date: item.date } : undefined,
  )

  if (!item) {
    return <Navigate to={routePath('insights')} replace />
  }

  const language = i18n.resolvedLanguage ?? i18n.language
  const related = insights.filter((other) => other.id !== item.id).slice(0, 3)

  return (
    <article className="page note-page">
      <Breadcrumbs
        items={[
          { label: t('nav.breadcrumbHome'), to: routePath('home') },
          { label: t('nav.insights'), to: routePath('insights') },
          { label: title },
        ]}
      />

      <header className="note-head">
        <span className="news-meta">
          <span className="tag">{t(`insights.items.${item.key}.tag`)}</span>
          <span className="insight-status">
            {t(`insights.items.${item.key}.status`)}
          </span>
        </span>
        <h1>{title}</h1>
        <p className="note-lead">{summary}</p>
        <p className="note-date">
          {t('insightsPage.publishedOn')}{' '}
          <time dateTime={item.date}>{formatDate(item.date, language)}</time>
        </p>
      </header>

      <div className="note-body">
        {BODY_KEYS.map((key) => (
          <p key={key}>{t(`insights.items.${item.key}.body.${key}`)}</p>
        ))}
      </div>

      <section className="page-section">
        <h2 className="section-label">{t('insightsPage.relatedTitle')}</h2>
        <ul className="note-related">
          {related.map((other) => (
            <li key={other.id}>
              <Link to={insightPath(other.id)}>
                <span className="note-related-main">
                  <strong>{t(`insights.items.${other.key}.title`)}</strong>
                  <span>{t(`insights.items.${other.key}.tag`)}</span>
                </span>
                <time dateTime={other.date}>
                  {formatDate(other.date, language)}
                </time>
                <Icon name="arrow" className="btn-icon" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="note-foot">
        <Link className="back-link" to={routePath('insights')}>
          <Icon name="arrowLeft" className="btn-icon" />
          {t('insightsPage.backToList')}
        </Link>
      </div>
    </article>
  )
}
