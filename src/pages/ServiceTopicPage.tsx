import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Icon } from '../components/Icons'
import { serviceTopics } from '../data/site'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { productPath, routePath } from '../lib/routes'

const PARTS = ['problem', 'approach', 'delivery'] as const
const QUESTIONS = ['q1', 'q2', 'q3'] as const

export function ServiceTopicPage() {
  const { t } = useTranslation()
  const { topicId } = useParams()
  const topic = serviceTopics.find((item) => item.id === topicId)
  const base = topic ? `serviceTopicsPage.items.${topic.key}` : ''
  useDocumentMeta(topic ? t(`${base}.title`) : undefined, topic ? t(`${base}.description`) : undefined)

  if (!topic) return <Navigate to={routePath('services')} replace />

  return (
    <article className="page service-topic-page">
      <Breadcrumbs items={[
        { label: t('nav.breadcrumbHome'), to: routePath('home') },
        { label: t('nav.services'), to: routePath('services') },
        { label: t(`${base}.title`) },
      ]} />
      <header className="page-head">
        <p className="kicker">{t('serviceTopicsPage.kicker')}</p>
        <h1>{t(`${base}.title`)}</h1>
        <p className="page-lead">{t(`${base}.lead`)}</p>
      </header>
      <div className="service-topic-sections">
        {PARTS.map((part, index) => (
          <section className="page-section service-topic-section" key={part}>
            <span className="service-topic-index">0{index + 1}</span>
            <div>
              <h2>{t(`${base}.parts.${part}.title`)}</h2>
              <p>{t(`${base}.parts.${part}.text`)}</p>
            </div>
          </section>
        ))}
      </div>
      <section className="page-section service-topic-faq">
        <h2 className="section-label">{t('serviceTopicsPage.questionsTitle')}</h2>
        <div>
          {QUESTIONS.map((question) => (
            <details key={question}>
              <summary>{t(`${base}.questions.${question}.title`)}</summary>
              <p>{t(`${base}.questions.${question}.answer`)}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="page-section service-topic-related">
        <div>
          <p className="kicker">{t('serviceTopicsPage.productKicker')}</p>
          <h2>{t('products.items.aiPlatform.name')}</h2>
          <p>{t('serviceTopicsPage.productText')}</p>
        </div>
        <Link className="btn btn-dark" to={productPath(topic.productId)}>
          {t('serviceTopicsPage.productLink')} <Icon name="arrow" className="btn-icon" />
        </Link>
      </section>
      <section className="product-cta">
        <div>
          <h2>{t('serviceTopicsPage.ctaTitle')}</h2>
          <p>{t('serviceTopicsPage.ctaText')}</p>
        </div>
        <Link className="btn btn-dark" to={routePath('contact')}>
          {t('productPages.ctaButton')} <Icon name="arrow" className="btn-icon" />
        </Link>
      </section>
    </article>
  )
}
