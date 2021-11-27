const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./components/**/*.{ts,tsx}",
    "./libs/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    spacing: {
      0: 0,
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "30px",
      6: "40px",
      7: "65px",
      8: "90px",
    },
    shadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      none: "none",
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
