module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        terminal: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        glitch: "glitch 1s infinite",
      },
    },
  },
  plugins: [],
};
