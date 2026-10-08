/**
 * Çerez onayı.
 *
 * Seçim tarayıcıda saklanır; seçim yapılmadıysa analitik çerezsiz çalışır.
 * Alt bilgideki "Çerez tercihleri" bağlantısı `openConsent()` ile kartı
 * yeniden açar. Analitik, seçim değişikliğini `onConsentChange` ile dinler;
 * kart analitiği doğrudan çağırmaz.
 */
export type ConsentChoice = 'granted' | 'denied'

const STORAGE_KEY = 'tecktick.consent'
const OPEN_EVENT = 'tecktick:consent-open'
const CHANGE_EVENT = 'tecktick:consent-change'

export function readConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Gizli sekmede kayıt tutulamazsa seçim yalnızca bu oturumda geçerlidir.
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CHANGE_EVENT, { detail: choice }))
}

export function onConsentChange(listener: (choice: ConsentChoice) => void) {
  const handler = (event: Event) => listener((event as CustomEvent<ConsentChoice>).detail)
  window.addEventListener(CHANGE_EVENT, handler)
  return () => window.removeEventListener(CHANGE_EVENT, handler)
}

export function openConsent() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function onConsentOpen(listener: () => void) {
  window.addEventListener(OPEN_EVENT, listener)
  return () => window.removeEventListener(OPEN_EVENT, listener)
}
