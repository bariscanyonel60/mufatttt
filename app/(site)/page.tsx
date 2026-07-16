import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { liveSite, liveServices, liveProjects, liveProcessSteps, liveTestimonials } from "@/lib/live";
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
  const site = await liveSite();
  const services = await liveServices();
  const projects = await liveProjects();
  const processSteps = await liveProcessSteps();
  const testimonials = await liveTestimonials();
  const homeProjectSlugs = ["furkan-apartmani", "adalet-apartmani", "2-0-10-daireli-konut"];
  const homeProjects = homeProjectSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <link rel="preload" as="image" href={HERO_VIDEO_POSTER} />
      <link rel="preload" as="video" href={HERO_VIDEO_SRC} type="video/mp4" />
      <Hero tagline={site.tagline} founded={site.founded} stats={site.stats ?? []} />

      <section className="bg-white py-28 md:py-36" aria-label="Güncel projeler">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              eyebrow="Güncel Projeler"
              title="Son dönemde imzamızı taşıyan yapılar."
              lead="Son 5 yılda proje ve müteahhitliğini üstlendiğimiz konut binalarından endüstriyel tesislere kadar güncel işlerimiz."
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
