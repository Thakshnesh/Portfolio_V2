/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9dffd',
          300: '#7cc3fb',
          400: '#36a3f7',
          500: '#1d87ed',
          600: '#0066cc',
          700: '#1d4ed8', // Royal avatar shirt blue
          800: '#1e3a8a', // Deep navy
          900: '#0f1f4b', // Midnight navy
          950: '#070c1e', // Cyber space dark
        },
        navy: {
          card: '#0c1527',
          deep: '#060a14',
          accent: '#1e293b',
          border: '#1e3a8a40',
        },
        electric: {
          blue: '#00d2ff',
          cyan: '#38bdf8',
          glow: '#2563eb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'neon-blue': '0 0 25px -5px rgba(37, 99, 235, 0.5), 0 0 10px -5px rgba(56, 189, 248, 0.4)',
        'neon-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.6)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
