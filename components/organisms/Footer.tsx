import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/lib/admin/types";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

export default function Footer({ site }: { site: SiteContent }) {
  const instagram = site.socials.instagram?.trim();

  return (
    <footer className="bg-ink text-white" role="contentinfo" aria-label="Site alt bilgisi">
      <div className="container-x grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" aria-label="MUFAT ana sayfa" className="inline-block">
            <Image
              src="/images/logo.png"
              alt="MUFAT İnşaat Mühendislik"
              width={280}
              height={100}
              className="h-16 w-auto brightness-0 invert md:h-[4.5rem]"
            />
          </Link>
          <p className="mt-4 max-w-xs text-[15px] font-medium leading-relaxed text-white/55">
            {site.tagline} Turhal / Tokat merkezli inşaat, mühendislik ve mimarlık ofisi.
          </p>
          {instagram ? (
            <div className="mt-6 flex gap-3">
              <a
                href={instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-gold hover:text-gold"
              >
                <Instagram size={16} />
              </a>
            </div>
          ) : null}
        </div>

        <nav aria-label="Hızlı bağlantılar">
          <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-gold">Kurumsal</p>
          <ul className="mt-5 space-y-3 text-[15px] font-medium text-white/70">
            {[["Hakkımızda","/hakkimizda"],["Hizmetler","/hizmetler"],["Projeler","/projeler"],["Sürecimiz","/surecimiz"],["Kariyer","/kariyer"]].map(([t,h]) => (
              <li key={h}><Link className="transition hover:text-gold" href={h}>{t}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Kaynaklar">
          <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-gold">Kaynaklar</p>
          <ul className="mt-5 space-y-3 text-[15px] font-medium text-white/70">
            {[["Galeri","/galeri"],["Blog","/blog"],["Referanslar","/referanslar"],["İletişim","/iletisim"],["Gizlilik Politikası","/gizlilik-politikasi"],["Çerez Politikası","/cerez-politikasi"]].map(([t,h]) => (
              <li key={h}><Link className="transition hover:text-gold" href={h}>{t}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-gold">İletişim</p>
          <ul className="mt-5 space-y-4 text-[15px] font-medium text-white/70">
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" />{site.address}</li>
            <li className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0 text-gold" /><a href={`tel:${site.phone.replace(/\s/g,"")}`} className="hover:text-gold">{site.phone}</a></li>
            <li className="flex gap-3"><Mail size={16} className="mt-0.5 shrink-0 text-gold" /><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-[13px] font-medium text-white/45 md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.</p>
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-gold">
            Media:{" "}
            <a
              href="https://bariscanyonel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition hover:text-gold"
            >
              Barış Can Yönel
            </a>
          </p>
          <p>Turhal · Tokat · Türkiye</p>
        </div>
      </div>
    </footer>
  );
}
