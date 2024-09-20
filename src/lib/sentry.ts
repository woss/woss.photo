import * as Sentry from '@sentry/sveltekit';

const sentryDefault: Sentry.BrowserOptions | Sentry.NodeOptions = {
  dsn: 'https://cf4214091bb50eb877dfbef0e56fe853@sentry.kelp.digital/14',
  release: import.meta.env.VITE_SENTRY_RELEASE_VERSION,
  tracesSampleRate: 1.0,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  spotlight: import.meta.env.DEV
};

let replayConfig = {};

export function makeBrowserSentry() {
  Sentry.init({
    ...sentryDefault,
    tracesSampleRate: 1.0,
    enabled: true,
    debug: window.localStorage.getItem('mcl_sentry_debug') === 'true',
    environment: import.meta.env.NODE_ENV || 'development',

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 1.0,

    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    // If you don't want to use Session Replay, just remove the line below:
    integrations: function (integrations) {
      return [
        ...integrations,
        Sentry.browserProfilingIntegration(),
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(replayConfig)
      ];
    },
    beforeSend: (event) => {
      console.debug('event', event);
      if (event.exception) {
        if (event.extra) {
          console.debug('extra', event.extra);
          const extra = event.extra as {
            __serialized__:
              | {
                  body: {
                    message: string;
                    status: number;
                  };
                  status: number;
                }
              | undefined;
          };
          if (extra.__serialized__ && extra.__serialized__.status !== 401) {
            // Sentry.showReportDialog({ eventId: event.event_id });
          }
        }
      }
      return event;
    }
  });
}

export function makeServerSentry() {
  Sentry.init(sentryDefault);
}
