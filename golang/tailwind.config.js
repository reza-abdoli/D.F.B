/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  content: ["../frontend/dist/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'body-img': "url('../frontend/img/2.avif')" // addressing from the output.css file
      }
    },
  },
  plugins: [],
}