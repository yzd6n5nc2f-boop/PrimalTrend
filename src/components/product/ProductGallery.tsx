"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-[420px] overflow-hidden rounded-[20px] border border-[#1F2430]">
        <Image
          src={active}
          alt="Product image"
          fill
          className="object-cover brightness-110 saturate-110"
        />
      </div>
      <div className="flex gap-3">
        {images.map((image) => (
          <button
            key={image}
            onClick={() => setActive(image)}
            className={
              "relative h-20 w-20 overflow-hidden rounded-[14px] border " +
              (image === active
                ? "border-white/70"
                : "border-[#1F2430]")
            }
            aria-label="Select product image"
          >
            <Image
              src={image}
              alt="Thumbnail"
              fill
              className="object-cover brightness-110 saturate-110"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
