import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[560px] w-full overflow-hidden md:h-[84vh] md:min-h-[700px]">
      <Image
        src="/images/hero/hero-home-20260215.png"
        alt="PRIMAL TREND hero"
        fill
        className="z-0 object-cover object-[66%_26%] brightness-[0.95] saturate-[1.03] md:object-[68%_24%]"
        priority
      />
      <div className="absolute inset-0 z-10 hero-overlay noise-bg" />
      <div className="absolute inset-y-0 left-0 z-[12] w-full bg-gradient-to-r from-[#0B0B0D]/85 via-[#0B0B0D]/58 to-[#0B0B0D]/20 md:w-[72%]" />
      <div className="absolute inset-0 z-[13] bg-[radial-gradient(circle_at_68%_62%,rgba(255,255,255,0.08),transparent_46%)]" />
      <div className="relative z-20 mx-auto flex h-full max-w-[1280px] items-center px-4 md:px-6">
        <div className="max-w-[520px] pb-8 pt-20 md:pb-12 md:pt-24">
          <div className="mb-5 flex items-center gap-4 text-[#D7B56D]/70">
            <span className="h-px flex-1 max-w-[130px] bg-[#D7B56D]/32" />
            <span className="inline-flex h-4 w-4 items-center justify-center">
              <span className="h-2.5 w-2.5 rotate-45 border border-[#D7B56D]/70" />
            </span>
            <span className="h-px flex-1 bg-[#D7B56D]/32" />
          </div>
          <p className="inline-flex items-center rounded-full border border-[#D7B56D]/45 bg-black/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.24em] text-[#D7B56D]">
            Performance grit
          </p>
          <h1 className="mt-5 font-display text-[50px] leading-[0.9] tracking-[0.02em] text-white/95 md:text-[92px] lg:text-[100px]">
            ARMOR UP.
          </h1>
          <p className="mt-5 max-w-[460px] text-[15px] text-white/78 md:text-[16px] md:leading-[1.45]">
            Modern performance wear built for strength, endurance, and
            discipline.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Button asChild>
              <Link href="/shop">Shop now</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/collections/samurai">Explore armory</Link>
            </Button>
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/58">
            Built for gym, run, cycle, triathlon, swim.
          </p>
        </div>
      </div>
    </section>
  );
}
