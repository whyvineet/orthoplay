module.exports = {
  // Your existing config...
  theme: {
    extend: {
      backgroundColor: {
        skin: {
          base: 'var(--background-color)',
          card: 'var(--card-background)',
          button: 'var(--button-bg)',
          input: 'var(--input-bg)',
        },
      },
      textColor: {
        skin: {
          base: 'var(--text-color)',
          header: 'var(--header-color)',
          button: 'var(--button-text)',
        },
      },
      borderColor: {
        skin: {
          base: 'var(--border-color)',
          input: 'var(--input-border)',
        },
      },
    },
  },
};