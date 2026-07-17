import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/molecules/PageHero";
import Reveal from "@/components/atoms/Reveal";
import Testimonials from "@/components/organisms/Testimonials";
import CTA from "@/components/organisms/CTA";
import { liveReferences, liveTestimonials } from "@/lib/live";

export const metadata: Metadata = {
  title: "Referanslar — Bize Güvenen Kurumlar",
  description: "MUFAT İnşaat Mühendisliği'nin çalıştığı kurumlar, işverenler ve müşteri yorumları.",
};

export default async function Page() {
  const references = await liveReferences();
  const testimonials = await liveTestimonials();
  return (
    <>
      <PageHero
        eyebrow="Referanslar"
        title="En iyi reklam, memnun işverendir."
        lead="Aşağıdaki kurum ve yatırımcılarla bir veya birden fazla projede çalıştık. Çoğu, ikinci projesinde yine bizi aradı."
      />
      <section className="container-x py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {references.map((r, i) => {
            const isWordmark = Boolean(r.logo?.endsWith(".svg"));
            return (
              <Reveal key={r.name} delay={(i % 4) * 0.06}>
                <div className="card flex min-h-36 flex-col items-center justify-center gap-2 p-6 text-center transition hover:border-gold/40">
                  {r.logo ? (
                    <>
                      <Image
                        src={r.logo}
                        alt={`${r.name} logosu`}
                        width={isWordmark ? 200 : 160}
                        height={isWordmark ? 86 : 64}
                        className={`w-auto max-w-[85%] object-contain opacity-95 ${
                          isWordmark ? "h-16" : "h-14"
                        }`}
                      />
                      {isWordmark ? (
                        <span className="sr-only">{r.name}</span>
                      ) : (
                        <span className="font-display text-sm font-semibold text-ink">{r.name}</span>
                      )}
                    </>
                  ) : (
                    <span className="font-display text-lg font-bold text-concrete transition-colors hover:text-ink">
                      {r.name}
                    </span>
                  )}
                  {r.people ? (
                    <span className="text-xs leading-snug text-concrete">{r.people}</span>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
      <section className="grid-lines bg-ink py-24">
        <div className="container-x"><Testimonials items={testimonials} /></div>
      </section>
      <CTA />
    </>
  );
}
