import adapter from '@sveltejs/adapter-static';

import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: sveltePreprocess({
    postcss: true,
    sourceMap: true
  }),
  kit: {
    adapter: adapter({
      fallback: '200.html',
      precompress: true
    }),
    prerender: {
      // delete this line when Pricing page is ready
      handleMissingId: 'ignore',
      concurrency: 10,
      crawl: true
    }
  }
};

export default config;
