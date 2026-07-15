"use client";

import Reveal from "@/components/atoms/Reveal";

export default function SectionHead({
  eyebrow, title, lead, dark = false, center = false,
}: { eyebrow: string; title: string; lead?: string; dark?: boolean; center?: boolean }) {
  return (
    <Reveal className={center ? "flex flex-col items-center text-center" : ""}>
      <span className={`eyebrow ${dark ? "!text-gold" : ""}`}>{eyebrow}</span>
      <h2 className={`h-display mt-6 max-w-3xl text-4xl md:text-5xl lg:text-[3.25rem] ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {lead && (
        <p className={`mt-6 max-w-2xl text-lg leading-relaxed md:text-xl ${dark ? "text-white/55" : "text-concrete"}`}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
