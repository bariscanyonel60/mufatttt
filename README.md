# MUFAT İnşaat Mühendisliği — Kurumsal Web Sitesi

Next.js 15 (App Router) + TypeScript + TailwindCSS + Framer Motion + React Three Fiber ile geliştirilmiş premium kurumsal site.

## Kurulum

```bash
npm install
cp .env.example .env.local   # Resend anahtarını doldurun
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Yapı

- `app/` — Sayfalar (App Router), `api/contact` ve `api/career` (Resend)
- `components/` — Navbar, Footer, Hero3D (yalnızca lg+ / reduced-motion kapalı), ContactForm, CareerForm, CookieConsent, …
- `lib/data.ts` — İçerik + iletişim (NEXT_PUBLIC_SITE_* ile override)
- `public/images/{projects,blog,og}/` — Proje/blog görselleri (SVG placeholder; gerçek fotoğraf koyun)

## Yayın öncesi

1. `lib/data.ts` veya `.env.local` içinde telefon / WhatsApp / e-posta / adres / sosyal URL’leri güncelleyin.
2. `RESEND_API_KEY` ve isteğe bağlı `RESEND_FROM_EMAIL` / `CONTACT_TO_EMAIL` ayarlayın.
3. `public/images/` altındaki placeholder SVG’leri gerçek proje fotoğraflarıyla değiştirin.
4. Google Maps embed URL’sini `mapEmbedUrl` veya `NEXT_PUBLIC_SITE_MAP_EMBED` ile doğrulayın.
5. `site.url` / `NEXT_PUBLIC_SITE_URL` production domain ile eşleşsin.

## Notlar

- 3D hero yalnızca masaüstünde (`min-width: 1024px`) ve `prefers-reduced-motion` kapalıyken yüklenir.
- Çerez banner’ı tercihi `localStorage`’da tutar; analitik script’i yalnızca kabul sonrası hook ile eklenebilir.
- Schema.org JSON-LD, Open Graph, Twitter card, sitemap ve hizmet detay sayfaları hazırdır.
