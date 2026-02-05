import { Suspense } from "react";
import { MenShopPageClient } from "./MenShopPageClient";
import { fetchProducts } from "@/lib/api";

export default async function MenShopPage() {
  const products = await fetchProducts();
  return (
    <Suspense fallback={<div className="section-spacing" />}>
      <MenShopPageClient products={products} />
    </Suspense>
  );
}
