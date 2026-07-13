import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingActions from "@/components/FloatingActions";
import CookieConsent from "@/components/CookieConsent";
import { liveSite } from "@/lib/live";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const site = liveSite();

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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-ink focus:outline-none"
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
    </>
  );
}
