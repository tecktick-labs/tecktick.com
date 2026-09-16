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

export type Product = {
  id: string
  /** products.items.<key> altındaki çeviri grubu */
  key: string
  status: 'live' | 'soon'
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

export const statKeys = ['projects', 'clients', 'industries', 'next'] as const

export const services = [
  { id: 'customSoftware', icon: 'code', featured: true },
  { id: 'product', icon: 'layers', featured: false },
  { id: 'integration', icon: 'grid', featured: false },
  { id: 'consulting', icon: 'people', featured: false },
] as const

export const approachSteps = [
  { key: 'understand', step: '01' },
  { key: 'build', step: '02' },
  { key: 'iterate', step: '03' },
  { key: 'evolve', step: '04' },
] as const

export const insightKeys = ['anlikEleman', 'barbaros', 'process'] as const

export const navigation = [
  { key: 'products', href: '#products' },
  { key: 'services', href: '#services' },
  { key: 'about', href: '#about' },
  { key: 'insights', href: '#insights' },
] as const

export const contactEmail = 'account@tecktick.com'
