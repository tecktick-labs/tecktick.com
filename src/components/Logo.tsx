import logoUrl from '../../logo.png'

type LogoProps = {
  className?: string
  /** Koyu zeminlerde amblem tek renk beyaza döner */
  variant?: 'dark' | 'light'
}

/** Marka amblemi. Kaynak dosya: logo.png (proje kökü). */
export function LogoMark({ className, variant = 'dark' }: LogoProps) {
  return (
    <img
      className={['logo-mark', variant === 'light' ? 'is-light' : '', className]
        .filter(Boolean)
        .join(' ')}
      src={logoUrl}
      alt=""
      draggable={false}
    />
  )
}

/** Amblem + kelime işareti. */
export function Wordmark({ variant = 'dark' }: LogoProps) {
  return (
    <>
      <LogoMark variant={variant} />
      <span className="brand-name">
        Tecktick<small>labs</small>
      </span>
    </>
  )
}
