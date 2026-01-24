import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { DetailsAccordion } from "@/components/product/DetailsAccordion";
import { RelatedCarousel } from "@/components/product/RelatedCarousel";

export const dynamic = "force-static";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) return notFound();

  const gallery = [
    `/images/products/${product.id}/main.jpg`,
    `/images/products/${product.id}/alt-1.jpg`,
    `/images/products/${product.id}/alt-2.jpg`,
    `/images/products/${product.id}/alt-3.jpg`
  ];

  return (
    <div className="section-spacing">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-6">
        <ProductGallery images={gallery} />
        <div className="space-y-8">
          <ProductInfo product={product} />
          <DetailsAccordion />
        </div>
      </div>
      <div className="section-spacing">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
            Related
          </p>
          <div className="mt-6">
            <RelatedCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
