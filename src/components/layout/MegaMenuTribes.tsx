"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { tribes } from "@/data/tribes";

export function MegaMenuTribes() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-white/80 transition hover:text-[#D7B56D] focus-ring">
            Armory
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="fixed left-1/2 top-[72px] z-[70] w-[min(1280px,calc(100vw-2rem))] -translate-x-1/2 px-0">
            <div className="mt-4 grid gap-4 rounded-[20px] border border-[#5B5F68] bg-[#1A1B1F]/95 p-6 text-sm text-white shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-md md:grid-cols-3">
              {tribes.map((tribe) => (
                <Link
                  key={tribe.slug}
                  href={`/collections/${tribe.slug}`}
                  className="group flex items-center gap-4 rounded-[16px] border border-[#5B5F68] bg-[#1A1B1F] p-3 transition duration-150 ease-primal hover:border-[#D7B56D]/70"
                >
                  <Image
                    src={tribe.image}
                    alt={tribe.name}
                    width={80}
                    height={80}
                    style={{ objectPosition: tribe.thumbnailPosition }}
                    className="h-[72px] w-[72px] rounded-[12px] object-cover brightness-110 saturate-110 md:h-20 md:w-20"
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
    </NavigationMenu.Root>
  );
}
