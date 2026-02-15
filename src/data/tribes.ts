// Tribe image filenames must be lowercase to match slug (Linux is case-sensitive).
export type Tribe = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  traits: string[];
  image: string;
  thumbnailPosition: string;
  heroPosition: string;
  heroScale: number;
};

export const tribes: Tribe[] = [
  {
    slug: "spartan",
    name: "Spartan",
    tagline: "Resolve forged in the arena.",
    description:
      "A relentless collection built for athletes who treat training like a rite of passage.",
    traits: ["Discipline", "Power", "Minimalism"],
    image: "/images/tribes/spartan.png",
    thumbnailPosition: "50% 18%",
    heroPosition: "50% 14%",
    heroScale: 0.94
  },
  {
    slug: "samurai",
    name: "Samurai",
    tagline: "Precision under pressure.",
    description:
      "Technical silhouettes with exacting details for those who move with calm focus.",
    traits: ["Precision", "Control", "Endurance"],
    image: "/images/tribes/samurai.png",
    thumbnailPosition: "50% 20%",
    heroPosition: "50% 15%",
    heroScale: 0.94
  },
  {
    slug: "viking",
    name: "Viking",
    tagline: "Cold-proof, battle-ready.",
    description:
      "Layered insulation and storm-ready shells built for distance and grit.",
    traits: ["Strength", "Resilience", "Adaptability"],
    image: "/images/tribes/viking.png",
    thumbnailPosition: "50% 17%",
    heroPosition: "50% 13%",
    heroScale: 0.93
  },
  {
    slug: "maasai",
    name: "Maasai",
    tagline: "Endurance across the plains.",
    description:
      "Lightweight builds and breathable knitwear made for the long run.",
    traits: ["Stamina", "Agility", "Focus"],
    image: "/images/tribes/maasai.png",
    thumbnailPosition: "50% 19%",
    heroPosition: "50% 15%",
    heroScale: 0.94
  },
  {
    slug: "maori",
    name: "Maori",
    tagline: "Power in motion.",
    description:
      "Trail-tough constructions and storm-ready protection for the elements.",
    traits: ["Courage", "Balance", "Momentum"],
    image: "/images/tribes/maori.png",
    thumbnailPosition: "50% 18%",
    heroPosition: "50% 14%",
    heroScale: 0.94
  },
  {
    slug: "inca",
    name: "Inca",
    tagline: "Altitude-inspired endurance.",
    description:
      "Layered compression and thermal systems built to sustain long climbs.",
    traits: ["Clarity", "Warmth", "Stability"],
    image: "/images/tribes/inca.png",
    thumbnailPosition: "50% 19%",
    heroPosition: "50% 15%",
    heroScale: 0.94
  }
];
