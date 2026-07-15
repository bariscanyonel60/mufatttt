"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap/setup";

/**
 * Optional Lenis bootstrap for isolated demos.
 * Site-wide Lenis lives in organisms/SmoothScroll.
 */
export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ensureGsap();
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [enabled]);
}
