"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { X } from "lucide-react";
import { useUiStore } from "@/store/uiStore";

export function MobileDrawer() {
  const open = useUiStore((state) => state.mobileNavOpen);
  const setOpen = useUiStore((state) => state.setMobileNavOpen);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70" />
        <Dialog.Content className="fixed left-0 top-0 z-50 h-full w-[320px] bg-[#050608] p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between">
            <p className="font-display text-lg uppercase tracking-[0.3em]">
              PRIMAL TREND
            </p>
            <Dialog.Close asChild>
              <button
                className="rounded-full border border-[#1F2430] p-2"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>
          <nav className="mt-8 space-y-4 text-sm uppercase tracking-[0.2em]">
            <Accordion.Root type="multiple" className="space-y-4">
              <Accordion.Item value="shop" className="border-b border-[#1F2430]">
                <Accordion.Trigger className="w-full py-3 text-left">
                  Shop
                </Accordion.Trigger>
                <Accordion.Content className="pb-4 text-xs text-white/70">
                  <div className="flex flex-col gap-2">
                    <Link href="/shop" onClick={() => setOpen(false)}>
                      All
                    </Link>
                    <Link href="/shop/men" onClick={() => setOpen(false)}>
                      Men
                    </Link>
                    <Link href="/shop/women" onClick={() => setOpen(false)}>
                      Women
                    </Link>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="tribes" className="border-b border-[#1F2430]">
                <Accordion.Trigger className="w-full py-3 text-left">
                  Tribes
                </Accordion.Trigger>
                <Accordion.Content className="pb-4 text-xs text-white/70">
                  <div className="flex flex-col gap-2">
                    <Link href="/collections/samurai" onClick={() => setOpen(false)}>
                      Samurai
                    </Link>
                    <Link href="/collections/viking" onClick={() => setOpen(false)}>
                      Viking
                    </Link>
                    <Link href="/collections/maasai" onClick={() => setOpen(false)}>
                      Maasai
                    </Link>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
            <Link href="/journal" onClick={() => setOpen(false)}>
              Journal
            </Link>
            <Link href="/search" onClick={() => setOpen(false)}>
              Search
            </Link>
            <Link href="/account" onClick={() => setOpen(false)}>
              Account
            </Link>
            <Link href="/cart" onClick={() => setOpen(false)}>
              Cart
            </Link>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
