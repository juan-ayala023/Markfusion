"use client";

import { m } from "motion/react";
import { useState } from "react";

import type { ProjectCategory } from "@/content/types";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";

export type GridItem = {
  slug: string;
  category: ProjectCategory[];
  /** Card ya renderizada en el servidor (las portadas usan next/image y componentes de servidor). */
  card: React.ReactNode;
};

type Filter = ProjectCategory | "all";

export function ProjectsGrid({
  items,
  categories,
  dict,
  limit,
}: {
  items: GridItem[];
  categories: ProjectCategory[];
  dict: Dictionary["projects"];
  limit?: number;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = items.filter((item) => filter === "all" || item.category.includes(filter));
  const visible = limit ? filtered.slice(0, limit) : filtered;
  const options: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: dict.all, count: items.length },
    ...categories
      .map((category) => ({
        value: category,
        label: dict.categories[category],
        count: items.filter((item) => item.category.includes(category)).length,
      }))
      .filter((option) => option.count > 0),
  ];

  return (
    <div>
      <div role="group" aria-label={dict.filterLabel} className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap">
        {options.map((option) => {
          const active = filter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.value)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                active
                  ? "border-brand bg-brand text-black"
                  : "border-line text-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {option.label}
              <span className={cn("font-mono text-[11px]", active ? "text-black/60" : "text-subtle")}>{option.count}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-muted">{dict.empty}</p>
      ) : (
        <div key={filter} className="mt-10 grid gap-x-6 gap-y-16 md:grid-cols-2">
          {visible.map((item, index) => (
            <m.div
              key={item.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {item.card}
            </m.div>
          ))}
        </div>
      )}
    </div>
  );
}
