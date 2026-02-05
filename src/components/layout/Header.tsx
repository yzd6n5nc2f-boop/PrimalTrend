"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { MegaMenuShop } from "@/components/layout/MegaMenuShop";
import { MegaMenuTribes } from "@/components/layout/MegaMenuTribes";
import { useCartTotals } from "@/store/cartStore";
import { useUiStore } from "@/store/uiStore";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCartTotals();
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 w-full transition duration-150 ease-primal",
        scrolled
          ? "border-b border-[#1F2430] bg-[#050608]/90 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-4 md:h-[72px] md:px-6">
        <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.18em] text-white/80 md:flex">
          <MegaMenuShop />
          <MegaMenuTribes />
          <Link className="transition hover:text-white" href="/journal">
            Journal
          </Link>
        </nav>
        <Link
          href="/"
          className="font-display text-lg uppercase tracking-[0.35em] text-white"
        >
          Primal Trend
        </Link>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/search" aria-label="Search" className="focus-ring">
              <IconButton aria-label="Search">
                <Search size={18} />
              </IconButton>
            </Link>
            <Link href="/account" aria-label="Account" className="focus-ring">
              <IconButton aria-label="Account">
                <User size={18} />
              </IconButton>
            </Link>
            <Link href="/cart" aria-label="Cart" className="relative focus-ring">
              <IconButton aria-label="Cart">
                <ShoppingBag size={18} />
              </IconButton>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                  {count}
                </span>
              )}
            </Link>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/cart" aria-label="Cart" className="relative focus-ring">
              <IconButton aria-label="Cart">
                <ShoppingBag size={18} />
              </IconButton>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                  {count}
                </span>
              )}
            </Link>
            <button
              className="flex items-center gap-2 text-sm uppercase tracking-[0.2em]"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
              Menu
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
