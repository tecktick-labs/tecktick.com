import type { ProductLinkKind } from '../data/site'

/** Ürün bağlantısı türüne göre çeviri anahtarı */
export const linkLabelKey: Record<ProductLinkKind, string> = {
  web: 'common.visitSite',
  appStore: 'common.viewOnAppStore',
  playStore: 'common.viewOnPlayStore',
}
