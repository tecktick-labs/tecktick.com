import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ReferenceLogo } from '../components/ReferenceLogo'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { routePath } from '../lib/routes'
import { experienceKeys, references, valueKeys } from '../data/site'

/**
 * Hakkımızda yalnızca "biz kimiz" sorusunu anlatır: hikâye, bakış açısı,
 * değerler ve referanslar. Ürünler, süreç ve sayılar başka sayfalarda durur,
 * burada tekrarlanmaz. İletişim çağrısı alt bilgide olduğu için sayfada ayrıca
 * kapanış çağrısı yoktur.
 */
export function AboutPage() {
  const { t } = useTranslation()
  useDocumentMeta(t('aboutPage.kicker'), t('aboutPage.lead'))

  return (
    <div className="page about-page">
      <Breadcrumbs
        items={[
          { label: t('nav.breadcrumbHome'), to: routePath('home') },
          { label: t('nav.about') },
        ]}
      />

      <header className="page-head">
        <h1 className="multiline">{t('aboutPage.title')}</h1>
        <p className="page-lead">{t('aboutPage.lead')}</p>
      </header>

      {/* 1. Hikâye: büyük başlık ve yanında geçmiş */}
      <section className="page-section about-story">
        <h2>{t('aboutPage.journeyTitle')}</h2>
        <div className="about-story-grid">
          <p>{t('aboutPage.journeyText')}</p>
          <div>
            <span className="section-label">{t('aboutPage.experienceTitle')}</span>
            <ul className="about-experience">
              {experienceKeys.map((key) => (
                <li key={key}>{t(`aboutPage.experience.${key}`)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Bakış açısı: büyük alıntı */}
      <section className="page-section">
        <h2 className="section-label">{t('aboutPage.approachTitle')}</h2>
        <blockquote className="about-quote">
          <p>{t('aboutPage.approachText')}</p>
        </blockquote>
      </section>

      {/* 3. Değerler: kartsız, numaralı üç sütun */}
      <section className="page-section">
        <h2 className="section-label">{t('aboutPage.valuesTitle')}</h2>
        <ol className="about-values">
          {valueKeys.map((key, index) => (
            <li key={key}>
              <span className="about-value-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{t(`aboutPage.values.${key}.title`)}</h3>
              <p>{t(`aboutPage.values.${key}.description`)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. Referanslar: logo duvarı */}
      <section className="page-section">
        <h2 className="section-label">{t('aboutPage.referencesTitle')}</h2>
        <ul className="reference-wall">
          {references.map((reference) => (
            <li key={reference.id}>
              {reference.url ? (
                <a href={reference.url} target="_blank" rel="noreferrer">
                  <ReferenceLogo reference={reference} />
                  <span className="reference-name">{reference.name}</span>
                </a>
              ) : (
                <div>
                  <ReferenceLogo reference={reference} />
                  <span className="reference-name">{reference.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
