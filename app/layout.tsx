import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { liveSeo, liveSite } from "@/lib/live";

const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });

export async function generateMetadata(): Promise<Metadata> {
  const site = liveSite();
  const seo = liveSeo();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: seo.defaultTitle,
      template: seo.titleTemplate,
    },
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: site.name,
      title: seo.defaultTitle,
      description: seo.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: site.shortName,
      description: seo.description,
      images: ["/opengraph-image"],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${manrope.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
