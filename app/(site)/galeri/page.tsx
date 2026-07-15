import type { Metadata } from "next";
import PageHero from "@/components/molecules/PageHero";
import GalleryGrid from "@/components/organisms/GalleryGrid";
import CTA from "@/components/organisms/CTA";
import { buildGalleryItems } from "@/lib/gallery";
import { liveProjects, liveProjectFilters } from "@/lib/live";

export const metadata: Metadata = {
  title: "Galeri — Proje Görselleri",
  description:
    "MUFAT İnşaat Mühendisliği'nin Tokat ve çevresinde tamamladığı konut, ticari, endüstriyel ve güçlendirme projelerinden görseller.",
};

export default async function Page() {
  const projects = await liveProjects();
  const items = buildGalleryItems(projects);
  const filters = await liveProjectFilters();

  return (
    <>
      <PageHero
        eyebrow="Galeri"
        title="Saha fotoğraflarından seçkiler."
        lead="Turhal ve Tokat’ta tamamladığımız okul, konut, fabrika ve güçlendirme işlerinden arşiv görüntüleri. Her görsel ilgili proje sayfasına bağlanır."
      />
      <section className="container-x py-24">
        <GalleryGrid items={items} filters={filters} />
      </section>
      <CTA />
    </>
  );
}
