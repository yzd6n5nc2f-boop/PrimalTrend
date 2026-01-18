"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SizeSelector } from "@/components/product/SizeSelector";
import { useCartStore } from "@/store/cartStore";

export function ProductInfo({ product }: { product: Product }) {
  const [size, setSize] = useState<string | undefined>();
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl uppercase">{product.name}</h1>
        <p className="mt-2 text-sm text-white/60">{product.description}</p>
        <p className="mt-4 text-xl text-white">{formatPrice(product.price)}</p>
        <div className="mt-3 flex gap-2">
          {product.isNew && <Badge label="New" />}
          {product.isFeatured && <Badge label="Featured" />}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/60">Size</p>
        <div className="mt-3">
          <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />
        </div>
      </div>
      <Button
        disabled={!size}
        onClick={() => {
          if (size) addItem(product, size);
        }}
      >
        Add to bag
      </Button>
      <p className="text-xs uppercase tracking-[0.18em] text-white/50">
        Free UK shipping over £60
      </p>
    </div>
  );
}
