import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-[#5B5F68] bg-[#1A1B1F]/70 p-5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-md transition duration-150 ease-primal hover:-translate-y-[2px] hover:border-[#D7B56D]/70 hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)]",
        className
      )}
      {...props}
    />
  );
}
