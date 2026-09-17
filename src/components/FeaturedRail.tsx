import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { ProductIcon } from './ProductIcon'
import { productPath } from '../lib/routes'
import type { Product } from '../data/site'

/**
 * Öne çıkan işler şeridi. Sayıya göre davranır:
 *  1 iş  -> tek geniş vitrin
 *  2 iş  -> yan yana iki kart
 *  3+    -> aynı boyutta iki kart görünür, sürükleyerek veya oklarla
 *           sonsuz döngü halinde kayar
 */
export function FeaturedRail({ items }: { items: Product[] }) {
  if (items.length === 0) return null
  if (items.length === 1) return <FeaturedWide product={items[0]} />
  if (items.length === 2) {
    return (
      <section className="featured-pair">
        {items.map((product) => (
          <FeaturedCard key={product.id} product={product} />
        ))}
      </section>
    )
  }
  return <FeaturedCarousel items={items} />
}

function FeaturedCarousel({ items }: { items: Product[] }) {
  const { t } = useTranslation()
  const trackRef = useRef<HTMLDivElement>(null)
  const settleTimer = useRef<number>(0)
  // Sonsuz his için liste üç kez basılır, orta kopyadan başlanır.
  const loop = [...items, ...items, ...items]

  /**
   * Kaydırma durduğunda orta kopyaya geri alınır. Kaydırma sırasında
   * değil bittikten sonra yapılır; aksi halde snap ile çakışıp
   * konumu sıfıra düşürüyor.
   */
  const normalize = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const section = track.scrollWidth / 3
    if (section === 0) return
    if (track.scrollLeft < section * 0.5) {
      track.scrollLeft += section
    } else if (track.scrollLeft > section * 1.5) {
      track.scrollLeft -= section
    }
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.scrollLeft = track.scrollWidth / 3
    return () => window.clearTimeout(settleTimer.current)
  }, [items.length])

  const scheduleNormalize = useCallback(
    (delay: number) => {
      window.clearTimeout(settleTimer.current)
      settleTimer.current = window.setTimeout(normalize, delay)
    },
    [normalize],
  )

  const handleScroll = () => scheduleNormalize(140)

  const step = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    // Kaydırmadan önce ortala; kenardayken de tam bir adım atılabilsin.
    normalize()
    const slide = track.firstElementChild as HTMLElement | null
    const amount = slide ? slide.offsetWidth + 16 : track.clientWidth / 2
    track.scrollBy({ left: amount * direction, behavior: 'smooth' })
    scheduleNormalize(500)
  }

  // Fare ile sürükleme; dokunmatik tarayıcının kendi kaydırmasını kullanır.
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const track = trackRef.current
    if (!track) return
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      moved: false,
    }
    track.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !drag.current.active) return
    const delta = event.clientX - drag.current.startX
    if (Math.abs(delta) > 4) drag.current.moved = true
    track.scrollLeft = drag.current.startScroll - delta
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !drag.current.active) return
    drag.current.active = false
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId)
    }
    scheduleNormalize(60)
  }

  // Sürükleme sonrası kartın bağlantısı tetiklenmesin
  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      event.preventDefault()
      event.stopPropagation()
      drag.current.moved = false
    }
  }

  return (
    <section className="featured-rail">
      <div
        className="featured-track"
        ref={trackRef}
        onScroll={handleScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {loop.map((product, index) => (
          <FeaturedCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>

      <div className="rail-controls">
        <button
          type="button"
          className="rail-button"
          aria-label={t('productsPage.prev')}
          onClick={() => step(-1)}
        >
          <Icon name="arrowLeft" />
        </button>
        <button
          type="button"
          className="rail-button"
          aria-label={t('productsPage.next')}
          onClick={() => step(1)}
        >
          <Icon name="arrow" />
        </button>
      </div>
    </section>
  )
}

/** Tek iş kaldığında kullanılan geniş vitrin */
function FeaturedWide({ product }: { product: Product }) {
  const { t } = useTranslation()

  return (
    <section className="featured">
      <div className="featured-visual">
        <ProductIcon product={product} size="large" />
      </div>
      <div className="featured-body">
        <p className="kicker kicker-light">{t('productsPage.featured')}</p>
        <h2>{t(`products.items.${product.key}.name`)}</h2>
        <p className="featured-tagline">
          {t(`products.items.${product.key}.tagline`)}
        </p>
        <p className="featured-text">
          {t(`products.items.${product.key}.description`)}
        </p>
        <ul className="meta-row meta-row-light">
          {product.metaKeys.map((metaKey) => (
            <li key={metaKey}>{t(`products.meta.${metaKey}`)}</li>
          ))}
        </ul>
        <Link className="btn btn-mint" to={productPath(product.id)}>
          {t('productsPage.openFeatured')}
          <Icon name="arrow" className="btn-icon" />
        </Link>
      </div>
    </section>
  )
}

/** İki ve daha fazla işte kullanılan eşit boyutlu kart */
function FeaturedCard({ product }: { product: Product }) {
  const { t } = useTranslation()

  return (
    <article className="featured-card">
      <div className="featured-card-top">
        <ProductIcon product={product} size="large" />
        <span className="featured-flag">{t('productsPage.featured')}</span>
      </div>
      <h2>{t(`products.items.${product.key}.name`)}</h2>
      <p className="featured-tagline">
        {t(`products.items.${product.key}.tagline`)}
      </p>
      <ul className="meta-row meta-row-light">
        {product.metaKeys.slice(0, 3).map((metaKey) => (
          <li key={metaKey}>{t(`products.meta.${metaKey}`)}</li>
        ))}
      </ul>
      <Link className="btn btn-mint btn-sm" to={productPath(product.id)}>
        {t('productsPage.openFeatured')}
        <Icon name="arrow" className="btn-icon" />
      </Link>
    </article>
  )
}
