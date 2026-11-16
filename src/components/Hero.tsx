import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { LogoMark } from './Logo'
import { motto, siteStats, statKeys } from '../data/site'
import { routePath } from '../lib/routes'
import type { CSSProperties } from 'react'

const sparkPositions = [
  [4, -1.2, 7.4, -18, 2], [33, -4.5, 8.2, 24, 2], [77, -2.8, 6.9, -12, 3],
  [12, -6.1, 8.5, 31, 2], [55, -0.6, 7.8, 18, 2], [88, -3.7, 9.1, -29, 3],
  [23, -7.2, 7.1, 25, 2], [67, -1.9, 8.9, -16, 2], [95, -5.3, 7.6, 28, 3],
  [40, -0.8, 9.4, -31, 2], [8, -6.4, 8.1, 17, 2], [71, -3.1, 7.2, 26, 3],
  [58, -7.9, 9.0, -15, 2], [18, -2.3, 8.4, 34, 2], [84, -5.8, 7.7, -24, 3],
  [46, -1.5, 8.8, 13, 2], [31, -4.2, 7.3, -32, 2], [99, -7.1, 9.2, 23, 3],
  [62, -2.6, 8.0, -18, 2], [15, -5.0, 7.5, 29, 2], [79, -0.9, 9.3, -21, 3],
  [3, -6.7, 8.3, 19, 2], [91, -3.4, 7.0, -27, 2], [52, -8.0, 8.7, 30, 3],
  [36, -1.7, 7.9, -13, 2], [74, -5.6, 9.0, 24, 2], [26, -2.1, 7.6, -20, 3],
  [96, -6.3, 8.5, 14, 2],
] as const

function HeroSparks() {
  return (
    <div className="hero-sparks" aria-hidden="true">
      {sparkPositions.flatMap(([x, delay, duration, drift, size], index) =>
        [0, 1].map((layer) => (
          <i
            key={`${index}-${layer}`}
            className="hero-spark"
            style={{
              '--spark-x': `${layer ? (x + 19 + index * 3) % 100 : x}%`,
              '--spark-delay': `${delay - layer * 3.1}s`,
              '--spark-duration': `${duration - layer * 0.7}s`,
              '--spark-drift': `${layer ? -drift : drift}px`,
              '--spark-size': `${size + 1 + layer}px`,
            } as CSSProperties}
          />
        )),
      )}
    </div>
  )
}

const flowThreads = [
  'M-30 360 C105 250 128 105 290 128 S445 330 640 82',
  'M-30 378 C112 260 135 122 298 145 S454 346 640 100',
  'M-30 396 C120 275 143 140 306 162 S463 362 640 118',
  'M-30 414 C128 290 151 158 314 179 S472 378 640 136',
  'M-30 432 C136 305 159 176 322 196 S481 394 640 154',
  'M-30 450 C144 320 167 194 330 213 S490 410 640 172',
] as const

function FlowMark() {
  return (
    <div className="hero-flow" aria-hidden="true">
      <span className="hero-flow-halo" />
      <svg className="hero-flow-lines" viewBox="0 0 600 520" fill="none" preserveAspectRatio="xMidYMid meet">
        {flowThreads.map((path, index) => (
          <path key={path} className="hero-flow-thread" d={path} style={{ '--thread-index': index } as CSSProperties} />
        ))}
        <path className="hero-flow-glint hero-flow-glint-one" d={flowThreads[1]} pathLength="1000" />
        <path className="hero-flow-glint hero-flow-glint-two" d={flowThreads[4]} pathLength="1000" />
      </svg>
      <span className="hero-flow-emblem"><LogoMark /></span>
    </div>
  )
}

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="hero" id="top">
      <HeroSparks />
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="kicker">{t('hero.kicker')}</p>
          <h1>
            <strong>{t('hero.titleStrong')}</strong>
            <span>{t('hero.titleSoft')}</span>
          </h1>
          <p className="lead">{t('hero.lead')}</p>
          <div className="hero-actions">
            <Link className="btn btn-glow" to={routePath('contact')}>
              {t('hero.ctaPrimary')}
              <Icon name="arrow" className="btn-icon" />
            </Link>
            <Link className="btn btn-ghost" to={routePath('services')}>
              <span className="icon-dot">
                <Icon name="grid" />
              </span>
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>

        <div className="hero-visual"><FlowMark /></div>
      </div>

      <div className="stats-bar">
        <div className="stats-grid">
          {statKeys.map((key) => (
            <div className="stat" key={key}>
              <strong>{siteStats[key]}</strong>
              <span>{t(`stats.${key}.label`)}</span>
            </div>
          ))}
        </div>
        <p className="stats-motto">
          <i />
          {motto}
        </p>
      </div>
    </section>
  )
}
