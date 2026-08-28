/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kumari-dark': '#0a0a0a',
        'kumari-gray': '#1c1c1c',
        'kumari-parchment': '#f4ebd8',
        'kumari-bronze': '#cda434',
        'kumari-gold': '#d4af37',
        'kumari-brown': '#3e2723',
        'kumari-stone': '#8d8d8d'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
