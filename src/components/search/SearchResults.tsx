import { Product } from "@/data/products";
import { ProductGrid } from "@/components/shop/ProductGrid";

export function SearchResults({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-[20px] border border-[#1F2430] bg-[#0B0D10]/70 p-8 text-center text-sm text-white/60">
        No results found. Try a different search.
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
