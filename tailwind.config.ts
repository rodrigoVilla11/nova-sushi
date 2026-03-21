import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0b0b0c",
          text: "#f5f3ef",
          accent: "#c59e62", // dorado/cobre
          cta: "#e8e0cf",   // beige claro — botones CTA principales
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
} satisfies Config;