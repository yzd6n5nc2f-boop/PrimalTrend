"use client";

import { FilterState } from "@/lib/filters";

export function ActiveFiltersBar({
  filters,
  onClear
}: {
  filters: FilterState;
  onClear: () => void;
}) {
  const chips = [
    ...filters.sport.map((value) => `Sport: ${value}`),
    ...filters.category.map((value) => `Category: ${value}`),
    ...filters.tribe.map((value) => `Armory: ${value}`),
    ...filters.size.map((value) => `Size: ${value}`)
  ];
  if (filters.isNew) chips.push("New");
  if (filters.isFeatured) chips.push("Featured");
  if (filters.min) chips.push(`Min £${filters.min}`);
  if (filters.max) chips.push(`Max £${filters.max}`);

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/60">
      {chips.map((chip) => (
        <span
          key={chip}
          className="rounded-full border border-[#1F2430] px-3 py-2"
        >
          {chip}
        </span>
      ))}
      <button onClick={onClear} className="text-white underline">
        Clear all
      </button>
    </div>
  );
}
