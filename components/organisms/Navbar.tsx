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
  { href: "/blog", label: "Blog" },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
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

      <div className="container-x flex h-[84px] items-center justify-between">
        <Link href="/" className="group flex items-center" aria-label="MUFAT ana sayfa">
          <Image
            src="/images/logo.png"
            alt="MUFAT İnşaat Mühendislik"
            width={280}
            height={100}
            priority
            className={`h-14 w-auto sm:h-16 ${onDark ? "brightness-0 invert" : ""}`}
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Ana menü">
          {links.slice(1).map((l) => {
            const active = path.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`group relative text-[15px] font-semibold transition-colors ${
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
                  className={`absolute -bottom-1 left-0 h-px origin-left bg-[#C48A3A] transition-transform duration-300 ${
                    active ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                  }`}
                  aria-hidden
                />
              </Link>
            );
          })}
          <Link href="/iletisim" className="btn btn-gold !px-5 !py-2.5">
            Teklif Al <ArrowUpRight size={15} />
          </Link>
        </nav>

        <button
          className={`lg:hidden ${onDark ? "text-white" : "text-ink"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
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
