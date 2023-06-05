import { dev } from '$app/environment';

/**
 * local IPFS or img.macula.link
 */
export const imageProcessingBaseUrl = dev ? 'https://img.macula.localhost' : 'https://img.macula.link';

export const hostingUrl = dev ? 'https://api.macula.localhost' : 'https://api.macula.link';

export const albums = {
  home: {
    name: 'Home page album',
    cid: '647dbc5f00597505a2e78c14'
    // cid: '647cd0e9621688e9a1dab816'
  }
};
