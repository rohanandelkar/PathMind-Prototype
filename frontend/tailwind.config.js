/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--bg-main)',
          surface: 'var(--surface-card)',
          hover: 'var(--surface-hover)',
          border: 'var(--border-color)',
          main: 'var(--text-main)',
          muted: 'var(--text-muted)',
        },
        brand: {
          50: '#fff1f1',
          100: '#ffe1e1',
          500: '#950101',
          600: '#950101',
          700: '#7a0000',
          900: '#3d0000',
        },
        primary: {
          DEFAULT: '#950101',
          hover: '#b50101',
          light: '#c70202',
        },
        accent: {
          red: '#FF0000',
          dark: '#3D0000',
          crimson: '#950101',
          purple: '#8b5cf6',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
        },
        dark: {
          bg: '#000000',
          card: '#3D0000',
          border: '#5C0000',
          hover: '#520000',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'brand-gradient': 'linear-gradient(135deg, #950101 0%, #FF0000 100%)',
      }
    },
  },
  plugins: [],
}
