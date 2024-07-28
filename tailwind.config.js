module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-purple': '#7454bc',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
