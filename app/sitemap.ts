import type { MetadataRoute } from "next";
import { liveSite, liveProjects, livePosts, liveServices } from "@/lib/live";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await liveSite();
  const projects = await liveProjects();
  const posts = await livePosts();
  const services = await liveServices();

  const staticPages = ["", "/hakkimizda", "/hizmetler", "/projeler", "/galeri", "/surecimiz", "/referanslar", "/blog", "/kariyer", "/iletisim"]
    .map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 }));
  const servicePages = services.map((s) => ({ url: `${site.url}/hizmetler/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.65 }));
  const projectPages = projects.map((p) => ({ url: `${site.url}/projeler/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.6 }));
  const blogPages = posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.5 }));
  return [...staticPages, ...servicePages, ...projectPages, ...blogPages];
}
