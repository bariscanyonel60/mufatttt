"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "@/components/molecules/SectionHead";
import ScrollRevealSection from "@/components/organisms/ScrollRevealSection";

type Step = { no: string; title: string; desc: string };

export default function ProcessStepsGrid({ steps }: { steps: Step[] }) {
  return (
    <ScrollRevealSection className="container-x">
      <div data-reveal>
        <SectionHead
          dark
          eyebrow="Çalışma Sürecimiz"
          title="Sekiz adım. Sıfır sürpriz."
          lead="Her projeyi aynı disiplinle yönetiriz: keşiften teslime, her adımın çıktısı bellidir ve sizinle paylaşılır."
        />
      </div>
      <div className="mt-16 grid gap-px overflow-hidden rounded-feature border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((st) => (
          <div
            key={st.no}
            data-reveal
            className="group h-full bg-ink p-8 transition-colors duration-500 ease-out hover:bg-white/[0.04]"
          >
            <span className="font-display text-sm font-bold text-gold">{st.no}</span>
            <h3 className="mt-4 font-display text-lg font-bold text-white">{st.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/50">{st.desc}</p>
          </div>
        ))}
      </div>
      <div data-reveal className="mt-12 text-center">
        <Link href="/surecimiz" className="btn btn-ghost-dark">
          Süreci Detaylı İncele <ArrowUpRight size={15} />
        </Link>
      </div>
    </ScrollRevealSection>
  );
}
