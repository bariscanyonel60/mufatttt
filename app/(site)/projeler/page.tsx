import type { Metadata } from "next";
import PageHeroMedia from "@/components/molecules/PageHeroMedia";
import ProjectsGrid from "@/components/organisms/ProjectsGrid";
import CTA from "@/components/organisms/CTA";
import { liveProjects, liveProjectFilters } from "@/lib/live";

export const metadata: Metadata = {
  title: "Projeler — Tamamlanan Yapılarımız",
  description:
    "MUFAT İnşaat Mühendisliği'nin Tokat, Amasya ve Sivas'ta tamamladığı konut, ticari, endüstriyel ve güçlendirme projeleri.",
};

export default async function Page() {
  return (
    <>
      <PageHeroMedia
        eyebrow="Portfolyo"
        title="Güvenle, kaliteli ve sürdürülebilir yapılar."
        lead="Konut, ticari, sanayi ve tarımsal projelerde imzamızı taşıyan yapılar."
        image="/images/projects-banner.png"
        imageAlt="MUFAT İnşaat Mühendislik projeleri"
        imagePosition="center"
      />
      <section className="container-x py-20 md:py-28">
        <ProjectsGrid projects={await liveProjects()} projectFilters={await liveProjectFilters()} />
      </section>
      <CTA />
    </>
  );
}
