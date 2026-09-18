// Kart ikonu için 512px'e indirilmiş sürüm; kaynak dosya bks-logo.png
import bksLogo from '../assets/bks-logo-512.png'

/**
 * Yapısal içerik. Burada METİN YOKTUR; sadece i18n anahtarları ve
 * teknik alanlar (ikon, bağlantı, görsel, tema) bulunur.
 * Görünen tüm metinler src/locales/tr.json ve en.json dosyalarındadır.
 */

export type ProductLinkKind = 'web' | 'appStore' | 'playStore'

export type ProductLink = {
  kind: ProductLinkKind
  url: string
}

/**
 * Bir ürünün parçaları: web, panel, mobil gibi.
 * Tek üründen oluşan işlerde boş bırakılır.
 */
export type ProductPlatform = {
  key: string
  icon: string
  url?: string
}

/** Ürün detay sayfasında gösterilecek isteğe bağlı bölümler */
export type ProductDetail = {
  statKeys?: string[]
  highlightKeys?: string[]
  journeyKeys?: string[]
  /** "Neler geliştirdik" bölümü */
  platforms?: ProductPlatform[]
  /** Özellik listesi anahtarları */
  featureKeys?: string[]
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
  /** App Store'dan alınan ekran görüntüleri; ürün sayfasında galeri olur */
  screenshots?: string[]
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
    screenshots: [
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/dd/22/fa/dd22fa79-bf2f-c3e6-0298-abc25e5760c0/First_Page.png/600x900bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/79/ca/98/79ca98db-3b7f-19d8-4c83-eaee8f1d37ad/Second_Page.png/600x900bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/45/d6/b2/45d6b246-6bad-9e68-b9a2-9f0d5c2ee722/Thirty_Page.png/600x900bb.jpg',
    ],
    links: [
      { kind: 'web', url: 'https://anlikeleman.com/' },
      { kind: 'appStore', url: 'https://apps.apple.com/tr/app/id6799426020' },
    ],
    metaKeys: ['web', 'ios', 'android', 'free'],
    detail: {
      statKeys: ['apps', 'platforms', 'roles'],
      platforms: [
        { key: 'web', icon: 'web', url: 'https://anlikeleman.com/' },
        { key: 'panel', icon: 'grid', url: 'https://panel.anlikeleman.com/' },
        {
          key: 'mobile',
          icon: 'mobile',
          url: 'https://apps.apple.com/tr/app/id6799426020',
        },
        { key: 'dashboard', icon: 'people' },
        { key: 'api', icon: 'server' },
      ],
      featureKeys: [
        'location',
        'application',
        'messaging',
        'verification',
        'payment',
        'notifications',
        'locations',
        'rating',
      ],
      hasTech: true,
      hasStatus: true,
    },
  },
  {
    id: 'sigortamobil',
    key: 'sigortaMobil',
    status: 'live',
    kind: 'app',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/83/19/e4/8319e467-c259-a03f-a3cf-6f06b78da560/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg',
    tone: 'mint',
    screenshots: [
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/24/56/dd/2456dd73-5758-4e21-246b-d901cc463ae4/6.5_-1.png/600x900bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/d3/3a/f5/d33af5c7-4605-a709-4f6e-2140e837bffe/6.5_-2-1.png/600x900bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a8/16/81/a8168118-1e65-6e27-5ae2-77497f8d6f5a/6.5_-2.png/600x900bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/06/0a/03/060a0357-7f87-521d-dbd8-9252611a56fc/6.5_-7.png/600x900bb.jpg',
    ],
    links: [
      { kind: 'appStore', url: 'https://apps.apple.com/tr/app/sigortamobil/id6739702278' },
      {
        kind: 'playStore',
        url: 'https://play.google.com/store/apps/details?id=com.sigortamobil.portal',
      },
    ],
    metaKeys: ['ios', 'android', 'free'],
    detail: {},
  },
  {
    id: 'nappsa',
    key: 'nappsa',
    status: 'live',
    kind: 'app',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/de/64/7d/de647d90-3890-8c0a-2e01-d7fa5f4b652a/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg',
    tone: 'ink',
    screenshots: [
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/0d/85/74/0d857487-c322-4075-377d-7acfd0ee77e6/6.5_-2.png/600x900bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/c0/8e/cc/c08ecc80-7e7b-2f5e-d70e-21ea6f86ea9d/6.5_-2-1.png/600x900bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/9e/42/36/9e42362e-0c7d-997c-82ec-dc3e58619a94/6.5_-2-2.png/600x900bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/32/6d/b7/326db7c9-0e3d-002b-c3f5-d4fb174071cf/6.5_-2-3.png/600x900bb.jpg',
    ],
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
    screenshots: [
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/ff/f1/6d/fff16daa-8381-bafb-4e8c-0decd8446c92/First_Page.png/600x900bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/a7/07/2b/a7072b1c-318e-495d-2f1f-ff99ee88d764/Second_Page.png/600x900bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/56/e2/7b/56e27b99-03b0-44ea-19f7-dba7e1721f21/Thirty_Page.png/600x900bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/ce/f3/cc/cef3cc64-12c6-3b0b-8fd1-24c9cadee07a/Fourty_Page.png/600x900bb.jpg',
    ],
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
    screenshots: [
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/d7/e7/4c/d7e74c01-27e0-88b4-0964-2f6c5fa5cd7d/Second_Page.png/600x900bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/3b/3b/c1/3b3bc1a1-ac2b-c199-6257-c140dc4ed588/First_Page.png/600x900bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/46/fb/05/46fb05ea-66bd-1010-3a4c-9cc940613193/Thirty_Page__U00281_U0029.png/600x900bb.jpg',
    ],
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
    product.links.some(
      (link) => link.kind === 'appStore' || link.kind === 'playStore',
    ),
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

/**
 * Yasal sayfalar. Metinler locales/legal.pages.<key> altındadır;
 * her sayfanın bölümleri orada dizi olarak tutulur.
 */
export const legalPages = [
  { id: 'privacy', key: 'privacy', updated: '2026-09-18' },
  { id: 'kvkk', key: 'kvkk', updated: '2026-09-18' },
  { id: 'cookies', key: 'cookies', updated: '2026-09-18' },
] as const

export function findLegalPage(id: string | undefined) {
  return legalPages.find((page) => page.id === id)
}

export const contactEmail = 'account@tecktick.com'

/** Görünen biçim ve tel: bağlantısı için ham numara */
export const contactPhone = {
  display: '0534 317 55 65',
  href: 'tel:+905343175565',
}
