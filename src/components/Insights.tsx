import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { homeInsights } from '../data/site'
import { formatDate } from '../lib/format'
import { insightPath, routePath } from '../lib/routes'

export function Insights() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage ?? i18n.language

  return (
    <section className="section insights" id="insights">
      <div className="section-head">
        <div>
          <p className="kicker">{t('insights.kicker')}</p>
          <h2 className="multiline">{t('insights.title')}</h2>
        </div>
        <div className="section-head-side">
          <p className="intro-text">{t('insights.text')}</p>
          <Link className="text-link" to={routePath('insights')}>
            {t('insightsPage.title')}
            <Icon name="arrow" className="btn-icon" />
          </Link>
        </div>
      </div>

      <div className="insight-grid">
        {homeInsights.map((item) => (
          <article className="insight-card" key={item.id}>
            <Link to={insightPath(item.id)}>
              <div className="insight-meta">
                <span className="tag">{t(`insights.items.${item.key}.tag`)}</span>
                <time dateTime={item.date}>{formatDate(item.date, language)}</time>
              </div>
              <h3>{t(`insights.items.${item.key}.title`)}</h3>
              <p>{t(`insights.items.${item.key}.excerpt`)}</p>
              <span className="text-link">
                {t('insightsPage.readMore')}
                <Icon name="arrow" className="btn-icon" />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
