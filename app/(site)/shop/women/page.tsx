import { Suspense } from "react";
import { WomenShopPageClient } from "./WomenShopPageClient";

export default function WomenShopPage() {
  return (
    <Suspense fallback={<div className="section-spacing" />}>
      <WomenShopPageClient />
    </Suspense>
  );
}
