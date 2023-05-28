import { type Config } from "tailwindcss"

export default {
  // purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "th-background": "rgb(var(--background) / <alpha-value>)",
        "th-background-secondary":
          "rgb(var(--background-secondary) / <alpha-value>)",
        "th-foreground": "rgb(var(--foreground) / <alpha-value>)",
        "th-primary-dark": "rgb(var(--primary-dark) / <alpha-value>)",
        "th-primary-medium": "rgb(var(--primary-medium) / <alpha-value>)",
        "th-primary-light": "rgb(var(--primary-light) / <alpha-value>)",
        "th-accent-dark": "rgb(var(--accent-dark) / <alpha-value>)",
        "th-accent-medium": "rgb(var(--accent-medium) / <alpha-value>)",
        "th-accent-light": "rgb(var(--accent-light) / <alpha-value>)",
        "th-error": "rgb(var(--error) / <alpha-value>)",
        "th-disabled": "rgb(var(--disabled) / <alpha-value>)",
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
