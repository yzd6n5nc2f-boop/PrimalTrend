import Image from "next/image";
import { journalPosts } from "@/data/journal";

export const metadata = {
  title: "Journal"
};

export default function JournalPage() {
  return (
    <div className="section-spacing">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <h1 className="font-display text-3xl uppercase">Journal</h1>
        <p className="mt-2 text-sm text-white/60">
          Field notes from the training floor.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {journalPosts.map((post) => (
            <div
              key={post.slug}
              className="rounded-[20px] border border-[#5B5F68] bg-[#1A1B1F]/70"
            >
              <div className="relative h-[180px] overflow-hidden rounded-t-[20px]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover brightness-110 saturate-110"
                />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                  {post.tag} · {post.date}
                </p>
                <h2 className="mt-3 font-display text-xl uppercase">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-white/60">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
