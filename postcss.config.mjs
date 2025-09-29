// postcss.config.js (or postcss.config.mjs)
const config = {
  plugins: {
    "@tailwindcss/postcss": {}, // ✅ use this instead of tailwindcss
    autoprefixer: {},
  },
};

export default config;
