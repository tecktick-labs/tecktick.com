/**
 * Olay kataloğu: sitede gönderilen her analitik olayı burada tanımlanır.
 *
 * Yeni olay eklemek için bu tipe bir kayıt eklemek yeterlidir; `trackEvent`
 * adı ve parametreleri buradan denetler. Mümkün olduğunda Google Analytics'in
 * önerilen olay adları kullanılır (generate_lead, select_content ...), böylece
 * raporlarda hazır karşılıkları olur.
 *
 * Sayfa görüntüleme ve dış bağlantı tıklamaları Google Analytics tarafından
 * otomatik ölçülür; buraya eklenmez.
 *
 * Parametrelere kişisel veri (ad, e-posta, mesaj) yazılmaz.
 */
export type AnalyticsEvents = {
  /** Talep formu başarıyla gönderildi; `form` Netlify form adıdır */
  generate_lead: { form: 'contact'; subject?: string }
}

export type AnalyticsEventName = keyof AnalyticsEvents
