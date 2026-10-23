import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#100f0e",
        ink: "#151413",
        graphite: "#262422",
        silver: "#8a867f",
        ivory: "#fbf8f0",
        paper: "#f5efe2",
        parchment: "#eae0cb",
        cream: "#fffdfa",
        vermilion: "#d83f23",
        crimson: "#9e2518",
        amberOchre: "#d8851e",
        crtGreen: "#00e676",
        alienPurple: "#7c3aed",
        celestialBlue: "#2563eb",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        pixel: ["var(--font-pixel)", "monospace"],
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "float-reverse": "floatReverse 9s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "pixel-scroll": "pixelScroll 25s linear infinite",
        "scanline": "scanline 6s linear infinite",
        "blink-fast": "blinkFast 1s steps(1) infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1.5deg)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(10px) rotate(-1.5deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
        pixelScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        blinkFast: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
