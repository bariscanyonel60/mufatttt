"use client";

import ScrollRevealSection from "@/components/organisms/ScrollRevealSection";

type Step = { no: string; title: string; desc: string };

const OUTPUTS = [
  "Keşif Raporu",
  "Yol Haritası & Bütçe",
  "Analiz Modeli & Hesap Raporu",
  "Onaylı Proje Seti",
  "Yapı Ruhsatı",
  "Haftalık Saha Raporu",
  "İmalat Kontrol Tutanakları",
  "İskân & Teslim Dosyası",
];

export default function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <ScrollRevealSection className="container-x py-24">
      <div className="relative space-y-8 before:absolute before:left-[27px] before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-line">
        {steps.map((s, i) => (
          <article key={s.no} data-reveal className="relative flex gap-8 pl-0">
            <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-white font-display text-sm font-extrabold text-gold-deep shadow-card">
              {s.no}
            </div>
            <div className="card w-full p-8">
              <h2 className="font-display text-xl font-bold">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-concrete">{s.desc}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold-deep">
                Çıktı: {OUTPUTS[i] ?? "—"}
              </p>
            </div>
          </article>
        ))}
      </div>
    </ScrollRevealSection>
  );
}
