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
    areaServed: [
      { "@type": "City", name: "Turhal" },
      { "@type": "City", name: "Tokat" },
      { "@type": "City", name: "Zile" },
      { "@type": "City", name: "Amasya" },
      { "@type": "City", name: "Sivas" },
    ],
    knowsAbout: [
      "Tokat müteahhit",
      "Turhal inşaat",
      "Tokat inşaat",
      "Deprem yönetmeliği",
      "TBDY 2018",
      "Bina güçlendirme",
      "Plan proje mühendislik",
    ],
    description:
      "Tokat ve Turhal’da inşaat, mühendislik, mimarlık, taahhüt ve kontrolörlük; 2026 deprem koşulları ve yasalara uygun plan/proje, kamu ihale, güçlendirme ve müşavirlik.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmoothScroll />
      <Navbar phone={site.phone} email={site.email} />
      <main id="main-content">{children}</main>
      <Footer site={site} />
      <FloatingActions whatsapp={site.whatsapp} />
      <CookieConsent />
      <Analytics />
    </>
  );
}
