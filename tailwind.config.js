export default {
  content: [
    "./index.html",
    "./src/**/*.{css, js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-nord'),
  ],
}