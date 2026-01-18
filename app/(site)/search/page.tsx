import { Suspense } from "react";
import { SearchPageClient } from "./SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="section-spacing" />}>
      <SearchPageClient />
    </Suspense>
  );
}
