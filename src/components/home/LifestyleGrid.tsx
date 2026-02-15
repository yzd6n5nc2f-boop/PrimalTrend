import Image from "next/image";

const lifestyle = [
  { title: "Run", image: "/placeholders/lifestyle/run.svg" },
  { title: "Ride", image: "/placeholders/lifestyle/ride.svg" },
  { title: "Trail", image: "/placeholders/lifestyle/trail.svg" }
];

export function LifestyleGrid() {
  return (
    <section className="section-spacing">
      <div className="mx-auto grid max-w-[1280px] gap-6 px-4 md:grid-cols-3 md:px-6">
        {lifestyle.map((item) => (
          <div
            key={item.title}
            className="group relative h-[220px] overflow-hidden rounded-[20px] border border-[#5B5F68]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition duration-150 ease-primal group-hover:scale-[1.03] brightness-110 saturate-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 font-display text-xl uppercase">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
