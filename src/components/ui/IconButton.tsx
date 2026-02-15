import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function IconButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-[#5B5F68] bg-[#1A1B1F]/80 text-white transition duration-150 ease-primal hover:border-[#D7B56D] hover:text-[#D7B56D] focus-ring",
        className
      )}
      {...props}
    />
  );
}
