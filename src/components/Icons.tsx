import type { ReactNode } from 'react'

type IconProps = { name: string; className?: string }

const paths: Record<string, ReactNode> = {
  code: (
    <>
      <path d="M8 6 2 12l6 6" />
      <path d="m16 6 6 6-6 6" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" />
      <path d="M16.5 5.6a3.2 3.2 0 0 1 0 6" />
      <path d="M17.6 14.4A6.2 6.2 0 0 1 21.2 20" />
    </>
  ),
  mobile: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.2 9.5h17.6M3.2 14.5h17.6" />
      <path d="M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3Z" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="6.5" rx="1.8" />
      <rect x="3" y="13.5" width="18" height="6.5" rx="1.8" />
      <path d="M7 7.2h.01M7 16.8h.01" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5v13c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-13" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
  bolt: <path d="M13.2 2.5 5 13.2h5.4l-.6 8.3L18.8 10.8h-5.4l-.2-8.3Z" />,
  plug: (
    <>
      <path d="M9.5 3v5M14.5 3v5" />
      <path d="M6.5 8h11v3.2a5.5 5.5 0 0 1-11 0V8Z" />
      <path d="M12 16.7V21" />
    </>
  ),
  cloud: (
    <>
      <path d="M7.2 18.5a4.2 4.2 0 0 1-.5-8.37 5.6 5.6 0 0 1 10.76-1.1 3.9 3.9 0 0 1 .34 7.7" />
      <path d="M7.2 18.5h10.4" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 2.8c3 2 4.8 5.3 4.8 9.1L12 16.6l-4.8-4.7c0-3.8 1.8-7.1 4.8-9.1Z" />
      <circle cx="12" cy="9.6" r="1.7" />
      <path d="M8.6 16.2 6.4 21l4-1.7M15.4 16.2l2.2 4.8-4-1.7" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.2 8.8-1.9 4.5-4.5 1.9 1.9-4.5 4.5-1.9Z" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.2 13.6 8l4.8 1.6-4.8 1.6L12 16l-1.6-4.8L5.6 9.6 10.4 8 12 3.2Z" />
      <path d="M18.4 15.6l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  check: <path d="m4.5 12.5 4.8 4.8L19.5 7.1" />,
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrowLeft: <path d="M20 12H5m6-6-6 6 6 6" />,
  play: <path d="M9 6.5 17 12l-8 5.5V6.5Z" />,
  spark: (
    <>
      <path d="M12 3v18" />
      <path d="M3 12h18" />
    </>
  ),
}

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.spark}
    </svg>
  )
}
