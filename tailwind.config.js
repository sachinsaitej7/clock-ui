/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#31A683",
        secondary: "#E6F3EF",
        tertiary: "#FFBD00",
        yellow: "#F2FFCB",
        dark: "#E5E5E5",
        disabled: "rgba(41, 41, 41, 0.4)",
        danger: "#FF0000",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        "7xl": "5rem",
      },
      boxShadow: {
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
