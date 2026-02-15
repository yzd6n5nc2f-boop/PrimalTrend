import { Product } from "@/data/products";
import { ProductGrid } from "@/components/shop/ProductGrid";

export function SearchResults({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-[20px] border border-[#5B5F68] bg-[#1A1B1F]/70 p-8 text-center text-sm text-white/60">
        No results found. Try a different search.
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
