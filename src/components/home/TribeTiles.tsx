import Image from "next/image";
import Link from "next/link";
import { tribes } from "@/data/tribes";

// Tribe image filenames must be lowercase to match slug (Linux is case-sensitive).
const tiles = [
  {
    slug: "samurai",
    meta: "Precision. Discipline. Endurance."
  },
  {
    slug: "viking",
    meta: "Strength. Resilience. Fire."
  },
  {
    slug: "maasai",
    meta: "Agility. Speed. Stamina."
  }
].map((tile) => {
  const tribe = tribes.find((item) => item.slug === tile.slug);
  if (!tribe) {
    throw new Error(`Missing tribe for tile: ${tile.slug}`);
  }
  return {
    title: tribe.name,
    meta: tile.meta,
    href: `/collections/${tribe.slug}`,
    image: tribe.image,
    imagePosition: tribe.heroPosition
  };
});

export function TribeTiles() {
  return (
    <section className="section-spacing">
      <div className="mx-auto grid max-w-[1280px] gap-6 px-4 md:grid-cols-3 md:px-6">
        {tiles.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            className="group relative h-[240px] overflow-hidden rounded-[20px] border border-[#5B5F68]"
          >
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              style={{ objectPosition: tile.imagePosition }}
              className="object-cover scale-[0.95] transition duration-150 ease-primal group-hover:scale-[0.98] brightness-110 saturate-110"
            />
            <div className="absolute inset-0 bg-black/35" />
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
