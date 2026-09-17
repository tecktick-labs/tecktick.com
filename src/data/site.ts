// Kart ikonu için 512px'e indirilmiş sürüm; kaynak dosya bks-logo.png
import bksLogo from '../assets/bks-logo-512.png'

/**
 * Yapısal içerik. Burada METİN YOKTUR; sadece i18n anahtarları ve
 * teknik alanlar (ikon, bağlantı, görsel, tema) bulunur.
 * Görünen tüm metinler src/locales/tr.json ve en.json dosyalarındadır.
 */

export type ProductLinkKind = 'web' | 'appStore'

export type ProductLink = {
  kind: ProductLinkKind
  url: string
}

/** Ürün detay sayfasında gösterilecek isteğe bağlı bölümler */
export type ProductDetail = {
  statKeys?: string[]
  highlightKeys?: string[]
  journeyKeys?: string[]
  hasTech?: boolean
  hasStatus?: boolean
}

/** Ürünler sayfasındaki filtre grupları */
export type ProductKind = 'app' | 'game' | 'platform'

export type Product = {
  id: string
  /** products.items.<key> altındaki çeviri grubu */
  key: string
  status: 'live' | 'soon'
  kind: ProductKind
  /** Ürünler sayfasının üst vitrininde gösterilir */
  featured?: boolean
  /** Görsel yoksa arayüz otomatik olarak yer tutucuya düşer */
  icon: string | null
  tone: 'mint' | 'ink' | 'violet'
  /** Koyu zemin için tasarlanmış logolarda ikon kutusu koyulaşır */
  iconTheme?: 'light' | 'dark'
  links: ProductLink[]
  /** products.meta.<key> altındaki etiketler */
  metaKeys: string[]
  /** productPages.items.<key> altındaki ek bölümler */
  detail?: ProductDetail
}

/** /products/:id adresinden ürünü bulur */
export function findProduct(id: string | undefined): Product | undefined {
  return products.find((product) => product.id === id)
}

export const products: Product[] = [
  {
    id: 'anlik-eleman',
    key: 'anlikEleman',
    status: 'live',
    kind: 'platform',
    featured: true,
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/25/37/1c/25371c3b-bb08-275d-4fa3-55eaba68ef3d/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg',
    tone: 'mint',
    links: [
      { kind: 'web', url: 'https://anlikeleman.com/' },
      { kind: 'appStore', url: 'https://apps.apple.com/tr/app/id6799426020' },
    ],
    metaKeys: ['web', 'ios', 'free'],
    detail: {},
  },
  {
    id: 'nappsa',
    key: 'nappsa',
    status: 'live',
    kind: 'app',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/de/64/7d/de647d90-3890-8c0a-2e01-d7fa5f4b652a/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg',
    tone: 'ink',
    links: [
      { kind: 'appStore', url: 'https://apps.apple.com/tr/app/nappsa/id6744270311' },
    ],
    metaKeys: ['ios', 'free', 'year'],
    detail: {},
  },
  {
    id: 'tilo',
    key: 'tilo',
    status: 'live',
    kind: 'game',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/f0/4a/ce/f04acefc-e39b-5c1a-da06-cd2b5ac578f7/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg',
    tone: 'mint',
    links: [
      { kind: 'appStore', url: 'https://apps.apple.com/us/app/tilo-resimli-yapboz/id6758107357' },
    ],
    metaKeys: ['ios', 'free', 'year'],
    detail: {},
  },
  {
    id: 'grid-grin',
    key: 'gridGrin',
    status: 'live',
    kind: 'game',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/f8/83/fc/f883fcb2-223e-1878-56d3-41fb65b548ec/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg',
    tone: 'ink',
    links: [
      { kind: 'appStore', url: 'https://apps.apple.com/us/app/grid-grin-block-puzzle/id6758456888' },
    ],
    metaKeys: ['ios', 'free', 'year'],
    detail: {},
  },
  {
    id: 'bks',
    key: 'bks',
    status: 'soon',
    kind: 'game',
    featured: true,
    icon: bksLogo,
    tone: 'violet',
    iconTheme: 'dark',
    links: [],
    metaKeys: ['unity', 'server', 'mmo'],
    detail: {
      statKeys: ['levels', 'ships', 'maps', 'classes', 'party'],
      highlightKeys: ['factions', 'classes', 'combat', 'ships', 'world', 'social'],
      journeyKeys: [
        'smallBoat',
        'firstQuests',
        'newShips',
        'build',
        'combat',
        'party',
        'fleet',
        'island',
        'endgame',
      ],
      hasTech: true,
      hasStatus: true,
    },
  },
]

/** Daha küçük ölçekli, yayında olan işler. Ürün kartlarının altında listelenir. */
export const smallWorks = [
  { id: 'emras-kitchen', key: 'emrasKitchen', url: 'https://emraninmutfagi.com/' },
  { id: 'inception-rent', key: 'inceptionRent', url: 'https://belekcarrent.com/' },
  { id: 'elys-prime', key: 'elysPrime', url: 'https://elysprime.com/' },
] as const

/** Ürünler sayfasındaki filtre seçenekleri; sırayla gösterilir */
export const productFilters = [
  { key: 'all', match: () => true },
  { key: 'app', match: (p: Product) => p.kind === 'app' },
  { key: 'game', match: (p: Product) => p.kind === 'game' },
  { key: 'platform', match: (p: Product) => p.kind === 'platform' },
  { key: 'soon', match: (p: Product) => p.status === 'soon' },
] as const

export type ProductFilterKey = (typeof productFilters)[number]['key']

export function filterProducts(key: string): Product[] {
  const filter = productFilters.find((item) => item.key === key)
  if (!filter) return products
  return products.filter(filter.match)
}

