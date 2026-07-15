"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "@/lib/gsap/useScrollReveal";

/**
 * GSAP ScrollTrigger section wrapper for advanced scroll reveals.
 * Prefer Framer Motion (`atoms/Reveal`) for simple UI fades.
 */
export default function ScrollRevealSection({
  children,
  className,
  selector = "[data-reveal]",
}: {
  children: ReactNode;
  className?: string;
  selector?: string;
}) {
  const ref = useScrollReveal<HTMLDivElement>(selector);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
