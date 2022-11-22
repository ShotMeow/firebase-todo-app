/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 2.1s ease-in-out',
        fadeOut: 'fadeOut 2.1s ease-in-out',
      },
    },
  },
  plugins: [],
};
