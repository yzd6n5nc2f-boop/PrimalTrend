"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { tribes } from "@/data/tribes";

export function MegaMenuTribes() {
  return (
    <NavigationMenu.Root className="relative">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-white/80 transition hover:text-white focus-ring">
            Tribes
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-0 top-full w-screen max-w-[1280px] px-4 md:px-6">
            <div className="mt-4 grid gap-4 rounded-[20px] border border-[#1F2430] bg-[#0B0D10]/95 p-6 text-sm text-white shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-md md:grid-cols-3">
              {tribes.map((tribe) => (
                <Link
                  key={tribe.slug}
                  href={`/collections/${tribe.slug}`}
                  className="group flex items-center gap-4 rounded-[16px] border border-[#1F2430] bg-[#0F1216] p-3 transition duration-150 ease-primal hover:border-[rgba(120,160,255,0.35)]"
                >
                  <Image
                    src={tribe.image}
                    alt={tribe.name}
                    width={72}
                    height={72}
                    className="h-16 w-16 rounded-[12px] object-cover brightness-110 saturate-110"
                  />
                  <div>
                    <p className="font-display text-lg uppercase">{tribe.name}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                      {tribe.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport className="absolute left-0 top-full" />
    </NavigationMenu.Root>
  );
}
