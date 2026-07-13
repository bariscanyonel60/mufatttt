import Reveal from "./Reveal";

export default function SectionHead({
  eyebrow, title, lead, dark = false, center = false,
}: { eyebrow: string; title: string; lead?: string; dark?: boolean; center?: boolean }) {
  return (
    <Reveal className={center ? "text-center flex flex-col items-center" : ""}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={`h-display mt-5 text-4xl md:text-5xl ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${dark ? "text-white/60" : "text-concrete"}`}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
