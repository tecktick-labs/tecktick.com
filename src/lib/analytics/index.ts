import { onConsentChange, readConsent, type ConsentChoice } from '../consent'
import type { AnalyticsEventName, AnalyticsEvents } from './events'

/**
 * Analitiğin tek giriş noktası. Uygulama yalnızca `trackEvent` kullanır;
 * Firebase, onay ve kuyruk bu dosyanın içinde kalır.
 *
 * - Yalnızca üretim derlemesinde çalışır, yerel geliştirmede olaylar atılır.
 * - Firebase ayrı pakette yüklenir; yüklenene kadar gelen olaylar kuyrukta
 *   bekler, yükleme başarısız olursa (engelleyici eklenti vb.) sessizce atılır.
 * - Onay verilene kadar çerezsiz çalışır (analytics_storage: denied). Reklam
 *   izinleri her zaman kapalıdır. Davranış değişirse Çerez Politikası ve KVKK
 *   metni de güncellenmelidir.
 *
 * Web yapılandırması gizli değildir; Firebase bu değerlerin tarayıcıya
 * gitmesini bekler.
 */
export type { AnalyticsEventName, AnalyticsEvents } from './events'

const firebaseConfig = {
  apiKey: 'AIzaSyBM0ix6wE94VC1AX1JCfF6hjPH_WY4xKEg',
  authDomain: 'tecktick-18c44.firebaseapp.com',
  projectId: 'tecktick-18c44',
  storageBucket: 'tecktick-18c44.firebasestorage.app',
  messagingSenderId: '968106497997',
  appId: '1:968106497997:web:fcab4bce185cc4e0f8d684',
  measurementId: 'G-YSYR1NE88V',
}

/** Firebase yüklenmeden önce birikebilecek en fazla olay */
const MAX_QUEUE = 50

type Sdk = {
  module: typeof import('firebase/analytics')
  instance: import('firebase/analytics').Analytics
}

type QueuedEvent = { name: string; params: Record<string, string | number> }

let sdk: Sdk | null = null
let isDisabled = !import.meta.env.PROD
let queue: QueuedEvent[] = []

export function trackEvent<K extends AnalyticsEventName>(name: K, params: AnalyticsEvents[K]) {
  if (isDisabled) return

  const event = { name, params } as QueuedEvent
  if (sdk) {
    send(sdk, event)
  } else if (queue.length < MAX_QUEUE) {
    queue = [...queue, event]
  }
}

function send({ module, instance }: Sdk, { name, params }: QueuedEvent) {
  module.logEvent(instance, name, params)
}

function storageState(choice: ConsentChoice | null) {
  return choice === 'granted' ? 'granted' : 'denied'
}

/** Google Analytics çerezleri (_ga, _ga_<id>) ret sonrası silinir. */
function clearAnalyticsCookies() {
  const baseDomain = location.hostname.replace(/^www\./, '')
  const domains = ['', location.hostname, `.${baseDomain}`]

  document.cookie
    .split(';')
    .map((entry) => entry.split('=')[0].trim())
    .filter((name) => name.startsWith('_ga'))
    .forEach((name) => {
      domains.forEach((domain) => {
        const domainPart = domain ? `; domain=${domain}` : ''
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}`
      })
    })
}

function applyConsent(choice: ConsentChoice) {
  sdk?.module.setConsent({ analytics_storage: storageState(choice) })
  if (choice === 'denied') clearAnalyticsCookies()
}

async function start() {
  try {
    const [{ initializeApp }, module] = await Promise.all([
      import('firebase/app'),
      import('firebase/analytics'),
    ])

    if (!(await module.isSupported())) throw new Error('Analytics is not supported')

    module.setConsent({
      analytics_storage: storageState(readConsent()),
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
    const loaded = { module, instance: module.getAnalytics(initializeApp(firebaseConfig)) }
    sdk = loaded

    const pending = queue
    queue = []
    pending.forEach((event) => send(loaded, event))
  } catch (error) {
    isDisabled = true
    queue = []
    console.warn('Analytics could not be loaded', error)
  }
}

if (!isDisabled) {
  onConsentChange(applyConsent)
  void start()
}
