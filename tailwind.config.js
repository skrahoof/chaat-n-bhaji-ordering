/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef9e7',
          100: '#fdf2c3',
          200: '#fce89a',
          300: '#fbde71',
          400: '#fad452',
          500: '#f9ca33',
          600: '#f8c42e',
          700: '#f7bc27',
          800: '#f6b420',
          900: '#f5a614',
        },
      },
    },
  },
  plugins: [],
}
