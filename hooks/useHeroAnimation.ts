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
        end: "+=260%",
        pin: pin,
        // Higher scrub = longer catch-up → smoother video + pin feel
        scrub: 1.25,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Soft ease so start/end of the scrub don't feel abrupt
          const eased = gsap.parseEase("power1.inOut")(self.progress);
          // 0–0.78 explode assemble, 0.78–1 exit (zoom out / fade cue)
          setProgress(Math.min(1, eased / 0.78));
          setExitProgress(Math.max(0, (eased - 0.78) / 0.22));
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
