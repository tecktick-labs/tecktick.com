/** ISO tarihi aktif dile göre okunur biçime çevirir. */
export function formatDate(iso: string, language: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/** Zaman çizelgesindeki ay başlığı: "Eylül 2026" */
export function formatMonth(iso: string, language: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(language, { month: 'long', year: 'numeric' }).format(date)
}

/** Tarih bloğu için gün ve kısa ay: { day: "12", month: "Eyl" } */
export function formatDayParts(iso: string, language: string): { day: string; month: string } {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return { day: '', month: iso }
  return {
    day: new Intl.DateTimeFormat(language, { day: '2-digit' }).format(date),
    month: new Intl.DateTimeFormat(language, { month: 'short' }).format(date),
  }
}
