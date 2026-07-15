"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  const onHero = path === "/";
  const dark = onHero && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled ? "glass-nav shadow-card" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[76px] items-center justify-between">
        <Link href="/" className="group flex items-baseline gap-2" aria-label="MUFAT ana sayfa">
          <span className={`font-display text-[22px] font-extrabold tracking-tight ${dark ? "text-white" : "text-ink"}`}>
            MUFAT<span className="text-gold">.</span>
          </span>
          <span className={`hidden text-[10px] font-semibold uppercase tracking-[0.22em] sm:block ${dark ? "text-white/50" : "text-concrete"}`}>
            İnşaat Mühendisliği
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Ana menü">
          {links.slice(1).map((l) => {
            const active = path.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`group relative text-[13.5px] font-medium transition-colors ${
                  active
                    ? dark ? "text-[#C48A3A]" : "text-gold-deep"
                    : dark ? "text-white/75 hover:text-white" : "text-ink/70 hover:text-ink"
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
          className={`lg:hidden ${dark ? "text-white" : "text-ink"}`}
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
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-lg px-3 py-3 font-medium text-ink hover:bg-paper">
                  {l.label}
                </Link>
              ))}
              <Link href="/iletisim" className="btn btn-gold mt-2">Teklif Al</Link>
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
