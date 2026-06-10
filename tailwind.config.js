/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green:        '#1B7A48',
          'green-light':'#2E9E62',
          'green-pale': '#E8F5EE',
          saffron:      '#E8832A',
          'saffron-light': '#FFF3E8',
          navy:         '#0F2D4A',
          'navy-soft':  '#1A3F5E',
          cream:        '#FAFAF7',
          'grey-soft':  '#F2F4F3',
          'text-primary':   '#0F2D4A',
          'text-secondary': '#5A7184',
          'text-muted':     '#8FA3B1',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'card':       '0 2px 12px rgba(15,45,74,0.08)',
        'card-hover': '0 4px 20px rgba(15,45,74,0.14)',
        'bottom-nav': '0 -2px 16px rgba(15,45,74,0.10)',
      },
    },
  },
  plugins: [],
}
