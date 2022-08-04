/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "rgb(13,51,90)",
        "secondary": "rgb(184,220,246)",
      },
      gridTemplateColumns: {
        "20": "repeat(20, 191px)"
      },
    },
  },
  plugins: [],
}
