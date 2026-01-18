import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="border-t border-[#1F2430] bg-[#050608]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-6">
        <div>
          <p className="font-display text-xl uppercase tracking-[0.3em]">
            Primal Trend
          </p>
          <p className="mt-4 text-sm text-white/60">
            Train like your bloodline remembers.
          </p>
          <div className="mt-6 flex gap-2">
            <Input placeholder="Email address" type="email" />
            <Button variant="secondary">Join</Button>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>
              <Link href="/shop">All</Link>
            </li>
            <li>
              <Link href="/shop/men">Men</Link>
            </li>
            <li>
              <Link href="/shop/women">Women</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Support</p>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>Shipping</li>
            <li>Returns</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">About</p>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>Our Story</li>
            <li>Careers</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#1F2430] py-4 text-center text-xs uppercase tracking-[0.2em] text-white/40">
        © 2024 PRIMAL TREND
      </div>
    </footer>
  );
}
