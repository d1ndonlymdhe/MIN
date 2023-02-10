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
        primary: ["'Lato'", '"sans-serif"'],
        complementry: ["'Montserrat'", 'sans-serif'],
        white: ["'Playfair Display'", 'serif'],
        secondary: ["'Poppins'", "sans-serif"]
      }
    },
  },
  plugins: [],
};
