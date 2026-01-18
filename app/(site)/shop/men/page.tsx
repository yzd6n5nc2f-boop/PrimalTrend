import { Suspense } from "react";
import { MenShopPageClient } from "./MenShopPageClient";

export default function MenShopPage() {
  return (
    <Suspense fallback={<div className="section-spacing" />}>
      <MenShopPageClient />
    </Suspense>
  );
}
