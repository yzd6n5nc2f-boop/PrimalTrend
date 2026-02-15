import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-[14px] border border-[#5B5F68] bg-[#1A1B1F] px-4 py-3 text-sm text-white placeholder:text-[#5B5F68] focus:border-[#D7B56D] focus-ring",
        className
      )}
      {...props}
    />
  );
}
