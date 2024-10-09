/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"Jetbrains Mono"', 'monospace'],
      },
      width: {
        custom: '50rem',
      },
      maxHeight: {
        custom: '50rem',
      },
    },
  },
  plugins: [],
}
