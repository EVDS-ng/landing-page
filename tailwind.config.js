/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pfp/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#072147",
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bcccdc",
          300: "#9fb3c8",
          400: "#829ab1",
          500: "#627d98",
          600: "#486581",
          700: "#334e68",
          800: "#243b53",
          900: "#072147",
        },
        secondary: {
          red: "#FF304E",
          yellow: "#FECC4F",
          blue: "#0AB7D9",
        },
        // Legacy colors for existing components
        "old-primary": "#003B75",
        "old-secondary": "#4348C0",
        tertiary: "#F76A4E",
        stroke: "#D5D5D5",
        "faded-text": "#979797",
        "feed-color": "#F2F8FF",
        "line-color-2": "#AECFF0",
        white: "#FFFFFF",
        black: "#000000",
        transparent: "transparent",
        current: "currentColor",
      },
      fontFamily: {
        sans: ["var(--font-commission)", "system-ui", "sans-serif"],
        commission: ["var(--font-commission)", "sans-serif"],
        poppins: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero-desktop": ["4.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        "hero-mobile": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        "section-title": ["3rem", { lineHeight: "1.2", fontWeight: "600" }],
        "section-title-mobile": [
          "2rem",
          { lineHeight: "1.3", fontWeight: "600" },
        ],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
