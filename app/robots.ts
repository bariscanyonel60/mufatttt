import type { MetadataRoute } from "next";
import { liveSite } from "@/lib/live";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await liveSite();
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api/admin"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
