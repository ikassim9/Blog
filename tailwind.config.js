/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#1B2034',
         'background': '#f2f2f2',
          'field': '#e2e2e2'
      },

    fontFamily: {
        robot: ['Roboto', 'sans-serif'],
      },

    },
  },
  plugins: [],
}

