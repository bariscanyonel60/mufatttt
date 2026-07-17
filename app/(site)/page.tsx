import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import {
  liveSite,
  liveServices,
  liveProjects,
  liveProcessSteps,
  liveTestimonials,
  liveReferences,
  livePosts,
} from "@/lib/live";
import Reveal from "@/components/atoms/Reveal";
import SectionHead from "@/components/molecules/SectionHead";
import ServiceCard from "@/components/molecules/ServiceCard";
import ProjectCard from "@/components/molecules/ProjectCard";
import Testimonials from "@/components/organisms/Testimonials";
import CTA from "@/components/organisms/CTA";
import ProcessStepsGrid from "@/components/organisms/ProcessStepsGrid";
import Hero from "@/components/Hero/Hero";
import { HERO_VIDEO_POSTER, HERO_VIDEO_SRC } from "@/lib/media";

export default async function Home() {
  const [site, services, projects, processSteps, testimonials, references, posts] = await Promise.all([
    liveSite(),
    liveServices(),
    liveProjects(),
    liveProcessSteps(),
    liveTestimonials(),
    liveReferences(),
    livePosts(),
  ]);

  const homeProjects = [...projects]
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);

  const homeNews = posts.slice(0, 3);
  const homeRefs = references.slice(0, 8);

  return (
    <>
      <link rel="preload" as="image" href={HERO_VIDEO_POSTER} />
      <link rel="preload" as="video" href={HERO_VIDEO_SRC} type="video/mp4" />
      <Hero tagline={site.tagline} founded={site.founded} stats={site.stats ?? []} />

      <section className="border-b border-line bg-white py-16 md:py-20" aria-label="Hakkımızda özeti">
        <div className="container-x grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionHead
            eyebrow="Hakkımızda"
            title={`${site.founded}'den bu yana Turhal ve Tokat’ta güvenli yapı.`}
            lead="Plan/proje, müteahhitlik, güçlendirme ve kamu ihale işlerinde mühendislik disiplinini sahaya taşıyoruz."
          />
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-concrete md:text-lg">
              {site.legalName}; konuttan endüstriye, okul güçlendirmeden OSB fabrikalarına kadar uçtan uca
              süreç yönetimi sunar. Güncel deprem yönetmeliği ve yasalara uygun üretim temel ilkemizdir.
            </p>
            <Link href="/hakkimizda" className="btn btn-ghost-light mt-6">
              Hikâyemiz <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-28 md:py-36" aria-label="Güncel projeler">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              eyebrow="Güncel Projeler"
              title="Son dönemde imzamızı taşıyan yapılar."
              lead="Konut binalarından endüstriyel tesislere kadar proje ve müteahhitliğini üstlendiğimiz işler."
            />
            <Reveal delay={0.15}>
              <Link href="/projeler" className="btn btn-ghost-light">
                Tüm Projeler <ArrowUpRight size={15} />
              </Link>
            </Reveal>
          </div>

          {homeProjects.length > 0 && (
            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {homeProjects.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <ProjectCard p={p} fill />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {homeRefs.length > 0 && (
        <section className="border-y border-line bg-[#F7F5F1] py-20 md:py-24" aria-label="Referanslar">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead
                eyebrow="Referanslar"
                title="Birlikte çalıştığımız kurum ve firmalar."
              />
              <Reveal delay={0.1}>
                <Link href="/referanslar" className="btn btn-ghost-light">
                  Tümü <ArrowUpRight size={15} />
                </Link>
              </Reveal>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {homeRefs.map((r, i) => (
                <Reveal key={r.name} delay={(i % 4) * 0.04}>
                  <div className="flex h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-line/80 bg-white px-4 text-center">
                    {r.logo ? (
                      <Image
                        src={r.logo}
                        alt={`${r.name} logosu`}
                        width={120}
                        height={40}
                        className="h-10 w-auto max-w-[70%] object-contain"
                      />
                    ) : null}
                    <span className="font-display text-sm font-semibold text-ink">{r.name}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="hizmetler" className="container-x py-28 md:py-36" aria-label="Hizmetler">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="Uzmanlık Alanlarımız"
            title="Projenin her aşaması, tek çatı altında."
            lead="Plan/projeden kamu ihalesine, OSB fabrikalarından EKB’ye on iki hizmet hattıyla çalışıyoruz."
          />
          <Reveal delay={0.15}>
            <Link href="/hizmetler" className="btn btn-ghost-light">
              Tüm Hizmetler <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} s={s} i={i} />
          ))}
        </div>
      </section>

      {homeNews.length > 0 && (
        <section className="bg-white py-28 md:py-36" aria-label="Bizden haberler">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHead
                eyebrow="Bizden Haberler"
                title="Sahadan ve masadan notlar."
                lead="Projelerimiz, deprem güvenliği ve mevzuat üzerine güncel yazılar."
              />
              <Reveal delay={0.15}>
                <Link href="/haberler" className="btn btn-ghost-light">
                  Tüm Haberler <ArrowUpRight size={15} />
                </Link>
              </Reveal>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {homeNews.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <Link href={`/haberler/${p.slug}`} className="card group block overflow-hidden !p-0">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-concrete">
                        <time dateTime={p.date}>
                          {new Date(p.date).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })}
                        </time>
                        <span className="inline-flex items-center gap-1"><Clock size={12} /> {p.readMin} dk</span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold leading-snug transition-colors group-hover:text-gold-deep">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="grid-lines bg-ink py-28 md:py-36" aria-label="Çalışma sürecimiz">
        <ProcessStepsGrid steps={processSteps} />
      </section>

      <section className="bg-ink pb-28 md:pb-36" aria-label="Müşteri yorumları">
        <div className="container-x border-t border-white/10 pt-24 md:pt-28">
          <Testimonials items={testimonials} />
        </div>
      </section>

      <CTA />
    </>
  );
}
