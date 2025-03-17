import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C2185B", // Rosa oscuro
        secondary: "#F8BBD0", // Rosa claro
        accent: "#FF80AB", // Un rosa intermedio
        background: "#FFFFFF", // Blanco
        foreground: "#333333", // Negro suave
        border: "#E91E63", // Borde en rosa fuerte
        muted: "#FCE4EC", // Rosa muy suave para fondos secundarios
        ring: "#D81B60", // Color de resaltado
      },
      borderRadius: {
        lg: "0.8rem",
        md: "0.6rem",
        sm: "0.4rem",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        bounce: "bounce 2s ease-in-out infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
