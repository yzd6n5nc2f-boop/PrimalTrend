import { Card } from "@/components/ui/Card";

const cards = [
  {
    title: "Ancestral Design Language",
    copy: "A quiet visual system rooted in warrior restraint."
  },
  {
    title: "Technical Fabric Systems",
    copy: "Breathable, durable, sweat-mapped construction."
  },
  {
    title: "Endurance-First Build",
    copy: "Seams and fits designed for long sessions."
  },
  {
    title: "Design-First Experience",
    copy: "Calm UI that keeps athletes in control."
  }
];

export function CapabilitiesSection() {
  return (
    <section className="section-spacing noise-bg">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <p className="text-[12px] uppercase tracking-[0.22em] text-[#D7B56D]">
          — Capabilities
        </p>
        <h2 className="mt-4 font-display text-[32px] text-white/90 md:text-[44px]">
          Four focused ways we build performance without noise.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <Card key={card.title}>
              <h3 className="font-display text-xl uppercase">{card.title}</h3>
              <p className="mt-3 text-sm text-white/72">{card.copy}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
