# Tecktick Labs — Website

Vite + React 19 + TypeScript ile yazılmış tek sayfalık kurumsal site.
Paket yöneticisi **yarn 4** (corepack). Netlify üzerinde yayınlanır.

```bash
corepack yarn dev      # geliştirme sunucusu
corepack yarn build    # tsc -b && vite build  -> dist/
corepack yarn preview  # üretim çıktısını önizle
```

## Mutlak kurallar

### 1. Metin yazmak yasak, çeviri anahtarı kullanılır
Arayüzde görünen **hiçbir metin** bileşenlerin veya veri dosyalarının içine
yazılmaz. Tek kaynak:

- `src/locales/tr.json` (varsayılan dil)
- `src/locales/en.json`

Bileşende kullanım:

```tsx
const { t } = useTranslation()
<h2 className="multiline">{t('services.title')}</h2>
```

Yeni metin eklerken **her iki dosyaya da** aynı anahtar eklenir. Anahtarlar
bölüm bazlı gruplanır (`hero.*`, `services.*`, `products.*`, `footer.*`).
Eksik anahtar sessizce anahtar adını basar, bu yüzden eşitlik kontrolü
önemlidir:

```bash
node -e "const tr=require('./src/locales/tr.json'),en=require('./src/locales/en.json');const k=(o,p='')=>Object.entries(o).flatMap(([a,v])=>typeof v==='object'&&v!==null?k(v,p+a+'.'):[p+a]);const A=k(tr),B=k(en);console.log('tr only:',A.filter(x=>!B.includes(x)),'en only:',B.filter(x=>!A.includes(x)))"
```

Çok satırlı başlıklar JSON içinde `\n` ile yazılır ve öğeye `multiline`
sınıfı verilir (`white-space: pre-line`). JSX içinde `<br />` kullanılmaz.

### 2. Logo üretilmez
Marka amblemi proje kökündeki **`logo.png`** dosyasıdır. Yeni SVG veya
yeniden çizilmiş logo **oluşturulmaz**. Kullanım:

```tsx
import { LogoMark, Wordmark } from './components/Logo'

<Wordmark />                  // amblem + "tecktick labs"
<LogoMark variant="light" />  // koyu zeminlerde beyaza döner
```

### 3. Yapısal veri ile metin ayrıdır
`src/data/site.ts` yalnızca teknik alanları tutar: id, i18n anahtarı, ikon
adı, bağlantı, durum, tema. Metin alanı eklenmez.

### 4. Yeni proje eklemek
Ürünler bölümü iki seviyelidir:

- **Ürün kartları** — `products` dizisi (`src/data/site.ts`). Her kayıt bir
  i18n anahtarı (`products.items.<key>`), durum (`live` / `soon`), ikon URL'si
  ve bağlantı listesi tutar. Bağlantılar `{ kind: 'web' | 'appStore', url }`
  biçimindedir; bir ürünün hem sitesi hem uygulaması varsa iki bağlantı yazılır.
- **Küçük işler** — `smallWorks` dizisi. Daha küçük ölçekli, tek bağlantılı
  işler kartlara değil, kartların altındaki sade listeye eklenir.

Birden çok parçadan oluşan ürünler (web + panel + mobil gibi) **tek ürün
olarak** listelenir; parçalar ürün sayfasındaki "Neler geliştirdik"
bölümünde `detail.platforms` ile gösterilir. Ayrı ürün olması için kendi adı,
kendi kullanıcısı ve tek başına satılabilir olması gerekir.

Bağlantı türleri: `web`, `appStore`, `playStore`. Bir ürün hem iOS hem Android
mağazasında olabilir; etiketler `src/lib/labels.ts` içindeki eşlemeden gelir,
bileşen içinde tür kontrolü yazılmaz.

