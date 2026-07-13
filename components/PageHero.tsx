import Reveal from "./Reveal";

export default function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className="grid-lines bg-ink pb-20 pt-40">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow !text-gold">{eyebrow}</span>
          <h1 className="h-display mt-6 max-w-3xl text-5xl text-white md:text-6xl">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{lead}</p>}
        </Reveal>
      </div>
    </section>
  );
}
