import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/shop/ProductGrid";

export const metadata = {
  title: "Shop"
};

export default function ShopPage() {
  return (
    <div className="section-spacing">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="rounded-[20px] border border-[#1F2430] bg-[#0B0D10]/80 p-10">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[#7D8696]">
            Black Core
          </p>
          <h1 className="mt-4 font-display text-[32px] md:text-[44px]">
            Black Core
          </h1>
          <p className="mt-2 text-sm text-[#B8BDC7]">
            Monochrome layers designed for relentless sessions.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              label: "Men",
              href: "/shop/men",
              image: "/images/categories/men.jpg"
            },
            {
              label: "Women",
              href: "/shop/women",
              image: "/images/categories/women.jpg"
            }
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative h-[240px] overflow-hidden rounded-[20px] border border-[#1F2430]"
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover grayscale transition duration-150 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/50" />
              <p className="absolute bottom-6 left-6 font-display text-2xl uppercase">
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
            Featured
          </p>
          <div className="mt-6">
            <ProductGrid products={products.slice(0, 6)} />
          </div>
        </div>
      </div>
    </div>
  );
}
