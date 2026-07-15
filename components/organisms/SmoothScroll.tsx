"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap/setup";

/**
 * Lenis smooth scroll + GSAP ScrollTrigger sync.
 * Disabled when prefers-reduced-motion is set.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ensureGsap();

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.refresh();
    };
  }, []);

  return null;
}
