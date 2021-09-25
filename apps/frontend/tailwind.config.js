const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../libs/**/*.{ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: "#000000",
      gray: colors.gray,
      white: "#ffffff",
      red: colors.red,
    },
    spacing: {
      0: 0,
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "30px",
      6: "40px",
      7: "65px",
    },
  },
  plugins: [],
};
