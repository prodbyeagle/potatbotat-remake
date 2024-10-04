/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"Space Mono"', 'monospace'],
      },
      colors: {
        twitch: '#9146FF',
        eagle: '#cb9dff',
      },
    },
  },
  plugins: [],
}
