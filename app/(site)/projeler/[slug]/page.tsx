import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, Ruler, Wrench } from "lucide-react";
import { liveProjects } from "@/lib/live";
import Reveal from "@/components/atoms/Reveal";
import CTA from "@/components/organisms/CTA";

export async function generateStaticParams() {
  return (await liveProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = (await liveProjects()).find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.location}`,
    description: p.summary,
    openGraph: { images: [{ url: p.cover }] },
    twitter: { card: "summary_large_image", images: [p.cover] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = (await liveProjects()).find((x) => x.slug === slug);
  if (!p) notFound();

  const facts = [
    { icon: MapPin, label: "Konum", value: p.location },
    { icon: Wrench, label: "Yapı Tipi", value: p.type },
    { icon: Calendar, label: "Teslim Yılı", value: String(p.year) },
    { icon: Ruler, label: "İnşaat Alanı", value: p.area },
  ];

  return (
    <>
      <section className="grid-lines bg-ink pb-16 pt-40">
        <div className="container-x">
          <Reveal>
            <Link href="/projeler" className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-gold">
              <ArrowLeft size={15} /> Tüm Projeler
            </Link>
            <span className="eyebrow mt-8 !text-gold">{p.type} · {p.year}</span>
            <h1 className="h-display mt-5 max-w-3xl text-5xl text-white md:text-6xl">{p.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/60">{p.summary}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-x -mt-2 py-16">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-lift">
            <Image src={p.cover} alt={p.title} fill priority sizes="100vw" className="object-cover" />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_340px]">
          <Reveal>
            <h2 className="font-display text-2xl font-bold">Proje Notları</h2>
            <div className="prose-mufat mt-5"><p>{p.body}</p></div>
            <h3 className="mt-10 font-display text-lg font-bold">Verilen Hizmetler</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.services.map((s) => (
                <li key={s} className="rounded-full border border-line bg-white px-4 py-2 text-sm text-concrete">{s}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="card sticky top-28 space-y-5 p-8">
              {facts.map((f) => (
                <div key={f.label} className="flex items-start gap-4">
                  <f.icon size={18} className="mt-0.5 text-gold-deep" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-concrete">{f.label}</p>
                    <p className="font-semibold">{f.value}</p>
                  </div>
                </div>
              ))}
              <Link href="/iletisim" className="btn btn-gold w-full">Benzer Proje İçin Teklif Al</Link>
            </aside>
          </Reveal>
        </div>

        {p.gallery.length > 1 && (
          <Reveal>
            <div className="mt-16 grid gap-5 md:grid-cols-2">
              {p.gallery.slice(1).map((g, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={g} alt={`${p.title} galeri ${i + 2}`} fill sizes="50vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </section>
      <CTA />
    </>
  );
}
