"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

type Item = { quote: string; name: string; role: string; rating: number };

export default function Testimonials({ items }: { items: Item[] }) {
  const [i, setI] = useState(0);
  if (!items.length) return null;
  const t = items[i];
  const go = (d: number) => setI((i + d + items.length) % items.length);

  return (
    <div className="relative mx-auto max-w-3xl text-center">
      <Quote className="mx-auto text-gold" size={36} aria-hidden />
      <div aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait">
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45 }}
          className="mt-8"
        >
          <blockquote className="font-display text-2xl font-semibold leading-snug text-white md:text-[28px]">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-8">
            <div className="flex justify-center gap-1 text-gold" aria-label={`${t.rating} yıldız`}>
              {Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={15} fill="currentColor" />)}
            </div>
            <p className="mt-3 font-semibold text-white">{t.name}</p>
            <p className="text-sm text-white/50">{t.role}</p>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button onClick={() => go(-1)} aria-label="Önceki yorum"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-gold hover:text-gold">
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {items.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`${k + 1}. yorum`}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-gold" : "w-1.5 bg-white/25"}`} />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Sonraki yorum"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-gold hover:text-gold">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