/** Ürünler sayfasının üstünde sabit duran şerit */
export const featuredProducts = products.filter((product) => product.featured)

/** Ana sayfada gösterilecek kısa liste: öne çıkanlar önce, toplam üç iş */
export const homeProducts = [
  ...products.filter((product) => product.featured),
  ...products.filter((product) => !product.featured),
].slice(0, 3)

/**
 * Sayılar elle yazılmaz; ürün ve iş listelerinden hesaplanır.
 * Yeni bir kayıt eklendiğinde rakamlar kendiliğinden güncellenir.
 */
export const siteStats = {
  shipped:
    products.filter((product) => product.status === 'live').length +
    smallWorks.length,
  apps: products.filter((product) =>
    product.links.some((link) => link.kind === 'appStore'),
  ).length,
  web:
    smallWorks.length +
    products.filter((product) =>
      product.links.some((link) => link.kind === 'web'),
    ).length,
  building: products.filter((product) => product.status === 'soon').length,
}

export const statKeys = ['shipped', 'apps', 'web', 'building'] as const

/** Marka mottosu; iki dilde de aynı kalır, bu yüzden çeviri dosyasında değil. */
export const motto = 'Build. Iterate. Evolve.'

/** Hakkımızda sayfasındaki geçmiş alanları */
export const experienceKeys = [
  'banking',
  'corporate',
  'multilingual',
  'platforms',
  'realtime',
] as const

export const valueKeys = ['clarity', 'ownership', 'craft'] as const

export const services = [
  { id: 'customSoftware', icon: 'code', featured: true },
  { id: 'product', icon: 'layers', featured: false },
  { id: 'integration', icon: 'grid', featured: false },
  { id: 'consulting', icon: 'people', featured: false },
] as const

/**
 * Hizmetler sayfasındaki yetenek listesi.
 * Metinler locales/servicesPage.capabilities altındadır; burada yalnızca
 * sıra ve ikon adı tutulur.
 */
export const capabilities = [
  { key: 'mobile', icon: 'mobile' },
  { key: 'web', icon: 'web' },
  { key: 'services', icon: 'server' },
  { key: 'integration', icon: 'plug' },
  { key: 'cloud', icon: 'cloud' },
  { key: 'product', icon: 'rocket' },
  { key: 'consulting', icon: 'compass' },
  { key: 'ai', icon: 'sparkle' },
] as const

/** Süreç bölümünün yanındaki değişmez söz listesi */
export const promiseKeys = ['team', 'scope', 'build'] as const

/** Teknik yığını anlatan alt marka; ad olduğu için çevrilmez. */
export const stackBrand = { first: 'Multi', second: 'Teck' }

/** Araç adları marka adıdır, çevrilmez; grup başlıkları i18n'den gelir. */
export const toolGroups = [
  { key: 'mobile', items: ['React Native', 'Expo'] },
  { key: 'web', items: ['Next.js', 'React'] },
  { key: 'backend', items: ['NestJS', 'Node.js', 'Express'] },
  { key: 'data', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Supabase', 'Firebase'] },
  { key: 'cloud', items: ['Docker', 'Nginx', 'AWS', 'Firebase Hosting'] },
] as const

export const approachSteps = [
  { key: 'understand', step: '01' },
  { key: 'build', step: '02' },
  { key: 'iterate', step: '03' },
  { key: 'evolve', step: '04' },
] as const

/**
 * Çalışma notları / haberler.
 * Metinler locales/insights.items.<key> altındadır; burada yalnızca yapı,
 * tarih ve sınıflandırma tutulur. Her notun kendi sayfası vardır:
 * /insights/<id>
 */
export type InsightProject = 'anlikEleman' | 'barbaros' | 'studio'

export type Insight = {
  id: string
  key: string
  project: InsightProject
  /** ISO tarih; görüntüleme dile göre biçimlendirilir */
  date: string
  featured?: boolean
}

export const insights: Insight[] = [
  {
    id: 'anlik-eleman-isveren-paneli',
    key: 'aePanel',
    project: 'anlikEleman',
    date: '2026-09-12',
    featured: true,
  },
  {
    id: 'anlik-eleman-mobil',
    key: 'aeMobile',
    project: 'anlikEleman',
    date: '2026-09-08',
  },
  {
    id: 'anlik-eleman-web',
    key: 'aeWeb',
    project: 'anlikEleman',
    date: '2026-09-02',
  },
  {
    id: 'barbaros-sunucu-unity',
    key: 'barbarosServer',
    project: 'barbaros',
    date: '2026-08-28',
  },
  {
    id: 'barbaros-harita-uretimi',
    key: 'barbarosMaps',
    project: 'barbaros',
    date: '2026-08-21',
  },
  {
    id: 'calisma-ritmimiz',
    key: 'process',
    project: 'studio',
    date: '2026-08-14',
  },
]

export const insightProjects = ['all', 'anlikEleman', 'barbaros', 'studio'] as const

export function filterInsights(project: string): Insight[] {
  if (project === 'all') return insights
  return insights.filter((item) => item.project === project)
}

export function findInsight(id: string | undefined): Insight | undefined {
  return insights.find((item) => item.id === id)
}

/** Ana sayfada gösterilen üç not; farklı projelerden seçilir */
export const homeInsights = [
  insights.find((i) => i.key === 'aePanel'),
  insights.find((i) => i.key === 'barbarosMaps'),
  insights.find((i) => i.key === 'process'),
].filter(Boolean) as Insight[]

export const contactEmail = 'account@tecktick.com'

/** Görünen biçim ve tel: bağlantısı için ham numara */
export const contactPhone = {
  display: '0534 317 55 65',
  href: 'tel:+905343175565',
}
