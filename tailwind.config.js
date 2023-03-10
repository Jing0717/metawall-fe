/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
      },
      screens: {
        lg: '870px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Helvetica Neue', ...defaultTheme.fontFamily.sans],
        mono: ['Azeret Mono', ...defaultTheme.fontFamily.sans],
        paytone: ['Paytone One', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        main: '#EFECE7',
        primary: '#03438D',
      },
      boxShadow: {
        btn: '-2px 2px 0px #000400',
        '3xl': '-8px 8px 0px #00040029',
        list: '0px 3px 0px #000400',
      },
    },
  },
  plugins: [],
};
