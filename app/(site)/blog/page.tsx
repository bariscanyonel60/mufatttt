import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import PageHero from "@/components/molecules/PageHero";
import Reveal from "@/components/atoms/Reveal";
import { livePosts } from "@/lib/live";

export const metadata: Metadata = {
  title: "Blog — Deprem Güvenliği, Yapı Sistemleri ve Mevzuat",
  description: "MUFAT mühendislerinden deprem güvenliği, statik proje, çelik yapı ve ruhsat süreçleri üzerine anlaşılır rehberler.",
};

export default async function Page() {
  const posts = await livePosts();
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Mühendisliği anlaşılır kılıyoruz."
        lead="Ev sahipleri, yatırımcılar ve meslektaşlarımız için jargonsuz, uygulanabilir teknik rehberler."
      />
      <section className="container-x grid gap-8 py-24 md:grid-cols-2">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08}>
            <Link href={`/blog/${p.slug}`} className="card group block overflow-hidden !p-0">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={p.cover} alt={p.title} fill sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3.5 py-1.5 text-[11px] font-semibold text-gold backdrop-blur">
                  {p.category}
                </span>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-4 text-xs text-concrete">
                  <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</time>
                  <span className="inline-flex items-center gap-1"><Clock size={12} /> {p.readMin} dk okuma</span>
                </div>
                <h2 className="mt-3 font-display text-xl font-bold leading-snug transition-colors group-hover:text-gold-deep">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-concrete">{p.excerpt}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  );
}
