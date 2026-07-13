import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { livePosts } from "@/lib/live";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";

export function generateStaticParams() {
  return livePosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = livePosts().find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    openGraph: { images: [{ url: p.cover }] },
    twitter: { card: "summary_large_image", images: [p.cover] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = livePosts().find((x) => x.slug === slug);
  if (!p) notFound();
  const related = livePosts().filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 2);

  return (
    <>
      <section className="grid-lines bg-ink pb-16 pt-40">
        <div className="container-x">
          <Reveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-gold">
              <ArrowLeft size={15} /> Tüm Yazılar
            </Link>
            <span className="eyebrow mt-8 !text-gold">{p.category}</span>
            <h1 className="h-display mt-5 max-w-3xl text-4xl text-white md:text-5xl">{p.title}</h1>
            <div className="mt-6 flex items-center gap-5 text-sm text-white/50">
              <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</time>
              <span className="inline-flex items-center gap-1.5"><Clock size={13} /> {p.readMin} dk okuma</span>
            </div>
          </Reveal>
        </div>
      </section>

      <article className="container-x py-16">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-lift">
            <Image src={p.cover} alt={p.title} fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="prose-mufat mx-auto mt-12 max-w-3xl">
            {p.body.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </Reveal>

        {related.length > 0 && (
          <Reveal>
            <div className="mx-auto mt-16 max-w-3xl border-t border-line pt-10">
              <h2 className="font-display text-lg font-bold">İlgili Yazılar</h2>
              <ul className="mt-4 space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}`} className="font-medium text-gold-deep underline-offset-4 hover:underline">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </article>
      <CTA />
    </>
  );
}
