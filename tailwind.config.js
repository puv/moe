/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        base: {
          "100": "#263242",
          "200": "#222d3c",
          "300": "#1E2736",
          "400": "#1c2432",
          "500": "#19202D",
        }
      }

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
          "info": "#60a5fa",          // hsl(var(--in));
          "success": "#34d399",       // hsl(var(--su));
          "warning": "#fbbf24",       // hsl(var(--wa));
          "error": "#f87171",         // hsl(var(--er));
          "base-100": "#263242",
          "base-200": "#222d3c",
          "base-300": "#1E2736",
          "base-400": "#1c2432",
          "base-500": "#19202D",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
