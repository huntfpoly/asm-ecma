const colors = require('tailwindcss/colors');
module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        shine: {
          to: { left: "125%" }
        },
      },
      animation: {
        shine: "shine 1s ease infinite"
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.green,
      blue: colors.blue
    },
    fontFamily: {
      body: ["DM Sans", "sans-serif"],
    },
  },
  plugins: [],
};
