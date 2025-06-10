/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E293B',
        accent: '#64748B',
        secondary: '#1795d4',
      },
    },
  },
  plugins: [],
}