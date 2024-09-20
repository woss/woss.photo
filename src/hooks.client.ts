import { handleErrorWithSentry } from '@sentry/sveltekit';
import { makeBrowserSentry } from './lib/sentry';

makeBrowserSentry();

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
