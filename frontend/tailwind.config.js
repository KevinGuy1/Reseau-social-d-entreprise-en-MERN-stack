/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#fd2d01',
      'secondary': '#FFD7D7',
      'tertiary': '#4E5166',
      'white': '#FDFDFD',
      'black': '#282828',
      'red': '#FF0000',
      'green': '#1AC100',
    },
    fontFamily: {
      'sans': 'Lato'
    },
  },
  plugins: [],
}