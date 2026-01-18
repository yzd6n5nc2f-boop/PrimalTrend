export function SizeSelector({
  sizes,
  value,
  onChange
}: {
  sizes: string[];
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={
            "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] " +
            (value === size
              ? "border-white/70 bg-white/10 text-white"
              : "border-[#1F2430] text-white/70")
          }
        >
          {size}
        </button>
      ))}
    </div>
  );
}
