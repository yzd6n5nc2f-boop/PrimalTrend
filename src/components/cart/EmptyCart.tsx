import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function EmptyCart() {
  return (
    <div className="rounded-[20px] border border-[#5B5F68] bg-[#1A1B1F]/70 p-8 text-center">
      <p className="font-display text-2xl uppercase">Your bag is empty</p>
      <p className="mt-2 text-sm text-white/60">
        Build your loadout with monochrome performance essentials.
      </p>
      <Button asChild className="mt-6">
        <Link href="/shop">Shop now</Link>
      </Button>
    </div>
  );
}
