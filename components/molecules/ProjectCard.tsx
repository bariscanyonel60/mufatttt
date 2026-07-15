import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectCard({
  p,
  tall = false,
  featured = false,
}: {
  p: Project;
  tall?: boolean;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/projeler/${p.slug}`}
      className={`group relative block overflow-hidden rounded-feature ${featured ? "w-full" : ""} ${tall ? "row-span-2" : ""}`}
    >
      <div
        className={`relative w-full ${
          featured ? "aspect-[16/10] min-h-[52vh] md:aspect-[21/9] md:min-h-[62vh]" : tall ? "aspect-[3/4]" : "aspect-[4/5] md:aspect-[3/4]"
        }`}
      >
        <Image
          src={p.cover}
          alt={p.title}
          fill
          sizes={featured ? "100vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
          priority={featured}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
      <div className={`absolute inset-x-0 bottom-0 ${featured ? "p-8 md:p-12" : "p-6 md:p-7"}`}>
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
          {p.type} · {p.year}
        </p>
        <h3 className={`mt-3 font-display font-bold text-white ${featured ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"}`}>
          {p.title}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-white/60">
          <MapPin size={13} /> {p.location}
        </p>
      </div>
      <span className="glass absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:rotate-45">
        <ArrowUpRight size={17} />
      </span>
    </Link>
  );
}
