import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
      },
      colors: {
        primary: 'var(--primary)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        background: 'var(--background)',
        muted: 'var(--muted)',
        border: 'var(--border)',
      },
    },
  },
  plugins: [],
}
export default config
