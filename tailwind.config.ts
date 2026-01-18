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
        display: ["var(--font-oswald)", "system-ui", "sans-serif"]
      },
      transitionTimingFunction: {
        "primal": "cubic-bezier(0.2, 0.8, 0.2, 1)"
      },
      colors: {
        "primal-bg": "#050608",
        "primal-surface": "#0B0D10",
        "primal-surface-2": "#0F1216",
        "primal-border": "#1F2430",
        "primal-muted": "#7D8696",
        "primal-secondary": "#B8BDC7"
      }
    }
  },
  plugins: []
};

export default config;
