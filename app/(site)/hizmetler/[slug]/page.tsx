import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { liveServices } from "@/lib/live";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import CTA from "@/components/CTA";

export function generateStaticParams() {
  return liveServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = liveServices().find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.title, description: s.short };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = liveServices().find((x) => x.slug === slug);
  if (!s) notFound();
  const others = liveServices().filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <section className="grid-lines bg-ink pb-16 pt-40">
        <div className="container-x">
          <Reveal>
            <Link href="/hizmetler" className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-gold">
              <ArrowLeft size={15} /> Tüm Hizmetler
            </Link>
            <div className="mt-10 flex h-14 w-14 items-center justify-center rounded-xl bg-gold text-ink">
              <ServiceIcon name={s.icon} size={24} />
            </div>
            <h1 className="h-display mt-6 max-w-3xl text-4xl text-white md:text-5xl">{s.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/60">{s.short}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-20">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-concrete">{s.detail}</p>
          <Link href="/iletisim" className="btn btn-gold mt-10">
            Bu hizmet için teklif iste <ArrowUpRight size={15} />
          </Link>
        </Reveal>

        {others.length > 0 && (
          <div className="mt-20 border-t border-line pt-16">
            <h2 className="font-display text-2xl font-bold">Diğer hizmetler</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/hizmetler/${o.slug}`} className="card block p-6 transition hover:border-gold/40">
                    <p className="font-display font-bold">{o.title}</p>
                    <p className="mt-2 text-sm text-concrete">{o.short}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <CTA />
    </>
  );
}
