/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon': '#00d4ff',
        'neon-dim': '#0088aa',
        'neon-blue': '#0066ff',
        'cyber-bg': '#050a14',
        'cyber-card': '#0a1628',
        'cyber-border': 'rgba(0,212,255,0.25)',
        'cyber-hover': '#0d1f3c',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'sans-serif'],
        'terminal': ['"JetBrains Mono"', 'monospace'],
        'body': ['"Exo 2"', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'scan': 'scan 6s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%,100%': { textShadow: '0 0 8px #00d4ff, 0 0 20px #00d4ff40' },
          '50%': { textShadow: '0 0 16px #00d4ff, 0 0 40px #00d4ff80' },
        },
        blink: {
          '0%,100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0,212,255,0.5), 0 0 30px rgba(0,212,255,0.2)',
        'neon-sm': '0 0 5px rgba(0,212,255,0.4)',
        'window': '0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,212,255,0.15)',
        'icon': '0 4px 20px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
