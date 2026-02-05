import { Suspense } from "react";
import { SearchPageClient } from "./SearchPageClient";
import { fetchProducts } from "@/lib/api";

export default async function SearchPage() {
  const products = await fetchProducts();
  return (
    <Suspense fallback={<div className="section-spacing" />}>
      <SearchPageClient products={products} />
    </Suspense>
  );
}
