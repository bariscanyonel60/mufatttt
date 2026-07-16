import type { Metadata } from "next";
import PageHeroMedia from "@/components/molecules/PageHeroMedia";
import CTA from "@/components/organisms/CTA";
import ProcessTimeline from "@/components/organisms/ProcessTimeline";
import { liveProcessSteps } from "@/lib/live";

export const metadata: Metadata = {
  title: "Sürecimiz — Keşiften Teslime 8 Adım",
  description:
    "MUFAT'ın proje yönetim süreci: keşif, planlama, mühendislik, tasarım, onay, inşaat, denetim ve teslim. Her adımın çıktısı bellidir.",
};

export default async function Page() {
  const processSteps = await liveProcessSteps();
  return (
    <>
      <PageHeroMedia
        eyebrow="Çalışma Sürecimiz"
        title="İyi mühendislik, iyi bir süreçtir."
        lead="Projeler kötü hesaptan çok, kötü yönetimden gecikir. Bu yüzden sekiz adımlı süreci her projede aynı disiplinle uygularız."
        image="/images/process-banner.png"
        imageAlt="MUFAT İnşaat Mühendislik çalışma süreci — keşiften teslime"
      />
      <ProcessTimeline steps={processSteps} />
      <CTA />
    </>
  );
}
