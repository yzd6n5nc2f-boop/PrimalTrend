"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchResults } from "@/components/search/SearchResults";
import { products } from "@/data/products";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query) return [];
    const normalized = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(normalized) ||
        product.tribeTags.some((tag) => tag.includes(normalized)) ||
        product.sportTags.some((tag) => tag.includes(normalized))
    );
  }, [query]);

  return (
    <div className="section-spacing">
      <div className="mx-auto max-w-[1280px] space-y-8 px-4 md:px-6">
        <div>
          <h1 className="font-display text-3xl uppercase">Search</h1>
          <p className="text-sm text-white/60">
            Explore the full PRIMAL TREND catalog.
          </p>
        </div>
        <SearchBar
          value={query}
          onChange={(value) => {
            setQuery(value);
            router.replace(value ? `/search?q=${encodeURIComponent(value)}` : "/search");
          }}
        />
        <SearchResults products={results} />
      </div>
    </div>
  );
}
