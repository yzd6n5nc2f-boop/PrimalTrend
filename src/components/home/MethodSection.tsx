import { Card } from "@/components/ui/Card";

export function MethodSection() {
  return (
    <section className="section-spacing">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <p className="text-[12px] uppercase tracking-[0.22em] text-[#D7B56D]">
          — Method
        </p>
        <h2 className="mt-4 font-display text-[32px] text-white/90 md:text-[44px]">
          Built with intent, not excess.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card>
            <h3 className="font-display text-xl uppercase">
              Built with intent, not excess
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/72">
              <li>Workflows before features.</li>
              <li>Performance where it creates leverage.</li>
              <li>Durability driven down by design.</li>
              <li>Humans in control.</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-display text-xl uppercase">Engineered performance</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/72">
              <li>Sweat mapping over slogans.</li>
              <li>Batch drops over always-on noise.</li>
              <li>Clear fit standards by design.</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-display text-xl uppercase">
              Globally connected, UK-led
            </h3>
            <p className="mt-4 text-sm text-white/72">
              London | Dublin | Lagos | Cape Town
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/60">
              Designed in the UK. Built for everywhere.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
