import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/admin/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rb: {
          bg: "#f8fafc",
          text: "#0b132b",
          muted: "#64748b",
          purple: "#0066FF",
          "purple-light": "#00D2FF",
          "purple-dark": "#0047BA",
          "purple-soft": "#e0f2fe",
          pink: "#0ea5e9",
          green: "#0284c7",
          "green-soft": "#e0f2fe",
          line: "#e2e8f0",
          card: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 14px 40px rgba(11, 19, 43, 0.06)",
        soft: "0 8px 24px rgba(11, 19, 43, 0.04)",
        btn: "0 0 25px rgba(0, 102, 255, 0.42)",
        glow: "0 0 35px rgba(0, 210, 255, 0.55)",
        dock: "0 16px 40px rgba(2, 6, 23, 0.35)",
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
