import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { livePosts, liveProjects, liveSite } from "@/lib/live";
import Reveal from "@/components/atoms/Reveal";
import CTA from "@/components/organisms/CTA";

export async function generateStaticParams() {
  return (await livePosts()).map((p) => ({ slug: p.slug }));
}

function projectLinkLabel(slug: string, titles: Record<string, string>) {
  return titles[slug] ?? slug.replace(/-/g, " ");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [posts, site] = await Promise.all([livePosts(), liveSite()]);
  const p = posts.find((x) => x.slug === slug);
  if (!p) return {};
  const keywords = [
    ...(p.tags || []),
    "Tokat müteahhit",
    "Tokat inşaat",
    "Turhal inşaat",
    "MUFAT İnşaat Mühendislik",
    p.category,
  ];
  const url = `${site.url}/haberler/${p.slug}`;
  return {
    title: p.title,
    description: p.excerpt,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      url,
      locale: "tr_TR",
      siteName: site.name,
      publishedTime: p.date,
      images: [{ url: p.cover, alt: p.title }],
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.excerpt, images: [p.cover] },
  };
}

function LinkedParagraph({ text, projectTitles }: { text: string; projectTitles: Record<string, string> }) {
  const parts = text.split(/(\/projeler\/[a-z0-9-]+)/g);
  return (
    <p>
      {parts.map((part, i) => {
        if (!part.startsWith("/projeler/")) {
          return <span key={i}>{part}</span>;
        }
        const slug = part.slice("/projeler/".length);
        const label = projectLinkLabel(slug, projectTitles);
        return (
          <Link key={i} href={part} className="font-medium text-gold-deep underline-offset-4 hover:underline">
            {label}
          </Link>
        );
      })}
    </p>
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [posts, projects, site] = await Promise.all([livePosts(), liveProjects(), liveSite()]);
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const projectTitles = Object.fromEntries(projects.map((pr) => [pr.slug, pr.title]));
  const related = posts
    .filter((x) => x.slug !== p.slug)
    .map((x) => {
      const sameCategory = x.category === p.category ? 2 : 0;
      const tagOverlap = (p.tags || []).filter((t) => (x.tags || []).includes(t)).length;
      return { post: x, score: sameCategory + tagOverlap };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.post);

  const articleUrl = `${site.url}/haberler/${p.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: p.title,
        description: p.excerpt,
        image: [p.cover],
        datePublished: p.date,
        dateModified: p.date,
        inLanguage: "tr-TR",
        keywords: (p.tags || []).join(", "),
        author: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
          logo: {
            "@type": "ImageObject",
            url: `${site.url}/images/logo.png`,
          },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        about: [
          { "@type": "Thing", name: "Deprem yönetmeliği" },
          { "@type": "Thing", name: "Tokat inşaat" },
          { "@type": "Thing", name: "Turhal inşaat" },
        ],
        contentLocation: {
          "@type": "Place",
          name: "Turhal, Tokat",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Turhal",
            addressRegion: "Tokat",
            addressCountry: "TR",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: site.url },
          { "@type": "ListItem", position: 2, name: "Bizden Haberler", item: `${site.url}/haberler` },
          { "@type": "ListItem", position: 3, name: p.title, item: articleUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="grid-lines bg-ink pb-16 pt-40">
        <div className="container-x">
          <Reveal>
            <Link href="/haberler" className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-gold">
              <ArrowLeft size={15} /> Tüm Haberler
            </Link>
            <span className="eyebrow mt-8 !text-gold">{p.category}</span>
            <h1 className="h-display mt-5 max-w-3xl text-4xl text-white md:text-5xl">{p.title}</h1>
            {p.tags && p.tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Etiketler">
                {p.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/55"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
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
            {p.body.map((para, i) => (
              <LinkedParagraph key={i} text={para} projectTitles={projectTitles} />
            ))}
          </div>
        </Reveal>

        {related.length > 0 && (
          <Reveal>
            <div className="mx-auto mt-16 max-w-3xl border-t border-line pt-10">
              <h2 className="font-display text-lg font-bold">İlgili Haberler</h2>
              <ul className="mt-4 space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/haberler/${r.slug}`} className="font-medium text-gold-deep underline-offset-4 hover:underline">
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
