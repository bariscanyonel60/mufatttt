import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        concrete: "#6B7280",
        gold: { DEFAULT: "#D9A441", soft: "#E8C377", deep: "#B8862E" },
        paper: "#FAFAF8",
        line: "rgba(23,23,23,0.08)",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: { tightest: "-0.045em" },
      boxShadow: {
        card: "0 1px 2px rgba(23,23,23,0.04), 0 12px 40px -12px rgba(23,23,23,0.12)",
        lift: "0 2px 4px rgba(23,23,23,0.05), 0 24px 64px -16px rgba(23,23,23,0.22)",
        gold: "0 8px 32px -8px rgba(217,164,65,0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
