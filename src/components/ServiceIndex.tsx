import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { Icon } from './Icons'
import { services } from '../data/site'
import { routePath, SERVICE_PARAM } from '../lib/routes'

/** Açılan satırdaki madde anahtarları: servicesPage.details.<id>.points.<key> */
const POINT_KEYS = ['p1', 'p2', 'p3'] as const

const isServiceId = (value: string | null): value is string =>
  services.some((service) => service.id === value)

/**
 * Hizmetler sayfasındaki numaralı satırlar. Her satır açılır; ana sayfadaki
 * kartlardan gelindiğinde ilgili satır açık, ekrana kaydırılmış ve odakta gelir.
 */
export function ServiceIndex() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get(SERVICE_PARAM)
  const [openId, setOpenId] = useState<string | null>(
    isServiceId(requested) ? requested : null,
  )
  const toggles = useRef(new Map<string, HTMLButtonElement>())
  // Sayfa içindeki aç/kapa adresi değiştirir; o zaman sayfa zıplamamalı
  const changedHere = useRef(false)

  // Başka sayfadan (ana sayfa kartı) gelindiğinde: satırı aç, ekrana getir, odakla.
  // Satır ilk çizimde zaten açık olduğu için doğrudan ölçülebilir; rAF kullanılmaz,
  // arka plandaki sekmede hiç çalışmıyordu.
  useEffect(() => {
    if (changedHere.current) {
      changedHere.current = false
      return
    }
    if (!isServiceId(requested)) return
    setOpenId(requested)
    const button = toggles.current.get(requested)
    button?.closest('li')?.scrollIntoView({ block: 'start' })
    button?.focus({ preventScroll: true })
  }, [requested])

  const toggle = (id: string) => {
    const next = openId === id ? null : id
    changedHere.current = true
    setOpenId(next)
    setSearchParams(next ? { [SERVICE_PARAM]: next } : {}, {
      replace: true,
      preventScrollReset: true,
    })
  }

  return (
    <ol className="service-index">
      {services.map((service, index) => {
        const isOpen = openId === service.id
        const panelId = `service-panel-${service.id}`

        return (
          <li className={`service-row${isOpen ? ' is-open' : ''}`} key={service.id}>
            <div className="service-row-head">
              <span className="service-row-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="service-row-body">
                <h3>
                  <button
                    type="button"
                    className="service-row-toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(service.id)}
                    ref={(element) => {
                      if (element) toggles.current.set(service.id, element)
                      else toggles.current.delete(service.id)
                    }}
                  >
                    {t(`services.items.${service.id}.title`)}
                  </button>
                </h3>
                <p>{t(`services.items.${service.id}.description`)}</p>
              </div>
              <ul className="meta-row service-row-tags">
                {service.capabilityKeys.map((key) => (
                  <li key={key}>{t(`servicesPage.capabilities.${key}.title`)}</li>
                ))}
              </ul>
              <span className="service-row-icon" aria-hidden="true">
                <Icon name="plus" />
              </span>
            </div>

            <div className="service-row-panel" id={panelId} hidden={!isOpen}>
              <p>{t(`servicesPage.details.${service.id}.text`)}</p>
              <ul className="service-row-points">
                {POINT_KEYS.map((key) => (
                  <li key={key}>
                    <Icon name="check" />
                    {t(`servicesPage.details.${service.id}.points.${key}`)}
                  </li>
                ))}
              </ul>
              <Link className="text-link" to={routePath('contact')}>
                {t('productPages.ctaButton')}
                <Icon name="arrow" className="btn-icon" />
              </Link>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
