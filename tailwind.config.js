const { colors } = require('@mui/material');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: '#3F51B5',
      typo: {
        disabled: 'rgba(0, 0, 0, 0.38)',
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.6)',
        active: '#3F51B5',
        red: 'rgb(233, 90, 90)',
        green: 'rgb(102, 204, 98)',
      },
      ui: {
        default: '#fafafa',
        paper: '#fff',
      },
    },
    extend: {
      colors: {
        ...colors,
      },
      boxShadow: {
        xs: [
          '0px 0px 0px 0px rgba(0,0,0,0.2)',
          '6px 1px 1px 1px rgba(0, 0, 0, 0.04)',
          '0px 3px 1px -2px rgba(0,0,0,0.12)',
        ],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
