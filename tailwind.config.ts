import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
    safelist: [
    'from-blue-500', 'via-blue-500', 'to-blue-500',
    'from-purple-500', 'via-purple-500', 'to-purple-500',
    'from-emerald-500', 'via-emerald-500', 'to-emerald-500',
    'from-rose-500', 'via-rose-500', 'to-rose-500',
    'from-amber-500', 'via-amber-500', 'to-amber-500',
    'from-slate-400', 'to-slate-600',
    'from-cyan-500', 'via-cyan-500', 'to-cyan-500',
    'from-indigo-500', 'via-indigo-500', 'to-indigo-500',
    'from-orange-500', 'via-orange-500', 'to-orange-500',
    'from-teal-500', 'via-teal-500', 'to-teal-500',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        aurora: 'aurora 60s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
