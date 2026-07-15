"use client";

import { motion } from "framer-motion";

/** Scroll cue + progress readout for explode sequence. */
export default function ScrollAnimation({ progress }: { progress: number }) {
  const stages = ["Temel", "Çelik", "Döşeme", "Cam", "Çatı"];
  const idx = Math.min(stages.length - 1, Math.floor(progress * stages.length));

  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
      <motion.p
        key={stages[idx]}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 0.7, y: 0 }}
        className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C48A3A]"
      >
        {progress < 0.05 ? "Kaydır · İnşayı izle" : stages[idx]}
      </motion.p>
      <div className="h-12 w-px overflow-hidden bg-white/15">
        <motion.div
          className="w-full bg-[#C48A3A]"
          style={{ height: `${Math.min(100, progress * 100)}%` }}
        />
      </div>
    </div>
  );
}
