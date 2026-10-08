import { useEffect, useRef, useState, type Ref } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatDate, formatDayParts, formatMonth } from '../lib/format'
import { insightPath, routePath } from '../lib/routes'
import { insightPlatformIcons, insightsByDate, type Insight } from '../data/site'

/** İlk açılışta ve her "daha fazla" tıklamasında eklenen not sayısı */
const PAGE_SIZE = 5

type MonthGroup = { month: string; items: Insight[] }

/** Tarihe göre sıralı notları ay başlıkları altında toplar */
function groupByMonth(items: Insight[]): MonthGroup[] {
  return items.reduce<MonthGroup[]>((groups, item) => {
    const month = item.date.slice(0, 7)
    const last = groups[groups.length - 1]
    if (last && last.month === month) {
      return [...groups.slice(0, -1), { month, items: [...last.items, item] }]
    }
    return [...groups, { month, items: [item] }]
  }, [])
}

export function InsightsPage() {
  const { t, i18n } = useTranslation()
  useDocumentMeta(t('insightsPage.title'), t('insightsPage.text'))

  const language = i18n.resolvedLanguage ?? i18n.language
  const featured = insightsByDate.find((item) => item.featured)
  const stream = insightsByDate.filter((item) => item.id !== featured?.id)

  const [shown, setShown] = useState(PAGE_SIZE)
  const firstNewRef = useRef<HTMLAnchorElement>(null)
  const [focusIndex, setFocusIndex] = useState<number | null>(null)

  const visible = stream.slice(0, shown)
  const hasMore = shown < stream.length

  // Yeni yüklenen ilk nota odak taşınır; klavyeyle gezen kaldığı yerden devam eder
  useEffect(() => {
    if (focusIndex !== null) firstNewRef.current?.focus()
  }, [focusIndex])

  const loadMore = () => {
    setFocusIndex(shown)
    setShown((count) => count + PAGE_SIZE)
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

      {featured && <FeaturedRow item={featured} language={language} />}

      <section className="page-section news-timeline" aria-live="polite">
        {groupByMonth(visible).map((group) => (
          <div className="news-month" key={group.month}>
            <h2 className="news-month-label">
              {formatMonth(`${group.month}-01`, language)}
            </h2>
            <ol className="news-stream">
              {group.items.map((item) => {
                const index = visible.indexOf(item)
                return (
                  <NewsRow
                    key={item.id}
                    item={item}
                    language={language}
                    isNew={focusIndex !== null && index >= focusIndex}
                    linkRef={index === focusIndex ? firstNewRef : undefined}
                  />
                )
              })}
            </ol>
          </div>
        ))}

        <div className="news-more">
          <span className="news-progress" aria-hidden="true">
            <span style={{ width: `${(visible.length / stream.length) * 100}%` }} />
          </span>
          <p>
            {hasMore
              ? t('insightsPage.progress', { shown: visible.length, total: stream.length })
              : t('insightsPage.allLoaded')}
          </p>
          {hasMore && (
            <button type="button" className="btn btn-outline" onClick={loadMore}>
              {t('insightsPage.loadMore')}
              <Icon name="plus" className="btn-icon" />
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

/** Tür rozeti: ikon + "Web", "Mobil" gibi kısa etiket */
function PlatformBadge({ item }: { item: Insight }) {
  const { t } = useTranslation()
  return (
    <span className={`type-badge type-${item.platform}`}>
      <Icon name={insightPlatformIcons[item.platform]} className="type-badge-icon" />
      {t(`insightsPage.platforms.${item.platform}`)}
    </span>
  )
}

type NewsRowProps = {
  item: Insight
  language: string
  isNew: boolean
  linkRef?: Ref<HTMLAnchorElement>
}

/** Zaman çizelgesindeki tek not: tarih bloğu, rozetler, başlık ve özet */
function NewsRow({ item, language, isNew, linkRef }: NewsRowProps) {
  const { t } = useTranslation()
  const { day, month } = formatDayParts(item.date, language)

  return (
    <li className={`news-row${isNew ? ' is-new' : ''}`}>
      <time className="news-date" dateTime={item.date}>
        <strong>{day}</strong>
        <span>{month}</span>
      </time>
      <Link className="news-row-card" to={insightPath(item.id)} ref={linkRef}>
        <span className="news-row-badges">
          <PlatformBadge item={item} />
          <span className="tag">{t(`insights.items.${item.key}.tag`)}</span>
          <span className="insight-status">{t(`insights.items.${item.key}.status`)}</span>
        </span>
        <span className="news-row-body">
          <strong>{t(`insights.items.${item.key}.title`)}</strong>
          <span>{t(`insights.items.${item.key}.excerpt`)}</span>
        </span>
        <span className="news-row-arrow" aria-hidden="true">
          <Icon name="arrow" className="btn-icon" />
        </span>
      </Link>
    </li>
  )
}

/** Öne çıkan not: sayfanın başında tek, sade koyu satır */
function FeaturedRow({ item, language }: { item: Insight; language: string }) {
  const { t } = useTranslation()

  return (
    <Link className="news-featured" to={insightPath(item.id)}>
      <span className="news-featured-flag">{t('insightsPage.featured')}</span>
      <span className="news-featured-main">
        <span className="news-featured-meta">
          <PlatformBadge item={item} />
          <time dateTime={item.date}>{formatDate(item.date, language)}</time>
        </span>
        <strong>{t(`insights.items.${item.key}.title`)}</strong>
      </span>
      <span className="news-featured-cta">
        {t('insightsPage.readMore')}
        <Icon name="arrow" className="btn-icon" />
      </span>
    </Link>
  )
}
