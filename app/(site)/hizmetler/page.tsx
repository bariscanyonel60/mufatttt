import type { Metadata } from "next";
import PageHero from "@/components/molecules/PageHero";
import Reveal from "@/components/atoms/Reveal";
import ServiceIcon from "@/components/atoms/ServiceIcon";
import CTA from "@/components/organisms/CTA";
import { liveServices } from "@/lib/live";

export const metadata: Metadata = {
  title: "Hizmetler — Plan, Proje, Taahhüt ve Kontrollük",
  description:
    "MUFAT İnşaat Mühendislik: plan/proje, özel bina inşaatı, kat karşılığı, TKDK/IPARD, kamu ihale (4734–2886), güçlendirme, riskli yapı tespiti, şantiye şefliği ve müşavirlik.",
};

export default async function Page() {
  const services = await liveServices();
  return (
    <>
      <PageHero
        eyebrow="Hizmetlerimiz"
        title="On iki disiplin. Tek sorumluluk anlayışı."
        lead="Notlarımızdaki faaliyet alanlarımızın tamamı: projeden taahhüde, OSB ve kırsal konuttan EKB ile akustik rapora."
      />
      <section className="container-x space-y-6 py-24">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={0.04}>
            <article id={s.slug} className="card group grid gap-6 p-8 md:grid-cols-[64px_1fr_1.4fr] md:items-start md:gap-10 md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                <ServiceIcon name={s.icon} size={24} />
              </div>
              <div>
                <span className="font-display text-xs font-bold text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-1 font-display text-2xl font-bold">
                  <a href={`/hizmetler/${s.slug}`} className="hover:text-gold-deep">{s.title}</a>
                </h2>
                <p className="mt-2 text-sm font-medium text-concrete">{s.short}</p>
              </div>
              <p className="leading-relaxed text-concrete">{s.detail}</p>
            </article>
          </Reveal>
        ))}
      </section>
      <CTA />
    </>
  );
}
