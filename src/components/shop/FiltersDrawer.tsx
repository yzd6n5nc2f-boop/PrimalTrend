"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { FiltersSidebar } from "@/components/shop/FiltersSidebar";
import { FilterState } from "@/lib/filters";

export function FiltersDrawer({
  filters,
  onChange
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-[14px] border border-[#1F2430] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/70">
        Filters
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-[320px] bg-[#050608] p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">
              Filters
            </p>
            <Dialog.Close className="rounded-full border border-[#1F2430] p-2" aria-label="Close">
              <X size={16} />
            </Dialog.Close>
          </div>
          <div className="mt-6">
            <FiltersSidebar filters={filters} onChange={onChange} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
