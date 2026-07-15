"use client";

import Counter from "@/components/atoms/Counter";
import SectionHead from "@/components/molecules/SectionHead";
import ScrollRevealSection from "@/components/organisms/ScrollRevealSection";

type Milestone = { year: string; title: string; desc: string };
type Stat = { value: number; suffix: string; label: string };

export default function MilestoneTimeline({
  milestones,
  founded,
  stats,
}: {
  milestones: Milestone[];
  founded: number;
  stats: Stat[];
}) {
  return (
    <section className="grid-lines bg-ink py-24">
      <ScrollRevealSection className="container-x">
        <div data-reveal>
          <SectionHead dark eyebrow="Kilometre Taşları" title={`${new Date().getFullYear() - founded} yılın özeti.`} />
        </div>
        <div className="relative mt-16 space-y-12 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-white/15 md:before:left-1/2">
          {milestones.map((m, i) => (
            <div
              key={m.year}
              data-reveal
              className={`relative flex flex-col gap-3 pl-10 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}
            >
              <span
                className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-gold bg-ink md:left-auto ${i % 2 ? "md:-left-[7.5px]" : "md:-right-[7.5px]"}`}
              />
              <span className="font-display text-3xl font-extrabold text-gold">{m.year}</span>
              <div>
                <h3 className="font-display text-lg font-bold text-white">{m.title}</h3>
                <p className="mt-1 text-sm text-white/50">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <dl data-reveal className="mt-24 grid grid-cols-2 gap-8 border-t border-white/10 pt-16 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dd className="font-display text-5xl font-extrabold text-white">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 text-xs text-white/50">{s.label}</dt>
            </div>
          ))}
        </dl>
      </ScrollRevealSection>
    </section>
  );
}
