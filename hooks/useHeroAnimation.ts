"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap/setup";

/**
 * Hero scroll progress 0→1 across pinned explode sequence.
 */
export function useHeroAnimation(enabled: boolean) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [exitProgress, setExitProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ensureGsap();
    const root = rootRef.current;
    if (!root) return;

    const pin = root.querySelector("[data-hero-pin]") as HTMLElement | null;
    if (!pin) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "+=220%",
        pin: pin,
        scrub: 0.65,
        anticipatePin: 1,
        onUpdate: (self) => {
          // 0–0.75 explode assemble, 0.75–1 exit (zoom out / fade cue)
          const p = self.progress;
          setProgress(Math.min(1, p / 0.75));
          setExitProgress(Math.max(0, (p - 0.75) / 0.25));
        },
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [enabled]);

  return { rootRef, progress, exitProgress };
}
