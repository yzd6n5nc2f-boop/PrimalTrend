import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col gap-3"
    >
      <div className="relative h-[260px] overflow-hidden rounded-[20px] border border-[#5B5F68] bg-[#1A1B1F]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-150 ease-primal group-hover:scale-[1.03] brightness-110 saturate-110"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {product.isNew && <Badge label="New" />}
          {product.isFeatured && <Badge label="Featured" />}
        </div>
      </div>
      <div>
        <p className="text-sm text-white/70">{product.name}</p>
        <p className="mt-1 text-sm text-white">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
