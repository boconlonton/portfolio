import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fg: "var(--fg)",
        subtle: "var(--subtle)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: { portfolio: "34rem" },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        statusPulse: {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 0 0 rgba(37,99,235,0.5)",
          },
          "50%": {
            opacity: "0.85",
            boxShadow: "0 0 0 5px rgba(37,99,235,0)",
          },
        },
        themeFlip: {
          "0%, 100%": { transform: "rotate(0deg) scale(1)" },
          "40%": { transform: "rotate(-14deg) scale(1.06)" },
          "70%": { transform: "rotate(10deg) scale(1.02)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up-nav": "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "fade-up-hero": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both",
        "fade-up-intro": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both",
        "fade-up-footer": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both",
        blink: "blink 1.1s step-start infinite",
        statusPulse: "statusPulse 2.5s ease-in-out infinite",
        "theme-flip": "themeFlip 0.55s cubic-bezier(0.34,1.3,0.64,1) both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
