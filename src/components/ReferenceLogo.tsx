import { useState } from 'react'
import type { Reference } from '../data/site'

/** Adın ilk iki kelimesinin baş harfleri: "Belek Car Rent" → "BC" */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toLocaleUpperCase('tr'))
    .join('')
}

/** Referans logosu; logo yoksa ya da yüklenemezse baş harflere düşer. */
export function ReferenceLogo({ reference }: { reference: Reference }) {
  const [failed, setFailed] = useState(false)

  if (!reference.logo || failed) {
    return (
      <span className="reference-initials" aria-hidden="true">
        {initials(reference.name)}
      </span>
    )
  }

  return (
    <img
      className="reference-logo"
      src={reference.logo}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
