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
  | 'panel'
  | 'serviceTopic'

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
  { key: 'panel', path: '/panel', inNav: false, inFooter: false },
  { key: 'serviceTopic', path: '/services/:topicId', inNav: false, inFooter: false },
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
export const serviceTopicPath = (id: string) => `/services/${id}`

/** Arama motorları için her dilin ayrı ve kalıcı URL'si vardır. */
export function stripLanguagePath(path: string): string {
  return path === '/en' || path === '/en/' ? '/' : path.startsWith('/en/') ? path.slice(3) : path
}

export function localizedPath(path: string, language: string): string {
  const base = stripLanguagePath(path)
  return language === 'en' ? `/en${base}` : base
}

/** Hizmetler sayfasında açık gelecek satır: /services?service=<id> */
export const SERVICE_PARAM = 'service'
export const serviceFocusPath = (id: string) =>
  `${routePath('services')}?${SERVICE_PARAM}=${id}`