Ekran görüntüleri de aynı servisten gelir (`screenshotUrls`). Ürün kaydındaki
`screenshots` alanına yazıldığında ürün sayfasında galeri olarak çıkar; URL'de
`320x480bb.jpg` yerine `600x900bb.jpg` kullanılır.

App Store ikonunu ve künyesini tahmin etmek yerine resmi servisten alın:

```bash
curl -s "https://itunes.apple.com/lookup?id=<APP_ID>&country=tr" | python3 -m json.tool
```

`artworkUrl512` alanı ikon URL'si olarak kullanılır.

### 5. Sayfalar, rotalar ve navigasyon
Site `react-router-dom` ile çalışır ve **rotaların tek kaynağı
`src/lib/routes.ts`** dosyasıdır. Menü, alt bilgi ve kırıntı navigasyonu bu
tanımdan beslenir; bağlantı yazarken yol elle yazılmaz, `routePath('products')`
veya `productPath(id)` kullanılır.

| Rota | Sayfa |
| --- | --- |
| `/` | Ana sayfa (`src/pages/Home.tsx`) |
| `/products` | Tüm ürünler (`src/pages/ProductsPage.tsx`) |
| `/products/:productId` | Ürün sayfası (`src/pages/ProductPage.tsx`) |
| `/services` | Hizmetler (`src/pages/ServicesPage.tsx`) |
| `/about` | Hakkımızda (`src/pages/AboutPage.tsx`) |
| `/insights` | Çalışma notları (`src/pages/InsightsPage.tsx`) |
| `/contact` | İletişim ve form (`src/pages/ContactPage.tsx`) |
| diğer | 404 sayfası (`src/pages/NotFoundPage.tsx`) |

**Yeni sayfa eklerken sırayla:**

1. `src/lib/routes.ts` içine rota kaydını ekle (`inNav` / `inFooter` menüde
   görünürlüğü belirler).
2. `src/locales/*.json` içindeki `nav` altına etiketi ekle; anahtar adı rota
   anahtarıyla aynı olmalıdır.
3. Sayfayı `src/pages/` altında oluştur ve `main.tsx` içinde **`lazy` ile**
   bağla. Ana sayfa dışındaki her sayfa ayrı pakete bölünür; yüzlerce sayfaya
   çıkıldığında ilk yükleme boyutu sabit kalır.
4. Sayfanın en üstünde `useDocumentMeta(başlık, açıklama)` çağır. Sekme
   başlığı ve açıklama etiketi burada yönetilir, sayfa içinde `document.title`
   yazılmaz.
5. Alt seviye bir sayfaysa `Breadcrumbs` ekle.

Bölüme kaydıran `#hash` bağlantıları **kullanılmaz**: ana sayfadayken bütün
hash sekmeleri aynı anda seçili görünüyordu ve gereksiz bir ara adımdı. Menüde
`NavLink` aktif sayfayı vurgular, `ScrollManager` her geçişte sayfayı başa alır.

### 6. Sayfa kalıbı ve ana sayfa ilişkisi
Ana sayfa bir **vitrindir**, alt sayfalar **derinliktir**. Ana sayfadaki bölüm
aynı içeriği baştan listelemez; kısa bir özet gösterir ve ilgili sayfaya
bağlanır (örnek: ana sayfada üç iş, `/products` sayfasında tamamı).

Alt sayfalar ortak iskeleti kullanır, böylece yeni sayfa tasarlamak gerekmez:

```
.page            sayfa kabı (shell genişliği)
  Breadcrumbs    konum
  .page-head     kicker + h1 + .page-lead
  .page-section  her bölüm; başlığı .section-label
```

Tasarım dili ana sayfayla aynıdır: açık zemin, ince çizgiler, nane yeşili
vurgu, `--shell` genişliği ve mevcut token'lar. Yeni renk, gölge veya yazı
boyutu uydurulmaz.

**Uzun sayfalar tek bir düzeni tekrarlamaz.** Bölümler birbirinden farklı
kurulur ve aralarına nefes alanı konur. Hizmetler sayfası bu kalıbın örneğidir:

