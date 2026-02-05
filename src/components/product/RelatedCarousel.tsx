import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/data/products";

type RelatedCarouselProps = {
  products: Product[];
};

export function RelatedCarousel({ products }: RelatedCarouselProps) {
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
