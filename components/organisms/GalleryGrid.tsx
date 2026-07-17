"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { GalleryItem } from "@/lib/gallery";

export default function GalleryGrid({
  items,
  filters,
}: {
  items: GalleryItem[];
  filters: string[];
}) {
  const [filter, setFilter] = useState("Tümü");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const list = filter === "Tümü" ? items : items.filter((i) => i.type === filter);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Galeri filtreleri">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
              filter === f
                ? "bg-ink text-gold"
                : "border border-line bg-white text-concrete hover:border-gold-deep hover:text-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="rounded-feature border border-dashed border-line bg-white/60 px-8 py-20 text-center">
          <p className="font-display text-lg font-bold text-ink">Bu kategoride görsel yok</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-concrete">
            Başka bir filtre deneyin veya admin panelinden projelere galeri görselleri ekleyin.
          </p>
          <button
            type="button"
            onClick={() => setFilter("Tümü")}
            className="btn btn-ghost-light mt-6"
          >
            Tümünü göster
          </button>
        </div>
      ) : (
        <motion.div layout className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {list.map((item, i) => (
              <motion.div
                key={`${item.slug}-${item.src}`}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: (i % 6) * 0.04 }}
                className="mb-5 break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => setLightbox(item)}
                  className="group relative block w-full overflow-hidden rounded-feature bg-ink/5 text-left"
                >
                  <div className={`relative ${i % 5 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">{item.type}</p>
                      <p className="mt-1 font-display text-lg font-bold text-white">{item.title}</p>
                      <p className="mt-0.5 text-sm text-white/65">{item.location}</p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal
            aria-label={lightbox.title}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Kapat"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              onClick={() => setLightbox(null)}
            >
              <X size={20} />
            </button>
            <motion.div
              className="relative max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-ink"
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">{lightbox.type}</p>
                  <p className="font-display text-lg font-bold text-white">{lightbox.title}</p>
                </div>
                <Link href={`/projeler/${lightbox.slug}`} className="btn btn-gold">
                  {lightbox.title} projesini gör
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
