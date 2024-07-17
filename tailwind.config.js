/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-light': '0 2px 4px rgba(219,181,181, 0.3)',
        'input': '0 0 0 0.05rem #DBB5B5'
      },
      backgroundColor: {
        'disableBtn': '#D0B8A8',
        'default': '#987070'
      },
      textColor: {
        'disableBtn': '#EEEDEB',
        'icon': '#C40C0C',
        'title': '#987070'
      },
      cursor: {
        'disableBtn': 'not-allowed'
      },
      borderColor: {
        'cancelBtn': '#987070'
      },
      fontWeight: {
        'errMsg': '500'
      }
    },
  },
plugins: [],
}

