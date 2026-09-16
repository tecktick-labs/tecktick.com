import { useTranslation } from 'react-i18next'
import { Wordmark } from './Logo'
import { approachSteps } from '../data/site'

export function Approach() {
  const { t } = useTranslation()

  return (
    <section className="approach" id="about">
      <article className="approach-office">
        <div className="mock-image mock-office" />
        <div className="office-overlay">
          <div className="office-brand">
            <Wordmark variant="light" />
          </div>
          <p className="multiline">{t('approach.office')}</p>
          <i className="rule" />
        </div>
      </article>

      <article className="approach-steps">
        <p className="kicker">{t('approach.kicker')}</p>
        <div className="approach-body">
          <h2 className="multiline">{t('approach.title')}</h2>
          <ol className="step-list">
            {approachSteps.map((item) => (
              <li key={item.key}>
                <span className="step-number">{item.step}</span>
                <div>
                  <strong>{t(`approach.steps.${item.key}.title`)}</strong>
                  <p>{t(`approach.steps.${item.key}.description`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <i className="rule rule-mint" />
      </article>

      <article className="approach-vision">
        <div className="mock-image mock-gradient" />
        <p className="vision-text multiline">{t('approach.vision')}</p>
      </article>
    </section>
  )
}
