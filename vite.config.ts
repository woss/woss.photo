// import 'vite/modulepreload-polyfill';

// import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'node:path';
import { createLogger, defineConfig, type UserConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';

const logger = createLogger();

const originalWarning = logger.warn;
logger.warn = (msg, options) => {
  //https://github.com/vitejs/vite/pull/10108
  // console.log('warning message', msg);

  if (msg.includes('vite:css') && msg.includes(' is empty')) return;
  originalWarning(msg, options);
};

const config: UserConfig = {
  customLogger: logger,
  // logLevel: 'info',
  plugins: [
    topLevelAwait(),
    // sentrySvelteKit({
    //   sourceMapsUploadOptions: {
    //     org: 'kelp',
    //     project: 'woss-photo',
    //     url: 'https://sentry.kelp.digital/'
    //   }
    // }),

    sveltekit()
  ],
  resolve: {
    alias: {
      $src: resolve('./src')
      // '@kelp_digital/svelte-ui-components': resolve(__dirname, '../ui-packages/svelte-ui-components/lib'),
      // '@kelp_digital/svelte-ui-components/*': resolve(__dirname, '../ui-packages/svelte-ui-components/lib/*')
    }
  },

  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      define: {
        global: 'globalThis'
      }
    }
  },
  build: {
    // warn on chunks above 1MB
    chunkSizeWarningLimit: 1024,
    modulePreload: {
      polyfill: true
    },
    rollupOptions: {
      onwarn: (e) => {
        // this prevents the eval warnings
        if (e.code === 'EVAL') {
          return;
        }
      },
      plugins: []
    }
  },
  server: {
    fs: {
      allow: [resolve('../../../src')],
      strict: false
    }
  }
  // // https://vitejs.dev/guide/build.html#public-base-path
  // experimental: {
  //   renderBuiltUrl: (filename: string, { hostType }: { hostType: 'js' | 'css' | 'html' }) => {
  //     console.log({ filename, hostType });
  //     if (hostType === 'js') {
  //       return { runtime: `window.__toCdnUrl(${JSON.stringify(filename)})` };
  //     } else {
  //       return { relative: true };
  //     }
  //   }
  // }
  // // this is only for prod build
  // ssr: {
  //   noExternal: true
  // }
};

export default defineConfig(({ mode }) => {
  const conf = config;
  // const { command, mode, ssrBuild } = opts;
  // if (command === 'serve') {
  // 	return {
  // 		// dev specific config
  // 	};
  // } else {
  // 	// command === 'build'
  // 	// return {
  // 	//   // build specific config
  // 	// }
  // }

  if (mode === 'production') {
    conf.customLogger = createLogger('error');
    conf.logLevel = 'error';
    if (conf.build) {
      conf.build.minify = true;
    }
  }
  return conf;
});
