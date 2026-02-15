import Image from "next/image";
import Link from "next/link";

// Tribe image filenames must be lowercase to match slug (Linux is case-sensitive).
const tiles = [
  {
    title: "Samurai",
    meta: "Precision. Discipline. Endurance.",
    href: "/collections/samurai",
    image: "/images/tribes/samurai.png"
  },
  {
    title: "Viking",
    meta: "Strength. Resilience. Fire.",
    href: "/collections/viking",
    image: "/images/tribes/viking.png"
  },
  {
    title: "Maasai",
    meta: "Agility. Speed. Stamina.",
    href: "/collections/maasai",
    image: "/images/tribes/maasai.png"
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
            className="group relative h-[240px] overflow-hidden rounded-[20px] border border-[#5B5F68]"
          >
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              className="object-cover transition duration-150 ease-primal group-hover:scale-[1.03] brightness-110 saturate-110"
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
