/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'body-img': "url('../../golang/img/img2.webp')" // addressing from the output.css file
      }
    },
  },
  plugins: [],
}