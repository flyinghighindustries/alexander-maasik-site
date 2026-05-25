/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        ink: "#111418",
        paper: "#FAFAF7",
        muted: "#5B6168",
        rule: "#E6E4DE",
        accent: "#1F3A5F",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: ["Source Serif 4", "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      maxWidth: {
        prose: "62ch",
        page: "1120px",
      },
      letterSpacing: {
        tight2: "-0.02em",
      },
    },
  },
  plugins: [],
};
