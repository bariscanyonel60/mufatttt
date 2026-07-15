import type { ProjectItem } from "@/lib/admin/types";

export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  type: string;
  slug: string;
  location: string;
};

export function buildGalleryItems(projects: ProjectItem[]): GalleryItem[] {
  const items: GalleryItem[] = [];
  const seen = new Set<string>();

  for (const p of projects) {
    const urls = [p.cover, ...(p.gallery || [])].filter(Boolean);
    for (const src of urls) {
      if (seen.has(src)) continue;
      seen.add(src);
      items.push({
        src,
        alt: `${p.title} — ${p.location}`,
        title: p.title,
        type: p.type,
        slug: p.slug,
        location: p.location,
      });
    }
  }
  return items;
}
