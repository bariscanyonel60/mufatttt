"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Counter from "@/components/atoms/Counter";

type Stat = { value: number; suffix: string; label: string };

type Props = {
  tagline: string;
  founded: number;
  stats: Stat[];
  exitProgress: number;
  /** Render only the stats block (mobile layout). */
  statsOnly?: boolean;
  /** Show stats in the main column (desktop). */
  showStatsDesktop?: boolean;
  className?: string;
};

export default function HeroContent({
  tagline,
  founded,
  stats,
  exitProgress,
  statsOnly = false,
  showStatsDesktop = false,
  className = "",
}: Props) {
  const reduce = useReducedMotion();
  const fade = 1 - Math.min(1, exitProgress * 1.4);

  const item = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: fade, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.22, 0.61, 0.36, 1] as const },
        };

  if (statsOnly) {
    return (
      <dl className={`grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/10 pt-8 sm:grid-cols-4 ${className}`}>
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              <Counter value={s.value} suffix={s.suffix} />
            </dd>
            <p className="mt-1 text-[10px] leading-snug text-white/45 sm:text-[11px]" aria-hidden>
              {s.label}
            </p>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <div
      className={`relative z-10 flex w-full max-w-xl flex-col justify-center ${className}`}
      style={{
        opacity: fade,
        transform: exitProgress ? `translateY(${exitProgress * -24}px)` : undefined,
      }}
    >
      <motion.span
        {...item(0.05)}
        className="inline-flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C48A3A] sm:gap-3 sm:text-[11px] sm:tracking-[0.28em]"
      >
        <span className="block h-px w-6 bg-[#C48A3A] sm:w-8" aria-hidden />
        Turhal · Tokat · İnşaat Mühendisliği
      </motion.span>

      <motion.h1
        id="home-hero-title"
        {...item(0.12)}
        className="mt-5 font-display text-[2.35rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:mt-7 sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Güvenli yapıları
        <br />
        <span className="text-[#C48A3A]">mühendislikle</span>
        <br />
        inşa ederiz.
      </motion.h1>

      <motion.p
        {...item(0.22)}
        className="mt-5 max-w-md text-[15px] leading-relaxed sm:mt-7 sm:text-base md:text-lg"
        style={{ color: "rgba(255,255,255,0.72)" }}
      >
        {tagline}. Plan ve projeden taahhüde; {founded}&apos;den bu yana özel ve resmi işverenlerle çalışıyoruz.
      </motion.p>

      <motion.div {...item(0.32)} className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
        <Link href="/iletisim" className="hero-btn-copper group w-full justify-center sm:w-auto">
          Projenizi Anlatın
          <ArrowUpRight size={16} className="transition group-hover:rotate-45" aria-hidden />
        </Link>
        <Link href="/projeler" className="hero-btn-glass w-full justify-center sm:w-auto">
          Portfolyoyu Gör
        </Link>
      </motion.div>

      {showStatsDesktop && (
        <motion.dl
          {...item(0.45)}
          className="mt-14 hidden max-w-lg grid-cols-2 gap-x-8 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-4 lg:grid"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-extrabold text-white md:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <p className="mt-1.5 text-[11px] leading-snug text-white/45" aria-hidden>
                {s.label}
              </p>
            </div>
          ))}
        </motion.dl>
      )}
    </div>
  );
}
