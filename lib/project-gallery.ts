/** Extra gallery images from Cloudinary by project type (when only one cover exists). */
export const PROJECT_TYPE_GALLERY_EXTRAS: Record<string, string[]> = {
  Konut: [
    "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/cover-konut",
    "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/yesilirmak-villalari",
    "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/kervan-konaklari",
  ],
  Endüstriyel: [
    "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/cover-endustriyel",
    "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/tokat-osb",
    "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/anadolu-depo",
  ],
  "Güçlendirme": [
    "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/cover-guclendirme",
  ],
  Eğitim: [
    "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/cumhuriyet-okulu",
    "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/cover-guclendirme",
  ],
  Ticari: [
    "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/cover-ticari",
    "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/meydan-carsi",
  ],
};

export function withTypeGallery(cover: string, type: string, gallery: string[]): string[] {
  const extras = PROJECT_TYPE_GALLERY_EXTRAS[type] || [];
  const coverKey = cover.split("/").pop()?.replace(/\.jpg$/i, "") || "";
  const merged = [cover, ...gallery.filter((g) => g !== cover)];
  for (const extra of extras) {
    const key = extra.split("/").pop() || "";
    if (key && key !== coverKey && !merged.some((g) => g.includes(key))) {
      merged.push(extra);
    }
  }
  return merged;
}
