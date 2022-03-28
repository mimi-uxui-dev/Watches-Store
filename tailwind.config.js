module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sofiapro', "Helvetica", "Arial", "sans-serif"],
        serif: ['Soligant'],
        'xs': '.75rem',
        'sm': '.875rem',
        'tiny': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
      colors: {
        BLACK: "#222222",
        WHITE: "#FFFFFF",
        REDD: "#DD3333",
        BG_GRAY: "#F8F8F8",
        TEXT_GRAY: "#B4B4B4",
      },
      screens: {
        // => @media (min-width: 480px) { ... }
        'sm': '320px',
        'md': '547px',
        'lg': '768px',
        'xl': '1024px',
        '1xl': '1440px',
        '2xl': '1680px',
      },
    },
  },
  variants: {
    extend: {
      grayscale: ['hover', 'focus'],
      placeholderColor: ['hover', 'active'],
    },
  },
  plugins: [],
}