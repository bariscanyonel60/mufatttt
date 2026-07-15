"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/data";
import ProjectCard from "@/components/molecules/ProjectCard";

export default function ProjectsGrid({
  projects,
  projectFilters,
}: {
  projects: Project[];
  projectFilters: string[];
}) {
  const [filter, setFilter] = useState("Tümü");
  const list = filter === "Tümü" ? projects : projects.filter((p) => p.type === filter);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Proje filtreleri">
        {projectFilters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
              filter === f ? "bg-ink text-gold" : "border border-line bg-white text-concrete hover:border-gold-deep hover:text-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug} layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard p={p} tall={i % 5 === 0} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
