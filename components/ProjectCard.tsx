import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectCard({ p, tall = false }: { p: Project; tall?: boolean }) {
  return (
    <Link
      href={`/projeler/${p.slug}`}
      className={`group relative block overflow-hidden rounded-2xl ${tall ? "row-span-2" : ""}`}
    >
      <div className={`relative w-full ${tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
        <Image
          src={p.cover} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          {p.type} · {p.year}
        </p>
        <h3 className="mt-2 font-display text-xl font-bold text-white">{p.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-white/60">
          <MapPin size={13} /> {p.location}
        </p>
      </div>
      <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full glass text-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-45">
        <ArrowUpRight size={17} />
      </span>
    </Link>
  );
}
