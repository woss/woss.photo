import defaultTheme from 'tailwindcss/defaultTheme';
import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [daisyui],
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
