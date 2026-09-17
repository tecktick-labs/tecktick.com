import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { Icon } from './Icons'
import { Wordmark } from './Logo'
import { LanguageSwitcher } from './LanguageSwitcher'
import { navRoutes, routePath } from '../lib/routes'

export function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
      <div className="topbar-inner">
        <Link className="brand" to={routePath('home')} aria-label={t('nav.homeAria')}>
          <Wordmark />
        </Link>

        <nav className={`nav${open ? ' is-open' : ''}`} aria-label={t('nav.main')}>
          {navRoutes.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
              onClick={() => setOpen(false)}
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
          {/* Dar ekranda üst bardaki buton gizlendiği için menüde yer alır */}
          <Link
            className="nav-cta"
            to={routePath('contact')}
            onClick={() => setOpen(false)}
          >
            {t('common.letsTalk')}
          </Link>
        </nav>

        <div className="topbar-actions">
          <LanguageSwitcher />
          <Link className="btn btn-dark btn-sm topbar-cta" to={routePath('contact')}>
            {t('common.letsTalk')}
            <Icon name="arrow" className="btn-icon" />
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-label={t('nav.toggle')}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
