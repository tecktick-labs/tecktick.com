import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { insightKeys } from '../data/site'

export function InsightsPage() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t('insightsPage.title')} — ${t('meta.title')}`
    return () => {
      document.title = t('meta.title')
    }
  }, [t])

  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">{t('insightsPage.kicker')}</p>
        <h1>{t('insightsPage.title')}</h1>
        <p className="page-lead">{t('insightsPage.text')}</p>
      </header>

      <section className="page-section">
        <div className="note-list">
          {insightKeys.map((key) => (
            <article className="note-entry" key={key}>
              <div className="note-entry-side">
                <span className="tag">{t(`insights.items.${key}.tag`)}</span>
                <span className="insight-status">
                  {t(`insights.items.${key}.status`)}
                </span>
              </div>
              <div className="note-entry-body">
                <h2>{t(`insights.items.${key}.title`)}</h2>
                <p>{t(`insights.items.${key}.excerpt`)}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="note-footnote">{t('insightsPage.footnote')}</p>
      </section>
    </div>
  )
}
