# Ana sayfa yeniden tasarımı — 2026-10-07

Ürünler ana sayfadan kaldırıldıktan sonra kalan bölümler yeniden kurulur.
Ürün sayfaları bu kapsamın dışındadır.

## Amaç

Ana sayfa bir vitrin: ziyaretçi ne yaptığımızı 10 saniyede anlasın ve tek
tıkla iletişime geçsin. Her bölüm alt sayfaya bağlanır, içeriği tekrar etmez.

## 1. Hero

- Laptop/telefon çizimi kalkar (`hero.mock.*` anahtarları ve ilgili CSS silinir).
- Sol: kicker, başlık, lead. Sağ: koyu nokta dokusu üzerinde **hızlı iletişim
  kartı** (`HeroLeadForm`):
  - Tek satır: e-posta `input` + sağında "Bana ulaşın" butonu.
  - Altında tam genişlik "Birlikte inşa edelim" butonu → `/contact`.
  - Altında e-posta ve telefon bağlantısı.
- Form Netlify Forms'a gider: `name="hero-lead"`, alanlar `email` ve
  `bot-field`. `index.html` içine gizli kopyası eklenir. Gönderim mantığı
  `src/lib/netlifyForm.ts` içinde paylaşılır; `ContactPage` de bunu kullanır.
- Durumlar: `idle | sending | success | error`. Başarıda kart teşekkür
  satırına döner, hatada e-posta adresi gösterilir.
- Gizlilik Politikası "Hangi verileri topluyoruz" bölümüne hero formunun
  yalnızca e-posta topladığı eklenir; `legalPages.privacy.updated` güncellenir.
- Stats şeridi yerinde kalır.

## 2. Hizmet kartları

- `ServiceCard` bileşeni: `Link` → `servicePath(id)`. Ana sayfa ve
  `/services` sayfası aynı bileşeni kullanır.
- Köşeli (`border-radius: 0`), gölgesiz; hover'da çizgi koyulaşır, ok nane
  yeşiline kayar. Padding 26px, ikon 28px, başlık 1.05rem.
- Koyu panel de köşeli olur.

## 3. Hizmet sayfaları `/services/:serviceId`

- `routes.ts`: `servicePath(id)`. `main.tsx`: lazy `ServicePage`.
- `services[]` kaydına `layout` eklenir: `cases | journey | pairs | questions`.
  Kalıba özgü yapısal veri da burada durur (ürün id'leri, adım/çift/soru
  anahtarları).
- Ortak iskelet: Breadcrumbs → `.page-head` (kicker = hizmet adı, h1, lead) →
  kalıba özgü bölüm → "Nasıl çalışıyoruz" kısa üç adım → kapanış CTA.
- Kalıplar (`src/components/service/*.tsx`):
  - `cases`: `products` içinden seçilen 3 iş; ikon, ad, tek cümle, bağlantı.
  - `journey`: 5 adımlı dikey zaman çizgisi.
  - `pairs`: "A ↔ B" bağlantı listesi; her satır ikon + başlık + tek cümle.
  - `questions`: 4 soru-cevap bloğu + teslim edilenler listesi.
- Metinler `servicePages.items.<id>` altında TR+EN taslak.
- Bilinmeyen id → `NotFoundPage`.

## 4. Yaklaşım bölümü

- Tam genişlik üç şerit kalkar; bölüm `.section` genişliğine döner.
- Tek koyu, köşeli panel: sol %40 nokta dokusu + Wordmark + "Fikri sen anlat";
  sağ %60 kicker, başlık, dört adım yatay dört sütun. Alt kenarda nane
  gradyan şerit + "Önce çalışsın. Sonra büyüsün." + "Hakkımızda →".
- 900px altı: 2×2 adım, 720px altı: tek sütun.

## 5. Haberler

- Ana sayfada üç **konu kartı** (proje bazlı): `homeInsightTopics` —
  `insightProjects` sırasıyla her proje için son 3 not.
- Kart: üstte proje etiketi + konu başlığı + tek cümle
  (`insights.topics.<project>.{title,summary}`); altta tarih sütunlu not
  satırları (`/insights/<id>`); en altta "Tüm notlar →"
  (`/insights?project=<project>`).
- Konu kalın/büyük, notlar ince satır ve ayırıcı çizgi ile ayrışır.

## 6. Footer

- CTA başlığı: "Tecktick Labs tek tik atın,\ngerisini bize bırakın." Metin:
  "Ne kurmak istediğini anlat, aynı gün dönüş yapalım." Pasif ifadeler
  (`contact.text`, `footer.text`) iki dilde de düzeltilir.
- Alt kısım üç sütun: marka + tek cümle; sayfa bağlantıları; iletişim
  (e-posta, telefon) + dil değiştirici. En altta telif + yasal bağlantılar +
  çerez tercihleri tek satırda.

## Stil dosyaları

`src/styles.css` 3.900 satırı geçti. Yeni bölümler ayrı dosyalara yazılır ve
`main.tsx` içinde `styles.css`'ten sonra içe aktarılır:

- `src/styles/home.css` — hero, yaklaşım, haber konuları
- `src/styles/service-page.css` — hizmet sayfası kalıpları
- `src/styles/footer.css` — alt bilgi

Kaldırılan bölümlerin CSS'i `styles.css`'ten silinir (cihaz çizimleri, eski
yaklaşım, eski footer CTA/bottom). Token'lar değişmez.

## Doğrulama

- `corepack yarn build` hatasız.
- TR/EN anahtar eşitliği komutu boş liste döner.
- Tarayıcıda ana sayfa, dört hizmet sayfası, 390px genişlikte yatay taşma yok.
