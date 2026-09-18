/**
 * Tek rota kaynağı.
 * Yeni sayfa eklenirken yalnızca burası ve main.tsx'teki eşleme güncellenir;
 * menü, alt bilgi ve kırıntı navigasyonu bu tanımdan beslenir.
 */
export type RouteKey =
  | 'home'
  | 'products'
  | 'services'
  | 'about'
  | 'insights'
  | 'contact'

export type RouteDefinition = {
  key: RouteKey
  path: string
  /** Menüde görünür mü */
  inNav: boolean
  /** Alt bilgi menüsünde görünür mü */
  inFooter: boolean
}

export const routes: RouteDefinition[] = [
  { key: 'home', path: '/', inNav: true, inFooter: true },
  { key: 'products', path: '/products', inNav: true, inFooter: true },
  { key: 'services', path: '/services', inNav: true, inFooter: true },
  { key: 'about', path: '/about', inNav: true, inFooter: true },
  { key: 'insights', path: '/insights', inNav: true, inFooter: true },
  { key: 'contact', path: '/contact', inNav: false, inFooter: true },
]

export const navRoutes = routes.filter((route) => route.inNav)
export const footerRoutes = routes.filter((route) => route.inFooter)

export function routePath(key: RouteKey): string {
  return routes.find((route) => route.key === key)?.path ?? '/'
}

/** Ürün detayı gibi parametreli yollar */
export const productPath = (id: string) => `/products/${id}`
export const insightPath = (id: string) => `/insights/${id}`
export const legalPath = (id: string) => `/legal/${id}`
