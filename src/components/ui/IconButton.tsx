import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function IconButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-[#1F2430] bg-[#0B0D10]/80 text-white transition duration-150 ease-primal hover:border-white/60 focus-ring",
        className
      )}
      {...props}
    />
  );
}
