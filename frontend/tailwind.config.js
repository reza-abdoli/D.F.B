/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'body-img': "url('../img/2.avif')" // addressing from the output.css file
      }
    },
  },
  plugins: [],
}

