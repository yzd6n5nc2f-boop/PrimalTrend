"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/cn";

const categories = [
  {
    title: "Men",
    links: ["Tops", "Bottoms", "Outerwear", "Accessories"],
    href: "/shop/men"
  },
  {
    title: "Women",
    links: ["Tops", "Leggings", "Shorts", "Accessories"],
    href: "/shop/women"
  },
  {
    title: "Sports",
    links: ["Gym", "Running", "Cycling", "Triathlon", "Swimming", "Trail"],
    href: "/shop"
  }
];

export function MegaMenuShop() {
  return (
    <NavigationMenu.Root className="relative">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className={cn(
              "flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-white/80 transition hover:text-white focus-ring"
            )}
          >
            Shop
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-0 top-full w-screen max-w-[1280px] px-4 md:px-6">
            <div className="mt-4 grid gap-6 rounded-[20px] border border-[#1F2430] bg-[#0B0D10]/95 p-6 text-sm text-white shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-md md:grid-cols-[1fr_1fr_1fr_1.2fr]">
              {categories.map((category) => (
                <div key={category.title} className="space-y-3">
                  <Link
                    href={category.href}
                    className="text-xs uppercase tracking-[0.2em] text-white"
                  >
                    {category.title}
                  </Link>
                  <div className="flex flex-col gap-2 text-white/70">
                    {category.links.map((link) => (
                      <span key={link} className="transition hover:text-white">
                        {link}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="rounded-[18px] border border-[#1F2430] bg-[#0F1216] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7D8696]">
                  Featured
                </p>
                <p className="mt-3 font-display text-2xl uppercase">
                  Black Core
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Monochrome essentials for high-frequency training.
                </p>
                <Link
                  href="/shop"
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white"
                >
                  Shop Black Core
                </Link>
              </div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport className="absolute left-0 top-full" />
    </NavigationMenu.Root>
  );
}
