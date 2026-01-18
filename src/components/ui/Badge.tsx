import { cn } from "@/lib/cn";

export function Badge({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-white/20 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-white/80"
      )}
    >
      {label}
    </span>
  );
}
