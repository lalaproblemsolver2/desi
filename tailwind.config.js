/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ghee: {
          50: '#FDF8EC',
          100: '#FFF8EC',
          200: '#FBEFC9',
          300: '#F5DE92',
          400: '#EFC858',
          500: '#E8A317',
          600: '#D4880F',
          700: '#A6640C',
          800: '#7A4A0A',
          900: '#5C3A1E',
        },
        earth: {
          50: '#FAF6F0',
          100: '#F0E6D6',
          200: '#E0CDB0',
          300: '#C9A980',
          400: '#A67E4D',
          500: '#8B6238',
          600: '#7A5530',
          700: '#5C3A1E',
          800: '#3E2614',
          900: '#2A1808',
        },
        cream: {
          50: '#FFFEFB',
          100: '#FFF8EC',
          200: '#FFF2DA',
          300: '#FFE9C2',
        },
        leaf: {
          400: '#6B9B4A',
          500: '#4A7C2F',
          600: '#3A6224',
          700: '#2D4A1B',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'drip': {
          '0%': { transform: 'translateY(-20px) scale(1)', opacity: '0' },
          '30%': { opacity: '1' },
          '60%': { transform: 'translateY(10px) scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'translateY(40px) scale(0.3)', opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.3s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'drip': 'drip 2s ease-in infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E\")",
        'jute': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='j'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.36 0 0 0 0 0.23 0 0 0 0 0.12 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23j)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
