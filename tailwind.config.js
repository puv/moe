/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1d4ed8",       // hsl(var(--p));
          "secondary": "#0f766e",     // hsl(var(--s));
          "accent": "#075985",        // hsl(var(--a));
          "neutral": "#111827",       // hsl(var(--n));
          "base-100": "#1f2937",      // hsv(var(--b1));
          "info": "#60a5fa",          // hsl(var(--in));
          "success": "#34d399",       // hsl(var(--su));
          "warning": "#fbbf24",       // hsl(var(--wa));
          "error": "#f87171",         // hsl(var(--er));
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
