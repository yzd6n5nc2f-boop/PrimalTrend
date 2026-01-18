"use client";

import { Input } from "@/components/ui/Input";

export function SearchBar({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Input
      placeholder="Search for tribe, sport, or product"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
