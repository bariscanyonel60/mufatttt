import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import SmoothScroll from "@/components/organisms/SmoothScroll";
import FloatingActions from "@/components/organisms/FloatingActions";
import CookieConsent from "@/components/organisms/CookieConsent";
import Analytics from "@/components/organisms/Analytics";
import { liveSite } from "@/lib/live";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const site = await liveSite();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    foundingDate: String(site.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cumhuriyet Cad. No:1",
      addressLocality: "Turhal",
      addressRegion: "Tokat",
      addressCountry: "TR",
    },
    areaServed: ["Turhal", "Tokat", "Amasya", "Sivas"],
    description:
      "İnşaat, mühendislik, mimarlık, taahhüt ve kontrolörlük; plan/proje, kamu ihale, güçlendirme ve müşavirlik hizmetleri.",
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-white focus:outline-none"
      >
        İçeriğe atla
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmoothScroll />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer site={site} />
      <FloatingActions whatsapp={site.whatsapp} />
      <CookieConsent />
      <Analytics />
    </>
  );
}
