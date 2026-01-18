import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-[#1F2430] bg-[#0B0D10]/70 p-5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-md transition duration-150 ease-primal hover:-translate-y-[2px] hover:border-[rgba(120,160,255,0.35)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)]",
        className
      )}
      {...props}
    />
  );
}
