import { useState } from 'react'
import type { Product } from '../data/site'

type Props = {
  product: Product
  size?: 'default' | 'large'
}

/** Görsel yoksa ya da yüklenemezse yer tutucuya düşer. */
export function ProductIcon({ product, size = 'default' }: Props) {
  const [failed, setFailed] = useState(false)
  const classes = [
    'product-icon',
    `icon-${product.iconTheme ?? 'light'}`,
    size === 'large' ? 'is-large' : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (!product.icon || failed) {
    return <span className={`${classes} mock-image`} />
  }

  return (
    <img
      className={classes}
      src={product.icon}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