1. Kart ızgarası + koyu panel
2. Tam genişlikte **slogan bandı** (`.slogan-band`) — bölümleri ayırır
3. Yoğun iki sütunlu liste (`.capability-grid`) — ikon + başlık + tek cümle
4. Dar dikey akış (`.process-steps`) + yanında koyu söz bloğu (`.promise`)
5. Kapalı gelen, tıklanınca açılan koyu satır (`.tools-disclosure`) — teknik
   ayrıntı meraklısına sunulur, sayfayı meşgul etmez. Kapalıyken bile ne
   olduğu bellidir: kısa ipucu ve araç sayısı satırda görünür.
6. Kapanış çağrısı

### Yasal sayfalar
`/legal/:id` altında üç metin vardır: `privacy` (Gizlilik Politikası), `kvkk`
(KVKK Aydınlatma Metni), `cookies` (Çerez Politikası). Kayıtlar
`src/data/site.ts` içindeki `legalPages` dizisinde, metinler
`locales/legal.pages.<key>` altındadır ve **bölümler dizi olarak** tutulur:

```json
"sections": [{ "heading": "...", "body": ["..."], "items": ["..."] }]
```

Sayfa bu diziyi `t(..., { returnObjects: true })` ile okur, yani bölüm eklemek
için yalnızca çeviri dosyasına kayıt eklemek yeterlidir. `items` isteğe
bağlıdır. Her metnin `updated` tarihi veri dosyasındadır ve içerik
değiştiğinde güncellenmelidir.

Bağlantılar alt bilgideki ayrı satırda durur. Siteye kişisel veri toplayan
yeni bir alan eklenirse (form alanı, analiz aracı, çerez) bu metinler de
güncellenir.

### Haberler (çalışma notları)
`/insights` bir haber akışıdır; her notun kendi sayfası vardır
(`/insights/<id>`). Yeni not eklerken:

1. `src/data/site.ts` içindeki `insights` dizisine kayıt ekle: `id` (adreste
   görünen kısa ad), `key` (çeviri anahtarı), `project` ve ISO `date`.
   Liste yeniden eskiye sıralıdır; `featured: true` olan not listenin başındaki
   geniş kartta çıkar ve yalnızca bir notta bulunur.
2. `src/locales/*.json` içindeki `insights.items.<key>` altına `tag`, `status`,
   `title`, `excerpt` ve `body.p1/p2/p3` ekle. Özet liste ve paylaşım
   açıklaması olarak kullanılır, gövde yalnızca not sayfasında görünür.
3. Ana sayfada üç not görünür (`homeInsights`); farklı projelerden seçilir,
   aynı projenin üç notu yan yana gelmez.

Tarihler elle yazılmaz: ISO değeri `formatDate` ile aktif dile göre
biçimlenir. Filtreler proje bazlıdır ve seçim adres satırında tutulur
(`/insights?project=barbaros`).

**SEO:** `useDocumentMeta` her sayfada başlık, açıklama, `og:` etiketleri ve
canonical adresi kurar; not sayfaları ayrıca `useArticleSchema` ile Article
yapısal verisi yayınlar. Bunlar tarayıcıda çalışır. Arama motorlarının
JavaScript çalıştırmadan içeriği görmesi gerekiyorsa sonraki adım ön render
(prerender/SSG) kurmaktır.

**Sayılar uydurulmaz.** Ana sayfadaki şerit ve Hakkımızda sayfasındaki
kutu, `src/data/site.ts` içindeki `siteStats` alanından beslenir; bu alan
ürün ve iş listelerinden hesaplanır (yayına alınan iş, App Store uygulaması,
web projesi, geliştirilen ürün). Yeni bir kayıt eklendiğinde rakamlar
kendiliğinden güncellenir. Çeviri dosyasında yalnızca etiketler durur, değerler
değil.

