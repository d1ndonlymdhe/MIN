/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B3486",
        secondary: "#7743DB",
        complementary: "#FFE9B1",
        minWhite: "#FCFDF2"
      },
      fontFamily: {
        lato: ["'Lato'", '"sans-serif"'],
        montserrat: ["'Montserrat'", 'sans-serif'],
        playfair: ["'PLayfair Display", 'serif'],
        poppins: ["'Poppins'", "sans-serif"]
      }
    },
  },
  plugins: [],
};
