# MUFAT İnşaat Mühendisliği — Kurumsal Web Sitesi

Next.js 15 (App Router) + TypeScript + TailwindCSS + Framer Motion + GSAP ile geliştirilmiş premium kurumsal site.

## Kurulum

```bash
npm install
cp .env.example .env.local   # Resend + Cloudinary + admin anahtarlarını doldurun
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Yapı

- `app/` — Sayfalar (App Router), `api/contact` ve `api/career` (Resend)
- `components/` — Atomic Design: `atoms/`, `molecules/`, `organisms/` (+ `admin/`)
- `docs/FRONTEND.md` — motion stack (Framer / GSAP / Lenis) and component map

- `lib/data.ts` — Seed içerik
- Görseller — Cloudinary (`/admin/media`)
- Veri — MySQL (`DB_*` env) veya yoksa `data/content.json`

## Yayın öncesi

1. `ADMIN_PASSWORD` ve `ADMIN_SECRET` üretimde güçlü rastgele değerler olsun (`.env.example` boş bırakıldı).
2. `lib/data.ts` veya `.env.local` içinde telefon / WhatsApp / e-posta / adres / sosyal URL’leri güncelleyin.
3. `RESEND_API_KEY` ve isteğe bağlı `RESEND_FROM_EMAIL` / `CONTACT_TO_EMAIL` ayarlayın.
4. `CLOUDINARY_*` ayarlayın; projelerine çoklu galeri görselleri yükleyin (`/admin/media`).
5. Vercel / salt-okunur host’ta `DB_*` ile MySQL bağlayın; `scripts/schema.sql` çalıştırın.
6. Google Maps embed URL’sini `mapEmbedUrl` veya `NEXT_PUBLIC_SITE_MAP_EMBED` ile doğrulayın.
7. `site.url` / `NEXT_PUBLIC_SITE_URL` = `https://www.mufatinsaat.com` (apex → www yönlendirmesi `next.config.mjs`’te).
8. İsteğe bağlı: `NEXT_PUBLIC_GA_MEASUREMENT_ID` veya `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`; Turnstile anahtarları.

## Notlar

- Anasayfa hero videosu Cloudinary CDN’den gelir (`lib/media.ts`); masaüstünde scroll-scrub, mobilde autoplay.
- Çerez onayı sonrası analytics (`components/organisms/Analytics.tsx`) yüklenir.
- Formlarda KVKK onayı zorunlu; kariyer CV yükleme (PDF/Word) desteklenir.
- Schema.org JSON-LD, Open Graph, Twitter card, sitemap ve güvenlik header’ları hazırdır.
