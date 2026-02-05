"use client";

import { useEffect, useState } from "react";
import { useCartStore, useCartTotals } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";

type CartQuote = {
  subtotalMinor: number;
  shippingMinor: number;
  taxMinor: number | null;
  totalMinor: number;
};

export function OrderSummary() {
  const totals = useCartTotals();
  const items = useCartStore((state) => state.items);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quote, setQuote] = useState<CartQuote | null>(null);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      setQuote(null);
      setQuoteError(null);
      return;
    }

    const apiBase =
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    let cancelled = false;

    const fetchQuote = async () => {
      try {
        setQuoteError(null);
        const response = await fetch(`${apiBase}/api/cart/quote`, {
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
            payload?.error ?? "Unable to calculate totals right now.";
          throw new Error(message);
        }

        if (!cancelled) {
          setQuote({
            subtotalMinor: payload.subtotalMinor ?? 0,
            shippingMinor: payload.shippingMinor ?? 0,
            taxMinor:
              typeof payload.taxMinor === "number" ? payload.taxMinor : null,
            totalMinor: payload.totalMinor ?? 0
          });
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error
              ? err.message
              : "Unable to calculate totals right now.";
          setQuoteError(message);
          setQuote(null);
        }
      }
    };

    fetchQuote();

    return () => {
      cancelled = true;
    };
  }, [items]);

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
        <span>
          {quote
            ? formatPrice(quote.subtotalMinor / 100)
            : formatPrice(totals.subtotal)}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-white/70">
        <span>Shipping</span>
        <span>
          {quote
            ? quote.shippingMinor === 0
              ? "Free"
              : formatPrice(quote.shippingMinor / 100)
            : "--"}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-white/70">
        <span>Tax</span>
        <span>
          {quote
            ? quote.taxMinor === null
              ? "Calculated at checkout"
              : formatPrice(quote.taxMinor / 100)
            : "--"}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-white">
        <span>{quote?.taxMinor === null ? "Estimated total" : "Total"}</span>
        <span>
          {quote
            ? formatPrice(quote.totalMinor / 100)
            : formatPrice(totals.subtotal)}
        </span>
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/50">
        Free shipping over £60
      </p>
      {quoteError ? (
        <p className="mt-3 text-xs text-amber-300">{quoteError}</p>
      ) : null}
      {error ? (
        <p className="mt-4 text-xs text-red-300">{error}</p>
      ) : null}
      <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-white/40">
        Secure checkout powered by Stripe (cards + local methods).
      </p>
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
