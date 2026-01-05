/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tech-blue': '#0EA5E9',
        'tech-blue-dark': '#0369a1',
        'innovation-purple': '#8B5CF6',
        'achievement-gold': '#F59E0B',
        'energy-cyan': '#06B6D4',
        'bg-main': '#0a0a0a',
        'bg-secondary': '#151515',
        'bg-tertiary': '#1f1f1f',
        'text-primary': '#ffffff',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
        'border-color': 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 15s infinite alternate ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%': { transform: 'scale(1) translate(0, 0)', opacity: '0.05' },
          '100%': { transform: 'scale(1.2) translate(-50px, 50px)', opacity: '0.08' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [typography],
}
