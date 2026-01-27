import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#0e0f1a",
          muted: "#1c1d2d",
        },
        accent: {
          DEFAULT: "#7fffd4",
          soft: "#c1ffed",
        },
        ink: {
          DEFAULT: "#f5f5f5",
          muted: "#cdd2ff",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        card: "0 15px 35px rgba(0,0,0,0.45)",
      },
      backgroundImage: {
        "noise": "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(circle at 80% 0%, rgba(127,255,212,0.15), transparent 45%)",
      },
    },
  },
  plugins: [],
};

export default config;
