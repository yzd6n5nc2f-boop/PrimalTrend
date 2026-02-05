export const metadata = {
  title: "Our Story"
};

export default function StoryPage() {
  return (
    <div className="section-spacing">
      <div className="mx-auto max-w-[960px] space-y-6 px-4 md:px-6">
        <div>
          <h1 className="font-display text-3xl uppercase">Our Story</h1>
          <p className="mt-2 text-sm text-white/60">
            Built for athletes who train with purpose.
          </p>
        </div>
        <div className="space-y-4 text-sm text-white/70">
          <p>
            PRIMAL TREND started with a simple idea: training gear should feel
            engineered, not ordinary. Every piece is designed for movement,
            resilience, and the mindset of those who push their limits.
          </p>
          <p>
            We draw inspiration from timeless warrior cultures and modern
            performance science to deliver a look that is bold, minimal, and
            functional.
          </p>
          <p>
            This is more than apparel. It is a uniform for the disciplined.
          </p>
        </div>
      </div>
    </div>
  );
}
