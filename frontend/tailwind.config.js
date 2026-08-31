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
        gh: {
          bg: '#0d1117',
          card: '#161b22',
          border: '#30363d',
          text: '#e6edf3',
          muted: '#8b949e',
          accent: '#58a6ff',
          green: '#3fb950',
          red: '#f85149',
          purple: '#a371f7',
          yellow: '#d29922'
        }
      }
    },
  },
  plugins: [],
}
