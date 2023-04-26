const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js}',
    // './node_modules/flowbite/**/*.js',
  ],
  theme: {
    colors: {
      current: 'currentColor',
      primary: '#198a92',
      'primary-soft': '#8ec6ca',
      black: '#363636',
      'less-black': '#565656',
      white: colors.white,
      'less-white': '#f4f4f4',
      'lesser-white': '#f1f1f1',
      gray: '#818181',
      'lesser-gray': '#c6c6c6',
      danger: '#e74c3c',
      'soft-danger': '#f5b7b1',
    },
    fontFamily: {
      sans: ['Kanit', 'sans-serif'],
    },
    extends: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
