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
