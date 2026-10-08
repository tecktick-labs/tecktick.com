import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { SectionMore } from './SectionMore'
import { homeInsights } from '../data/site'
import { formatDate } from '../lib/format'
import { insightPath, routePath } from '../lib/routes'

export function Insights() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage ?? i18n.language

  return (
    <section className="section insights" id="insights">
      <div className="section-title">
        <p className="kicker">{t('insights.kicker')}</p>
        <h2>{t('insights.title')}</h2>
      </div>

      {/* Son güncellemeler: en yeni üstte, her güncelleme tek satır kutu */}
      <ol className="update-list">
        {homeInsights.map((item) => (
          <li key={item.id}>
            <Link className="update-row" to={insightPath(item.id)}>
              <time dateTime={item.date}>{formatDate(item.date, language)}</time>
              <span className="tag">{t(`insights.items.${item.key}.tag`)}</span>
              <span className="update-body">
                <strong>{t(`insights.items.${item.key}.title`)}</strong>
                <span>{t(`insights.items.${item.key}.excerpt`)}</span>
              </span>
              <span className="text-link">
                {t('insightsPage.readMore')}
                <Icon name="arrow" className="btn-icon" />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <SectionMore to={routePath('insights')} />
    </section>
  )
}
