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
        'neon-pink': '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff, inset 0 0 5px #ff00ff',
        'neon-blue': '0 0 5px #00bfff, 0 0 10px #00bfff, 0 0 20px #00bfff, inset 0 0 5px #00bfff',
      },
      animation: {
        glitch: "glitch 1s infinite",
      },
    },
  },
  plugins: [],
};