**Marka mottosu:** "Build. Iterate. Evolve." iki dilde de aynı kalır; çeviri
dosyasında değil `src/data/site.ts` içindeki `motto` alanındadır. Ana sayfanın
istatistik şeridi ve Hakkımızda sayfasının kapanışı bu alandan beslenir.

**Marka yazımı:** her yerde **Tecktick** (ilk harf büyük). Küçük harfli
`tecktick` yazımı kullanılmaz; `labs` küçük kalır. Teknik yığını anlatan
açılır satır **Multi Teck** alt markasını taşır; ad olduğu için çeviri
dosyasında değil `src/data/site.ts` içindeki `stackBrand` alanında durur ve
"Teck" kısmı nane yeşiliyle vurgulanır.

Metin ölçüsü: her başlık kendini anlatır, altına tanıtım paragrafı yazılmaz.
Açıklamalar tek cümledir. Teknik terim yerine işin ne yaptığı anlatılır
(örnek: "backend" değil, "arka plan sistemleri: hesaplar, yetkiler ve iş
kuralları"). Marka ve teknoloji adları çeviri dosyasına girmez, veri olarak
`src/data/site.ts` içinde durur.

### 7. Ürünler sayfası: vitrin ve filtreler
`featured: true` işaretli işler sayfanın en üstünde **sabit** bir şeritte
durur ve filtre değişse de yerinde kalır. `FeaturedRail` bileşeni sayıya göre
davranır:

| Öne çıkan sayısı | Görünüm |
| --- | --- |
| 1 | Tek geniş vitrin |
| 2 | Yan yana iki eşit kart |
| 3 ve üzeri | İki kart görünür; oklarla veya sürükleyerek sonsuz döngü |

Döngü, listeyi üç kez basıp orta kopyadan başlatarak kurulur. Konum
düzeltmesi kaydırma **bittikten sonra** yapılır; kaydırma sırasında yapılınca
tarayıcının snap davranışıyla çakışıp konumu sıfırlıyordu.

Her ürün ayrıca `kind` alanı taşır (`app`, `game`, `platform`). Filtreler
`productFilters` dizisinden gelir ve seçim **adres satırında** tutulur
(`/products?filter=game`), böylece filtrelenmiş görünüm paylaşılabilir.
Yeni bir filtre eklemek için diziye bir kayıt ve `productsPage.filters`
altına etiket eklemek yeterlidir.

Metin konusunda ölçü: sayfa başlığı kendi kendini anlatır. Başlığın üstüne
bölüm etiketi, altına uzun tanıtım paragrafı yazılmaz. Küçük ölçekli işler
"küçük işler" değil **"diğer projelerimiz"** başlığıyla listelenir.

### 8. İkon stili (değiştirilmez)
Tüm ikonlar `src/components/Icons.tsx` içindeki `paths` sözlüğünde, tek bir
çizim diliyle tanımlanır:

- `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`
- `strokeWidth="1.8"`, `strokeLinecap="round"`, `strokeLinejoin="round"`
- Sade çizgi çizim; dolgu, gölge, çok renk ve gradyan yok

Yeni ikon gerektiğinde bu sözlüğe aynı kurallarla bir kayıt eklenir.
**İkon kütüphanesi kurulmaz** (lucide, heroicons vb.), emoji veya hazır görsel
ikon kullanılmaz. Ürün logoları bunun dışındadır; onlar `src/assets/` altında
durur.

### 9. İletişim formu
Form **Netlify Forms** üzerinden çalışır ve iki parçası vardır:

1. `index.html` içindeki gizli statik form (Netlify derleme sırasında burayı
   tarar). Alan adları React formuyla birebir aynı olmalıdır.
2. `ContactPage` içindeki gerçek form; gönderimi `fetch` ile kök adrese
   `application/x-www-form-urlencoded` olarak yollar.

Yeni bir alan eklerken **her iki forma da** eklenmelidir, yoksa Netlify o
alanı kaydetmez. Form yalnızca yayındaki Netlify sitesinde çalışır; yerel
geliştirmede gönderim başarısız olur ve kullanıcıya e-posta adresi gösterilir.

İletişim bilgileri (`contactEmail`, `contactPhone`) `src/data/site.ts`
içindedir, metin değil veri oldukları için çeviri dosyalarında tutulmaz.

Ürün sayfasının içeriği `productPages.items.<key>` altındadır.
`overview.p1` ve `overview.p2` her ürün için zorunludur. Ek bölümler
(sayılar, öne çıkanlar, yolculuk, perde arkası, durum) yalnızca üründeki
`detail` alanında anahtarları verildiğinde görünür; örnek için Barbaros
kaydına bakın. Böylece her ürün sayfası açılır, içerik derinliği ürüne göre
değişir.

### 10. Eksik görseller kırık göstermez
Ürün ikonu `ProductIcon` bileşeninden geçer: kayıtta ikon yoksa **veya**
dosya yüklenemezse otomatik olarak yer tutucuya düşer. Bu yüzden henüz
yüklenmemiş bir görselin yolu veriye yazılabilir.

Proje görselleri `src/assets/` altında durur ve veri dosyasına `import`
edilir (örnek: `src/assets/bks-logo.png` → Barbaros: Kızıl Sakal). Böylece
Vite dosyayı işler ve eksik dosya derlemede hata verir.

### 11. Görsel yer tutucuları
Gerçek görseller henüz yok. Görsel alanları `mock-image` sınıfıyla CSS
yer tutucusuna düşer (`mock-office`, `mock-globe`, `mock-gradient`,
`mock-thumb`). Gerçek görsel geldiğinde bu `div` bir `img` ile değiştirilir;
ürün ikonları için `src/data/site.ts` içindeki `icon` alanı doldurulur.

## Dizin düzeni

```
index.html            <html lang="tr">, meta etiketleri (varsayılan Türkçe)
logo.png              tek marka varlığı
src/
  main.tsx            Router, App, <html lang> / başlık senkronu, ScrollManager
  pages/              Home, ProductsPage, ProductPage, ServicesPage,
                      AboutPage, InsightsPage, ContactPage, NotFoundPage
  lib/routes.ts       rotaların tek kaynağı
  hooks/              useDocumentMeta (sekme başlığı ve açıklama)
  i18n.ts             i18next kurulumu, dil algılama, localStorage
  locales/tr.json     çeviriler (varsayılan)
  locales/en.json     çeviriler
  data/site.ts        yapısal içerik, metin içermez
  components/         Header, Hero, Services, Products, Approach, Insights,
                      Footer, Logo, Icons, ProductIcon, Breadcrumbs,
                      LanguageSwitcher
  assets/             proje görselleri (bks-logo.png ve 512px sürümü)
  styles.css          tasarım token'ları ve tüm stiller
```

## Tasarım sistemi

Kompakt, açık zeminli, nane yeşili vurgulu. Token'lar `src/styles.css`
içindeki `:root` bloğundadır: `--ink`, `--muted`, `--mint`, `--surface`,
`--radius-*`, `--shell` (içerik genişliği). Yeni renk veya ölçü doğrudan
yazılmaz, token üzerinden kullanılır.

Kırılım noktaları: 1080px, 900px, 720px. Değişiklikten sonra 390px
genişlikte yatay taşma olmadığı kontrol edilir.

## Dil davranışı

Varsayılan dil **her zaman Türkçe**. Sıra: `?lng=en` sorgu parametresi →
`localStorage` (`tecktick.lang`) → `<html lang>` (`tr`). Tarayıcı dili bilerek kullanılmaz, çünkü ziyaretçinin
dili ne olursa olsun site Türkçe açılır. Üst bardaki TR/EN değiştirici seçimi
`localStorage` içinde saklar.
