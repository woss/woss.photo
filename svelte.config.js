import adapter from '@sveltejs/adapter-static';

import vitePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      // fallback: '200.html', // this is for the surge.sh
      fallback: '200.html',
      precompress: true
    }),
    prerender: {
      concurrency: 10
    },
    files: {
      lib: 'src/components'
    },
    alias: {
      $src: 'src',
      '$src/*': 'src/*',
      $lib: 'src/components',
      '$lib/*': 'src/components/*'
    }
  }
};

export default config;
