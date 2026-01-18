import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[520px] w-full md:h-[76vh] md:min-h-[620px]">
      <Image
        src="/placeholders/hero.svg"
        alt="PRIMAL TREND hero"
        fill
        className="object-cover grayscale"
        priority
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative mx-auto flex h-full max-w-[1280px] items-center px-4 md:px-6">
        <div className="max-w-[520px]">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[#7D8696]">
            Performance lineage
          </p>
          <h1 className="mt-4 font-display text-[42px] leading-[0.92] tracking-[-0.02em] md:text-[64px]">
            TRAIN LIKE YOUR
            <br />
            BLOODLINE REMEMBERS
          </h1>
          <p className="mt-4 text-[15px] text-[#B8BDC7] md:text-[16px]">
            Modern ancestral performance wear built for strength, endurance, and
            discipline.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/shop">
              <Button>Shop now</Button>
            </Link>
            <Link href="/collections/samurai">
              <Button variant="secondary">Explore tribes</Button>
            </Link>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/60">
            Built for gym, run, cycle, triathlon, swim.
          </p>
        </div>
      </div>
    </section>
  );
}
