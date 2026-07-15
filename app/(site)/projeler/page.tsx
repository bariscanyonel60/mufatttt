import type { Metadata } from "next";
import PageHero from "@/components/molecules/PageHero";
import ProjectsGrid from "@/components/organisms/ProjectsGrid";
import CTA from "@/components/organisms/CTA";
import { liveProjects, liveProjectFilters } from "@/lib/live";

export const metadata: Metadata = {
  title: "Projeler — Tamamlanan Yapılarımız",
  description: "MUFAT İnşaat Mühendisliği'nin Tokat, Amasya ve Sivas'ta tamamladığı konut, ticari, endüstriyel ve güçlendirme projeleri.",
};

export default async function Page() {
  return (
    <>
      <PageHero
        eyebrow="Portfolyo"
        title="Her yapı, bir referans mektubudur."
        lead="Aşağıdaki her projede statik hesaplar, denetim raporları ve teslim belgeleri arşivimizde saklıdır. Sorun; gösterelim."
      />
      <section className="container-x py-24">
        <ProjectsGrid projects={await liveProjects()} projectFilters={await liveProjectFilters()} />
      </section>
      <CTA />
    </>
  );
}
