import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { insightKeys } from '../data/site'

export function Insights() {
  const { t } = useTranslation()

  return (
    <section className="section insights" id="insights">
      <div className="section-head">
        <div>
          <p className="kicker">{t('insights.kicker')}</p>
          <h2 className="multiline">{t('insights.title')}</h2>
        </div>
        <div className="section-head-side">
          <p className="intro-text">{t('insights.text')}</p>
          <Link className="text-link" to="/insights">
            {t('insightsPage.title')}
            <Icon name="arrow" className="btn-icon" />
          </Link>
        </div>
      </div>

      <div className="insight-grid">
        {insightKeys.map((key) => (
          <article className="insight-card" key={key}>
            <div className="insight-meta">
              <span className="tag">{t(`insights.items.${key}.tag`)}</span>
              <span className="insight-status">{t(`insights.items.${key}.status`)}</span>
            </div>
            <h3>{t(`insights.items.${key}.title`)}</h3>
            <p>{t(`insights.items.${key}.excerpt`)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
