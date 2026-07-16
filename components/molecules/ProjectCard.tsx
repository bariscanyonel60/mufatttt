import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectCard({
  p,
  tall = false,
  featured = false,
  /** Edge-to-edge cover image for equal homepage cards. */
  fill = false,
}: {
  p: Project;
  tall?: boolean;
  featured?: boolean;
  fill?: boolean;
}) {
  return (
    <Link
      href={`/projeler/${p.slug}`}
      className={`group relative block h-full overflow-hidden rounded-feature ${featured ? "w-full" : ""} ${tall ? "row-span-2" : ""}`}
    >
      <div
        className={`relative w-full ${
          fill
            ? "aspect-[3/4]"
            : featured
              ? "aspect-[16/10] min-h-[52vh] md:aspect-[21/9] md:min-h-[62vh]"
              : tall
                ? "aspect-[3/4]"
                : "aspect-[4/5] md:aspect-[3/4]"
        }`}
      >
        <Image
          src={p.cover}
          alt={p.title}
          fill
          sizes={featured ? "100vw" : fill ? "(max-width: 1024px) 50vw, 33vw" : "(max-width: 768px) 100vw, 50vw"}
          className="object-cover object-center transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
          priority={featured || fill}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
      <div className={`absolute inset-x-0 bottom-0 ${featured ? "p-6 md:p-10" : "p-5 md:p-6"}`}>
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
          {p.type} · {p.year}
        </p>
        <h3 className={`mt-2 font-display font-bold text-white drop-shadow-sm ${featured ? "text-2xl md:text-4xl" : "text-lg md:text-xl"}`}>
          {p.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/70">
          <MapPin size={13} /> {p.location}
        </p>
      </div>
      <span className="glass absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:rotate-45">
        <ArrowUpRight size={17} />
      </span>
    </Link>
  );
}
