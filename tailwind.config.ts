import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        carbon:  "rgb(var(--carbon)  / <alpha-value>)",
        graphite:"rgb(var(--graphite)/ <alpha-value>)",
        steel:   "rgb(var(--steel)   / <alpha-value>)",
        seam:    "rgb(var(--seam)    / <alpha-value>)",
        chrome:  "rgb(var(--chrome)  / <alpha-value>)",
        mist:    "rgb(var(--mist)    / <alpha-value>)",
        weld: {
          DEFAULT: "#B8C72C",
          glow: "#CBDA52",
          core: "#E5EDA8",
          dim: "#4D5A63",
        },
      },
      fontFamily: {
        display: ["var(--font-nunito)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      backgroundImage: {
        "metal-sheen":
          "linear-gradient(115deg, transparent 30%, rgba(201,207,216,0.06) 45%, rgba(201,207,216,0.12) 50%, rgba(201,207,216,0.06) 55%, transparent 70%)",
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(184,199,44,0.14), transparent 65%)",
        "panel-gradient":
          "linear-gradient(160deg, rgba(201,207,216,0.07), rgba(201,207,216,0.015) 40%, transparent)",
      },
      boxShadow: {
        glass: "inset 0 1px 0 rgba(201,207,216,0.10), 0 8px 32px rgba(0,0,0,0.45)",
        "weld-glow": "0 0 24px rgba(184,199,44,0.35), 0 0 64px rgba(184,199,44,0.15)",
      },
      animation: {
        sheen: "sheen 6s ease-in-out infinite",
        flicker: "flicker 2.2s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        sheen: {
          "0%": { backgroundPosition: "-200% 0" },
          "60%, 100%": { backgroundPosition: "200% 0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "48%": { opacity: "0.82" },
          "52%": { opacity: "0.95" },
          "70%": { opacity: "0.88" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
