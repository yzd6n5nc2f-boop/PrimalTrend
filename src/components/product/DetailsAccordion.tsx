"use client";

import * as Accordion from "@radix-ui/react-accordion";

const items = [
  {
    title: "Fabric",
    content: "Recycled nylon blend with moisture control."
  },
  {
    title: "Fit",
    content: "Athletic fit designed for mobility."
  },
  {
    title: "Care",
    content: "Machine wash cold, line dry."
  },
  {
    title: "Shipping",
    content: "UK delivery in 2-4 days."
  }
];

export function DetailsAccordion() {
  return (
    <Accordion.Root type="single" collapsible className="space-y-3">
      {items.map((item) => (
        <Accordion.Item
          key={item.title}
          value={item.title}
          className="rounded-[14px] border border-[#5B5F68] px-4"
        >
          <Accordion.Trigger className="w-full py-4 text-left text-xs uppercase tracking-[0.2em] text-white/70">
            {item.title}
          </Accordion.Trigger>
          <Accordion.Content className="pb-4 text-sm text-white/60">
            {item.content}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
