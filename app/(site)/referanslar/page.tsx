import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import { liveReferences, liveTestimonials } from "@/lib/live";

export const metadata: Metadata = {
  title: "Referanslar — Bize Güvenen Kurumlar",
  description: "MUFAT İnşaat Mühendisliği'nin çalıştığı kurumlar, işverenler ve müşteri yorumları.",
};

export default function Page() {
  const references = liveReferences();
  const testimonials = liveTestimonials();
  return (
    <>
      <PageHero
        eyebrow="Referanslar"
        title="En iyi reklam, memnun işverendir."
        lead="Aşağıdaki kurum ve yatırımcılarla bir veya birden fazla projede çalıştık. Çoğu, ikinci projesinde yine bizi aradı."
      />
      <section className="container-x py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {references.map((r, i) => (
            <Reveal key={r.name} delay={(i % 4) * 0.06}>
              <div className="card flex h-32 flex-col items-center justify-center gap-3 p-6 text-center font-display text-lg font-bold text-concrete transition-colors hover:text-ink">
                {r.logo ? (
                  <Image
                    src={r.logo}
                    alt=""
                    width={120}
                    height={40}
                    className="h-10 w-auto max-w-[70%] object-contain opacity-80"
                  />
                ) : null}
                <span>{r.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="grid-lines bg-ink py-24">
        <div className="container-x"><Testimonials items={testimonials} /></div>
      </section>
      <CTA />
    </>
  );
}
