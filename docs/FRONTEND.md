# Frontend standards

## Atomic Design

```
components/
  atoms/        # Counter, Reveal, ServiceIcon
  molecules/    # PageHero, SectionHead, ServiceCard, ProjectCard
  organisms/    # Navbar, Footer, CTA, grids, forms, Hero, SmoothScroll, GSAP sections
  admin/        # Admin panel only (not Atomic)
```

Import from the layer path, e.g. `@/components/organisms/Navbar`.

## Motion stack

| Tool | Use for |
|---|---|
| **Framer Motion** | UI transitions: navbar menu, card hover, carousels, gallery filters, simple `Reveal` fades |
| **GSAP + ScrollTrigger** | Advanced scroll: process grids, timelines, milestones (`ScrollRevealSection`, `useScrollReveal`) |
| **Lenis** | Smooth scrolling; synced with ScrollTrigger in `organisms/SmoothScroll` |

`prefers-reduced-motion: reduce` disables Lenis and GSAP tweens; Framer respects `useReducedMotion`.

## Accessibility

- Skip link → `#main-content`
- Landmarks: `header`, `main`, `footer`
- Visible `:focus-visible` rings
- Meaningful image `alt` (decorative: `alt=""` + `aria-hidden`)

## Immersive Hero (`components/Hero/`)

Cloudinary video (`lib/media.ts` → `HERO_VIDEO_SRC`).
Desktop (`lg+`, motion OK): GSAP-pinned scroll scrub (`useHeroAnimation` + `HeroVideo`).
Mobile / reduced-motion: muted autoplay loop + poster frame.

## Forms & compliance

- Contact / career: Zod + RHF, honeypot, IP rate limit, KVKK checkbox
- Optional Cloudflare Turnstile (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`)
- Career CV → Cloudinary raw (`mufat/cvs`)
- Analytics (`Analytics.tsx`) only after `mufat:consent`

