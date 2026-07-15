"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap/setup";

type Options = {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
};

/**
 * Advanced scroll reveal via GSAP ScrollTrigger.
 * Use for section timelines — keep Framer Motion for UI transitions.
 */
export function useScrollReveal<T extends HTMLElement>(
  selector = "[data-reveal]",
  options: Options = {},
) {
  const rootRef = useRef<T>(null);
  const {
    y = 36,
    duration = 0.85,
    stagger = 0.08,
    start = "top 85%",
    once = true,
  } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ensureGsap();
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll(selector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start,
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        },
      );
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [selector, y, duration, stagger, start, once]);

  return rootRef;
}
