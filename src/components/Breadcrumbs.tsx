import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export type Crumb = {
  label: string
  to?: string
}

/** Derin sayfalarda konumu gösterir; son öğe bağlantısızdır. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <Fragment key={`${item.label}-${index}`}>
              <li>
                {item.to && !isLast ? (
                  <Link to={item.to}>{item.label}</Link>
                ) : (
                  <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
                )}
              </li>
              {!isLast && (
                <li className="breadcrumb-sep" aria-hidden="true">
                  /
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
