"use client";

import { useEffect, useState, type RefObject } from "react";
import { ArrowDown } from "lucide-react";
import HeroContent from "./HeroContent";
import HeroVideo from "./HeroVideo";
import ScrollAnimation from "./ScrollAnimation";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";

type Stat = { value: number; suffix: string; label: string };

type Props = {
  tagline: string;
  founded: number;
  stats: Stat[];
};

export default function Hero({ tagline, founded, stats }: Props) {
  const [scrub, setScrub] = useState(false);
  const { rootRef, progress, exitProgress } = useHeroAnimation(scrub);

  useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setScrub(mqLg.matches && !mqMotion.matches);
    sync();
    mqLg.addEventListener("change", sync);
    mqMotion.addEventListener("change", sync);
    return () => {
      mqLg.removeEventListener("change", sync);
      mqMotion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section
      ref={rootRef as RefObject<HTMLElement>}
      className="relative bg-[#171717]"
      aria-labelledby="home-hero-title"
      data-hero-root
    >
      <div
        data-hero-pin
        className="relative flex min-h-[100svh] flex-col overflow-x-hidden lg:overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #171717 0%, #232323 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] sm:opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(196,138,58,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(196,138,58,0.35) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-24 h-56 w-56 -translate-x-1/2 rounded-full bg-[#C48A3A]/10 blur-[90px] lg:left-1/3 lg:top-0 lg:h-80 lg:w-80 lg:blur-[120px]"
          aria-hidden
        />

        <div className="container-x relative z-10 flex flex-1 flex-col pb-16 pt-28 sm:pb-20 sm:pt-32 lg:grid lg:grid-cols-2 lg:items-center lg:gap-6 lg:pb-0 lg:pt-0">
          <HeroContent
            tagline={tagline}
            founded={founded}
            stats={stats}
            exitProgress={exitProgress}
            showStatsDesktop
          />

          <div className="relative mt-8 w-full sm:mt-10 lg:mt-0 lg:h-[min(86vh,820px)]">
            <div className="relative mx-auto aspect-[16/11] w-full max-w-lg overflow-hidden rounded-2xl sm:aspect-[16/10] sm:rounded-[1.25rem] lg:aspect-auto lg:h-full lg:max-w-none lg:rounded-3xl">
              {scrub ? (
                <HeroVideo progress={progress} className="absolute inset-0 h-full w-full" />
              ) : (
                <HeroVideo autoplay className="absolute inset-0 h-full w-full" />
              )}
            </div>
          </div>

          <HeroContent
            tagline={tagline}
            founded={founded}
            stats={stats}
            exitProgress={0}
            statsOnly
            className="mt-10 lg:hidden"
          />
        </div>

        {scrub && <ScrollAnimation progress={progress} />}

        <a
          href="#hizmetler"
          aria-label="Aşağı kaydır"
          className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-white/40 transition hover:text-[#C48A3A] lg:bottom-8"
        >
          <ArrowDown className="animate-bounce" size={18} aria-hidden />
        </a>
      </div>
    </section>
  );
}
