import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";

export function Footer() {
  return (
    <footer className="border-t border-[#5B5F68] bg-[#0B0B0D]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/images/brand/logo-mark.png"
              alt="Primal Trend"
              width={34}
              height={34}
              className="h-8 w-8 mix-blend-screen opacity-95"
            />
            <span className="font-display text-[30px] uppercase leading-none tracking-[0.08em]">
              PRIMAL TREND
            </span>
          </Link>
          <p className="mt-4 text-sm text-white/60">
            Earn the edge.
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
              <Link href="/support/shipping" className="transition hover:text-[#D7B56D]">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/support/returns" className="transition hover:text-[#D7B56D]">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/support/contact" className="transition hover:text-[#D7B56D]">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">About</p>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>
              <Link href="/about/story" className="transition hover:text-[#D7B56D]">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/about/careers" className="transition hover:text-[#D7B56D]">
                Careers
              </Link>
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
      <div className="border-t border-[#5B5F68]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-4 py-4 text-xs uppercase tracking-[0.2em] text-white/40 md:px-6">
          <span>© 2026 PRIMAL TREND</span>
          <span>INNOWEB Ventures Limited</span>
        </div>
      </div>
    </footer>
  );
}
