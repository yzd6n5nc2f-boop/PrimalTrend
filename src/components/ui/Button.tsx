import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-[14px] px-5 py-3 text-sm font-semibold transition-all duration-150 ease-primal focus-ring transform-gpu hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

const variants = {
  primary:
    "border border-[#D7B56D]/70 bg-[#D7B56D] text-black shadow-[0_10px_30px_rgba(215,181,109,0.24)] hover:border-[#D7B56D] hover:bg-[#E2C588] hover:shadow-[0_12px_34px_rgba(215,181,109,0.34)]",
  secondary:
    "border border-[#D7B56D]/70 text-[#D7B56D] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:border-[#D7B56D] hover:bg-[#D7B56D]/10 hover:shadow-[0_10px_28px_rgba(0,0,0,0.45)]",
  ghost: "border border-[#5B5F68] text-white hover:border-[#D7B56D] hover:text-[#D7B56D]"
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
}
