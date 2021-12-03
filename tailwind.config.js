module.exports = {
  purge: ['./*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'dashboard-column-guide': "260px 1fr",
      },
      gridTemplateRows: {
        'dashboard-row-guide': "100px calc(100vh - 100px)",
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
