import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import { liveProcessSteps } from "@/lib/live";

export const metadata: Metadata = {
  title: "Sürecimiz — Keşiften Teslime 8 Adım",
  description: "MUFAT'ın proje yönetim süreci: keşif, planlama, mühendislik, tasarım, onay, inşaat, denetim ve teslim. Her adımın çıktısı bellidir.",
};

export default function Page() {
  const processSteps = liveProcessSteps();
  return (
    <>
      <PageHero
        eyebrow="Çalışma Sürecimiz"
        title="İyi mühendislik, iyi bir süreçtir."
        lead="Projeler kötü hesaptan çok, kötü yönetimden gecikir. Bu yüzden rafine ettiğimiz sekiz adımlı süreci her projede aynı disiplinle uygularız."
      />
      <section className="container-x py-24">
        <div className="relative space-y-8 before:absolute before:left-[27px] before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-line">
          {processSteps.map((s, i) => (
            <Reveal key={s.no} delay={0.04}>
              <article className="relative flex gap-8 pl-0">
                <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-white font-display text-sm font-extrabold text-gold-deep shadow-card">
                  {s.no}
                </div>
                <div className="card w-full p-8">
                  <h2 className="font-display text-xl font-bold">{s.title}</h2>
                  <p className="mt-2 leading-relaxed text-concrete">{s.desc}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold-deep">
                    Çıktı: {["Keşif Raporu","Yol Haritası & Bütçe","Analiz Modeli & Hesap Raporu","Onaylı Proje Seti","Yapı Ruhsatı","Haftalık Saha Raporu","İmalat Kontrol Tutanakları","İskân & Teslim Dosyası"][i]}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
