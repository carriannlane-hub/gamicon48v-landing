/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'josefin': ['"Josefin Sans"', 'sans-serif'],
      },
      colors: {
        // GamiCon brand colors
        'gamicon': {
          'grey': '#85848c',
          'blue-light': '#85b1ce',
          'blue-dark': '#4b6176',
          'brown': '#af8f60',
          'grey-warm': '#6b6259',
          'yellow': '#fce3aa',
        }
      }
    },
  },
  plugins: [],
}
