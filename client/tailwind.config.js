/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: {
          50: '#e9e9fc',
          100: '#bebdf5',
          200: '#9391ee',
          300: '#6765e7',
          400: '#5552E4',
          500: '#3c38e0',
          600: '#221fc7',
          700: '#1b189a',
          800: '#13116e',
          900: '#0b0a42',
          1000: '#040316',
        },
        grey: {
          200: '#f2f2f2',
          300: '#f8f8f8',
          500: '#fefefe',
          700: '#bdbdbd',
        },
      },
      screens: {
        xs: '400px',
        '3xl': '1700px',
        '4xl': '1920px',
      },
    },
  },
  plugins: [],
};
