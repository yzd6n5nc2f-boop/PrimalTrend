import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

export function RelatedCarousel() {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[720px] gap-6">
        {products.slice(0, 8).map((product) => (
          <div key={product.id} className="min-w-[220px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
