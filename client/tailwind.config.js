/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('autoprefixer'),
    (({ addUtilities }) => {
      addUtilities({
        ".no-overflow-anchoring": {
          overflowAnchor: "none",
        },
        ".overflow-anchor-auto":{
          overflowAnchor:"auto"
        }
      });
    })

  ],
}

