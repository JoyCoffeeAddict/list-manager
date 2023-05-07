import { type Config } from "tailwindcss"

export default {
  // purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "th-background": "var(--background)",
        "th-background-secondary": "var(--background-secondary)",
        "th-foreground": "var(--foreground)",
        "th-primary-dark": "var(--primary-dark)",
        "th-primary-medium": "var(--primary-medium)",
        "th-primary-light": "var(--primary-light)",
        "th-accent-dark": "var(--accent-dark)",
        "th-accent-medium": "var(--accent-medium)",
        "th-accent-light": "var(--accent-light)",
      },
      backgroundImage: {
        "th-background-gradient": "var(--background-gradient)",
        "th-background-gradient-reversed":
          "var(--background-gradient-reversed)",
      },
    },
  },
  variants: {
    extend: {},
  },
  darkMode: "media",
  plugins: [],
} satisfies Config
