"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/data/products";
import { applyFilters } from "@/lib/filters";
import { parseFilterState, buildFilterQuery } from "@/lib/queryState";
import { FiltersSidebar } from "@/components/shop/FiltersSidebar";
import { FiltersDrawer } from "@/components/shop/FiltersDrawer";
import { SortMenu } from "@/components/shop/SortMenu";
import { ActiveFiltersBar } from "@/components/shop/ActiveFiltersBar";
import { ProductGrid } from "@/components/shop/ProductGrid";

type MenShopPageClientProps = {
  products: Product[];
};

export function MenShopPageClient({ products }: MenShopPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(
    () => parseFilterState(searchParams),
    [searchParams]
  );

  const results = useMemo(
    () => applyFilters(products, filters),
    [filters, products]
  );

  const updateFilters = (nextFilters: typeof filters) => {
    router.replace(`${pathname}${buildFilterQuery(nextFilters)}`);
  };

  return (
    <div className="section-spacing">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl uppercase">Men</h1>
            <p className="text-sm text-white/60">{results.length} products</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <FiltersDrawer filters={filters} onChange={updateFilters} />
            </div>
            <SortMenu
              value={filters.sort}
              onChange={(value) => updateFilters({ ...filters, sort: value })}
            />
          </div>
        </div>
        <div className="mt-6">
          <ActiveFiltersBar
            filters={filters}
            onClear={() =>
              updateFilters({
                sport: [],
                category: [],
                tribe: [],
                size: [],
                min: undefined,
                max: undefined,
                isNew: false,
                isFeatured: false,
                sort: undefined
              })
            }
          />
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-[240px_1fr]">
          <aside className="sticky top-24 hidden self-start md:block">
            <FiltersSidebar filters={filters} onChange={updateFilters} />
          </aside>
          <ProductGrid products={results} />
        </div>
      </div>
    </div>
  );
}
