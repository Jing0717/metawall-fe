/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Helvetica Neue', ...defaultTheme.fontFamily.sans],
        'mono': ['Azeret Mono', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'main': '#EFECE7',
      },
      boxShadow: {
        '3xl': '-8px 8px 0px #00040029',
      }
    },
  },
  plugins: [],
};
