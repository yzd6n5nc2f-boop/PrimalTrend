import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-[14px] px-5 py-3 text-sm font-semibold transition-all duration-150 ease-primal focus-ring transform-gpu hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

const variants = {
  primary:
    "border border-white/15 bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.08)] hover:border-white/30 hover:bg-[#E7E7E7] hover:shadow-[0_12px_34px_rgba(255,255,255,0.12)]",
  secondary:
    "border border-white/40 text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:border-white/70 hover:shadow-[0_10px_28px_rgba(0,0,0,0.45)]",
  ghost: "border border-[#1F2430] text-white hover:border-white/70"
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
