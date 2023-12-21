/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'body-img': "url('./img/img2.webp')", // addressing from the output.css file
        'github-icon': "url('./img/github.png')"
      },
      fontFamily: {
       
        'montserrat': ['Montserrat', 'sans-serif']
      },
      keyframes: {
        formAnimation: {
          '0%,49.99%': {  opacity: 0, 'z-index': 10 },
          '50%,100%': { opacity: 1, 'z-index': 50},
      }
      },
      animation: {
        'show': 'formAnimation 1s'
      }
    },
  },
  plugins: [],
}