import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="container-x py-24">
      <Reveal>
        <div className="grid-lines relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center md:py-24">
          <div className="absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[110px]" aria-hidden />
          <p className="eyebrow justify-center !text-gold">Projenizi Konuşalım</p>
          <h2 className="h-display relative mx-auto mt-6 max-w-3xl text-4xl text-white md:text-5xl">
            Sağlam yapılar, sağlam hesaplarla başlar.
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-white/60">
            Arsanız, projeniz veya mevcut binanız için 30 dakikalık ücretsiz ön değerlendirme görüşmesi planlayalım.
          </p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/iletisim" className="btn btn-gold">Ücretsiz Görüşme Planla <ArrowUpRight size={16} /></Link>
            <Link href="/projeler" className="btn btn-ghost-dark">Projeleri İncele</Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
