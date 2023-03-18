/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#31A683",
        secondary: "#E6F3EF",
        tertiary: "#FFBD00",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        "7xl": "5rem",
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      boxShadow: {
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
