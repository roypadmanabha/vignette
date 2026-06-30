/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Mulish', 'sans-serif'],
      },
      colors: {
        brand: {
          lightRed: '#c0392b',
          lightOrange: '#e67e22',
          darkGold: '#FFD700',
          darkYellow: '#FFF1A8',
        }
      },
      animation: {
        'shimmer': 'shimmer 12s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      }
    },
  },
  plugins: [],
}
