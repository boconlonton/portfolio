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
        canvas: "var(--bg)",
        "text-muted": "var(--text-muted)",
        "ds-control-track": "var(--ds-control-track)",
        "ds-control-track-hover": "var(--ds-control-track-hover)",
        "ds-control-track-border": "var(--ds-control-track-border)",
        "ds-control-thumb": "var(--ds-control-thumb)",
        "ds-control-thumb-border": "var(--ds-control-thumb-border)",
        "ds-accent": "var(--ds-accent)",
        "ds-accent-muted": "var(--ds-accent-muted)",
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
        heroGlow: {
          "0%, 100%": {
            opacity: "0.35",
            transform: "scale(1) translate(0, 0)",
          },
          "50%": {
            opacity: "0.55",
            transform: "scale(1.06) translate(2%, -3%)",
          },
        },
        heroLineExpand: {
          from: { transform: "scaleX(0)", transformOrigin: "0 50%" },
          to: { transform: "scaleX(1)", transformOrigin: "0 50%" },
        },
        heroSparkle: {
          "0%, 100%": { transform: "rotate(-2deg) scale(1)", opacity: "0.75" },
          "50%": { transform: "rotate(6deg) scale(1.06)", opacity: "1" },
        },
        heroSlash: {
          "0%, 100%": { opacity: "0.4", transform: "translateY(0)" },
          "50%": { opacity: "0.95", transform: "translateY(-2px)" },
        },
        heroDrift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
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
        "hero-glow": "heroGlow 9s ease-in-out infinite",
        "hero-line": "heroLineExpand 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "hero-sparkle": "heroSparkle 4s ease-in-out infinite",
        "hero-slash": "heroSlash 3s ease-in-out infinite",
        "hero-drift": "heroDrift 4.5s ease-in-out infinite",
        "hero-in-0": "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) 0s both",
        "hero-in-1": "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) 0.08s both",
        "hero-in-2": "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) 0.16s both",
        "hero-in-3": "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) 0.24s both",
        "hero-in-4": "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) 0.32s both",
        "hero-in-5": "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) 0.4s both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
