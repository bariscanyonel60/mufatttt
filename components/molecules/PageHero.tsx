"use client";

import Reveal from "@/components/atoms/Reveal";

export default function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className="grid-lines bg-ink pb-24 pt-44 md:pb-28 md:pt-48">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow !text-gold">{eyebrow}</span>
          <h1 className="h-display mt-8 max-w-4xl text-5xl text-white sm:text-6xl md:text-7xl">{title}</h1>
          {lead && (
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/55 md:text-xl">{lead}</p>
          )}
          <div className="gold-hairline mt-10" aria-hidden />
        </Reveal>
      </div>
    </section>
  );
}
