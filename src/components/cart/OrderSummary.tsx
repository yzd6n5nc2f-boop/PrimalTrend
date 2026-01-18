"use client";

import { useCartTotals } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";

export function OrderSummary() {
  const totals = useCartTotals();

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
      <Button className="mt-6 w-full" disabled>
        Checkout coming soon
      </Button>
    </div>
  );
}
