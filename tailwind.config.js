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
      colors: {
        eagle: '#cb9dff',
      },
    },
  },
  plugins: [],
}
