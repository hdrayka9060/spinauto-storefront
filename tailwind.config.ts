import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * Design tokens captured from spinauto.ca (see docs/spinauto-clone/design-reference.md §2).
 * Dark theme: bg #222, accent red #DB2526, secondary red #B41A1A.
 * Headings = "Play", body = "Roboto".
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#DB2526",
          "red-dark": "#B41A1A",
        },
        ink: {
          DEFAULT: "#222222",
          black: "#0b0b0b",
          card: "#2a2a2a",
          border: "#3a3a3a",
        },
        body: "#e8e8e8",
      },
      fontFamily: {
        display: ['"Play"', "system-ui", "sans-serif"],
        sans: ['"Roboto"', "Arial", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1200px",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
