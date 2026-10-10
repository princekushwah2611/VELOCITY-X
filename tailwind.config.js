/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#090909',
        surface: {
          light: '#18181b',
          DEFAULT: '#121214',
          dark: '#0c0c0e',
        },
        accent: {
          DEFAULT: '#D6FF5F',
          muted: '#a8d833',
          glow: 'rgba(214, 255, 95, 0.25)',
        },
        foreground: '#ffffff',
        muted: '#8E8E93',
        subtle: '#27272a',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      letterSpacing: {
        'ultra-wide': '0.3em',
        'mega-wide': '0.45em',
      },
    },
  },
  plugins: [],
};
