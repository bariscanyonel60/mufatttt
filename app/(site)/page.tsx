import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { liveSite, liveServices, liveProjects, liveProcessSteps, liveTestimonials } from "@/lib/live";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import HeroCanvas from "@/components/HeroCanvas";

export default function Home() {
  const site = liveSite();
  const services = liveServices();
  const projects = liveProjects();
  const processSteps = liveProcessSteps();
  const testimonials = liveTestimonials();

  return (
    <>
      <section className="grid-lines relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
        <div className="absolute right-[-8%] top-1/2 hidden h-[120%] w-[58%] -translate-y-1/2 lg:block">
          <HeroCanvas />
        </div>
        <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" aria-hidden />

        <div className="container-x relative py-36">
          <Reveal>
            <span className="eyebrow !text-gold">Turhal · Tokat · İnşaat Mühendisliği</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-display mt-7 max-w-3xl text-5xl text-white sm:text-6xl lg:text-7xl">
              Hesapla başlar.
              <br />
              <span className="text-gold">Sahada kanıtlanır.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/60">
              {site.tagline}. Plan ve projeden taahhüde, kontrollükten müşavirliğe;
              {site.founded}&apos;den bu yana özel ve resmi işverenlerle çalışıyoruz.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/iletisim" className="btn btn-gold">Projenizi Anlatın <ArrowUpRight size={16} /></Link>
              <Link href="/projeler" className="btn btn-ghost-dark">Portfolyoyu Gör</Link>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <dl className="mt-20 grid max-w-2xl grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
              {site.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-4xl font-extrabold text-white">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                  <p className="mt-1.5 text-xs leading-snug text-white/50">{s.label}</p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <a href="#hizmetler" aria-label="Aşağı kaydır"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 transition hover:text-gold">
          <ArrowDown className="animate-bounce" size={20} />
        </a>
      </section>

      <section id="hizmetler" className="container-x py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Uzmanlık Alanlarımız"
            title="Projenin her aşaması, tek çatı altında."
            lead="Plan/projeden kamu ihalesine, OSB fabrikalarından EKB’ye on iki hizmet hattıyla çalışıyoruz."
          />
          <Reveal delay={0.15}>
            <Link href="/hizmetler" className="btn btn-ghost-light">Tüm Hizmetler <ArrowUpRight size={15} /></Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
        </div>
      </section>

      <section className="bg-white py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="Seçili Projeler"
              title="İmzamızı taşıyan yapılar."
              lead="Konut sitelerinden endüstriyel tesislere; her ölçekte, belgeli ve denetimli işler."
            />
            <Reveal delay={0.15}>
              <Link href="/projeler" className="btn btn-ghost-light">Tüm Projeler <ArrowUpRight size={15} /></Link>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <Reveal key={p.slug}><ProjectCard p={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grid-lines bg-ink py-28">
        <div className="container-x">
          <SectionHead
            dark eyebrow="Çalışma Sürecimiz"
            title="Sekiz adım. Sıfır sürpriz."
            lead="Her projeyi aynı disiplinle yönetiriz: keşiften teslime, her adımın çıktısı bellidir ve sizinle paylaşılır."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((st, i) => (
              <Reveal key={st.no} delay={(i % 4) * 0.07}>
                <div className="group h-full bg-ink p-7 transition-colors duration-500 hover:bg-white/[0.04]">
                  <span className="font-display text-sm font-bold text-gold">{st.no}</span>
                  <h3 className="mt-3 font-display text-lg font-bold text-white">{st.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{st.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link href="/surecimiz" className="btn btn-ghost-dark">Süreci Detaylı İncele <ArrowUpRight size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink pb-28">
        <div className="container-x border-t border-white/10 pt-24">
          <Testimonials items={testimonials} />
        </div>
      </section>

      <CTA />
    </>
  );
}
