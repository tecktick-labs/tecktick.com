import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from './Icons'

/** Ana sayfa bölümlerinin altındaki ortalanmış "Tümünü gör" butonu. */
export function SectionMore({ to }: { to: string }) {
  const { t } = useTranslation()

  return (
    <div className="section-more">
      <Link className="btn btn-outline" to={to}>
        {t('common.viewAll')}
        <Icon name="arrow" className="btn-icon" />
      </Link>
    </div>
  )
}
