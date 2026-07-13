import type { MetadataRoute } from "next";
import { liveSite } from "@/lib/live";

export default function robots(): MetadataRoute.Robots {
  const site = liveSite();
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api/admin"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
