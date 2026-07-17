"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Mail, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/projeler", label: "Projeler" },
  { href: "/galeri", label: "Galeri" },
  { href: "/surecimiz", label: "Sürecimiz" },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/haberler", label: "Haberler" },
  { href: "/kariyer", label: "Kariyer" },
];

type Props = {
  phone: string;
  email: string;
};

export default function Navbar({ phone, email }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  const onDark = !scrolled && !open;
  const telHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 max-w-[100vw] overflow-x-clip transition-all duration-500 ease-out ${
        onDark
          ? "border-b border-white/10 bg-[#171717]/92 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-md"
          : "glass-nav shadow-card"
      }`}
    >
      {/* Desktop contact strip */}
      <div
        className={`hidden border-b md:block ${
          onDark ? "border-white/10 bg-black/25" : "border-line/80 bg-ink text-white"
        }`}
      >
        <div className="container-x flex h-9 items-center justify-end gap-6 text-[13px] font-semibold">
          <a
            href={telHref}
            className={`inline-flex items-center gap-2 transition ${
              onDark ? "text-white/80 hover:text-white" : "text-white/85 hover:text-gold"
            }`}
          >
            <Phone size={14} className="text-gold" aria-hidden />
            {phone}
          </a>
          <a
            href={`mailto:${email}`}
            className={`inline-flex items-center gap-2 transition ${
              onDark ? "text-white/80 hover:text-white" : "text-white/85 hover:text-gold"
            }`}
          >
            <Mail size={14} className="text-gold" aria-hidden />
            {email}
          </a>
        </div>
      </div>

      <div className="container-x grid h-[84px] grid-cols-[auto_1fr_auto] items-center gap-4 xl:gap-6">
        <Link href="/" className="group flex shrink-0 items-center" aria-label="MUFAT ana sayfa">
          <Image
            src="/images/logo.png"
            alt="MUFAT İnşaat Mühendislik"
            width={320}
            height={120}
            priority
            className={`h-[3.75rem] w-auto object-contain object-left sm:h-16 xl:h-[4.25rem] ${
              onDark ? "brightness-0 invert" : "[filter:contrast(1.15)_saturate(1.08)]"
            }`}
          />
        </Link>

        <nav
          className="hidden min-w-0 items-center justify-evenly xl:flex"
          aria-label="Ana menü"
        >
          {links.slice(1).map((l) => {
            const active = path.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`group relative px-1 text-center text-[13px] font-semibold transition-colors 2xl:text-[14px] ${
                  active
                    ? onDark
                      ? "text-[#C48A3A]"
                      : "text-gold-deep"
                    : onDark
                      ? "text-white/80 hover:text-white"
                      : "text-ink/70 hover:text-ink"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-1/2 h-px w-[calc(100%-0.5rem)] -translate-x-1/2 origin-center bg-[#C48A3A] transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-3">
          <Link
            href="/iletisim"
            className="btn btn-gold hidden !px-4 !py-2 text-[13px] xl:inline-flex 2xl:!px-5 2xl:!py-2.5 2xl:text-[14px]"
          >
            Teklif Al <ArrowUpRight size={15} />
          </Link>
          <button
            className={`xl:hidden ${onDark ? "text-white" : "text-ink"}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-line bg-white xl:hidden"
            aria-label="Mobil menü"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              <div className="mb-2 space-y-1 border-b border-line px-3 pb-3 text-[14px] font-semibold text-ink">
                <a href={telHref} className="flex items-center gap-2 py-1.5 text-ink/80 hover:text-gold-deep">
                  <Phone size={15} className="text-gold-deep" aria-hidden />
                  {phone}
                </a>
                <a href={`mailto:${email}`} className="flex items-center gap-2 py-1.5 text-ink/80 hover:text-gold-deep">
                  <Mail size={15} className="text-gold-deep" aria-hidden />
                  {email}
                </a>
              </div>
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-lg px-3 py-3 text-[15px] font-semibold text-ink hover:bg-paper">
                  {l.label}
                </Link>
              ))}
              <Link href="/iletisim" className="btn btn-gold mt-2">
                Teklif Al
              </Link>
              <p className="mt-4 border-t border-line px-3 pt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-deep">
                Media:{" "}
                <a
                  href="https://bariscanyonel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink transition hover:text-gold"
                >
                  Barış Can Yönel
                </a>
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
