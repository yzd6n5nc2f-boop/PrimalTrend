"use client";

import { useState } from "react";
import { useCartStore, useCartTotals } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";

export function OrderSummary() {
  const totals = useCartTotals();
  const items = useCartStore((state) => state.items);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (items.length === 0 || isLoading) return;

    const apiBase =
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBase}/api/cart/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            size: item.size,
            qty: item.qty
          }))
        })
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        const message =
          payload?.error ?? "Checkout failed. Please try again.";
        throw new Error(message);
      }

      if (payload?.url) {
        window.location.href = payload.url;
        return;
      }

      throw new Error("Missing checkout URL.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Checkout failed. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-[20px] border border-[#1F2430] bg-[#0B0D10]/70 p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
        Order Summary
      </p>
      <div className="mt-4 flex items-center justify-between text-sm text-white/70">
        <span>Subtotal</span>
        <span>{formatPrice(totals.subtotal)}</span>
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/50">
        Free shipping over £60
      </p>
      {error ? (
        <p className="mt-4 text-xs text-red-300">{error}</p>
      ) : null}
      <Button
        className="mt-6 w-full"
        onClick={handleCheckout}
        disabled={items.length === 0 || isLoading}
      >
        {isLoading ? "Redirecting..." : "Checkout"}
      </Button>
    </div>
  );
}
