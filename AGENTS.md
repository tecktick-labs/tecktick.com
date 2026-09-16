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

App Store ikonunu ve künyesini tahmin etmek yerine resmi servisten alın:

```bash
curl -s "https://itunes.apple.com/lookup?id=<APP_ID>&country=tr" | python3 -m json.tool
```

`artworkUrl512` alanı ikon URL'si olarak kullanılır.

### 5. Sayfalar ve bağlantılar
Site `react-router-dom` ile çalışır:

| Rota | Sayfa |
| --- | --- |
| `/` | Ana sayfa (`src/pages/Home.tsx`) |
| `/products/:productId` | Ürün sayfası (`src/pages/ProductPage.tsx`) |
| diğer | Ana sayfaya yönlenir |

`productId`, `src/data/site.ts` içindeki ürün `id` alanıdır. Netlify
yönlendirmesi (`netlify.toml`) tüm yolları `index.html`'e verir, bu satır
silinmemelidir.

Site içi bağlantılarda `<a href="#products">` **kullanılmaz**; ürün
sayfasındayken çalışmaz. Doğrusu `<Link to="/#products">` biçimidir ve
kaydırmayı `main.tsx` içindeki `ScrollManager` yapar.

Ürün sayfasının içeriği `productPages.items.<key>` altındadır.
`overview.p1` ve `overview.p2` her ürün için zorunludur. Ek bölümler
(sayılar, öne çıkanlar, yolculuk, perde arkası, durum) yalnızca üründeki
`detail` alanında anahtarları verildiğinde görünür; örnek için Barbaros
kaydına bakın. Böylece her ürün sayfası açılır, içerik derinliği ürüne göre
değişir.

### 6. Eksik görseller kırık göstermez
Ürün ikonu `ProductIcon` bileşeninden geçer: kayıtta ikon yoksa **veya**
dosya yüklenemezse otomatik olarak yer tutucuya düşer. Bu yüzden henüz
yüklenmemiş bir görselin yolu veriye yazılabilir.

Proje görselleri `src/assets/` altında durur ve veri dosyasına `import`
edilir (örnek: `src/assets/bks-logo.png` → Barbaros: Kızıl Sakal). Böylece
Vite dosyayı işler ve eksik dosya derlemede hata verir.

### 7. Görsel yer tutucuları
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
  pages/              Home, ProductPage
  i18n.ts             i18next kurulumu, dil algılama, localStorage
  locales/tr.json     çeviriler (varsayılan)
  locales/en.json     çeviriler
  data/site.ts        yapısal içerik, metin içermez
  components/         Header, Hero, Services, Products, Approach, Insights,
                      Footer, Logo, Icons, ProductIcon, LanguageSwitcher
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
