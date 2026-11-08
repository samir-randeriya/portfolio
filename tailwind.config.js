module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        accent: 'var(--accent)',
        'on-accent': 'var(--on-accent)',
        ink: 'var(--text)',
        'ink-bright': 'var(--text-bright)',
        'ink-dim': 'var(--text-dim)',
        'ink-faint': 'var(--text-faint)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      maxWidth: {
        content: 'var(--content-max)',
        conversation: '900px',
      },
      spacing: {
        gutter: 'var(--gutter)',
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '14px',
      },
      fontSize: {
        'display': ['clamp(2.25rem, 1.4rem + 3.5vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'title': ['clamp(1.75rem, 1.2rem + 1.8vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
