/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(43 45 49 / <alpha-value>)",
        concrete: "rgb(107 110 115 / <alpha-value>)",
        gold: {
          DEFAULT: "rgb(46 111 100 / <alpha-value>)",
          soft: "rgb(61 138 124 / <alpha-value>)",
          deep: "rgb(36 90 82 / <alpha-value>)",
        },
        paper: "rgb(234 231 226 / <alpha-value>)",
        line: "rgba(43, 45, 49, 0.08)",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: { tightest: "-0.045em" },
      borderRadius: {
        soft: "1rem",
        panel: "1.125rem",
        feature: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(43,45,49,0.04), 0 14px 44px -14px rgba(43,45,49,0.14)",
        lift: "0 2px 6px rgba(43,45,49,0.05), 0 28px 70px -18px rgba(43,45,49,0.24)",
        gold: "0 8px 32px -8px rgba(46,111,100,0.40)",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

module.exports = config;
