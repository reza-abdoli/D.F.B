/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'body-img': "url('./img/img2.webp')" // addressing from the output.css file
      },
      fontFamily: {
       
        'montserrat': ['Montserrat', 'sans-serif']
      },
    },
  },
  plugins: [],
}