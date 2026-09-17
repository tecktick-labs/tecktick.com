import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { routePath } from '../lib/routes'

export function NotFoundPage() {
  const { t } = useTranslation()
  useDocumentMeta(t('notFound.kicker'))

  return (
    <div className="page not-found">
      <p className="kicker">{t('notFound.kicker')}</p>
      <h1 className="multiline">{t('notFound.title')}</h1>
      <p className="page-lead">{t('notFound.text')}</p>
      <div className="not-found-actions">
        <Link className="btn btn-dark" to={routePath('home')}>
          {t('notFound.home')}
          <Icon name="arrow" className="btn-icon" />
        </Link>
        <Link className="btn btn-ghost" to={routePath('products')}>
          {t('notFound.products')}
          <Icon name="arrow" className="btn-icon" />
        </Link>
      </div>
    </div>
  )
}
