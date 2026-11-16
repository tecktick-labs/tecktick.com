import { useCallback, useEffect, useMemo, useState } from 'react'
import { acceptInvite, getUser, handleAuthCallback, login, logout, type User } from '@netlify/identity'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { routePath } from '../lib/routes'

type Locale = 'tr' | 'en'
type RecordField = { path: string[]; original: string; value: string }
type Section = 'home' | 'services' | 'products' | 'insights' | 'company' | 'shared'
const SECTION_ROOTS: Record<Section, string[]> = {
  home: ['meta', 'hero', 'stats', 'approach'],
  services: ['services', 'servicesPage', 'serviceTopicsPage'],
  products: ['products', 'productsPage', 'productPages'],
  insights: ['insights', 'insightsPage'],
  company: ['aboutPage', 'contact'],
  shared: ['nav', 'common', 'footer'],
}

function flatten(node: unknown, path: string[] = []): RecordField[] {
  if (typeof node === 'string') return [{ path, original: node, value: node }]
  if (!node || typeof node !== 'object' || Array.isArray(node)) return []
  return Object.entries(node).flatMap(([key, value]) => flatten(value, [...path, key]))
}

export function PanelPage() {
  const { t } = useTranslation()
  useDocumentMeta(t('panel.title'), t('panel.description'))
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inviteToken, setInviteToken] = useState('')
  const [locale, setLocale] = useState<Locale>('tr')
  const [section, setSection] = useState<Section>('home')
  const [search, setSearch] = useState('')
  const [fields, setFields] = useState<RecordField[]>([])
  const [sha, setSha] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]')
    const previous = robots?.getAttribute('content')
    robots?.setAttribute('content', 'noindex, nofollow')
    void (async () => {
      try {
        const callback = await handleAuthCallback()
        if (callback?.type === 'invite' && callback.token) setInviteToken(callback.token)
        setUser(await getUser())
      } catch {
        setError('auth_failed')
      } finally {
        setReady(true)
      }
    })()
    return () => { if (previous) robots?.setAttribute('content', previous) }
  }, [])

  const load = useCallback(async () => {
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const response = await fetch(`/.netlify/functions/panel-content?lang=${locale}`, { cache: 'no-store' })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'request_failed')
      setFields(flatten(result.data))
      setSha(result.sha)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'request_failed')
    } finally {
      setBusy(false)
    }
  }, [locale])

  useEffect(() => { if (user?.roles?.includes('editor')) void load() }, [user, load])

  const visible = useMemo(() => fields.filter((field) =>
    SECTION_ROOTS[section].includes(field.path[0]) &&
    (!search || `${field.path.join('.')} ${field.value}`.toLocaleLowerCase('tr').includes(search.toLocaleLowerCase('tr'))),
  ), [fields, section, search])
  const changed = fields.filter((field) => field.value !== field.original)

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try { setUser(await login(email, password)) }
    catch { setError('auth_failed') }
    finally { setBusy(false) }
  }

  const finishInvite = async (event: React.FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      setUser(await acceptInvite(inviteToken, password))
      setInviteToken('')
    } catch { setError('auth_failed') }
    finally { setBusy(false) }
  }

  const save = async () => {
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const response = await fetch(`/.netlify/functions/panel-content?lang=${locale}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sha, changes: changed.map(({ path, original, value }) => ({ path, expected: original, value })) }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'publish_failed')
      setFields((current) => current.map((field) => ({ ...field, original: field.value })))
      setSha(result.sha)
      setNotice('published')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'publish_failed')
    } finally { setBusy(false) }
  }

  return (
    <div className="panel-page">
      <div className="panel-top">
        <Link to={routePath('home')} className="panel-back">{t('panel.back')}</Link>
        <span>{t('panel.brand')}</span>
        {user && <button type="button" onClick={() => { void logout().then(() => setUser(null)) }}>{t('panel.logout')}</button>}
      </div>
      <div className="panel-shell">
        <header className="panel-head">
          <p className="kicker">{t('panel.kicker')}</p>
          <h1>{t('panel.title')}</h1>
          <p>{t('panel.description')}</p>
        </header>

        {error && <p className="panel-alert" role="alert">{t(`panel.errors.${error}`, { defaultValue: t('panel.errors.request_failed') })}</p>}
        {notice && <p className="panel-success" role="status">{t(`panel.notices.${notice}`)}</p>}

        {!ready ? <p>{t('panel.loading')}</p> : inviteToken ? (
          <div className="panel-login">
            <h2>{t('panel.inviteTitle')}</h2>
            <form onSubmit={(event) => void finishInvite(event)}>
              <label>{t('panel.password')}<input type="password" value={password} minLength={8} onChange={(event) => setPassword(event.target.value)} required /></label>
              <button className="btn btn-dark" type="submit" disabled={busy}>{t('panel.finishInvite')}</button>
            </form>
          </div>
        ) : !user ? (
          <div className="panel-login">
            <h2>{t('panel.loginTitle')}</h2>
            <form onSubmit={(event) => void signIn(event)}>
              <label>{t('panel.email')}<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
              <label>{t('panel.password')}<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
              <button className="btn btn-dark" type="submit" disabled={busy}>{t('panel.login')}</button>
            </form>
          </div>
        ) : !user.roles?.includes('editor') ? (
          <div className="panel-login"><h2>{t('panel.noAccess')}</h2><p>{t('panel.noAccessHelp')}</p></div>
        ) : (
          <div className="panel-workspace">
            <aside className="panel-sidebar">
              <p>{t('panel.sectionsLabel')}</p>
              {(Object.keys(SECTION_ROOTS) as Section[]).map((key) => (
                <button type="button" key={key} className={section === key ? 'is-active' : ''} onClick={() => setSection(key)}>{t(`panel.sections.${key}`)}</button>
              ))}
            </aside>
            <section className="panel-editor">
              <div className="panel-toolbar">
                <div><h2>{t(`panel.sections.${section}`)}</h2><p>{t('panel.editorHint')}</p></div>
                <div className="panel-controls">
                  <select aria-label={t('panel.language')} value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
                    <option value="tr">{t('language.tr')}</option><option value="en">{t('language.en')}</option>
                  </select>
                  <button className="btn btn-dark" type="button" disabled={busy || !changed.length || changed.length > 50} onClick={() => void save()}>{busy ? t('panel.saving') : t('panel.publish', { count: changed.length })}</button>
                </div>
              </div>
              <input className="panel-search" type="search" placeholder={t('panel.search')} value={search} onChange={(event) => setSearch(event.target.value)} />
              {busy && !fields.length ? <p>{t('panel.loading')}</p> : (
                <div className="panel-fields">
                  {visible.map((field) => {
                    const key = field.path.join('.')
                    return <label className="panel-field" key={key}>
                      <span>{key}</span>
                      {field.original.length > 120 || field.value.includes('\n') ?
                        <textarea rows={Math.max(3, Math.min(8, Math.ceil(field.value.length / 80)))} value={field.value} onChange={(event) => setFields((current) => current.map((item) => item.path.join('.') === key ? { ...item, value: event.target.value } : item))} /> :
                        <input value={field.value} onChange={(event) => setFields((current) => current.map((item) => item.path.join('.') === key ? { ...item, value: event.target.value } : item))} />}
                    </label>
                  })}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
