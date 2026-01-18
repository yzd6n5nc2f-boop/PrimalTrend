import { Hero } from "@/components/home/Hero";
import { TribeTiles } from "@/components/home/TribeTiles";
import { LifestyleGrid } from "@/components/home/LifestyleGrid";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { MethodSection } from "@/components/home/MethodSection";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <TribeTiles />
      <LifestyleGrid />
      <CapabilitiesSection />
      <MethodSection />
    </div>
  );
}
