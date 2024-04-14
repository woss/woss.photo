import { dev } from '$app/environment';
import { equals, split } from 'ramda';
import { MaculaPublicApi } from './maculaApi';

export const maculaInstance = new MaculaPublicApi('woss');

/**
 * local IPFS or img.macula.link
 */
export const imageProcessingBaseUrl = dev ? 'http://localhost:3001' : 'https://img.macula.link';
export const defaultIpfsGateway = dev ? 'https://ipfs.macula.localhost' : 'https://ipfs.macula.link';

export const hostingUrl = dev ? 'https://api.macula.localhost' : 'https://api.macula.link';

export function makeIpfsUrl(cidOrPath: string): URL {
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
