"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useHasHydrated } from "@/store/useHasHydrated";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";

export default function CartPage() {
  const hydrated = useHasHydrated();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    if (status === "success") {
      clearCart();
    }
  }, [status, clearCart]);

  if (!hydrated) return null;

  return (
    <div className="section-spacing">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <h1 className="font-display text-3xl uppercase">Your Bag</h1>
        {status === "success" ? (
          <p className="mt-3 text-sm text-emerald-300">
            Payment received. Your order is locked in.
          </p>
        ) : null}
        {status === "cancel" ? (
          <p className="mt-3 text-sm text-amber-300">
            Checkout canceled. Your bag is still saved.
          </p>
        ) : null}
        {items.length === 0 ? (
          <div className="mt-10">
            <EmptyCart />
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              {items.map((item) => (
                <CartItemRow key={`${item.productId}-${item.size}`} item={item} />
              ))}
            </div>
            <OrderSummary />
          </div>
        )}
      </div>
    </div>
  );
}
