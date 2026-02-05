import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";

export function Footer() {
  return (
    <footer className="border-t border-[#1F2430] bg-[#050608]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-6">
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
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Support</p>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>
              <Link href="/support/shipping">Shipping</Link>
            </li>
            <li>
              <Link href="/support/returns">Returns</Link>
            </li>
            <li>
              <Link href="/support/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">About</p>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>
              <Link href="/about/story">Our Story</Link>
            </li>
            <li>
              <Link href="/about/careers">Careers</Link>
            </li>
          </ul>
          <div className="mt-4 flex gap-2">
            <Link
              href="https://www.youtube.com"
              aria-label="YouTube"
              target="_blank"
              rel="noreferrer"
            >
              <IconButton aria-label="YouTube">
                <Youtube size={18} />
              </IconButton>
            </Link>
            <Link
              href="https://www.instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <IconButton aria-label="Instagram">
                <Instagram size={18} />
              </IconButton>
            </Link>
            <Link
              href="https://www.facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <IconButton aria-label="Facebook">
                <Facebook size={18} />
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[#1F2430]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-4 py-4 text-xs uppercase tracking-[0.2em] text-white/40 md:px-6">
          <span>© 2026 PRIMAL TREND</span>
          <span>INNOWEB Ventures Limited</span>
        </div>
      </div>
    </footer>
  );
}
