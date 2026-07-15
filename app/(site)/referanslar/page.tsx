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
          {references.map((r, i) => (
            <Reveal key={r.name} delay={(i % 4) * 0.06}>
              <div className="card flex h-36 flex-col items-center justify-center gap-3 p-6 text-center transition hover:border-gold/40">
                {r.logo ? (
                  <>
                    <Image
                      src={r.logo}
                      alt={`${r.name} logosu`}
                      width={140}
                      height={48}
                      className="h-12 w-auto max-w-[75%] object-contain opacity-90"
                    />
                    <span className="sr-only">{r.name}</span>
                  </>
                ) : (
                  <span className="font-display text-lg font-bold text-concrete transition-colors hover:text-ink">
                    {r.name}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-concrete">
          Logo eklemek için admin → Referanslar → Logo URL (Cloudinary).
        </p>
      </section>
      <section className="grid-lines bg-ink py-24">
        <div className="container-x"><Testimonials items={testimonials} /></div>
      </section>
      <CTA />
    </>
  );
}
