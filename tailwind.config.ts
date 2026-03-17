import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        beige: {
          creme: "#F5EFE0",
          chaud: "#E8D5B0",
          profond: "#C9A96E",
        },
        or: {
          luxe: "#B8860B",
          brillant: "#D4AF37",
        },
        encre: {
          noire: "#1A1208",
          douce: "#3D2B1F",
        },
        ivoire: "#FAF6EE",
      },
      fontFamily: {
        arabic: ["var(--font-amiri)", "serif"],
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-lato)", "sans-serif"],
        round: ["var(--font-nunito)", "sans-serif"],
      },
    },
  },
};

export default config;
