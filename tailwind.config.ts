import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-bebas-neue)", "var(--font-inter)", "sans-serif"]
      },
      transitionTimingFunction: {
        "primal": "cubic-bezier(0.2, 0.8, 0.2, 1)"
      },
      colors: {
        "primal-bg": "#0B0B0D",
        "primal-surface": "#1A1B1F",
        "primal-surface-2": "#1A1B1F",
        "primal-border": "#5B5F68",
        "primal-muted": "#5B5F68",
        "primal-secondary": "#FFFFFF",
        "primal-accent": "#D7B56D"
      }
    }
  },
  plugins: []
};

export default config;
