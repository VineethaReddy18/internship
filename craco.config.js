// craco.config.js
const tailwindcss = require('tailwindcss');

module.exports = {
  style: {
    postcss: {
      plugins: [
        tailwindcss,
        // Other PostCSS plugins can be added here if needed
      ],
    },
  },
};
