import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          50: '#fcfaf5',
          100: '#f8f4e9',
          200: '#efe5d0',
          300: '#e3d0aa',
          400: '#d5b67d',
          500: '#ca9e5a',
          600: '#bc864a',
          700: '#9d693f',
          800: '#815637',
          900: '#69482f',
          950: '#3a2618',
        },
        dark: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#141414',
          990: '#0a0a0a',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      }
    },
  },
  plugins: [],
} satisfies Config;
