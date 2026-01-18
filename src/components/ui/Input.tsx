import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-[14px] border border-[#1F2430] bg-[#0B0D10] px-4 py-3 text-sm text-white placeholder:text-[#7D8696] focus-ring",
        className
      )}
      {...props}
    />
  );
}
