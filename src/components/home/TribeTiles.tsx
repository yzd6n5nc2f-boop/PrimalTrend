import Image from "next/image";
import Link from "next/link";

const tiles = [
  {
    title: "Samurai",
    meta: "Precision. Discipline. Endurance.",
    href: "/collections/samurai",
    image: "/placeholders/tribes/samurai.svg"
  },
  {
    title: "Viking",
    meta: "Strength. Resilience. Fire.",
    href: "/collections/viking",
    image: "/placeholders/tribes/viking.svg"
  },
  {
    title: "Maasai",
    meta: "Agility. Speed. Stamina.",
    href: "/collections/maasai",
    image: "/placeholders/tribes/maasai.svg"
  }
];

export function TribeTiles() {
  return (
    <section className="section-spacing">
      <div className="mx-auto grid max-w-[1280px] gap-6 px-4 md:grid-cols-3 md:px-6">
        {tiles.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            className="group relative h-[240px] overflow-hidden rounded-[20px] border border-[#1F2430]"
          >
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              className="object-cover grayscale transition duration-150 ease-primal group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-6 left-6">
              <h3 className="font-display text-2xl uppercase">{tile.title}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/70">
                {tile.meta}
              </p>
              <span className="mt-3 block h-px w-8 bg-white transition-all duration-150 group-hover:w-16" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
