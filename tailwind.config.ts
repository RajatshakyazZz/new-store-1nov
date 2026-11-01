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
          bg: "#fffbf7",
          text: "#1c110b",
          muted: "#786154",
          purple: "#ff6b00",
          "purple-light": "#ff9500",
          "purple-dark": "#e05300",
          "purple-soft": "#fff0e5",
          pink: "#f97316",
          green: "#ea580c",
          "green-soft": "#ffedd5",
          line: "#f3e8e2",
          card: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 14px 40px rgba(28, 17, 11, 0.06)",
        soft: "0 8px 24px rgba(28, 17, 11, 0.04)",
        btn: "0 0 25px rgba(255, 107, 0, 0.55)",
        glow: "0 0 35px rgba(255, 149, 0, 0.6)",
        dock: "0 16px 40px rgba(15, 8, 4, 0.4)",
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
