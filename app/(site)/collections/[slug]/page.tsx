import Image from "next/image";
import { notFound } from "next/navigation";
import { tribes } from "@/data/tribes";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/shop/ProductGrid";

export const dynamic = "force-static";

export function generateStaticParams() {
  return tribes.map((tribe) => ({ slug: tribe.slug }));
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const tribe = tribes.find((item) => item.slug === params.slug);
  if (!tribe) return notFound();

  const filtered = products.filter((product) =>
    product.tribeTags.includes(tribe.slug)
  );

  return (
    <div>
      <div className="relative h-[320px] overflow-hidden">
        <Image
          src={tribe.image}
          alt={tribe.name}
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-center px-4 md:px-6">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[#7D8696]">
            Tribe
          </p>
          <h1 className="font-display text-[32px] md:text-[44px]">
            {tribe.name}
          </h1>
          <p className="mt-2 text-sm text-white/70">{tribe.tagline}</p>
        </div>
      </div>
      <div className="section-spacing">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <p className="text-sm text-white/60">{tribe.description}</p>
          <ul className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-white/60">
            {tribe.traits.map((trait) => (
              <li key={trait} className="rounded-full border border-[#1F2430] px-3 py-2">
                {trait}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}
