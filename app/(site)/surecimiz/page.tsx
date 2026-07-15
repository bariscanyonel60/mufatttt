import type { Metadata } from "next";
import PageHero from "@/components/molecules/PageHero";
import CTA from "@/components/organisms/CTA";
import ProcessTimeline from "@/components/organisms/ProcessTimeline";
import { liveProcessSteps } from "@/lib/live";

export const metadata: Metadata = {
  title: "Sürecimiz — Keşiften Teslime 8 Adım",
  description: "MUFAT'ın proje yönetim süreci: keşif, planlama, mühendislik, tasarım, onay, inşaat, denetim ve teslim. Her adımın çıktısı bellidir.",
};

export default async function Page() {
  const processSteps = await liveProcessSteps();
  return (
    <>
      <PageHero
        eyebrow="Çalışma Sürecimiz"
        title="İyi mühendislik, iyi bir süreçtir."
        lead="Projeler kötü hesaptan çok, kötü yönetimden gecikir. Bu yüzden rafine ettiğimiz sekiz adımlı süreci her projede aynı disiplinle uygularız."
      />
      <ProcessTimeline steps={processSteps} />
      <CTA />
    </>
  );
}
