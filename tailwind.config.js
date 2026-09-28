import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        /* ---- PropFlow brand palette ------------------------------------
           These replace the raw hex values that were scattered through the
           original single-file component. Use the token, not the hex. */
        navy: {
          DEFAULT: "#081A33", // page-dark surfaces, footer
          700: "#0E2647", // gradient mid-stop
          600: "#0C2547",
          500: "#0E2A52",
        },
        brand: {
          DEFAULT: "#2F6BFF", // primary action blue
          hover: "#4F83FF",
          sky: "#8FB3FF", // light accent on dark backgrounds
        },
        aqua: "#38C6D9", // gradient partner to brand blue
        ink: "#0F1E33", // primary body text
        body: "#4C5B70", // secondary prose
        muted: "#7F8CA0", // captions, meta
        line: "#E4EAF3", // hairline borders
        mist: "#F5F8FC", // tinted section background
        success: "#12A150",
        star: "#F5A623",

        /* ---- shadcn/ui semantic tokens (driven by CSS vars) ---------- */
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
      fontFamily: {
        sans: [
          "Inter var",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        /* Fluid display sizes used by the hero and section headings. */
        display: ["clamp(38px, 4.2vw, 56px)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        h2: ["clamp(32px, 3.8vw, 48px)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h3: ["clamp(28px, 3.4vw, 42px)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "20px",
        panel: "26px",
      },
      boxShadow: {
        card: "0 12px 34px rgba(15, 30, 51, 0.07)",
        lift: "0 26px 60px rgba(8, 26, 51, 0.30)",
        glow: "0 6px 16px rgba(47, 107, 255, 0.40)",
      },
      maxWidth: {
        shell: "1200px", // the single page gutter width
        prose: "700px",
        measure: "820px",
      },
      spacing: {
        section: "76px",
        "section-lg": "108px",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #2F6BFF 0%, #38C6D9 100%)",
      },
      keyframes: {
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
