import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-[14px] px-5 py-3 text-sm font-semibold transition duration-150 ease-primal focus-ring disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-white text-black hover:bg-[#E7E7E7]",
  secondary: "border border-white/70 text-white hover:border-white",
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
