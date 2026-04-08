import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#080914",
        cosmos: "#11122A",
        violet: "#2A1B4D",
        glow: "#EAB66B",
        rose: "#D88AB0"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(234,182,107,0.2), 0 24px 80px rgba(24,12,46,0.55)"
      },
      backgroundImage: {
        aurora: "radial-gradient(circle at 20% 10%, rgba(216,138,176,0.25), transparent 35%), radial-gradient(circle at 80% 0%, rgba(110,70,197,0.3), transparent 35%), linear-gradient(135deg, #070810 0%, #0f1026 45%, #1d1233 100%)"
      }
    },
  },
  plugins: [],
} satisfies Config;
