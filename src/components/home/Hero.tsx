import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[520px] w-full md:h-[76vh] md:min-h-[620px]">
      <Image
        src="/images/hero/hero-home.png"
        alt="PRIMAL TREND hero"
        fill
        className="z-0 object-cover grayscale"
        priority
      />
      <div className="absolute inset-0 z-10 hero-overlay noise-bg" />
      <div className="relative z-20 mx-auto flex h-full max-w-[1280px] items-center px-4 md:px-6">
        <div className="max-w-[520px]">
          <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white/70">
            Performance lineage
          </p>
          <h1 className="mt-4 font-display text-[42px] leading-[0.96] tracking-[-0.03em] text-white/95 md:text-[64px] md:leading-[0.9] md:tracking-[-0.04em]">
            TRAIN LIKE YOUR
            <br />
            BLOODLINE REMEMBERS
          </h1>
          <p className="mt-4 text-[15px] text-[#A7AFBC] md:text-[16px]">
            Modern ancestral performance wear built for strength, endurance, and
            discipline.
          </p>
          <Link
            href="/images/hero/hero-home.png"
            className="mt-3 inline-flex text-xs uppercase tracking-[0.18em] text-white/70 underline"
          >
            Hero asset test
          </Link>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
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
