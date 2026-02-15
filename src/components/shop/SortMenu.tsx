"use client";

import * as Popover from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const options = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" }
];

export function SortMenu({
  value,
  onChange
}: {
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger
        className={cn(
          "flex items-center gap-2 rounded-[14px] border border-[#5B5F68] bg-[#1A1B1F] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/70"
        )}
      >
        Sort
        <ChevronDown size={14} />
      </Popover.Trigger>
      <Popover.Content className="z-40 mt-2 w-56 rounded-[14px] border border-[#5B5F68] bg-[#1A1B1F] p-2 text-sm text-white">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "w-full rounded-[10px] px-3 py-2 text-left text-xs uppercase tracking-[0.18em] transition hover:bg-white/5",
              value === option.value && "bg-white/10"
            )}
          >
            {option.label}
          </button>
        ))}
      </Popover.Content>
    </Popover.Root>
  );
}
