"use client";

import { FilterState } from "@/lib/filters";
import { apparelCategories, sports, sizes } from "@/data/categories";
import { tribes } from "@/data/tribes";
import { Input } from "@/components/ui/Input";

const toggleValue = (arr: string[], value: string) =>
  arr.includes(value) ? arr.filter((item) => item !== value) : [...arr, value];

export function FiltersSidebar({
  filters,
  onChange
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
}) {
  return (
    <div className="space-y-8 text-sm">
      <FilterGroup
        title="Sport"
        items={sports}
        selected={filters.sport}
        onToggle={(value) => onChange({ ...filters, sport: toggleValue(filters.sport, value) })}
      />
      <FilterGroup
        title="Category"
        items={apparelCategories}
        selected={filters.category}
        onToggle={(value) =>
          onChange({ ...filters, category: toggleValue(filters.category, value) })
        }
      />
      <FilterGroup
        title="Tribe"
        items={tribes.map((tribe) => tribe.slug)}
        selected={filters.tribe}
        onToggle={(value) => onChange({ ...filters, tribe: toggleValue(filters.tribe, value) })}
      />
      <FilterGroup
        title="Size"
        items={sizes}
        selected={filters.size}
        onToggle={(value) => onChange({ ...filters, size: toggleValue(filters.size, value) })}
      />
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/60">Price</p>
        <div className="mt-3 flex gap-2">
          <Input
            placeholder="Min"
            value={filters.min ?? ""}
            onChange={(event) =>
              onChange({
                ...filters,
                min: event.target.value ? Number(event.target.value) : undefined
              })
            }
          />
          <Input
            placeholder="Max"
            value={filters.max ?? ""}
            onChange={(event) =>
              onChange({
                ...filters,
                max: event.target.value ? Number(event.target.value) : undefined
              })
            }
          />
        </div>
      </div>
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70">
          <input
            type="checkbox"
            checked={filters.isNew ?? false}
            onChange={(event) =>
              onChange({ ...filters, isNew: event.target.checked })
            }
          />
          New
        </label>
        <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70">
          <input
            type="checkbox"
            checked={filters.isFeatured ?? false}
            onChange={(event) =>
              onChange({ ...filters, isFeatured: event.target.checked })
            }
          />
          Featured
        </label>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  items,
  selected,
  onToggle
}: {
  title: string;
  items: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-white/60">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => {
          const active = selected.includes(item);
          return (
            <button
              key={item}
              onClick={() => onToggle(item)}
              className={
                "rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.18em] " +
                (active
                  ? "border-white/70 bg-white/10 text-white"
                  : "border-[#1F2430] text-white/60")
              }
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
