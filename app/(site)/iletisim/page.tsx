import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { liveSite } from "@/lib/live";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim — Ücretsiz Ön Değerlendirme",
  description: "MUFAT İnşaat Mühendisliği Turhal / Tokat ofisi: telefon, WhatsApp, e-posta ve hızlı teklif formu. Çalışma saatleri ve konum.",
};

export default function Page() {
  const site = liveSite();
  const cards = [
    { icon: Phone, title: "Telefon", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: MessageCircle, title: "WhatsApp", value: site.whatsapp, href: `https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}` },
    { icon: Mail, title: "E-posta", value: site.email, href: `mailto:${site.email}` },
    { icon: Clock, title: "Çalışma Saatleri", value: site.hours },
  ];

  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Projenizi bir kahve eşliğinde konuşalım."
        lead="İlk görüşme ve ön değerlendirme ücretsizdir. Arsanızın imar durumundan aklınızdaki yapıya kadar her şeyi masaya yatırırız."
      />
      <section className="container-x grid gap-12 py-24 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <div className="card flex items-center gap-5 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-gold">
                  <c.icon size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-concrete">{c.title}</p>
                  {c.href ? (
                    <a href={c.href} className="font-display font-bold hover:text-gold-deep" target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                      {c.value}
                    </a>
                  ) : (
                    <p className="font-display font-bold">{c.value}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <div className="card flex items-start gap-5 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-gold"><MapPin size={20} /></div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-concrete">Ofis</p>
                <p className="font-display font-bold">{site.address}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="overflow-hidden rounded-2xl border border-line shadow-card">
              <iframe
                title="MUFAT ofis konumu"
                src={site.mapEmbedUrl}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <h2 className="mb-6 font-display text-2xl font-bold">Hızlı Teklif Formu</h2>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
