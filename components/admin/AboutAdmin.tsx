"use client";

import { useMemo, useState } from "react";
import CollectionManager from "@/components/admin/CollectionManager";
import { collections } from "@/lib/admin/schema";

export default function AboutAdmin({
  values,
  milestones,
  team,
}: {
  values: Record<string, unknown>[];
  milestones: Record<string, unknown>[];
  team: Record<string, unknown>[];
}) {
  const [tab, setTab] = useState<"values" | "milestones" | "team">("team");

  const meta = useMemo(() => {
    if (tab === "values") return collections.values;
    if (tab === "milestones") return collections.milestones;
    return collections.team;
  }, [tab]);

  const items = tab === "values" ? values : tab === "milestones" ? milestones : team;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["team", "Ekip"],
            ["values", "Değerler"],
            ["milestones", "Kilometre taşları"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              tab === key ? "bg-gold text-ink" : "border border-white/10 text-white/60"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <CollectionManager key={tab} meta={meta} initialItems={items} />
    </div>
  );
}
