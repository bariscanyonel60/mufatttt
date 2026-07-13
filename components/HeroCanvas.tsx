"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

/** Yalnızca lg+ ve hareket tercihi kapalıysa R3F yükler. */
export default function HeroCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(mqLg.matches && !mqMotion.matches);
    sync();

    mqLg.addEventListener("change", sync);
    mqMotion.addEventListener("change", sync);
    return () => {
      mqLg.removeEventListener("change", sync);
      mqMotion.removeEventListener("change", sync);
    };
  }, []);

  if (!enabled) {
    return (
      <div
        className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-[#2a2418]"
        aria-hidden
      >
        <div className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(217,164,65,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(217,164,65,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
    );
  }

  return <Hero3D />;
}
