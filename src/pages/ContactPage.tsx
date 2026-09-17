import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '../components/Icons'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { contactEmail, contactPhone } from '../data/site'

const FORM_NAME = 'contact'
const SUBJECT_KEYS = ['project', 'app', 'game', 'other'] as const

type Status = 'idle' | 'sending' | 'success' | 'error'

const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

export function ContactPage() {
  const { t } = useTranslation()
  useDocumentMeta(t('contact.kicker'), t('contact.text'))
  const [status, setStatus] = useState<Status>('idle')


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const payload: Record<string, string> = { 'form-name': FORM_NAME }
    data.forEach((value, key) => {
      payload[key] = String(value)
    })

    setStatus('sending')
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      })
      if (!response.ok) throw new Error(String(response.status))
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="page contact-page">
      <header className="page-head">
        <p className="kicker">{t('contact.kicker')}</p>
        <h1 className="multiline">{t('contact.title')}</h1>
        <p className="page-lead">{t('contact.text')}</p>
      </header>

      <div className="contact-layout">
        <section className="contact-form-card">
          <h2 className="section-label">{t('contact.form.title')}</h2>

          <form
            name={FORM_NAME}
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            noValidate={false}
          >
            <input type="hidden" name="form-name" value={FORM_NAME} />
            <p className="hidden-field">
              <label>
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div className="field-row">
              <label className="field">
                <span>{t('contact.form.name')}</span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </label>
              <label className="field">
                <span>{t('contact.form.email')}</span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </label>
            </div>

            <div className="field-row">
              <label className="field">
                <span>
                  {t('contact.form.company')}
                  <i>{t('contact.form.companyOptional')}</i>
                </span>
                <input
                  type="text"
                  name="company"
                  autoComplete="organization"
                  placeholder={t('contact.form.companyPlaceholder')}
                />
              </label>
              <label className="field">
                <span>{t('contact.form.subject')}</span>
                <select name="subject" defaultValue="project">
                  {SUBJECT_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {t(`contact.form.subjects.${key}`)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="field">
              <span>{t('contact.form.message')}</span>
              <textarea
                name="message"
                rows={6}
                required
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </label>

            <div className="form-foot">
              <button
                className="btn btn-dark"
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending'
                  ? t('contact.form.sending')
                  : t('contact.form.submit')}
                <Icon name="arrow" className="btn-icon" />
              </button>

              {status === 'success' && (
                <p className="form-note is-success" role="status">
                  {t('contact.form.success')}
                </p>
              )}
              {status === 'error' && (
                <p className="form-note is-error" role="alert">
                  {t('contact.form.error')}
                </p>
              )}
            </div>
          </form>
        </section>

        <aside className="contact-aside">
          <div className="contact-detail">
            <span className="section-label">{t('contact.emailLabel')}</span>
            <a className="contact-email" href={`mailto:${contactEmail}`}>
              {contactEmail}
              <Icon name="arrow" className="btn-icon" />
            </a>
          </div>
          <div className="contact-detail">
            <span className="section-label">{t('contact.phoneLabel')}</span>
            <a className="contact-email" href={contactPhone.href}>
              {contactPhone.display}
              <Icon name="arrow" className="btn-icon" />
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}
