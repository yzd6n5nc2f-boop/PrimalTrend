"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { buildFilterQuery } from "@/lib/queryState";
import type { FilterState } from "@/lib/filters";

const emptyFilters: FilterState = {
  sport: [],
  tribe: [],
  size: [],
  category: []
};

const withFilters = (href: string, filters: Partial<FilterState>) =>
  `${href}${buildFilterQuery({ ...emptyFilters, ...filters })}`;

const categories = [
  {
    title: "Men",
    href: "/shop/men",
    links: [
      { label: "Tops", href: withFilters("/shop/men", { category: ["tops"] }) },
      {
        label: "Bottoms",
        href: withFilters("/shop/men", { category: ["bottoms"] })
      },
      {
        label: "Outerwear",
        href: withFilters("/shop/men", { category: ["outerwear"] })
      },
      {
        label: "Accessories",
        href: withFilters("/shop/men", { category: ["accessories"] })
      }
    ]
  },
  {
    title: "Women",
    href: "/shop/women",
    links: [
      { label: "Tops", href: withFilters("/shop/women", { category: ["tops"] }) },
      {
        label: "Leggings",
        href: withFilters("/shop/women", { category: ["leggings"] })
      },
      {
        label: "Shorts",
        href: withFilters("/shop/women", { category: ["shorts"] })
      },
      {
        label: "Accessories",
        href: withFilters("/shop/women", { category: ["accessories"] })
      }
    ]
  },
  {
    title: "Sports",
    href: "/shop",
    links: [
      { label: "Gym", href: withFilters("/shop", { sport: ["gym"] }) },
      { label: "Running", href: withFilters("/shop", { sport: ["running"] }) },
      { label: "Cycling", href: withFilters("/shop", { sport: ["cycling"] }) },
      {
        label: "Triathlon",
        href: withFilters("/shop", { sport: ["triathlon"] })
      },
      {
        label: "Swimming",
        href: withFilters("/shop", { sport: ["swimming"] })
      },
      { label: "Trail", href: withFilters("/shop", { sport: ["trail"] }) }
    ]
  }
];

export function MegaMenuShop() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className={cn(
              "flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-white/80 transition hover:text-[#D7B56D] focus-ring"
            )}
          >
            Shop
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="fixed left-1/2 top-[72px] z-[70] w-[min(1280px,calc(100vw-2rem))] -translate-x-1/2 px-0">
            <div className="mt-4 grid gap-6 rounded-[20px] border border-[#5B5F68] bg-[#1A1B1F]/95 p-6 text-sm text-white shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-md md:grid-cols-[1fr_1fr_1fr_1.2fr]">
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
                      <Link
                        key={link.label}
                        href={link.href}
                        className="transition hover:text-[#D7B56D]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="rounded-[18px] border border-[#5B5F68] bg-[#1A1B1F] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#5B5F68]">
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
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D7B56D]"
                >
                  Shop Black Core
                </Link>
              </div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
