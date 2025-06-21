module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        terminal: ['"Courier New"', 'monospace'],
      },
      colors: {
        'neon-pink': '#ff00ff',
        'neon-blue': '#00bfff',
        'cyber-bg': '#0a0a0a',
      },
      boxShadow: {
        'neon-pink': '0 0 6px rgba(255, 0, 255, 0.6), inset 0 0 4px rgba(255, 0, 255, 0.4)',
        'neon-blue': '0 0 6px rgba(0, 191, 255, 0.6), inset 0 0 4px rgba(0, 191, 255, 0.4)',
      },
      animation: {
        glitch: "glitch 1s infinite",
      },
    },
  },
  plugins: [],
};
