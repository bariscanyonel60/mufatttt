"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import ServiceIcon from "@/components/atoms/ServiceIcon";
import type { Service } from "@/lib/data";

export default function ServiceCard({ s, i }: { s: Service; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
      whileHover={{ rotateX: 3, rotateY: -3 }}
      style={{ transformPerspective: 900 }}
      className="card group relative overflow-hidden p-8 md:p-9"
    >
      <Link href={`/hizmetler/${s.slug}`} className="absolute inset-0 z-10" aria-label={s.title} />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/[0.07] transition-transform duration-700 ease-out group-hover:scale-[2.2]" aria-hidden />
      <div className="relative flex h-12 w-12 items-center justify-center rounded-soft bg-ink text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
        <ServiceIcon name={s.icon} />
      </div>
      <h3 className="relative mt-7 font-display text-xl font-bold">{s.title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed text-concrete">{s.short}</p>
    </motion.article>
  );
}
