import { Suspense } from "react";
import { WomenShopPageClient } from "./WomenShopPageClient";
import { fetchProducts } from "@/lib/api";

export default async function WomenShopPage() {
  const products = await fetchProducts();
  return (
    <Suspense fallback={<div className="section-spacing" />}>
      <WomenShopPageClient products={products} />
    </Suspense>
  );
}
