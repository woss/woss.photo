import { dev } from '$app/environment';
import { equals, split } from 'ramda';

/**
 * local IPFS or img.macula.link
 */
export const imageProcessingBaseUrl = dev ? 'https://img.macula.localhost' : 'https://img.macula.link';
export const defaultIpfsGateway = dev ? 'https://ipfs.macula.localhost' : 'https://ipfs.macula.link';

export const hostingUrl = dev ? 'https://api.macula.localhost' : 'https://api.macula.link';

export function makeIpfsItemUrl(cidOrPath: string): URL {
  const u = new URL(`${imageProcessingBaseUrl}/ipfs/${cidOrPath}`);
  return u;
}

/**
 *
 * @param urn - `urn:PROVIDER:CID`
 * @param params - URLSearchParams which will be added to the URL
 * @returns
 */
export function makeIpfsLinkForUrn(urn: string, params?: Record<string, string>): URL {
  const [, provider, cidFromArray] = split(':', urn);

  let cid = cidFromArray;

  let ipfsGateway = defaultIpfsGateway;

  if (equals('ipfs', provider)) {
    ipfsGateway = imageProcessingBaseUrl;
  } else {
    console.debug('got unknown provider, using image macula');
    ipfsGateway = imageProcessingBaseUrl;
    cid = urn;
  }

  const u = new URL(`${ipfsGateway}/ipfs/${cid}`);

  if (params) {
    u.search = new URLSearchParams(params).toString();
  }

  return u;
}

export function maculaImageInfoUrl(cid: string): URL {
  const u = new URL(`${imageProcessingBaseUrl}/photo/${cid}`);
  console.log('u', u);
  return u;
}

export const albums = {
  home: {
    name: 'Home page album',
    cid: '647e748c0e16b0889158a5ab'
    // cid: '647e744b366a6d6770bbc9fc'
  }
};
