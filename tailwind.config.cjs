/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: '',
    darkTheme: 'dark'
    // themes: [
    //   'light',
    //   'dark',
    //   'cupcake',
    //   'bumblebee',
    //   'emerald',
    //   'corporate',
    //   'synthwave',
    //   'retro',
    //   'cyberpunk',
    //   'valentine',
    //   'halloween',
    //   'garden',
    //   'forest',
    //   'aqua',
    //   'lofi',
    //   'pastel',
    //   'fantasy',
    //   'wireframe',
    //   'black',
    //   'luxury',
    //   'dracula',
    //   'cmyk',
    //   'autumn',
    //   'business',
    //   'acid',
    //   'lemonade',
    //   'night',
    //   'coffee',
    //   'winter'
    // ]
  }
};
