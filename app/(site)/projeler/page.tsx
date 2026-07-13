import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectsGrid from "@/components/ProjectsGrid";
import CTA from "@/components/CTA";
import { liveProjects, liveProjectFilters } from "@/lib/live";

export const metadata: Metadata = {
  title: "Projeler — Tamamlanan Yapılarımız",
  description: "MUFAT İnşaat Mühendisliği'nin Tokat, Amasya ve Sivas'ta tamamladığı konut, ticari, endüstriyel ve güçlendirme projeleri.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Portfolyo"
        title="Her yapı, bir referans mektubudur."
        lead="Aşağıdaki her projede statik hesaplar, denetim raporları ve teslim belgeleri arşivimizde saklıdır. Sorun; gösterelim."
      />
      <section className="container-x py-24">
        <ProjectsGrid projects={liveProjects()} projectFilters={liveProjectFilters()} />
      </section>
      <CTA />
    </>
  );
}
