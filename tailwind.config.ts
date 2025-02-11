import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      height: {
        "128": "32rem",
        "144": "36rem",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        themeGray: "#2E2D2D",
        themeBlack: "#080808",
      },
    },
  },
  plugins: [],
} satisfies Config;
