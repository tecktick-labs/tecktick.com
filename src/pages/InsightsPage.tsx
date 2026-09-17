import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatDate } from '../lib/format'
import { insightPath, routePath } from '../lib/routes'
import { filterInsights, insightProjects, insights, type Insight } from '../data/site'

export function InsightsPage() {
  const { t, i18n } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  useDocumentMeta(t('insightsPage.title'), t('insightsPage.text'))

  const language = i18n.resolvedLanguage ?? i18n.language
  const active = searchParams.get('project') ?? 'all'
  const visible = filterInsights(active)
  const featured = insights.find((item) => item.featured)
  const listed =
    active === 'all' ? visible.filter((item) => item.id !== featured?.id) : visible

  const setFilter = (key: string) => {
    setSearchParams(key === 'all' ? {} : { project: key }, { replace: true })
  }

  return (
    <div className="page news">
      <Breadcrumbs
        items={[
          { label: t('nav.breadcrumbHome'), to: routePath('home') },
          { label: t('nav.insights') },
        ]}
      />

      <header className="page-head">
        <p className="kicker">{t('insightsPage.kicker')}</p>
        <h1>{t('insightsPage.title')}</h1>
        <p className="page-lead">{t('insightsPage.text')}</p>
      </header>

      {featured && active === 'all' && (
        <FeaturedNews item={featured} language={language} />
      )}

      <section className="page-section">
        <div className="filter-bar">
          <div className="filter-chips" role="group">
            {insightProjects.map((key) => (
              <button
                key={key}
                type="button"
                className={`chip${active === key ? ' is-active' : ''}`}
                aria-pressed={active === key}
                onClick={() => setFilter(key)}
              >
                {t(`insightsPage.filters.${key}`)}
              </button>
            ))}
          </div>
          <p className="filter-count">
            {t('insightsPage.count', { count: visible.length })}
          </p>
        </div>

        {listed.length === 0 ? (
          <div className="empty-state">
            <h2>{t('insightsPage.emptyTitle')}</h2>
            <p>{t('insightsPage.emptyText')}</p>
          </div>
        ) : (
          <div className="news-grid">
            {listed.map((item) => (
              <article className={`news-card project-${item.project}`} key={item.id}>
                <Link to={insightPath(item.id)}>
                  <span className="news-meta">
                    <span className="tag">
                      {t(`insights.items.${item.key}.tag`)}
                    </span>
                    <time dateTime={item.date}>
                      {formatDate(item.date, language)}
                    </time>
                  </span>
                  <h2>{t(`insights.items.${item.key}.title`)}</h2>
                  <p>{t(`insights.items.${item.key}.excerpt`)}</p>
                  <span className="text-link">
                    {t('insightsPage.readMore')}
                    <Icon name="arrow" className="btn-icon" />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}

        <p className="note-footnote">{t('insightsPage.footnote')}</p>
      </section>
    </div>
  )
}

/** Listenin başındaki geniş haber kartı */
function FeaturedNews({ item, language }: { item: Insight; language: string }) {
  const { t } = useTranslation()

  return (
    <section className="news-featured">
      <div className="news-featured-body">
        <span className="news-featured-flag">{t('insightsPage.featured')}</span>
        <span className="news-meta is-light">
          <span className="tag">{t(`insights.items.${item.key}.tag`)}</span>
          <time dateTime={item.date}>{formatDate(item.date, language)}</time>
        </span>
        <h2>{t(`insights.items.${item.key}.title`)}</h2>
        <p>{t(`insights.items.${item.key}.excerpt`)}</p>
        <Link className="btn btn-mint" to={insightPath(item.id)}>
          {t('insightsPage.readMore')}
          <Icon name="arrow" className="btn-icon" />
        </Link>
      </div>
    </section>
  )
}
