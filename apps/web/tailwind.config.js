/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    colors: {
      transparent: colors.transparent,
      current: 'currentColor',
      primary: '#198a92',
      'primary-soft': '#8ec6ca',
      black: '#363636',
      'less-black': '#565656',
      white: colors.white,
      'less-white': '#f1f1f1',
      gray: '#818181',
      'lesser-gray': '#c6c6c6',
    },
  },
  plugins: [],
}
