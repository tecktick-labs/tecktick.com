# Tecktick Labs — Website

Bu projenin tüm kuralları tek dosyada tutulur: @AGENTS.md

Özet (ayrıntı için AGENTS.md okunmalıdır):

1. Arayüz metni bileşene yazılmaz. Tek kaynak `src/locales/tr.json` ve
   `src/locales/en.json`, kullanım `t('bolum.anahtar')`.
2. Logo üretilmez. Marka varlığı kökteki `logo.png` ve `src/components/Logo.tsx`.
3. `src/data/site.ts` yalnızca yapısal veri tutar, metin tutmaz.
4. Varsayılan dil Türkçe, ikinci dil İngilizce.
