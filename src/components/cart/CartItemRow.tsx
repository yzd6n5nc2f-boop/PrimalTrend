"use client";

import Image from "next/image";
import { CartItem, useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";

export function CartItemRow({ item }: { item: CartItem }) {
  const setQty = useCartStore((state) => state.setQty);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex flex-wrap items-center gap-6 border-b border-[#1F2430] py-6">
      <div className="relative h-28 w-28 overflow-hidden rounded-[16px] border border-[#1F2430]">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-white/70">{item.name}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/50">
          Size {item.size}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="h-8 w-8 rounded-full border border-[#1F2430]"
          onClick={() => setQty(item.productId, item.size, Math.max(1, item.qty - 1))}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="text-sm text-white/70">{item.qty}</span>
        <button
          className="h-8 w-8 rounded-full border border-[#1F2430]"
          onClick={() => setQty(item.productId, item.size, item.qty + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <div className="text-sm text-white">{formatPrice(item.price)}</div>
      <button
        className="text-xs uppercase tracking-[0.18em] text-white/50"
        onClick={() => removeItem(item.productId, item.size)}
      >
        Remove
      </button>
    </div>
  );
}
